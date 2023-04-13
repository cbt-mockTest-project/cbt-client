describe('로그인', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');
  it('로그인 후, 메인페이지로 이동 및 로그인 상태 확인', () => {
    cy.visit('http://localhost:3000/mobile/login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/');
    cy.get('.nav-user-content-notice-button');
  });
});
