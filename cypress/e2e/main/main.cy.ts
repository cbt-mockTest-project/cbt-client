describe('메인페이지', () => {
  it('메인페이지 렌더링', () => {
    cy.visit('http://localhost:3000');
  });
  it('카테고리 및 시험 선택', () => {
    cy.get('body').click();
    cy.get('[data-cy="category-selector"]').click();
    cy.get('[data-cy="category-selector-option"]').then((option) => {
      expect(option.length).to.be.greaterThan(0);
    });
    cy.get('[data-cy="category-selector-option"]').first().click();
    cy.get('[data-cy="exam-selector"]').click();
  });
});
