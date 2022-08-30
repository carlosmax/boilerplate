import { GeneratePasswordReset } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class GeneratePasswordResetController implements Controller {
  constructor(private readonly generatePasswordReset: GeneratePasswordReset) {}

  async handle(request: GeneratePasswordResetController.Request): Promise<HttpResponse> {
    await this.generatePasswordReset.generate(request)
    return null
  }
}

export namespace GeneratePasswordResetController {
  export type Request = {
    email: string
  }
}
