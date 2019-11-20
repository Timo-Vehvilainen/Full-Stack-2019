describe('Blog ', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username:'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blog-App')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('Log in')
        .click()
      cy.get('#username')
        .type('mluukkai')
      cy.get('#password')
        .type('salainen')
      cy.contains('Log in')
        .click()
    })

    it('name of the user is shown', function() {
      cy.contains('Logged in as Matti Luukkainen')
    })

    it('a new Blog can be created and removed', function() {
      cy.contains('Create new blog')
        .click()
      cy.get('#title')
        .type('a Testy Blog')
      cy.get('#author')
        .type('Cypress')
      cy.get('#url')
        .type('testing address')
      cy.get('#createNewButton')
        .click()
      cy.contains('a Testy Blog(0 likes)')
        .click('left')
      cy.contains('Cypress: a Testy Blog')
      cy.contains('added by Matti Luukkainen')
      cy.contains('Remove')
        .click()
      cy.get('a Testy Blog').should('not.exist')
    })

    it('logging out', function () {
      cy.contains('Logged in as')
      cy.contains('Log out')
        .click()
      cy.contains('Logged in as').should('not.exist')
    })
  })

  describe('when a blog has been created', function() {
    beforeEach(function() {
      cy.contains('Log in')
        .click()
      cy.get('#username')
        .type('mluukkai')
      cy.get('#password')
        .type('salainen')
      cy.contains('Log in')
        .click()
      cy.contains('Create new blog')
        .click()
      cy.get('#title')
        .type('a Testy Blog')
      cy.get('#author')
        .type('Cypress')
      cy.get('#url')
        .type('testing address')
      cy.get('#createNewButton')
        .click()
    })

    it('a comment can be created on a blog', function() {
      cy.contains('a Testy Blog(0 likes)')
        .click('left')
      cy.get('#comment')
        .type('This is an awesome comment!')
      cy.contains('Add Comment')
        .click()
      cy.contains('This is an awesome comment!')
    })

    it('a blog can be liked and the amount of likes updates', function() {
      cy.contains('a Testy Blog(0 likes)')
        .click('left')
      cy.get('#likebutton')
        .click()
      cy.contains('1 like')
      cy.get('#likebutton')
        .click()
      cy.contains('2 likes')
      cy.contains('blogs')
        .click()
      cy.contains('a Testy Blog(2 likes)')
    })

    it('a user can be viewed', function() {
      cy.contains('users')
        .click()
      cy.contains('1')
      cy.get('#mluukkai')
        .click()
      cy.contains('Added blogs')
      cy.contains('a Testy Blog')
    })
  })
})