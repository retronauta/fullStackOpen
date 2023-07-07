describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = { name: 'Limbert', username: 'lino', password: 'qwerty' }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('login form is show', function () {
    cy.contains('Log in to application', { matchCase: true })
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('.usernameField').type('lino')
      cy.get('.passwordField').type('qwerty')

      cy.contains('login').click()
      cy.contains('Limbert logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('.usernameField').type('lino')
      cy.get('.passwordField').type('wrong')

      cy.contains('login').click()

      cy.get('.notification').should('contain', 'wrong username or password')
      cy.contains('Limbert logged in').should('not.exist')
    })
  })
})
