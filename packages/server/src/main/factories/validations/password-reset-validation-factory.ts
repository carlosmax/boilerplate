import { ValidationComposite, ValidationBuilder as Builder } from '@monorepo/validation'

export const makePasswordResetValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.field('accountId').required().build(),
    ...Builder.field('resetToken').required().build(),
    ...Builder.field('newPassword').required().build()
  ])
