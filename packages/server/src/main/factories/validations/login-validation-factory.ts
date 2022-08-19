import { ValidationComposite, ValidationBuilder as Builder } from '@monorepo/validation'

export const makeLoginValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().build()
  ])
