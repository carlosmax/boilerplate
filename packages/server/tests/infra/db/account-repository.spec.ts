import { faker } from '@faker-js/faker'
import { Database } from '@/main/config/db'
import { AccountDb, AccountDbFactory, SqlAccountRepository } from '@/infra/db'
import { mockAddAccount, mockAddAccountParams } from '@/tests/domain/mocks'

const makeSut = (): SqlAccountRepository => {
  return new SqlAccountRepository()
}

describe('SqlAccountRepository', () => {
  const db: any = Database
  let accountDb: AccountDb

  // Before any tests run, clear the DB and run migrations with Sequelize sync()
  beforeAll(async () => {
    await db.connectionManager.sequelize.sync({ force: true })
    accountDb = AccountDbFactory()
  })

  // After all tersts have finished, close the DB connection
  afterAll(async () => {
    await db.connectionManager.sequelize.close()
  })

  beforeEach(async () => {
    await accountDb.destroy({
      where: {},
      truncate: true
    })
  })

  describe('add()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const savedAccount = await sut.add(addAccountParams)
      expect(savedAccount).toBeTruthy()
      expect(savedAccount.id).toBeTruthy()
      expect(savedAccount.name).toBe(addAccountParams.name)
      expect(savedAccount.email).toBe(addAccountParams.email)
    })
  })

  describe('updateResetPasswordToken()', () => {
    test('Should update the account resetPasswordToken on success', async () => {
      const sut = makeSut()
      const mockAccount = mockAddAccount()
      await accountDb.create(mockAccount)
      const fakeAccount = await accountDb.findOne({ where: { id: mockAccount.id } })
      expect(fakeAccount.resetPasswordToken).toBeFalsy()
      expect(fakeAccount.resetPasswordExpires).toBeFalsy()
      const resetPasswordToken = faker.datatype.uuid()
      await sut.updateResetPasswordToken(fakeAccount.id, resetPasswordToken)
      const account = await accountDb.findOne({ where: { id: mockAccount.id } })
      expect(account).toBeTruthy()
      expect(account.resetPasswordToken).toBe(resetPasswordToken)
      expect(account.resetPasswordExpires).toBeTruthy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on success', async () => {
      const sut = makeSut()
      const mockAccount = mockAddAccount()
      await accountDb.create(mockAccount)
      const fakeAccount = await accountDb.findOne({ where: { id: mockAccount.id } })
      expect(fakeAccount.token).toBeFalsy()
      const accessToken = faker.datatype.uuid()
      await sut.updateAccessToken(fakeAccount.id, accessToken)
      const account = await accountDb.findOne({ where: { id: mockAccount.id } })
      expect(account).toBeTruthy()
      expect(account.token).toBe(accessToken)
    })
  })
})
