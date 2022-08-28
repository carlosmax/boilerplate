export interface UpdateResetPasswordTokenRepository {
  updateResetPasswordToken: (id: string, token: string) => Promise<void>
}
