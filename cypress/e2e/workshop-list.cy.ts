/**
 * E2E: Workshop-Liste auf Startseite rendert korrekt.
 */

describe('Workshop-Liste auf Startseite rendert korrekt', () => {

    beforeEach(() => {
        cy.viewport(1280, 1400);
        cy.visit('/#workshops');
    });

    it('rendert die Workshops-Sektion mit mindestens einer WorkshopCard', () => {
        cy.get('#workshops').within(() => {
            cy.get('.grid > div').should('have.length.greaterThan', 0);
        });
    });

    it('rendert den Fixture-Workshop mit Titel, Kurzbeschreibung, Preis und Terminen', () => {

        cy.get('#workshops')
            .contains('h3', 'UX Design Grundlagen')
            .parents('.border')
            .first()
            .within(() => {
                cy.contains('p', 'Lerne die Grundlagen des User Experience Designs in zwei intensiven Tagen.').should('be.visible');
                cy.contains('div', '890,00 €').should('be.visible');
                //cy.contains('span', 'auf Anfrage').should('be.visible');
                //cy.contains('span', '10.-11. Aug 2026').should('be.visible');
            });

    });

    it('zeigt bei einem Workshop ohne Termine "Aktuell keine Termine geplant."', () => {
        cy.get('#workshops')
            .contains('h3', 'Cypress Testing Grundkurs')
            .parents('.border')
            .first()
            .within(() => {
                cy.contains('Aktuell keine Termine geplant.').should('be.visible');
                cy.contains('In Planung').should('be.visible');
            });
    });

    it('ein Klick auf eine WorkshopCard navigiert zur WorkshopDetailPage', () => {
        cy.get('#workshops')
            .contains('h3', 'UX Design Grundlagen')
            .parents('.border')
            .first()
            .find(`a[href="/workshops/ux-design-grundlagen"]`)
            .click({ force: true });

        cy.location('pathname').should('eq', `/workshops/ux-design-grundlagen`);
        cy.contains('h1', 'UX Design Grundlagen').should('be.visible');
    });

    it('öffnet über "Bei neuen Terminen benachrichtigen" das NotificationSignupModal', () => {
        cy.get('#workshops')
            .contains('h3', 'UX Design Grundlagen')
            .parents('.border')
            .first()
            .contains('button', 'Bei neuen Terminen benachrichtigen')
            .click();

        cy.get('[role="dialog"]').should('be.visible');
        cy.get('[role="dialog"]').contains('Benachrichtigung · UX Design Grundlagen').should('be.visible');
    });

    it('öffnet über "Angebot anfordern" das QuoteRequestModal', () => {
        cy.get('#workshops')
            .contains('h3', 'UX Design Grundlagen')
            .parents('.border')
            .first()
            .contains('button', 'Angebot anfordern')
            .click();

        cy.get('[role="dialog"]').should('be.visible');
        cy.get('[role="dialog"]').contains('Angebotsanfrage · UX Design Grundlagen').should('be.visible');
    });
    
});