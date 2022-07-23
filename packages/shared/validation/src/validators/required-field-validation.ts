import { FieldValidation } from '@/src/protocols'
import { RequiredFieldError } from '@/src/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error {
    return input[this.field] ? null : new RequiredFieldError()
  }
}
