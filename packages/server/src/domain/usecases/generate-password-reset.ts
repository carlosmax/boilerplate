export interface GeneratePasswordReset {
  generate: (params: GeneratePasswordReset.Params) => Promise<void>
}

export namespace GeneratePasswordReset {
  export type Params = {
    email: string
  }
}
