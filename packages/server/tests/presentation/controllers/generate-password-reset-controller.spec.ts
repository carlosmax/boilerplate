import { faker } from '@faker-js/faker'

import { GeneratePasswordResetController } from '@/presentation/controllers'
import { GeneratePasswordReset } from '@/domain/usecases'

const mockRequest = (): GeneratePasswordResetController.Request => {
  return {
    email: faker.internet.email()
  }
}

class GeneratePasswordResetSpy implements GeneratePasswordReset {
  params: GeneratePasswordReset.Params

  async generate(params: GeneratePasswordReset.Params): Promise<boolean> {
    this.params = params
    return true
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
})
