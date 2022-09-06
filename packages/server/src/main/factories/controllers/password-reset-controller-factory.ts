import {
  makePasswordReset,
  makeLogControllerDecorator,
  makePasswordResetValidation
} from '@/main/factories'

import { PasswordResetController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makePasswordResetController = (): Controller => {
  const controller = new PasswordResetController(makePasswordReset(), makePasswordResetValidation())
  return makeLogControllerDecorator(controller)
}
