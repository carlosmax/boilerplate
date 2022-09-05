export interface PasswordReset {
  reset: (params: PasswordReset.Params) => Promise<boolean>
}

export namespace PasswordReset {
  export type Params = {
    accountId: string
    resetToken: string
    newPassword: string
  }
}
