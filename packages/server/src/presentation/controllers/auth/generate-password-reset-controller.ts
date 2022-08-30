import { GeneratePasswordReset } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { ValidationInput } from '@monorepo/validation'

export class GeneratePasswordResetController implements Controller {
  constructor(
    private readonly generatePasswordReset: GeneratePasswordReset,
    private readonly validation: ValidationInput
  ) {}

  async handle(request: GeneratePasswordResetController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validateInput(request)
      if (error) {
        return badRequest(error)
      }

      await this.generatePasswordReset.generate(request)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GeneratePasswordResetController {
  export type Request = {
    email: string
  }
}
