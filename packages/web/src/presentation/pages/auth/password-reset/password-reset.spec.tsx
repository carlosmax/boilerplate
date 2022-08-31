import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'

import { ValidationSpy, renderWithHistory, Helper, ResetPasswordSpy } from '@/presentation/test'

import PasswordReset from './password-reset'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  validationSpy: ValidationSpy
  resetPasswordSpy: ResetPasswordSpy
}

type SutParams = {
  validationError: string
}

const urlParams = {
  accountId: faker.datatype.uuid(),
  resetToken: faker.random.alphaNumeric(32)
}

const initialUrl = `/password-reset/${urlParams.accountId}/${urlParams.resetToken}`

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    accountId: urlParams.accountId,
    resetToken: urlParams.resetToken
  }),
  useRouteMatch: () => ({ url: initialUrl })
}))

const history = createMemoryHistory({
  initialEntries: [initialUrl]
})

const makeSut = (params?: SutParams): SutTypes => {
  const resetPasswordSpy = new ResetPasswordSpy()
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError
  renderWithHistory({
    history,
    Page: () => PasswordReset({ validation: validationSpy, resetPassword: resetPasswordSpy })
  })
  return {
    validationSpy,
    resetPasswordSpy
  }
}

const simulateValidSubmit = async (password = faker.internet.password()): Promise<void> => {
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('PasswordReset Component', () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

  test('Should start with initial state', () => {
    makeSut()
    const formError = screen.queryByTestId('form-error')
    const passwordError = screen.queryByTestId('password-error')
    const passwordConfirmationError = screen.queryByTestId('passwordConfirmation-error')
    expect(formError).toBeNull()
    expect(passwordError).toBeNull()
    expect(passwordConfirmationError).toBeNull()
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    Helper.testElementText('password-error', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('passwordConfirmation')
    Helper.testElementText('passwordConfirmation-error', validationError)
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    const passwordError = screen.queryByTestId('password-error')
    expect(passwordError).toBeNull()
  })

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('passwordConfirmation')
    const passwordConfirmationError = screen.queryByTestId('passwordConfirmation-error')
    expect(passwordConfirmationError).toBeNull()
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    Helper.testButtonIsDisabled('submit', false)
  })

  test('Should not call ResetPassword if form is invalid', () => {
    const validationError = faker.random.words()
    const { resetPasswordSpy } = makeSut({ validationError })
    Helper.populateField('password', faker.random.alphaNumeric(5))
    fireEvent.submit(screen.getByTestId('form'))
    expect(resetPasswordSpy.callsCount).toBe(0)
  })

  test('Should call ResetPassword with correct values', async () => {
    const { resetPasswordSpy } = makeSut()
    const password = faker.internet.password()

    await simulateValidSubmit(password)

    expect(resetPasswordSpy.params).toEqual({
      accountId: urlParams.accountId,
      resetToken: urlParams.resetToken,
      password
    })
  })

  test('Should present error if ResetPassword fails', async () => {
    const { resetPasswordSpy } = makeSut()
    const error = new UnexpectedError()

    jest.spyOn(resetPasswordSpy, 'reset').mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit()
    await screen.findByTestId('form-error')

    Helper.testElementText('form-error', error.message)
  })

  test('Should redirect to login on success', async () => {
    makeSut()
    await simulateValidSubmit()
    await waitFor(() => expect(history.location.pathname).toBe('/login'))
  })
})
