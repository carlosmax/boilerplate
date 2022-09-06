export interface LoadAccountByIdRepository {
  loadById: (accountId: string) => Promise<LoadAccountByIdRepository.Result>
}

export namespace LoadAccountByIdRepository {
  export type Result = {
    id: string
    name: string
    email: string
    phone: string
    password: string
    resetPasswordToken: string
    resetPasswordExpires: Date
  }
}
