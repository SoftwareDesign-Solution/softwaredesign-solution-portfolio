/**
 * E2E: Quote-Request-Formular — Happy Path + Validierungsfehler +
 * Double-Opt-In-Bestätigungslink (/offer-requests/[id]/confirm?token=...).
 */

import { TestQuoteRequest } from "../types/test-quote-request";
import { createTestAddress } from "../utils/create-test-address";
import { createTestContactPerson } from "../utils/create-test-contactperson";

describe('Quote-Request-Formular', () => {

    beforeEach(() => {
        cy.viewport(1280, 1400);
        cy.visit('/workshops/ux-design-grundlagen');
        cy.get('aside').contains('button', 'Angebot anfordern').click();
        cy.get('[role="dialog"]').should('be.visible');
    });

    describe('Validierungsfehler', () => {

        it('deaktiviert den Submit-Button, solange die Datenschutz-Zustimmung fehlt', () => {
            cy.get('[role="dialog"]').contains('button[type="submit"]', 'Angebot anfordern').should('be.disabled');
        });

        it('zeigt nach Zustimmung + leerem Submit die Zod-Schema-Fehlermeldungen', () => {
            cy.get('[role="dialog"]').within(() => {
                cy.acceptConsent();
                cy.contains('button[type="submit"]', 'Angebot anfordern').should('be.enabled').click();

                cy.contains('Bitte wählen Sie einen Termin aus').should('be.visible');
                cy.get('[name="adresse.strasse"]').parent().should('contain.text', 'Bitte geben Sie die Straße ein.');
                cy.get('[name="ansprechpartner.nachname"]').parent().should('contain.text', 'Pflichtfeld');
                //cy.contains('Bitte Sicherheitsabfrage bestätigen').should('be.visible');
            });
        });

    });

    describe('Happy Path + Double-Opt-In', () => {

        it('fordert ein Angebot an, bestätigt es über den Double-Opt-In-Link und zeigt danach den "bereits bestätigt"-Zustand', () => {

            const address = createTestAddress();
            
            const person = createTestContactPerson();

            cy.get('[role="dialog"]').within(() => {
                cy.selectTerminByStatus('restplaetze');

                cy.fillAddressFields('adresse', address);
                cy.fillContactPerson('ansprechpartner', person);

                cy.acceptConsent();
                cy.completeTurnstile();

                cy.contains('button[type="submit"]', 'Angebot anfordern').click();

            });

            cy.contains(`Fast geschafft, ${person.vorname}`, { timeout: 20000 }).should('be.visible');
            cy.contains('Angebotsanfrage eingegangen').should('be.visible');
            cy.contains(person.email).should('be.visible');
            cy.get('[role="dialog"]').contains('button', 'Schließen').click();

            // Double-Opt-In-Token direkt aus der Test-DB lesen (kein Postfach in Cypress)
            cy.task<TestQuoteRequest | null>('findLatestQuoteRequestByEmail', person.email).then((quoteRequest: TestQuoteRequest | null) => {

                assert.isNotNull(quoteRequest, 'zuletzt angelegte Angebotsanfrage');

                if (!quoteRequest) return; // reine Typ-Absicherung für TS, assert oben wirft schon zur Laufzeit
                
                assert.isNull(quoteRequest.confirmedAt);

                cy.task<string | null>('getQuoteRequestConfirmationToken', quoteRequest.id).then((token: string | null) => {

                    assert.isString(token, 'confirmation_token');
                    assert.isNotEmpty(token, 'confirmation_token should not be empty');

                    // 1. Bestätigungslink öffnen → bestätigt die Angebotsanfrage
                    cy.visit(`/offer-requests/${quoteRequest.id}/confirm?token=${token}`);

                    cy.contains('h1', 'Anfrage bestätigen').should('be.visible');
                    cy.contains(address.firma).should('be.visible');
                    cy.contains(`${person.vorname} ${person.nachname}`).should('be.visible');
                    cy.contains(person.email).should('be.visible');
                    cy.contains('Anfrage bestätigt').should('be.visible');

                    // 2. Denselben Link erneut öffnen → "bereits bestätigt", kein Fehler
                    cy.visit(`/offer-requests/${quoteRequest.id}/confirm?token=${token}`);
                    cy.contains('h1', 'Anfrage bestätigen').should('be.visible');
                    cy.contains('Anfrage bestätigt').should('be.visible');

                });

            });

        });

        it('zeigt bei einem ungültigen Token die "Nicht gefunden"-Meldung', () => {
            cy.visit('/offer-requests/00000000-0000-0000-0000-000000000000/confirm?token=ungueltiges-token');

            cy.contains('h1', 'Nicht gefunden').should('be.visible');
            cy.contains('Diese Angebots-Anfrage wurde nicht gefunden oder der Link ist ungültig.').should(
                'be.visible'
            );
        });

    });

});