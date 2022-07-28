import { faker } from '@faker-js/faker'

const baseUrl: string = Cypress.config().baseUrl

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

  it('Should present error if invalid credentials are provided', () => {
    cy.intercept('POST', /login/, {
      statusCode: 401,
      body: {
        error: faker.random.words()
      }
    })

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('form-error').should('not.be.empty')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.random.alphaNumeric(64)
      }
    })

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('form-error').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('account')))
  })
})
