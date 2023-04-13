export const clickIfExist = (element: string) => {
  cy.get('body').then((body) => {
    if (body.find(element).length > 0) {
      cy.get(element).click();
    }
  });
};
