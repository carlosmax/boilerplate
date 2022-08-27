import { faker } from '@faker-js/faker'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /api\/request-reset-password/

const mockSuccess = (): void => {
  Http.mockOk(path, 'POST', null, 'ResetPasswordRequest')
}

const populateFields = (): void => {
  cy.getByTestId('email').type(faker.internet.email())
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('ForgotPassword', () => {
  beforeEach(() => {
    cy.visit('forgot-password')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('be.empty')
    cy.getByTestId('email-error').should('not.exist')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('form-error').should('not.exist')
  })

  it('Should reset state on page load', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('login-link').click()
    cy.getByTestId('forgot-password-link').click()
    cy.getByTestId('email').should('be.empty')
    cy.getByTestId('email-error').should('not.exist')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('email-error').should('contain.text', 'Endereço de email inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('form-error').should('not.exist')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-error').should('not.exist')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('form-error').should('not.exist')
  })

  it('Should present UnexpectedError on 400', () => {
    Http.mockUnexpectedError(path, 'POST', 400)
    simulateValidSubmit()
    cy.getByTestId('form-error').should(
      'contain.text',
      'Ocorreu um erro inesperado. Tente novamente em alguns instantes.'
    )
    Helper.testUrl('/forgot-password')
  })

  it('Should present UnexpectedError on 404', () => {
    Http.mockUnexpectedError(path, 'POST', 404)
    simulateValidSubmit()
    cy.getByTestId('form-error').should(
      'contain.text',
      'Ocorreu um erro inesperado. Tente novamente em alguns instantes.'
    )
    Helper.testUrl('/forgot-password')
  })

  it('Should present UnexpectedError on 500', () => {
    Http.mockUnexpectedError(path, 'POST', 500)
    simulateValidSubmit()
    cy.getByTestId('form-error').should(
      'contain.text',
      'Ocorreu um erro inesperado. Tente novamente em alguns instantes.'
    )
    Helper.testUrl('/forgot-password')
  })

  it('Should prevent multiple submits', () => {
    mockSuccess()
    populateFields()
    cy.getByTestId('submit').dblclick()
    cy.wait('@ResetPasswordRequest')
    cy.get('@ResetPasswordRequest.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    mockSuccess()
    cy.getByTestId('email').focus().type(faker.random.words()).type('{enter}')
    cy.get('@ResetPasswordRequest.all').should('have.length', 0)
  })
})
