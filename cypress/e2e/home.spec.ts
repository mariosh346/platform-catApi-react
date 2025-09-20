// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.clearLocalStorage('favorites'); // Clear favorites before each test
    cy.visit('/');
  });

  it('displays the header "Random Cats"', () => {
    cy.get('h1').contains('Random Cats').should('exist');
  });

  it('loads images and shows the "Load More" button', () => {
    cy.intercept('GET', '**/images/search?limit=10', { fixture: 'catImages.json' }).as('getCatImages');
    cy.visit('/');
    cy.wait('@getCatImages');
    cy.get('img').should('have.length.greaterThan', 0);
    cy.get('button').contains('Load More').should('exist');
  });

  it('displays skeleton loaders while fetching images', () => {
    cy.intercept('GET', '**/images/search?limit=10', (req) => {
      req.reply({
        delay: 500, // Simulate network delay
        fixture: 'catImages.json',
      });
    }).as('getCatImagesDelayed');
    cy.visit('/');
    cy.get('.animate-pulse').should('have.length', 10); // Check for 10 skeleton cards
    cy.wait('@getCatImagesDelayed');
    cy.get('.animate-pulse').should('not.exist');
    cy.get('img').should('have.length.greaterThan', 0);
  });

  it('displays an error message on API failure', () => {
    cy.intercept('GET', '**/images/search?limit=10', { statusCode: 500, body: 'Internal Server Error' }).as('getCatImagesError');
    cy.visit('/');
    cy.wait('@getCatImagesError');
    cy.get('p.text-red-500').contains('Failed to fetch images').should('exist');
    cy.get('button').contains('Load More').should('not.be.disabled'); // Button should be enabled to allow retry
  });

  it('displays "No images found." when API returns empty data', () => {
    cy.intercept('GET', '**/images/search?limit=10', { body: [] }).as('getCatImagesEmpty');
    cy.visit('/');
    cy.wait('@getCatImagesEmpty');
    cy.get('p').contains('No images found.').should('exist');
    cy.get('button').contains('Load More').should('exist'); // Button should still be there to try again
  });

  it('navigates to image detail on image click', () => {
    cy.intercept('GET', '**/images/search?limit=10', { fixture: 'catImages.json' }).as('getCatImages');
    cy.visit('/');
    cy.wait('@getCatImages');
    cy.get('img').first().click();
    cy.url().should('include', '/image/');
    cy.get('[role="dialog"]').should('be.visible');
  });

  it('closes the modal on Escape key press', () => {
    cy.intercept('GET', '**/images/search?limit=10', { fixture: 'catImages.json' }).as('getCatImages');
    cy.visit('/');
    cy.wait('@getCatImages');
    cy.get('img').first().click();
    cy.get('[role="dialog"]').should('be.visible');
    cy.realPress('{esc}'); // Use cypress-real-events for Escape key
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('displays "No favorite cats yet." when favorites are empty', () => {
    cy.visit('/favorites');
    cy.get('[data-cy="no-favorites-message"]').contains('No favorite cats yet.').should('exist');
  });


  it('adds and removes image from favorites', () => {
    cy.intercept('GET', '**/images/search?limit=10', { fixture: 'catImages.json' }).as('getCatImages');
    cy.visit('/');
    cy.wait('@getCatImages');
    cy.get('img').first().click();
    cy.get('[role="dialog"]').should('be.visible');

    // Mark as favorite
    cy.get('button').contains('Mark as Favourite').click();
    cy.get('button').contains('Remove from Favourites').should('exist');
    cy.realPress('{esc}'); // Close modal

    // Navigate to favorites page
    cy.get('nav').contains('Favorites').click();
    cy.url().should('include', '/favorites');
    cy.get('img').should('have.length', 1); // Should have 1 favorite image

    // Open the favorite image from the favorites page
    cy.get('img').first().click();
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('button').contains('Remove from Favourites').should('exist');

    // Remove from favorites
    cy.get('button').contains('Remove from Favourites').click();
    cy.get('button').contains('Mark as Favourite').should('exist'); // Button text changes back
    cy.get('[data-cy="close-modal-button"]').click(); // Close modal by clicking the close button

    // Verify no favorites
    cy.get('[data-cy="no-favorites-message"]').contains('No favorite cats yet.').should('exist');
  });
});
