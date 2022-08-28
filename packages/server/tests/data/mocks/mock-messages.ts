import { SendResetPasswordMessage } from '@/data/protocols'

export class SendResetPasswordMessageSpy implements SendResetPasswordMessage {
  userId: string
  resetToken: string
  async sendResetPassword(userId: string, resetToken: string): Promise<void> {
    this.userId = userId
    this.resetToken = resetToken
  }
}
