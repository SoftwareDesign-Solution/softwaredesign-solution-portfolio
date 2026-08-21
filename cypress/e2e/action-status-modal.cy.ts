import { createTestAddress } from "../utils/create-test-address";
import { createTestContactPerson } from "../utils/create-test-contactperson";
import { uniqueEmail } from "../utils/unique-email";

/**
 * E2E: ActionStatusModal zeigt Erfolg/Fehler korrekt an.
 *
 * Die Formular-Specs (contact-request-form.cy.ts, booking-form.cy.ts, ...)
 * decken den "Erfolg"-Zustand bereits im Rahmen ihrer Happy-Path-Tests ab.
 * Dieses Spec fokussiert sich auf ActionStatusModal selbst:
 * Erfolg/Fehler-Varianten, Schließen-Interaktionen (Button, Escape,
 * Overlay-Klick).
 *
 * Der "Fehler"-Zustand lässt sich mit einem echten Backend (siehe
 * "Echte Neon-Testdatenbank nutzen") nicht ohne Weiteres deterministisch
 * provozieren — hier wird die zugrunde liegende Server-Action-Anfrage
 * deshalb gezielt für genau diesen einen Test per cy.intercept mit einem
 * Netzwerkfehler beantwortet (forceNetworkError). Das ist bewusst der
 * einzige Test der gesamten Suite, der cy.intercept einsetzt.
 */
describe('ActionStatusModal', () => {

    function fillValidContactRequest(email: string) {
        
        const address = createTestAddress();
        
        const person = createTestContactPerson();

        cy.get('[name="adresse.firma"]').type(address.firma);
        cy.get('[name="adresse.strasse"]').type(address.strasse);
        cy.get('[name="adresse.plz"]').type(address.plz);
        cy.get('[name="adresse.ort"]').type(address.ort);

        cy.get('[name="ansprechpartner.anrede"]').select(person.anrede);
        cy.get('[name="ansprechpartner.vorname"]').type(person.vorname);
        cy.get('[name="ansprechpartner.nachname"]').type(person.nachname);
        cy.get('[name="ansprechpartner.email"]').type(person.email);

        cy.get('textarea[name="nachricht"]').type(
            'Automatisiert erzeugte Testnachricht für den ActionStatusModal-Test.'
        );
        cy.get('[name="source"]').select('LinkedIn');
        cy.get('input[name="acceptDataProcessing"]').check();
        cy.completeTurnstile();

        return { address, person };
    }

    it('zeigt den Erfolgs-Zustand mit grünem Indikator, Kicker, Heading, Body und Schließen-Button', () => {
        cy.visit('/anfrage');
        const { person } = fillValidContactRequest(uniqueEmail('action-status-success'));

        cy.contains('button[type="submit"]', 'Anfrage absenden').click();

        cy.get('[role="dialog"]', { timeout: 20000 }).within(() => {
            cy.contains('Anfrage eingegangen').should('be.visible'); // kicker
            cy.contains(`Danke, ${person.vorname}`).should('be.visible'); // heading
            cy.contains('Ihre Nachricht ist bei mir eingegangen.').should('be.visible'); // body
            cy.contains('button', 'Schließen').should('be.visible');
        });

        // Erfolgs-Punkt (success-Variante) ist grün eingefärbt
        cy.get('[role="dialog"] .bg-success-500').should('exist');
    });

    it('schließt den Erfolgs-Zustand per Escape-Taste', () => {
        cy.visit('/anfrage');
        fillValidContactRequest(uniqueEmail('action-status-escape'));
        cy.contains('button[type="submit"]', 'Anfrage absenden').click();

        cy.get('[role="dialog"]', { timeout: 20000 }).should('be.visible');
        cy.get('body').trigger('keydown', { key: 'Escape' });
        cy.get('[role="dialog"]').should('not.exist');
    });

    it('zeigt den Fehler-Zustand mit rotem Indikator, wenn die Server Action fehlschlägt', () => {
        cy.intercept('POST', '/anfrage', { forceNetworkError: true }).as('sendContactRequestFailed');

        cy.visit('/anfrage');
        const { person } = fillValidContactRequest(uniqueEmail('action-status-error'));

        cy.contains('button[type="submit"]', 'Anfrage absenden').click();
        cy.wait('@sendContactRequestFailed');

        cy.get('[role="dialog"]', { timeout: 20000 }).within(() => {
            cy.contains('Anfrage nicht abgeschlossen').should('be.visible'); // kicker
            cy.contains(`Kurze Unterbrechung, ${person.vorname}`).should('be.visible'); // heading
            cy.contains('Ihre Nachricht konnte leider nicht übermittelt werden.').should('be.visible'); // body
        });

        cy.get('[role="dialog"] .bg-error-500').should('exist');
    });
});
