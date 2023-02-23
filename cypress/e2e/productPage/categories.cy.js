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

describe('Can open site', () => {
  describe('Test if there is a span with text "Electronics"', () => {
    it('should find the span with text "Electronics"', () => {
      // Visit the page where the span should be present
      cy.visit('http://localhost:3000/products');
  
      // Use cy.contains() to find the span element with text "Electronics"
      cy.contains('span', 'Electronics').should('be.visible');
    });
  });
})
