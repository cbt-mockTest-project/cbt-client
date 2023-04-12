describe('회원가입', () => {
  const emailToRegister = Cypress.env('registerEmail');
  const registeredEmail = Cypress.env('email');
  it('이메일 인증요청 - 신규유저', () => {
    cy.visit('http://localhost:3000/register/confirm');
    cy.get('input[type="email"]').type(emailToRegister);
    cy.get('button[type="submit"]').click();
    cy.contains('인증메일이 전송되었습니다.');
  });
  it('이메일 인증요청 - 이미 가입된 유저', () => {
    cy.visit('http://localhost:3000/register/confirm');
    cy.get('input[type="email"]').type(registeredEmail);
    cy.get('button[type="submit"]').click();
    cy.contains('이미 가입된 이메일입니다.');
  });
});
