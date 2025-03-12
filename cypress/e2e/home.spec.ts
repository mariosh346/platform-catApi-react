describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the header "Random Cats"', () => {
    cy.get('h1').contains('Random Cats').should('exist');
  });

  it('loads images and shows the "Load New" button', () => {
    // Check that at least one image is rendered
    cy.get('img').should('have.length.greaterThan', 0);
    // Check for the existence of the load button
    cy.get('button').contains('Load New').should('exist');
  });

  // New test: clicking on an image navigates to image detail view
  it('navigates to image detail on image click', () => {
    cy.get('img').first().click();
    cy.url().should('include', '/image/');
  });
});
