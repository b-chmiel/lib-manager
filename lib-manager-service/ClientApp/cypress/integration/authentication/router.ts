/// <reference types="cypress" />

context("Router", () => {
  it("should redirect user from main page to login page, when not logged in", () => {
    cy.visit("/");
    cy.url().should("include", "/login");
  });
  it("should redirect user from random url to login page, when not logged in", () => {
    cy.visit(`/${Cypress.env("authenticatedHomepage")}`);
    cy.url().should("include", "/login");
  });
});
