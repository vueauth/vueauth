Cypress.Commands.add(
  'dataCy',
  { prevSubject: 'optional' },
  (subject, value, options) => {
    return cy.get(
      `[data-cy=${value}]`,
      Object.assign({ withinSubject: subject }, options),
    );
  },
);
