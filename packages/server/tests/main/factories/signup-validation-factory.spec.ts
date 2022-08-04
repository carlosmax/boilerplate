import { makeSignUpValidation } from '@/main/factories'
import { ValidationComposite, ValidationBuilder } from '@monorepo/validation'

describe('SignUpValidation Factory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()

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
