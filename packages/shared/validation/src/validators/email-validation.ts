import { FieldValidation } from '@/src/protocols'
import { InvalidFieldError } from '@/src/errors'

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error {
    const emailRegex =
      // eslint-disable-next-line max-len
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return !input[this.field] || emailRegex.test(input[this.field]) ? null : new InvalidFieldError()
  }
}
