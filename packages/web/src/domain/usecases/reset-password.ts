export interface ResetPassword {
  reset: (params: ResetPassword.Params) => Promise<void>
}

export namespace ResetPassword {
  export type Params = {
    password: string
  }
}
