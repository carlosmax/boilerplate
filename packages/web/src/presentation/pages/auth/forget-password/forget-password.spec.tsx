import { fireEvent, cleanup, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'

import {
  ValidationSpy,
  renderWithHistory,
  Helper,
  RequestResetPasswordSpy
} from '@/presentation/test'

import ForgetPassword from './forget-password'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  validationSpy: ValidationSpy
  requestResetPasswordSpy: RequestResetPasswordSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/forgot-password'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError
  const requestResetPasswordSpy = new RequestResetPasswordSpy()
  renderWithHistory({
    history,
    Page: () =>
      ForgetPassword({ validation: validationSpy, requestResetPassword: requestResetPasswordSpy })
  })
  return {
    validationSpy,
    requestResetPasswordSpy
  }
}

const simulateValidSubmit = async (email = faker.internet.email()): Promise<void> => {
  Helper.populateField('email', email)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('ForgetPassword Component', () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

  test('Should start with initial state', () => {
    makeSut()
    const formError = screen.queryByTestId('form-error')
    const emailError = screen.queryByTestId('email-error')

    expect(formError).toBeNull()
    expect(emailError).toBeNull()
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('email')
    Helper.testElementText('email-error', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    const emailError = screen.queryByTestId('email-error')
    expect(emailError).toBeNull()
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testButtonIsDisabled('submit', false)
  })

  test('Should not call RequestResetPassword if form is invalid', () => {
    const validationError = faker.random.words()
    const { requestResetPasswordSpy } = makeSut({ validationError })
    Helper.populateField('email', faker.internet.email())
    fireEvent.submit(screen.getByTestId('form'))
    expect(requestResetPasswordSpy.callsCount).toBe(0)
  })

  test('Should present error if RequestResetPassword fails', async () => {
    const { requestResetPasswordSpy } = makeSut()
    const error = new UnexpectedError()

    jest.spyOn(requestResetPasswordSpy, 'reset').mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit()
    await screen.findByTestId('form-error')

    Helper.testElementText('form-error', error.message)
  })

  test('Should go to login page', async () => {
    makeSut()
    const loginLink = screen.getByTestId('login-link')
    fireEvent.click(loginLink)
    expect(history.location.pathname).toBe('/login')
  })
})
