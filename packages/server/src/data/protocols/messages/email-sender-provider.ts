export interface EmailSenderProvider {
  send: (to: string, subject: string, message: string) => Promise<void>
}
