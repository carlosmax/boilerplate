import { AccountModel } from '@/domain/models'

export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}

export type AuthenticationParams = {
  email: string
  password: string
}
