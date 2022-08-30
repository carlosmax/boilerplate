import { ValidationComposite, ValidationBuilder } from '@monorepo/validation'
import { makeGeneratePasswordResetValidation } from '@/main/factories/validations'

describe('GeneratePasswordResetValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeGeneratePasswordResetValidation()

    expect(composite).toEqual(
      ValidationComposite.build([...ValidationBuilder.field('email').required().email().build()])
    )
  })
})
