import { AccountModel } from 'domain/models'

export interface Authentication {
  auth: (email: string, password: string) => Promise<AccountModel>
}
