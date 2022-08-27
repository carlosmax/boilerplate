import { ValidationBuilder, ValidationComposite } from '@monorepo/validation'
import { makeForgetPasswordValidation } from './forget-password-validation-factory'

describe('ForgetPasswordValidationFactory', () => {
  test('Should make ValidationComposite with correct validation', () => {
    const composite = makeForgetPasswordValidation()

    expect(composite).toEqual(
      ValidationComposite.build([...ValidationBuilder.field('email').required().email().build()])
    )
  })
})
