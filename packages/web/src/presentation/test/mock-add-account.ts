import { AccountModel } from '@/domain/models'
import { AddAccount } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test'

export class AddAccountSpy implements AddAccount {
  params: any
  account: AccountModel
  callsCount: number = 0

  constructor() {
    this.account = mockAccountModel()
  }

  async add(params: AddAccount.Params): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.account)
  }
}
