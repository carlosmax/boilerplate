import {
  makeGeneratePasswordReset,
  makeGeneratePasswordResetValidation,
  makeLogControllerDecorator
} from '@/main/factories'
import { GeneratePasswordResetController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeGeneratePasswordResetController = (): Controller => {
  const controller = new GeneratePasswordResetController(
    makeGeneratePasswordReset(),
    makeGeneratePasswordResetValidation()
  )
  return makeLogControllerDecorator(controller)
}
