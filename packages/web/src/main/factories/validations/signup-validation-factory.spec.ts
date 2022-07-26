import { makeSignupValidation } from './signup-validation-factory'
import { ValidationBuilder, ValidationComposite } from '@monorepo/validation'

describe('SignUpValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignupValidation()

    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('name').required().min(5).build(),
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build(),
        ...ValidationBuilder.field('passwordConfirmation').required().sameAs('password').build()
      ])
    )
  })
})
