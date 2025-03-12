describe('Breeds Page', () => {
  beforeEach(() => {
    cy.visit('/breeds')
  })

  it('displays the header "Cat Breeds"', () => {
    cy.get('h1').contains('Cat Breeds').should('exist')
  })

  it('renders at least one breed list item', () => {
    cy.get('ul li').its('length').should('be.gt', 0)
  })

  // New test: clicking on a breed navigates to breed detail view
  it('navigates to breed detail on breed click', () => {
    cy.get('ul li').first().click();
    cy.url().should('include', '/breed-detail/');
  });
})
