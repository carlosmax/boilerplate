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
})
