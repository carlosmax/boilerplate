import { Validation } from '@monorepo/validation'

export class ValidationSpy implements Validation {
  fieldName: string
  fieldValue: object
  errorMessage: string

  validate(fieldName: string, input: object): string {
    this.fieldName = fieldName
    this.fieldValue = input
    return this.errorMessage
  }
}
