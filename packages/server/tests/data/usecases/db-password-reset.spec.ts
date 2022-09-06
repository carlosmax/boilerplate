import { faker } from '@faker-js/faker'

import { DbPasswordReset } from '@/data/usecases'
import { PasswordReset } from '@/domain/usecases'
import {
  EncrypterSpy,
  HashComparerSpy,
  LoadAccountByIdRepositorySpy,
  UpdatePasswordRepositorySpy
} from '../mocks'
import { throwError } from '../../domain/mocks'
import { addHours } from '@/infra/helpers'

type SutTypes = {
  sut: DbPasswordReset
  loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
  updatePasswordRepositorySpy: UpdatePasswordRepositorySpy
  hashCompareSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
  const hashCompareSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updatePasswordRepositorySpy = new UpdatePasswordRepositorySpy()
  const sut = new DbPasswordReset(
    loadAccountByIdRepositorySpy,
    updatePasswordRepositorySpy,
    hashCompareSpy,
    encrypterSpy
  )
  return {
    sut,
    loadAccountByIdRepositorySpy,
    updatePasswordRepositorySpy,
    hashCompareSpy,
    encrypterSpy
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

  test('Should throw if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.reset(mockPasswordResetParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    loadAccountByIdRepositorySpy.result = null
    const promise = sut.reset(mockPasswordResetParams())
    await expect(promise).rejects.toThrow('Token de redefinição de senha inválido ou expirado!')
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashCompareSpy, loadAccountByIdRepositorySpy } = makeSut()
    const params = mockPasswordResetParams()
    await sut.reset(params)
    expect(hashCompareSpy.plaintext).toBe(params.resetToken)
    expect(hashCompareSpy.digest).toBe(loadAccountByIdRepositorySpy.result.resetPasswordToken)
  })

  test('Should throw if resetPasswordToken is null', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    loadAccountByIdRepositorySpy.result.resetPasswordToken = null
    const promise = sut.reset(mockPasswordResetParams())
    await expect(promise).rejects.toThrow('Token de redefinição de senha inválido ou expirado!')
  })

  test('Should throw if resetPasswordToken is invalid', async () => {
    const { sut, hashCompareSpy } = makeSut()
    hashCompareSpy.isValid = false
    const promise = sut.reset(mockPasswordResetParams())
    await expect(promise).rejects.toThrow('Token de redefinição de senha inválido ou expirado!')
  })

  test('Should throw if resetPasswordExpires is null', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    loadAccountByIdRepositorySpy.result.resetPasswordExpires = null
    const promise = sut.reset(mockPasswordResetParams())
    await expect(promise).rejects.toThrow('Token de redefinição de senha inválido ou expirado!')
  })

  test('Should throw if resetPasswordExpires is invalid', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    loadAccountByIdRepositorySpy.result.resetPasswordExpires = addHours(new Date(), -1)
    const promise = sut.reset(mockPasswordResetParams())
    await expect(promise).rejects.toThrow('Token de redefinição de senha inválido ou expirado!')
  })

  test('Should call Encrypter with correct value', async () => {
    const { sut, encrypterSpy } = makeSut()
    const params = mockPasswordResetParams()
    await sut.reset(params)
    expect(encrypterSpy.plaintext).toBe(params.newPassword)
  })

  test('Should call UpdatePasswordRepository with correct values', async () => {
    const { sut, encrypterSpy, updatePasswordRepositorySpy } = makeSut()
    const params = mockPasswordResetParams()
    await sut.reset(params)
    expect(updatePasswordRepositorySpy.password).toBe(encrypterSpy.ciphertext)
  })
})
