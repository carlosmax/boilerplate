import { faker } from '@faker-js/faker'

import { GeneratePasswordResetController } from '@/presentation/controllers'
import { GeneratePasswordReset } from '@/domain/usecases'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { MissingParamError, ServerError } from '@monorepo/validation'
import { throwError } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/presentation/mocks'

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
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const generatePasswordResetSpy = new GeneratePasswordResetSpy()
  const validationSpy = new ValidationSpy()
  const sut = new GeneratePasswordResetController(generatePasswordResetSpy, validationSpy)
  return {
    sut,
    generatePasswordResetSpy,
    validationSpy
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

  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
