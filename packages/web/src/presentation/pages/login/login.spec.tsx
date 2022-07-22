import React from 'react'
import { render, RenderResult, fireEvent, cleanup, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { ValidationSpy, AuthenticationSpy } from '@/presentation/test'

import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(<Login validation={validationSpy} authentication={authenticationSpy} />)
  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
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
    const { validationSpy } = makeSut()
    const email = faker.internet.email()
    populateField('email', email)
    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual(email)
  })

  test('Should call Validation with correct password', () => {
    const { validationSpy } = makeSut()
    const password = faker.internet.password()
    populateField('password', password)
    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual(password)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField('email')
    const emailError = sut.getByTestId('email-error')
    expect(emailError.textContent).toBe(validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField('password')
    const passwordError = sut.getByTestId('password-error')
    expect(passwordError.textContent).toBe(validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateField('email')
    const emailError = sut.getByTestId('email-error')
    expect(emailError.textContent).toBe('')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateField('password')
    const passwordError = sut.getByTestId('password-error')
    expect(passwordError.textContent).toBe('')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateField('email')
    populateField('password')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    populateField('email', email)
    const password = faker.internet.password()
    populateField('password', password)
    const submitButton = sut.getByTestId('submit')
    fireEvent.click(submitButton)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    populateField('email', faker.internet.email())
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })
})
