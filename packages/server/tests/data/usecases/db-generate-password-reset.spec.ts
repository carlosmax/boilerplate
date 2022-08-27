import { DbGeneratePasswordReset } from '@/data/usecases'
import { GeneratePasswordReset } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import { throwError } from '../../domain/mocks'
import { LoadAccountByEmailRepositorySpy } from '../mocks'

type SutTypes = {
  sut: DbGeneratePasswordReset
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new DbGeneratePasswordReset(loadAccountByEmailRepositorySpy)
  return {
    sut,
    loadAccountByEmailRepositorySpy
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
})
