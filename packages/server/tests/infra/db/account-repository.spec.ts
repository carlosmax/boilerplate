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

  describe('loadByEmail()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountDb.create(addAccountParams)
      const account = await sut.loadByEmail(addAccountParams.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.password).toBe(addAccountParams.password)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail(faker.internet.email())
      expect(account).toBeFalsy()
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if email is valid', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountDb.create(addAccountParams)
      const exists = await sut.checkByEmail(addAccountParams.email)
      expect(exists).toBe(true)
    })

    test('Should return false if email is not valid', async () => {
      const sut = makeSut()
      const exists = await sut.checkByEmail(faker.internet.email())
      expect(exists).toBe(false)
    })
  })

  describe('loadByToken()', () => {
    let name = faker.name.findName()
    let email = faker.internet.email()
    let password = faker.internet.password()
    let token = faker.datatype.uuid()

    beforeEach(() => {
      name = faker.name.findName()
      email = faker.internet.email()
      password = faker.internet.password()
      token = faker.datatype.uuid()
    })

    test('Should return an account on loadByToken without role', async () => {
      const sut = makeSut()
      await accountDb.create({
        name,
        email,
        password,
        token
      })
      const account = await sut.loadByToken(token)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      await accountDb.create({
        name,
        email,
        password,
        token,
        role: 'admin'
      })
      const account = await sut.loadByToken(token, 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      await accountDb.create({
        name,
        email,
        password,
        token
      })
      const account = await sut.loadByToken(token, 'admin')
      expect(account).toBeFalsy()
    })

    test('Should return an account on loadByToken with if user is admin', async () => {
      const sut = makeSut()
      await accountDb.create({
        name,
        email,
        password,
        token,
        role: 'admin'
      })
      const account = await sut.loadByToken(token)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken(token)
      expect(account).toBeFalsy()
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
