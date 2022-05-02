describe('Navigation', () => {
    it('should navigate to the landing page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
  
      // Find a link with an href attribute containing "get started" and click it
      cy.get('a[href*="register"]').contains('Get Started')

      let get_started = cy.get('a[href*="register"]').contains('Get Started')
      get_started.click()
      cy.contains('Register')
  
    }),

    it('should navigate to the register page', () => {
      // Start from the register page and check for text
      cy.visit('http://localhost:3000/register')
      cy.contains('Register')

      //get login link and click
      cy.get('a[href*="login"]').contains('LogIn')

      let login = cy.get('a[href*="login"]').contains('LogIn')
      login.click()
      //testing the login page
      cy.contains('Login')
  
    }),

    it('should navigate to the login page and login with google ', () => {
      // Start from the login page and check for text
      cy.visit('http://localhost:3000/login')
      cy.contains('Login')

      //get google SignIn button
      cy.get('button').contains('Sign In with Google')

      //for testing logging in with google button
      let google_button =  cy.get('button').contains('Sign In with Google')
      google_button.click()

      //logging in with email and password
      // cy.get('input[id=email]').type('godwillonyewuchi@yahoo.com')
      // cy.get('input[id=password]').type('comfort9')
      // cy.get('button[id=button]').click()

      //redirect to dashboard and testing dashboard
      cy.contains('Welcome to your dashboard')
    })


  })