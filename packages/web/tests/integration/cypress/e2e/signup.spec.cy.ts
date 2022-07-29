import { faker } from '@faker-js/faker'

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
})
