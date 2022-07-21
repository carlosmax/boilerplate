import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { Validation } from '@/presentation/protocols'

import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  input: object
  errorMessage: string

  validate(input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut } = makeSut()
    const statusWrap = sut.getByTestId('status-wrap')
    expect(statusWrap.childElementCount).toBe(0)
    const emailError = sut.getByTestId('email-error')
    expect(emailError.textContent).toBe('')
    const passwordError = sut.getByTestId('password-error')
    expect(passwordError.textContent).toBe('')
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.input).toEqual({ email: 'any_email' })
  })
})
