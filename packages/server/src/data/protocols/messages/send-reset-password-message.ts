export interface SendResetPasswordMessage {
  sendResetPassword: (userId: string, resetToken: string) => Promise<void>
}
