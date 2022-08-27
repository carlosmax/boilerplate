import { RequestResetPassword } from '@/domain/usecases'

export class RequestResetPasswordSpy implements RequestResetPassword {
  email: any
  callsCount: number = 0

  async reset(email: string): Promise<void> {
    this.email = email
    this.callsCount++
    return Promise.resolve()
  }
}
