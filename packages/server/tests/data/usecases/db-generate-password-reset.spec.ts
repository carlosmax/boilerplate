import { faker } from '@faker-js/faker'

import { DbGeneratePasswordReset } from '@/data/usecases'
import { GeneratePasswordReset } from '@/domain/usecases'
import { throwError } from '@/tests/domain/mocks'
import {
  EncrypterSpy,
  LoadAccountByEmailRepositorySpy,
  RandomHexGeneratorSpy,
  UpdateResetPasswordTokenRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbGeneratePasswordReset
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  encrypterSpy: EncrypterSpy
  randomHexGeneratorSpy: RandomHexGeneratorSpy
  updateResetPasswordTokenRepositorySpy: UpdateResetPasswordTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const encrypterSpy = new EncrypterSpy()
  const randomHexGeneratorSpy = new RandomHexGeneratorSpy()
  const updateResetPasswordTokenRepositorySpy = new UpdateResetPasswordTokenRepositorySpy()
  const sut = new DbGeneratePasswordReset(
    loadAccountByEmailRepositorySpy,
    randomHexGeneratorSpy,
    encrypterSpy,
    updateResetPasswordTokenRepositorySpy
  )
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    encrypterSpy,
    randomHexGeneratorSpy,
    updateResetPasswordTokenRepositorySpy
  }
}

const mockGeneratePasswordResetParams = (): GeneratePasswordReset.Params => {
  return { email: faker.internet.email() }
}

describe('DbGeneratePasswordReset UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const params = mockGeneratePasswordResetParams()
    await sut.generate(params)
    expect(loadAccountByEmailRepositorySpy.email).toBe(params.email)
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.generate(mockGeneratePasswordResetParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = null
    const result = await sut.generate(mockGeneratePasswordResetParams())
    expect(result).toBe(false)
  })

  test('Should call Encrypter with correct plaintext', async () => {
    const { sut, encrypterSpy, randomHexGeneratorSpy } = makeSut()
    await sut.generate(mockGeneratePasswordResetParams())
    expect(encrypterSpy.plaintext).toBe(randomHexGeneratorSpy.hex)
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.generate(mockGeneratePasswordResetParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateResetPasswordTokenRepository with correct values', async () => {
    const {
      sut,
      updateResetPasswordTokenRepositorySpy,
      encrypterSpy,
      loadAccountByEmailRepositorySpy
    } = makeSut()
    await sut.generate(mockGeneratePasswordResetParams())
    expect(updateResetPasswordTokenRepositorySpy.id).toBe(loadAccountByEmailRepositorySpy.result.id)
    expect(updateResetPasswordTokenRepositorySpy.token).toBe(encrypterSpy.ciphertext)
  })
})
