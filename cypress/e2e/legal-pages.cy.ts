/**
 * E2E: Rechtsseiten (Impressum, Datenschutz, AGB) erreichbar.
 */

describe('Rechtsseiten', () => {

    const pages: { path: string, heading: string, content: string }[] = [
        { path: '/impressum', heading: 'Impressum', content: 'Manuel Kübler' },
        { path: '/datenschutz', heading: 'Datenschutz', content: 'DSGVO' },
        { path: '/agb', heading: 'AGB', content: 'Allgemeine Geschäftsbedingungen' },
    ];

    pages.forEach(({ path, heading, content}) => {

        it(`ist unter ${path} erreichbar und zeigt den erwarteten Inhalt`, () => {
            cy.visit(path);
            cy.location('pathname').should('eq', path);
            cy.contains('h1', heading).should('be.visible');
            cy.contains(content).should('be.visible');
        });

        it(`ist über den Footer-Link erreichbar (${path})`, () => {
            cy.visit('/');
            cy.get('footer').contains('a', heading === 'AGB' ? 'AGB' : heading).click();
            cy.location('pathname').should('eq', path);
        });

    });

    it('bietet auf jeder Rechtsseite einen Weg zurück zur Startseite (Header-Logo)', () => {
        pages.forEach(({ path }) => {
            cy.visit(path);
            cy.get('header a[href="/"]').should('exist');
        });
    });

})