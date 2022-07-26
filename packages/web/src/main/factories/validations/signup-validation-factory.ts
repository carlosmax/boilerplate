import { ValidationComposite, ValidationBuilder as Builder } from '@monorepo/validation'

export const makeSignupValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(5).build(),
    ...Builder.field('passwordConfirmation').required().sameAs('password').build()
  ])
