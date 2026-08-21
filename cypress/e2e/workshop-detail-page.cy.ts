/**
 * E2E: WorkshopDetailPage rendert korrekt (Details + Sidebar).
 */
describe('WorkshopDetailPage', () => {

    describe('Workshop "UX Design Grundlagen" mit Terminen', () => {

        beforeEach(() => {
            cy.viewport(1280, 1400);
            cy.visit(`/workshops/ux-design-grundlagen`);
        });

        it('rendert Breadcrumbs, Titel, Kurzbeschreibung und Stat-Items (Dauer/Format/Sprache)', () => {
            cy.contains('a', 'Start').should('have.attr', 'href', '/');
            cy.contains('a', 'Workshops').should('have.attr', 'href', '/#workshops');

            cy.get('h1').should('contain.text', 'UX Design Grundlagen');
            cy.contains('Lerne die Grundlagen des User Experience Designs in zwei intensiven Tagen.').should('be.visible');

            cy.contains('Dauer').should('be.visible');
            cy.contains('2 Tage').should('be.visible');
            cy.contains('Format').should('be.visible');
            cy.contains('Sprache').should('be.visible');
            cy.contains('Deutsch').should('be.visible');
        });

        it('rendert die Beschreibung, Agenda, Zielgruppe/Voraussetzungen, Lernziele und den Referenten', () => {
            cy.contains('div', 'Beschreibung').should('be.visible');
            cy.get('div#description').should('contain.text', 'Usability-Test');

            cy.contains('h2', 'Tagesablauf').should('be.visible');
            cy.contains('h3', 'Praxis & Umsetzung').should('be.visible');
            cy.contains('Usability-Test').should('be.visible');

            cy.contains('h2', 'Für wen ist der Workshop geeignet?').should('be.visible');
            cy.contains('Frontend-Entwickler').should('be.visible');
            cy.contains('Keine Vorkenntnisse notwendig').should('be.visible');

            cy.contains('h2', 'Was Sie mitnehmen').should('be.visible');
            cy.contains('Einen Usability-Test planen und durchführen').should('be.visible');

            cy.contains('h2', 'Über den Trainer').should('be.visible');
            cy.contains('Manuel Kübler').should('be.visible');
        });

        it('zeigt in der Sidebar Preis, Termine (alle drei Status) und Buchungs-Buttons', () => {
            cy.get('aside').within(() => {
                cy.contains(/890,00\s?€.*netto/).should('be.visible');

                cy.contains('Verfügbar').should('be.visible');
                cy.contains('Restplätze').should('be.visible');
                cy.contains('Ausgebucht').should('be.visible');

                cy.contains('button', 'Platz reservieren').should('be.enabled');
                cy.contains('button', 'Angebot anfordern').should('be.enabled');
                cy.contains('a', 'Inhouse-Angebot anfordern').should('have.attr', 'href', '/anfrage');
                cy.contains('button', 'Bei neuen Terminen benachrichtigen').should('be.enabled');
            });
        });

        it('öffnet über "Platz reservieren" in der Sidebar das BookingModal', () => {
            cy.get('aside').contains('button', 'Platz reservieren').click();
            cy.get('[role="dialog"]').should('be.visible');
            cy.get('[role="dialog"]').contains(`Buchung · UX Design Grundlagen`).should('be.visible');
        });

    });

    describe('Workshop "Cypress Testing Grundkurs" ohne Termine — "In Planung"', () => {

        beforeEach(() => {
            cy.viewport(1280, 1400);
            cy.visit(`/workshops/cypress-testing`);
        });

        it('deaktiviert Buchungs-/Angebots-Buttons in der Sidebar, wenn keine Termine vorhanden sind', () => {
            cy.get('h1').should('contain.text', 'Cypress Testing Grundkurs');

            cy.get('aside').within(() => {
                cy.contains('Aktuell keine Termine geplant.').should('be.visible');
                cy.contains('button', 'Platz reservieren').should('be.disabled');
                cy.contains('button', 'Angebot anfordern').should('be.disabled');
            });
        });


    });

    describe('Unbekannter Workshop-Slug', () => {

        it('zeigt die workshop-spezifische 404-Seite statt eines Server-Fehlers', () => {
            cy.viewport(1280, 1400);
            cy.visit('/workshops/dieser-workshop-existiert-nicht', { failOnStatusCode: false });

            cy.contains('h1', 'Diesen Workshop gibt es (noch) nicht').should('be.visible');
            cy.contains('a', 'Workshop-Thema vorschlagen').should('have.attr', 'href', '/anfrage');
            cy.contains('a', 'Alle Workshops ansehen').should('have.attr', 'href', '/#workshops');
        });
    });

});