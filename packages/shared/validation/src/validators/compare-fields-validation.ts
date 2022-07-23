import { FieldValidation } from '@/src/protocols'
import { InvalidFieldError } from '@/src/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly field: string, private readonly fieldToCompare: string) {}

  validate(input: object): Error {
    return input[this.field] !== input[this.fieldToCompare] ? new InvalidFieldError() : null
  }
}
