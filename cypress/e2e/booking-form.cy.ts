/**
 * E2E: Booking-Formular — Happy Path (AppointmentSelection,
 * ParticipantStepper, Adress-Sections) + Validierungsfehler.
 */

import { createTestAddress } from "../utils/create-test-address";
import { createTestContactPerson } from "../utils/create-test-contactperson";
import { createTestParticipants } from "../utils/create-test-participants";

describe('Booking-Formular', () => {

    beforeEach(() => {

        cy.viewport(1280, 1400);
        cy.visit('/workshops/ux-design-grundlagen');
        cy.get('aside').contains('button', 'Platz reservieren').click();
        cy.get('[role="dialog"]').should('be.visible');

    });

    it('rendert alle Formular-Abschnitte inkl. aller drei Termin-Status', () => {
        cy.get('[role="dialog"]').within(() => {
            cy.contains('Termin').should('be.visible');
            cy.contains('Verfügbar').should('be.visible');
            cy.contains('Restplätze').should('be.visible');
            cy.contains('Ausgebucht').should('be.visible');
            cy.contains('Teilnehmeranzahl').should('be.visible');
            cy.contains('Firma & Adresse').should('be.visible');
            cy.contains('Ansprechpartner').should('be.visible');
            cy.contains('Teilnehmer:innen').scrollIntoView().should('be.visible');
            cy.contains('Rechnungsadresse').scrollIntoView().should('be.visible');
            cy.contains('Weiteres').should('be.visible');
            cy.contains('Zusammenfassung').should('be.visible');
        });
    });

    it('deaktiviert den ausgebuchten Termin für die Auswahl', () => {
        cy.get('[role="dialog"]').contains('label', 'Ausgebucht').find('input[type="radio"]').should('be.disabled');
    });

    describe('Validierungsfehler', () => {

        it('deaktiviert den Submit-Button, solange die AGB-Zustimmung fehlt', () => {
            cy.get('[role="dialog"]').contains('button[type="submit"]', 'Verbindlich buchen').should('be.disabled');
        });

        it('zeigt nach Zustimmung + leerem Submit die Zod-Schema-Fehlermeldungen', () => {
            cy.get('[role="dialog"]').within(() => {
                cy.acceptConsent();
                cy.contains('button[type="submit"]', 'Verbindlich buchen').should('be.enabled').click();

                cy.contains('Bitte wählen Sie einen Termin aus').should('be.visible');
                cy.get('[name="adresse.firma"]').parent().should('contain.text', 'Bitte geben Sie den Firmennamen ein.');
                cy.get('[name="ansprechpartner.vorname"]').parent().should('contain.text', 'Pflichtfeld');
                cy.get('[name="ansprechpartner.email"]').parent().should('contain.text', 'Ungültige E-Mail-Adresse');
                //cy.contains('Bitte Sicherheitsabfrage bestätigen').should('be.visible');
            });
        });

        it.skip('verlangt eine Teilnehmerzahl von mindestens 1', () => {
            cy.get('[role="dialog"]').within(() => {
                cy.acceptConsent();
                cy.setParticipantCount(0);
                cy.contains('button[type="submit"]', 'Verbindlich buchen').click();

                cy.contains('Bitte geben Sie die Teilnehmeranzahl an').should('be.visible');
            });
        });

        it('verlangt bei abweichender Rechnungsadresse zusätzlich vollständige Rechnungsadress-Felder', () => {
            cy.get('[role="dialog"]').within(() => {
                cy.get('input[name="abweichendeRechnungsadresse"]').check();
                cy.get('[name="rechnungsadresse.firma"]').should('be.visible');

                cy.acceptConsent();
                cy.contains('button[type="submit"]', 'Verbindlich buchen').click();

                //cy.get('[name="rechnungsadresse.firma"]').parent().should('contain.text', 'Bitte geben Sie den Firmennamen ein.');

                cy.get(
                    '[name="rechnungsadresse.firma"]',
                )
                    .closest(".col-span-3")
                    .find('[role="alert"]')
                    .should(
                        "have.text",
                        "Bitte geben Sie den Firmennamen ein.",
                    );
            });
        });

    });

    describe('Happy Path', () => {

        it('bucht einen verfügbaren Termin mit mehreren Teilnehmern erfolgreich', () => {

            const address = createTestAddress();

            const person = createTestContactPerson();

            const participants = createTestParticipants(2);
            
            cy.get('[role="dialog"]').within(() => {

                // 01 Termin
                cy.selectTerminByStatus('verfuegbar');

                // 02 Teilnehmeranzahl (Stepper hoch auf 2 über den +-Button)
                cy.contains('button', '+').click();
                cy.get('input[name="teilnehmerzahl"]').should('have.value', '2');

                // 03 Firma & Adresse
                cy.fillAddressFields('adresse', address);

                // 04 Ansprechpartner
                cy.fillContactPerson('ansprechpartner', person);

                // 05 Teilnehmer:innen (2 Zeilen, durch Stepper bereits nachgezogen)
                cy.fillParticipant(0, participants[0]);
                cy.fillParticipant(1, participants[1]);

                // 06 Rechnungsadresse — Standard (keine abweichende Adresse) beibehalten

                // Zusammenfassung: 890,00 € x 2 = 1.780,00 € + 19% USt = 2.118,20 €
                cy.contains('Zusammenfassung').scrollIntoView().should('be.visible');
                cy.contains(/890,00\s?€\s*x\s*2/).should('be.visible');
                cy.contains(/1\.780,00\s?€/).should('be.visible');
                cy.contains(/2\.118,20\s?€/).should('be.visible');

                // Consent + Turnstile
                cy.acceptConsent();
                //cy.completeTurnstile();

                cy.contains('button[type="submit"]', 'Verbindlich buchen').click();

            });

            cy.contains(`Danke, ${person.vorname}`, { timeout: 20000 }).should('be.visible');
            cy.contains('Buchung eingegangen').should('be.visible');
            cy.contains(person.email).should('be.visible');
            cy.get('[role="dialog"]').should('have.length', 1); // BookingModal geschlossen, nur ActionStatusModal übrig

        });

    });

});