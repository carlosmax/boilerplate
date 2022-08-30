import { GeneratePasswordReset } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, serverError } from '@/presentation/helpers'

export class GeneratePasswordResetController implements Controller {
  constructor(private readonly generatePasswordReset: GeneratePasswordReset) {}

  async handle(request: GeneratePasswordResetController.Request): Promise<HttpResponse> {
    try {
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
