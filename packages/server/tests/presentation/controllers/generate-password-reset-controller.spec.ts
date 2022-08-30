import { faker } from '@faker-js/faker'

import { GeneratePasswordResetController } from '@/presentation/controllers'
import { GeneratePasswordReset } from '@/domain/usecases'
import { noContent, serverError } from '@/presentation/helpers'
import { ServerError } from '@monorepo/validation'
import { throwError } from '@/tests/domain/mocks'

const mockRequest = (): GeneratePasswordResetController.Request => {
  return {
    email: faker.internet.email()
  }
}

class GeneratePasswordResetSpy implements GeneratePasswordReset {
  params: GeneratePasswordReset.Params
  result = true

  async generate(params: GeneratePasswordReset.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}

type SutTypes = {
  sut: GeneratePasswordResetController
  generatePasswordResetSpy: GeneratePasswordResetSpy
}

const makeSut = (): SutTypes => {
  const generatePasswordResetSpy = new GeneratePasswordResetSpy()
  const sut = new GeneratePasswordResetController(generatePasswordResetSpy)
  return {
    sut,
    generatePasswordResetSpy
  }
}

describe('GeneratePasswordResetController', () => {
  test('Should call GeneratePasswordReset with correct value', async () => {
    const { sut, generatePasswordResetSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(generatePasswordResetSpy.params).toEqual({
      email: request.email
    })
  })

  test('Should return 500 if GeneratePasswordReset throws', async () => {
    const { sut, generatePasswordResetSpy } = makeSut()
    jest.spyOn(generatePasswordResetSpy, 'generate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
