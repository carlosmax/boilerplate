import { Op } from 'sequelize'
import { addHours } from '@/infra/helpers'
import { AddAccount } from '@/domain/usecases'
import { AccountDbFactory } from '../factories'
import { AccountDb, AccountModel } from '../models'

import {
  LoadAccountByIdRepository,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  UpdateAccessTokenRepository,
  AddAccountRepository,
  CheckAccountByEmailRepository,
  UpdateResetPasswordTokenRepository,
  UpdatePasswordRepository
} from '@/data/protocols'

export class SqlAccountRepository
  implements
    LoadAccountByIdRepository,
    LoadAccountByTokenRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    UpdateResetPasswordTokenRepository,
    AddAccountRepository,
    CheckAccountByEmailRepository,
    UpdatePasswordRepository
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
      where: { token, role: { [Op.or]: [role || null, 'admin'] } }
    })
  }

  async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
    return await this.accountDb.findOne({ where: { email } })
  }

  async add(data: AddAccount.Params): Promise<AccountModel> {
    return await this.accountDb.create(data)
  }

  async checkByEmail(email: string): Promise<boolean> {
    const account = await this.loadByEmail(email)
    return account != null
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    await this.accountDb.update({ token }, { where: { id } })
  }

  async updateResetPasswordToken(id: string, resetPasswordToken: string): Promise<void> {
    const resetPasswordExpires = addHours(new Date(), 1)
    await this.accountDb.update({ resetPasswordToken, resetPasswordExpires }, { where: { id } })
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await this.accountDb.update(
      { password, resetPasswordToken: null, resetPasswordExpires: null },
      { where: { id } }
    )
  }
}
