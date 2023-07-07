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
})
