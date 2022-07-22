import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { ValidationSpy, AuthenticationSpy } from '@/presentation/test'

import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  errorMessage: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.errorMessage
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(<Login validation={validationSpy} authentication={authenticationSpy} />)
  return {
    sut,
    validationSpy,
    authenticationSpy
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
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual(email)
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual(password)
  })

  test('Should show email error if Validation fails', () => {
    const errorMessage = faker.random.words()
    const { sut } = makeSut({ errorMessage })
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailError = sut.getByTestId('email-error')
    expect(emailError.textContent).toBe(errorMessage)
  })

  test('Should show password error if Validation fails', () => {
    const errorMessage = faker.random.words()
    const { sut } = makeSut({ errorMessage })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordError = sut.getByTestId('password-error')
    expect(passwordError.textContent).toBe(errorMessage)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailError = sut.getByTestId('email-error')
    expect(emailError.textContent).toBe('')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordError = sut.getByTestId('password-error')
    expect(passwordError.textContent).toBe('')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })
    const submitButton = sut.getByTestId('submit')
    fireEvent.click(submitButton)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
