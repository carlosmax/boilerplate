import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  UpdateAccessTokenRepository,
  CheckAccountByEmailRepository,
  UpdateResetPasswordTokenRepository,
  LoadAccountByIdRepository
} from '@/data/protocols'
import { Account } from '@/domain/models'
import { addHours } from '@/infra/helpers'

import { faker } from '@faker-js/faker'
import { mockAddAccount } from '../../domain/mocks'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result: Account = mockAddAccount()

  async add(params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: null,
    password: faker.internet.password()
  }

  async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email

    if (this.result) {
      this.result.email = email
    }
    return this.result
  }
}

export class LoadAccountByIdRepositorySpy implements LoadAccountByIdRepository {
  accountId: string

  result = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: null,
    phone: null,
    password: faker.internet.password(),
    resetPasswordToken: faker.datatype.uuid(),
    resetPasswordExpires: addHours(new Date(), 1)
  }

  async loadById(accountId: string): Promise<LoadAccountByIdRepository.Result> {
    this.accountId = accountId
    return this.result
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: string
  result = false

  async checkByEmail(email: string): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  token: string
  role: string
  result = {
    id: faker.datatype.uuid()
  }

  async loadByToken(token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    this.token = token
    this.role = role
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken(id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}

export class UpdateResetPasswordTokenRepositorySpy implements UpdateResetPasswordTokenRepository {
  id: string
  token: string

  async updateResetPasswordToken(id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}
