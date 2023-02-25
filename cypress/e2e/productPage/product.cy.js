/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Can open product page', () => {
  describe('Test if there is a span with text "Electronics"', () => {
    it('should find the span with text "Electronics"', () => {
      cy.viewport(1920, 1080)
      // Visit the page where the span should be present
      cy.visit(
        'http://localhost:3000/products/electronics/gaming/14870e76-4d3d-4bce-9f4a-9b26ef0f80cd',
      )

      // Use cy.contains() to find the span element with text "Electronics"
      cy.get('div.ant-card-meta-description').should(
        'have.text',
        `About this item
      Go all digital with Xbox Series S and experience next-gen speed and performance at a great price.
      Bundle includes: Xbox Series S console, one Xbox Wireless Controller, a high-speed HDMI cable, power cable, and 2 AA batteries.
      Make the most of every gaming minute with Quick Resume, lightning-fast load times, and gameplay of up to 120 FPS—all powered by Xbox Velocity Architecture.*
      Enjoy digital games from four generations of Xbox, with hundreds of optimized titles that look and play better than ever.
      Add Xbox Game Pass Ultimate (membership sold separately) to play new games day one. Enjoy hundreds of high-quality games with friends on console, PC, and cloud. Plus, now you can skip the install and jump in with cloud gaming.* `,
      )
    })
  })
})
