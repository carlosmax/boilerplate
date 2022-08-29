import { AddAccount, Authentication } from '@/domain/usecases'

import { faker } from '@faker-js/faker'
import { Account } from '../models'

export const mockAddAccount = (): Account => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.random.alphaNumeric(16),
  phone: null,
  token: null,
  resetPasswordToken: null,
  resetPasswordExpires: null,
  createdAt: null,
  updatedAt: null
})

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
