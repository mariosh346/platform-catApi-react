// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress" />

const visitHomePage = () => {
  cy.visit('/');
};

describe('Home Page Tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage('favorites'); // Clear favorites before each test
  });

  it('displays the header "Random Cats"', () => {
    visitHomePage();
    cy.get('[data-cy="home-header"]').contains('Random Cats').should('exist');
  });

  it('loads images and shows the "Load More" button', () => {
    visitHomePage();
    cy.get('[data-cy="image-card-image"]').should('have.length.greaterThan', 0);
    cy.get('[data-cy="load-more-button"]').should('exist');
  });

  it('displays skeleton loaders while fetching images', () => {
    cy.intercept('GET', '**/images/search?limit=10').as('getCatImagesDelayed');
    cy.visit('/');
    cy.get('[data-cy="skeleton-loader"]').should('have.length', 10); // Check for 10 skeleton cards
    cy.wait('@getCatImagesDelayed');
    cy.get('[data-cy="skeleton-loader"]').should('not.exist');
    cy.get('[data-cy="image-card-image"]').should('have.length.greaterThan', 0);
  });

  it('displays an error message on API failure', () => {
    cy.intercept('GET', '**/images/search?limit=10', { statusCode: 500, body: 'Internal Server Error' }).as('getCatImagesError');
    cy.visit('/');
    cy.wait('@getCatImagesError');
    cy.get('[data-cy="error-message"]').contains('Failed to load images.').should('exist');
    cy.get('[data-cy="load-more-button"]').should('not.be.disabled'); // Button should be enabled to allow retry
  });

  it('displays "No images found." when API returns empty data', () => {
    cy.intercept('GET', '**/images/search?limit=10', { body: [] }).as('getCatImagesEmpty');
    cy.visit('/');
    cy.wait('@getCatImagesEmpty');
    cy.get('[data-cy="no-images-found-message"]').contains('No images found.').should('exist');
    cy.get('[data-cy="load-more-button"]').should('exist'); // Button should still be there to try again
  });

  it('navigates to image detail on image click', () => {
    visitHomePage();
    cy.get('[data-cy="image-card-image"]').first().click();
    cy.url().should('include', '/image/');
    cy.get('[role="dialog"]').should('be.visible');
  });

  it('closes the modal on Escape key press', () => {
    visitHomePage();
    cy.get('[data-cy="image-card-image"]').first().click();
    cy.get('[role="dialog"]').should('be.visible');
    cy.realPress('{esc}'); // Use cypress-real-events for Escape key
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('adds and removes image from favorites', () => {
    visitHomePage();
    cy.get('[data-cy="image-card-image"]').first().click();
    cy.get('[role="dialog"]').should('be.visible');

    // Mark as favorite
    cy.get('[data-cy="mark-as-favourite-button"]').click();
    cy.get('[data-cy="remove-from-favourites-button"]').should('exist');
    cy.realPress('{esc}'); // Close modal

    // Navigate to favorites page
    cy.get('[data-cy="favorites-link"]').click();
    cy.url().should('include', '/favorites');
    cy.get('[data-cy="image-card-image"]').should('have.length', 1); // Should have 1 favorite image

    // Open the favorite image from the favorites page
    cy.get('[data-cy="image-card-image"]').first().click();
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('[data-cy="remove-from-favourites-button"]').should('exist');

    // Remove from favorites
    cy.get('[data-cy="remove-from-favourites-button"]').click();
    cy.get('[data-cy="mark-as-favourite-button"]').should('exist'); // Button text changes back
    cy.get('[aria-label="Close modal"]').click(); // Close modal by clicking the close button

    // Verify no favorites
    cy.get('[data-cy="no-favorites-message"]').contains('No favorite cats yet.').should('exist');
  });
});
