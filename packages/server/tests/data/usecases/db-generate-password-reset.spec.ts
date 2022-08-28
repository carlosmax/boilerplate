import { DbGeneratePasswordReset } from '@/data/usecases'
import { GeneratePasswordReset } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import { throwError } from '../../domain/mocks'
import { EncrypterSpy, LoadAccountByEmailRepositorySpy, RandomHexGeneratorSpy } from '../mocks'

type SutTypes = {
  sut: DbGeneratePasswordReset
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  encrypterSpy: EncrypterSpy
  randomHexGenerator: RandomHexGeneratorSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const encrypterSpy = new EncrypterSpy()
  const randomHexGenerator = new RandomHexGeneratorSpy()
  const sut = new DbGeneratePasswordReset(
    loadAccountByEmailRepositorySpy,
    randomHexGenerator,
    encrypterSpy
  )
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    encrypterSpy,
    randomHexGenerator
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
    const { sut, encrypterSpy, randomHexGenerator } = makeSut()
    await sut.generate(mockGeneratePasswordResetParams())
    expect(encrypterSpy.plaintext).toBe(randomHexGenerator.hex)
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.generate(mockGeneratePasswordResetParams())
    await expect(promise).rejects.toThrow()
  })
})
