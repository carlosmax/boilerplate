import { DbGeneratePasswordReset } from '@/data/usecases'
import { faker } from '@faker-js/faker'
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

describe('DbGeneratePasswordReset UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const params = { email: faker.internet.email() }
    await sut.generate(params)
    expect(loadAccountByEmailRepositorySpy.email).toBe(params.email)
  })
})
