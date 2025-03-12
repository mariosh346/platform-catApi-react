describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the header "Random Cats"', () => {
    cy.get('h1').contains('Random Cats').should('exist');
  });

  it('loads images and shows the "Load More" button', () => {
    cy.get('img').should('have.length.greaterThan', 0);
    cy.get('button').contains('Load More').should('exist');
  });

  it('navigates to image detail on image click', () => {
    cy.get('img').first().click();
    cy.url().should('include', '/image/');
  });
});
