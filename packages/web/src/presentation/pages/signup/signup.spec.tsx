import { fireEvent, cleanup, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { faker } from '@faker-js/faker'
import '@testing-library/jest-dom'
import 'jest-localstorage-mock'

import Signup from './signup'
import { ValidationSpy, AddAccountSpy, renderWithHistory, Helper } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  validationSpy: ValidationSpy
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => Signup({ validation: validationSpy, addAccount: addAccountSpy })
  })
  return {
    validationSpy,
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Signup Component', () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

  test('Should start with initial state', () => {
    makeSut()
    const statusWrap = screen.getByTestId('status-wrap')
    expect(statusWrap.childElementCount).toBe(0)
    // expect(screen.getByTestId('submit')).toBeDisabled()
    Helper.testElementText('name-error', '')
    Helper.testElementText('email-error', '')
    Helper.testElementText('password-error', '')
    Helper.testElementText('passwordConfirmation-error', '')
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('name')
    Helper.testElementText('name-error', validationError)
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

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('passwordConfirmation')
    Helper.testElementText('passwordConfirmation-error', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('name')
    Helper.testElementText('name-error', '')
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testElementText('email-error', '')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testElementText('password-error', '')
  })

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('passwordConfirmation')
    Helper.testElementText('passwordConfirmation-error', '')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    Helper.testButtonIsDisabled('submit', false)
  })

  // test('Should call AddAccount with correct values', async () => {
  //   const { addAccountSpy } = makeSut()
  //   const email = faker.internet.email()
  //   const password = faker.internet.password()

  //   await simulateValidSubmit(email, password)

  //   expect(addAccountSpy.params).toEqual({
  //     email,
  //     password
  //   })
  // })

  test('Should not call AddAccount if form is invalid', () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    Helper.populateField('email', faker.internet.email())
    fireEvent.submit(screen.getByTestId('form'))
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new InvalidCredentialsError()

    jest.spyOn(addAccountSpy, 'add').mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit()
    await screen.findByTestId('form-error')

    Helper.testElementText('status-wrap', error.message)
  })

  // test('Should call UpdateCurrentAccount on success', async () => {
  //   const { addAccountSpy, setCurrentAccountMock } = makeSut()

  //   await simulateValidSubmit()

  //   expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
  //   expect(history.location.pathname).toBe('/')
  // })

  test('Should go to signin page', async () => {
    makeSut()
    const signup = screen.getByTestId('login-link')
    fireEvent.click(signup)
    expect(history.location.pathname).toBe('/login')
  })
})
