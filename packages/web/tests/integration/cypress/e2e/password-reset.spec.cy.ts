import { faker } from '@faker-js/faker'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /api\/password-reset/
const url = '/password-reset/239934/234398234sdf9242sdf923'

const mockSuccess = (): void => {
  Http.mockOk(path, 'POST', null, 'passwordResetRequest')
}

const populateFields = (): void => {
  const password = faker.random.alphaNumeric(7)
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('PasswordReset', () => {
  beforeEach(() => {
    cy.visit(url)
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('password-error').should('not.exist')
    cy.getByTestId('passwordConfirmation-error').should('not.exist')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('form-error').should('not.exist')
  })

  it('Should reset state on page load', () => {
    cy.getByTestId('password').type(faker.random.alphaNumeric(8))
    cy.visit(url)
    cy.getByTestId('password').should('be.empty')
    cy.getByTestId('password-error').should('not.exist')
    cy.getByTestId('passwordConfirmation').should('be.empty')
    cy.getByTestId('passwordConfirmation-error').should('not.exist')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-error').should('contain.text', 'Valor inválido')
    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(4))
    cy.getByTestId('passwordConfirmation-error').should('contain.text', 'Valor inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('form-error').should('not.exist')
  })

  it('Should present valid state if form is valid', () => {
    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').type(password)
    cy.getByTestId('password-error').should('not.exist')
    cy.getByTestId('passwordConfirmation').type(password)
    cy.getByTestId('passwordConfirmation-error').should('not.exist')
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
    Helper.testUrl(url)
  })

  it('Should present UnexpectedError on 404', () => {
    Http.mockUnexpectedError(path, 'POST', 404)
    simulateValidSubmit()
    cy.getByTestId('form-error').should(
      'contain.text',
      'Ocorreu um erro inesperado. Tente novamente em alguns instantes.'
    )
    Helper.testUrl(url)
  })

  it('Should present UnexpectedError on 500', () => {
    Http.mockUnexpectedError(path, 'POST', 500)
    simulateValidSubmit()
    cy.getByTestId('form-error').should(
      'contain.text',
      'Ocorreu um erro inesperado. Tente novamente em alguns instantes.'
    )
    Helper.testUrl(url)
  })

  it('Should prevent multiple submits', () => {
    mockSuccess()
    populateFields()
    cy.getByTestId('submit').dblclick()
    cy.wait('@passwordResetRequest')
    cy.get('@passwordResetRequest.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    mockSuccess()
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(8)).type('{enter}')
    cy.get('@passwordResetRequest.all').should('have.length', 0)
  })
})
