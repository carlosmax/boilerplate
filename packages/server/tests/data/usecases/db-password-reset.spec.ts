import { faker } from '@faker-js/faker'

import { DbPasswordReset } from '@/data/usecases'
import { PasswordReset } from '@/domain/usecases'
import { LoadAccountByIdRepositorySpy } from '../mocks'
import { throwError } from '../../domain/mocks'

type SutTypes = {
  sut: DbPasswordReset
  loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
  const sut = new DbPasswordReset(loadAccountByIdRepositorySpy)
  return {
    sut,
    loadAccountByIdRepositorySpy
  }
}

const mockPasswordResetParams = (): PasswordReset.Params => {
  return {
    accountId: faker.datatype.uuid(),
    resetToken: faker.random.alphaNumeric(32),
    newPassword: faker.random.alphaNumeric(8)
  }
}

describe('DbPasswordReset UseCase', () => {
  test('Should call LoadAccountByIdRepository with correct account id', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    const params = mockPasswordResetParams()
    await sut.reset(params)
    expect(loadAccountByIdRepositorySpy.accountId).toBe(params.accountId)
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.reset(mockPasswordResetParams())
    await expect(promise).rejects.toThrow()
  })
})
