import { Controller, HttpResponse } from '@/presentation/protocols'
import { badRequest, serverError, unauthorized, ok } from '@/presentation/helpers'
import { Authentication } from '@/domain/usecases'
import { ValidationInput } from '@monorepo/validation'

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: ValidationInput
  ) {}

  async handle(request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validateInput(request)
      if (error) {
        return badRequest(error)
      }
      const authenticationModel = await this.authentication.auth(request)
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
