import { PasswordReset } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { ValidationInput } from '@monorepo/validation'

export class PasswordResetController implements Controller {
  constructor(
    private readonly passwordReset: PasswordReset,
    private readonly validation: ValidationInput
  ) {}

  async handle(request: PasswordResetController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validateInput(request)
      if (error) {
        return badRequest(error)
      }

      await this.passwordReset.reset(request)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace PasswordResetController {
  export type Request = {
    accountId: string
    resetToken: string
    newPassword: string
  }
}
