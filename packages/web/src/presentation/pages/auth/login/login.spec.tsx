import { fireEvent, cleanup, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'

import Login from './login'
import { ValidationSpy, AuthenticationSpy, renderWithHistory, Helper } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => Login({ validation: validationSpy, authentication: authenticationSpy })
  })
  return {
    validationSpy,
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login Component', () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

  test('Should start with initial state', () => {
    makeSut()
    const formError = screen.queryByTestId('form-error')
    const emailError = screen.queryByTestId('email-error')
    const passwordError = screen.queryByTestId('password-error')
    expect(formError).toBeNull()
    expect(emailError).toBeNull()
    expect(passwordError).toBeNull()
    // Helper.testButtonIsDisabled('submit', true)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('email')
    Helper.testElementText('email-error', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    Helper.testElementText('password-error', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    const emailError = screen.queryByTestId('email-error')
    expect(emailError).toBeNull()
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    const passwordError = screen.queryByTestId('password-error')
    expect(passwordError).toBeNull()
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.testButtonIsDisabled('submit', false)
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    Helper.populateField('email', faker.internet.email())
    fireEvent.submit(screen.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()

    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit()
    await screen.findByTestId('form-error')

    Helper.testElementText('form-error', error.message)
  })

  test('Should call UpdateCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()

    await simulateValidSubmit()

    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signup page', async () => {
    makeSut()
    const signup = screen.getByTestId('signup-link')
    fireEvent.click(signup)
    expect(history.location.pathname).toBe('/signup')
  })
})
