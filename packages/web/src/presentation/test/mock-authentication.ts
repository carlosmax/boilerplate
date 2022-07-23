import { AccountModel } from '@/domain/models'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test'

export class AuthenticationSpy implements Authentication {
  params: any
  account: AccountModel
  callsCount: number = 0

  constructor() {
    this.account = mockAccountModel()
  }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.account)
  }
}
