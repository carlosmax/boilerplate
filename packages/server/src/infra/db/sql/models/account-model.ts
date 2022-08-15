import { BuildOptions, Model } from 'sequelize'
import { Account } from '@/domain/models'

export interface AccountModel extends Model<Account>, Account {}

export type AccountDb = typeof Model &
  (new (values?: object, options?: BuildOptions) => AccountModel)
