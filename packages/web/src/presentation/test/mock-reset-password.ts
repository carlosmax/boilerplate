import { ResetPassword } from '@/domain/usecases'

export class ResetPasswordSpy implements ResetPassword {
  params: any
  callsCount: number = 0

  async reset(params: ResetPassword.Params): Promise<void> {
    this.params = params
    this.callsCount++
    return Promise.resolve()
  }
}
