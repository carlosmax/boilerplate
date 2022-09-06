import { faker } from '@faker-js/faker'

import { PasswordResetController } from '@/presentation/controllers'
import { PasswordReset } from '@/domain/usecases'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { MissingParamError, ServerError } from '@monorepo/validation'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

const mockRequest = (): PasswordResetController.Request => {
  return {
    accountId: faker.datatype.uuid(),
    resetToken: faker.random.alphaNumeric(32),
    newPassword: faker.random.alphaNumeric(8)
  }
}

class PasswordResetSpy implements PasswordReset {
  params: PasswordReset.Params
  result = true

  async reset(params: PasswordReset.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}

type SutTypes = {
  sut: PasswordResetController
  passwordResetSpy: PasswordResetSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const passwordResetSpy = new PasswordResetSpy()
  const validationSpy = new ValidationSpy()
  const sut = new PasswordResetController(passwordResetSpy, validationSpy)
  return {
    sut,
    passwordResetSpy,
    validationSpy
  }
}

describe('PasswordResetController', () => {
  test('Should call PasswordReset with correct value', async () => {
    const { sut, passwordResetSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(passwordResetSpy.params).toEqual({
      accountId: request.accountId,
      resetToken: request.resetToken,
      newPassword: request.newPassword
    })
  })

  test('Should return 500 if PasswordReset throws', async () => {
    const { sut, passwordResetSpy } = makeSut()
    jest.spyOn(passwordResetSpy, 'reset').mockImplementationOnce(throwError)
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
