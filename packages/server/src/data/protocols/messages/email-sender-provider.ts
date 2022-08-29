export interface EmailSenderProvider<T> {
  send: (params: EmailSenderProvider.Params<T>) => Promise<void>
}

export namespace EmailSenderProvider {
  export type Params<T> = {
    to: string
    subject: string
    template: T
  }
}
