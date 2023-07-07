describe('Blog app', function () {
  beforeEach(function () {
    // cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    // const user = { name: 'Limbert', username: 'lino', password: 'qwerty' }
    // cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    // cy.visit('')

    cy.resetDb()

    cy.signUser({ name: 'admin', username: 'admin', password: 'qwerty' })
    cy.signUser({ name: 'Limbert', username: 'lino', password: 'qwerty' })
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

  describe('When logged in', function () {
    beforeEach(function () {
      // cy.get('.usernameField').type('lino')
      // cy.get('.passwordField').type('qwerty')
      // cy.contains('login').click()

      cy.login({ username: 'lino', password: 'qwerty' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('test blog post')
      cy.get('#author').type('me')
      cy.get('#url').type('http://www.freecodecamp.com')
      cy.get('#create-button').click()

      cy.contains('test blog post')
    })

    describe('blog post exist', function () {
      beforeEach(function () {
        cy.createPost({
          title: 'test post',
          author: 'me',
          url: 'www.freecodecamp.com',
        })
      })

      it('Users can likes a blog', function () {
        cy.contains('view').click()
        cy.get('.likes').should('contain', '0')
        cy.contains('like').click()
        cy.get('.likes').should('contain', '1')
      })

      it('user who created a blog can delete it', function () {
        cy.contains('view').click()
        cy.contains('test post')
        cy.contains('remove').click()
        cy.contains('test post').should('not.exist')
      })

      it.only('only the creator can see the remove button of a blog', function () {
        cy.contains('view').click()
        cy.contains('remove')
        cy.contains('logout').click()
        cy.login({ username: 'admin', password: 'qwerty' })
        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })
    })
  })
})
