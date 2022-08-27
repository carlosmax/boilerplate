export interface GeneratePasswordReset {
  generate: (params: GeneratePasswordReset.Params) => Promise<boolean>
}

export namespace GeneratePasswordReset {
  export type Params = {
    email: string
  }
}
