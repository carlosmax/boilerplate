import {
  LoadAccountByIdRepository,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  UpdateAccessTokenRepository,
  AddAccountRepository,
  CheckAccountByEmailRepository
} from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'
import { AccountDbFactory } from '../factories'
import { AccountDb, AccountModel } from '../models'

export class SqlAccountRepository
  implements
    LoadAccountByIdRepository,
    LoadAccountByTokenRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    AddAccountRepository,
    CheckAccountByEmailRepository
{
  private readonly accountDb: AccountDb

  constructor() {
    this.accountDb = AccountDbFactory()
  }

  async loadById(id: string): Promise<LoadAccountByIdRepository.Result> {
    return await this.accountDb.findOne({
      where: { id }
    })
  }

  async loadByToken(token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    return await this.accountDb.findOne({
      where: { token }
    })
  }

  async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
    return await this.accountDb.findOne({ where: { email } })
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    await this.accountDb.update({ token }, { where: { id } })
  }

  async add(data: AddAccount.Params): Promise<AccountModel> {
    return await this.accountDb.create(data)
  }

  async checkByEmail(email: string): Promise<boolean> {
    const account = await this.loadByEmail(email)
    return account != null
  }
}
