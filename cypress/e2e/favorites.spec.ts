describe('Favorites Page Tests', () => {
  it('displays "No favorite cats yet." when favorites are empty', () => {
    cy.visit('/favorites');
    cy.get('[data-cy="no-favorites-message"]').contains('No favorite cats yet.').should('exist');
  });
});