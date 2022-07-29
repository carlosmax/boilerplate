import { faker } from '@faker-js/faker'

import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /api\/login/

const mockSuccess = (): void => {
  cy.intercept('POST', /login/, {
    statusCode: 200,
    body: {
      accessToken: faker.random.alphaNumeric(64)
    }
  })
}

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email-error').should('be.empty')
    cy.getByTestId('password-error').should('be.empty')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('status-wrap').should('not.have.descendants')
  })

  it('Should reset state on page load', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('signup-link').click()
    cy.getByTestId('login-link').click()
    cy.getByTestId('email').should('be.empty')
    cy.getByTestId('email-error').should('be.empty')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('email-error').should('contain.text', 'Endereço de email inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-error').should('contain.text', 'Valor inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('status-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-error').should('be.empty')
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-error').should('be.empty')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('status-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError(path)
    simulateValidSubmit()
    cy.getByTestId('form-error').should('contain.text', 'Credenciais inválidas')
    Helper.testUrl('/login')
  })

  it('Should present UnexpectedError on 400', () => {
    Http.mockUnexpectedError(path, 'POST', 400)
    simulateValidSubmit()
    cy.getByTestId('form-error').should(
      'contain.text',
      'Ocorreu um erro inesperado. Tente novamente em alguns instantes.'
    )
    Helper.testUrl('/login')
  })

  it('Should present UnexpectedError on 404', () => {
    Http.mockUnexpectedError(path, 'POST', 404)
    simulateValidSubmit()
    cy.getByTestId('form-error').should(
      'contain.text',
      'Ocorreu um erro inesperado. Tente novamente em alguns instantes.'
    )
    Helper.testUrl('/login')
  })

  it('Should present UnexpectedError on 500', () => {
    Http.mockUnexpectedError(path, 'POST', 500)
    simulateValidSubmit()
    cy.getByTestId('form-error').should(
      'contain.text',
      'Ocorreu um erro inesperado. Tente novamente em alguns instantes.'
    )
    Helper.testUrl('/login')
  })

  it('Should store account on localStorage if valid credentials are provided', () => {
    mockSuccess()
    simulateValidSubmit()
    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })
})
