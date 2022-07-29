import { faker } from '@faker-js/faker'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /api\/signup/
const mockEmailInUseError = (): void => Http.mockForbiddenError(path, 'POST')

const mockSuccess = (): void => {
  Http.mockOk(path, 'POST', 'account', 'signUpRequest')
}

const populateFields = (): void => {
  cy.getByTestId('name').type(faker.random.alphaNumeric(7))
  cy.getByTestId('email').type(faker.internet.email())
  const password = faker.random.alphaNumeric(7)
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('name-error').should('be.empty')
    cy.getByTestId('email-error').should('be.empty')
    cy.getByTestId('password-error').should('be.empty')
    cy.getByTestId('passwordConfirmation-error').should('be.empty')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('status-wrap').should('not.have.descendants')
  })

  it('Should reset state on page load', () => {
    cy.getByTestId('name').type(faker.name.findName())
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('login-link').click()
    cy.getByTestId('signup-link').click()
    cy.getByTestId('name').should('be.empty')
    cy.getByTestId('name-error').should('be.empty')
    cy.getByTestId('email').should('be.empty')
    cy.getByTestId('email-error').should('be.empty')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(3))
    cy.getByTestId('name-error').should('contain.text', 'Valor inválido')
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('email-error').should('contain.text', 'Endereço de email inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-error').should('contain.text', 'Valor inválido')
    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(4))
    cy.getByTestId('passwordConfirmation-error').should('contain.text', 'Valor inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('status-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').type(faker.internet.email())
    cy.getByTestId('name-error').should('be.empty')
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-error').should('be.empty')
    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').type(password)
    cy.getByTestId('password-error').should('be.empty')
    cy.getByTestId('passwordConfirmation').type(password)
    cy.getByTestId('passwordConfirmation-error').should('be.empty')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('status-wrap').should('not.have.descendants')
  })

  it('Should present UnexpectedError on 400', () => {
    Http.mockUnexpectedError(path, 'POST', 400)
    simulateValidSubmit()
    cy.getByTestId('form-error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    Helper.testUrl('/signup')
  })

  it('Should present EmailInUseError on 403', () => {
    mockEmailInUseError()
    simulateValidSubmit()
    cy.getByTestId('form-error').should('contain.text', 'Esse e-mail já está em uso')
    Helper.testUrl('/signup')
  })

  it('Should present UnexpectedError on 404', () => {
    Http.mockUnexpectedError(path, 'POST', 404)
    simulateValidSubmit()
    cy.getByTestId('form-error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    Helper.testUrl('/signup')
  })

  it('Should present UnexpectedError on 500', () => {
    Http.mockUnexpectedError(path, 'POST', 500)
    simulateValidSubmit()
    cy.getByTestId('form-error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    Helper.testUrl('/signup')
  })

  it('Should store account on localStorage if valid credentials are provided', () => {
    mockSuccess()
    simulateValidSubmit()
    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })

  it('Should prevent multiple submits', () => {
    mockSuccess()
    populateFields()
    cy.getByTestId('submit').dblclick()
    cy.wait('@signUpRequest')
    cy.get('@signUpRequest.all').should('have.length', 1)
  })
})
