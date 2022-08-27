import { ValidationComposite, ValidationBuilder as Builder } from '@monorepo/validation'

export const makeForgetPasswordValidation = (): ValidationComposite =>
  ValidationComposite.build([...Builder.field('email').required().email().build()])
