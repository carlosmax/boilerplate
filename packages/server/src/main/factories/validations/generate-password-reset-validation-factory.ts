import { ValidationComposite, ValidationBuilder as Builder } from '@monorepo/validation'

export const makeGeneratePasswordResetValidation = (): ValidationComposite =>
  ValidationComposite.build([...Builder.field('email').required().email().build()])
