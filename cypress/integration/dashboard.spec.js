describe('Navigation', () => {
    it('should login in to dashboard', () => {
        cy.visit('http://localhost:3000/login')
        cy.contains('Login')
  
        //get google SignIn button
        cy.get('button').contains('Sign In with Google')
  
        //for testing logging in with google button
        // let google_button =  cy.get('button').contains('Sign In with Google')
        // google_button.click()
  
        //logging in with email and password
        cy.get('input[id=email]').type('godwillonyewuchi@yahoo.com')
        cy.get('input[id=password]').type('comfort9')
        cy.get('button[id=button]').click()
  
        //redirect to dashboard and testing dashboard
        cy.contains('Welcome to your dashboard')

        
        //testing the signout button
        cy.get('button').contains('SignOut').click()
        cy.contains('Login')
  
    })
  })