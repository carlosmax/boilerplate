import { ValidationComposite, ValidationBuilder as Builder } from '@monorepo/validation'

export const makePasswordResetValidation = (): ValidationComposite =>
  ValidationComposite.build([...Builder.field('password').required().min(5).build()])
