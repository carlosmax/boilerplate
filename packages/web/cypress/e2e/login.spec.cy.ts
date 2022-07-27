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
})
