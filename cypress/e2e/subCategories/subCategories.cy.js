describe('Can open site', () => {
  describe('Test if there is a span with text "Electronics"', () => {
    it('should find the span with text "Electronics"', () => {
      // Visit the page where the span should be present
      cy.visit('http://localhost:3000/products/electronics/computers')

      // Use cy.contains() to find the span element with text "Electronics"
      cy.contains('span', 'computers').should('be.visible')
    })
  })
})
