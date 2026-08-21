/// <reference types="cypress" />

import { TestAddress } from "../types/test-address";
import { TestContactPerson } from "../types/test-contact-person";
import { TestParticipant } from "../types/test-participants";

// ***********************************************************
// cypress/support/commands.ts
//
// Wiederverwendbare Custom Commands für Formulare, die auf allen
// Kontakt-/Buchungs-/Angebots-/Benachrichtigungs-Formularen gleich
// funktionieren (react-hook-form registriert `name`-Attribute 1:1
// nach den Zod-Schema-Pfaden, z. B. "adresse.firma" oder
// "ansprechpartner.email" — darüber werden Felder selektiert, ohne
// dass die App eigens um data-cy-Attribute ergänzt werden musste).
// ***********************************************************

const TERMIN_STATUS_LABEL = {
    verfuegbar: 'Verfügbar',
    restplaetze: 'Restplätze',
    ausgebucht: 'Ausgebucht',
} as const;

export type TerminStatusKey = keyof typeof TERMIN_STATUS_LABEL;

Cypress.Commands.add('fillAddressFields', (prefix: string, address: TestAddress) => {
    cy.get(`[name="${prefix}.firma"]`).clear().type(address.firma);
    cy.get(`[name="${prefix}.strasse"]`).clear().type(address.strasse);
    cy.get(`[name="${prefix}.plz"]`).clear().type(address.plz);
    cy.get(`[name="${prefix}.ort"]`).clear().type(address.ort);
});

Cypress.Commands.add('fillContactPerson', (prefix: string, person: TestContactPerson) => {
    cy.get(`[name="${prefix}.anrede"]`).select(person.anrede);
    cy.get(`[name="${prefix}.vorname"]`).clear().type(person.vorname);
    cy.get(`[name="${prefix}.nachname"]`).clear().type(person.nachname);
    cy.get(`[name="${prefix}.email"]`).clear().type(person.email);
    if (person.telefon) {
        cy.get(`[name="${prefix}.telefon"]`).clear().type(person.telefon);
    }
});

Cypress.Commands.add('fillParticipant', (index: number, participant: TestParticipant) => {
    cy.get(`[name="teilnehmer.${index}.vorname"]`).clear().type(participant.vorname);
    cy.get(`[name="teilnehmer.${index}.nachname"]`).clear().type(participant.nachname);
    cy.get(`[name="teilnehmer.${index}.email"]`).clear().type(participant.email);
});

/**
 * Setzt die Teilnehmeranzahl direkt über das Zahlenfeld (statt über die
 * +/- Buttons zu iterieren) — löst denselben RHF onChange aus und damit
 * auch den useEffect in ParticipantsSection, der Teilnehmer-Zeilen
 * nachzieht.
 */
Cypress.Commands.add('setParticipantCount', (count: number) => {
    cy.get('input[name="teilnehmerzahl"]').clear().type(String(count)).blur();
});

/**
 * Wählt im Termin-Auswahlblock (AppointmentSelectionSection) den
 * Termin mit dem angegebenen Status aus. Setzt voraus, dass der
 * Fixture-Workshop (siehe database/seeds/e2e/001_seed_e2e_fixtures.sql)
 * genau einen Termin pro Status hat.
 */
Cypress.Commands.add('selectTerminByStatus', (status: TerminStatusKey) => {
    cy.contains('label', TERMIN_STATUS_LABEL[status]).click({ force: true });
});

/**
 * Cloudflare Turnstile mit dem "Always passes"-Test-Sitekey
 * (siehe .env.test) rendert ein Widget, das ohne Nutzerinteraktion
 * automatisch erfolgreich abschließt und onSuccess mit einem
 * Dummy-Token auslöst. Benötigt echten Netzwerkzugriff auf
 * challenges.cloudflare.com während des Testlaufs.
 */
Cypress.Commands.add('completeTurnstile', () => {
    /*
    cy.get('iframe[src*="challenges.cloudflare.com"]', { timeout: 20000 }).should('exist');
    // Kurze Wartezeit, bis der onSuccess-Callback gefeuert und
    // turnstile.token im Formular-State gesetzt wurde.
    cy.wait(2000);
    */

    cy.get('input[name="cf-turnstile-response"]', { timeout: 20000 })
        .invoke('val')
        .should('not.be.empty');
        
});

Cypress.Commands.add('acceptConsent', () => {
    cy.get('input[name="consent"]').check({ force: true });
});


declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {

            fillAddressFields(prefix: string, address: TestAddress): Chainable<void>;
            fillContactPerson(prefix: string, person: TestContactPerson): Chainable<void>;
            fillParticipant(index: number, participant: TestParticipant): Chainable<void>;
            setParticipantCount(count: number): Chainable<void>;
            selectTerminByStatus(status: TerminStatusKey): Chainable<void>;
            completeTurnstile(): Chainable<void>;

            acceptConsent(): Chainable<void>;

        }

    }
}


// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }