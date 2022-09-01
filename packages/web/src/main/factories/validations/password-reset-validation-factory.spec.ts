import { ValidationBuilder, ValidationComposite } from '@monorepo/validation'
import { makePasswordResetValidation } from './password-reset-validation-factory'

describe('PasswordResetValidationFactory', () => {
  test('Should make ValidationComposite with correct validation', () => {
    const composite = makePasswordResetValidation()

    expect(composite).toEqual(
      ValidationComposite.build([...ValidationBuilder.field('password').required().min(5).build()])
    )
  })
})
