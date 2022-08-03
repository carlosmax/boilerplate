import { ValidationInput } from '@monorepo/validation'

export class ValidationSpy implements ValidationInput {
  error: Error = null
  input: any

  validateInput(input: any): Error {
    this.input = input
    return this.error
  }
}
