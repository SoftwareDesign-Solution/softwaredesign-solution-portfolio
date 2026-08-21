/**
 * E2E: Notification-Signup — Happy Path + Double-Opt-In-Bestätigungslink
 * (/notifications/[id]/confirm?token=...).
 */

import { TestNotificationSignup } from "../types/test-notification-signup";
import { createTestContactPerson } from "../utils/create-test-contactperson";


describe('Notification-Signup', () => {

    beforeEach(() => {
        cy.viewport(1280, 1400);
        cy.visit('/workshops/ux-design-grundlagen');
        cy.get('aside').contains('button', 'Bei neuen Terminen benachrichtigen').click();
        cy.get('[role="dialog"]').should('be.visible');
    });

    it('rendert das Formular mit Vorname, Nachname, E-Mail und Turnstile', () => {
        cy.get('[role="dialog"]').within(() => {
            cy.contains('Benachrichtigung · UX Design Grundlagen').should('exist');
            cy.get('[name="vorname"]').should('be.visible');
            cy.get('[name="nachname"]').should('be.visible');
            cy.get('[name="email"]').should('be.visible');
            cy.contains('button', 'Bestätigen').should('be.visible');
            cy.contains('button', 'Abbrechen').should('be.visible');
        });
    });

    it('zeigt bei leerem Submit die Zod-Schema-Fehlermeldungen', () => {
        cy.get('[role="dialog"]').within(() => {
            cy.contains('button', 'Bestätigen').click();

            cy.contains('Bitte geben Sie Ihren Vornamen ein.').should('be.visible');
            cy.contains('Bitte geben Sie Ihren Nachnamen ein.').should('be.visible');
            cy.contains('Bitte geben Sie eine gültige E-Mail-Adresse ein.').should('be.visible');
            cy.contains('Bitte Sicherheitsabfrage bestätigen').should('be.visible');
        });
    });

    // Zeigt die Browser-Fehlermeldung für eine ungültige E-Mail-Adresse an, wenn das Feld "ansprechpartner.email" mit einem ungültigen Wert ausgefüllt wird.
    // Lösung: in den Forms noValidate-Attribut setzen, damit die Browser-Validierung deaktiviert wird und die Zod-Validierung greift.
    it('zeigt eine ungültige E-Mail-Adresse als Fehler', () => {
        cy.get('[role="dialog"]').within(() => {
            cy.get('[name="email"]').type('keine-email');
            cy.contains('button', 'Bestätigen').click();

            cy.contains('Bitte geben Sie eine gültige E-Mail-Adresse ein.').should('be.visible');
        });
    });

    it('zeigt einen "Abbrechen"-Button neben "Bestätigen" an', () => {
        cy.get('[role="dialog"]').contains('button', 'Abbrechen').should('be.visible').and('be.enabled');
    });

    it('schließt das Modal über den X-Button im Header', () => {
        cy.get('[role="dialog"]').find('button[aria-label="Schließen"]').click();
        cy.get('[role="dialog"]').should('not.exist');
    });

    it('schließt das Modal über den Abbrechen-Button', () => {
        cy.contains('button[type="button"]', 'Abbrechen').click();
        cy.get('[role="dialog"]').should('not.exist');
    });

    describe('Happy Path + Double-Opt-In', () => {

        /*
        it('Test Cypress Task: findLatestNotificationSignupByEmail', () => {
            const email = 'notification-1787224995251-77661@e2e-fixtures.test';//uniqueEmail('notification');

            cy.task<TestNotificationSignup | null>('findLatestNotificationSignupByEmail', email).then((signup) => {
                console.log('signup:', signup);
                assert.isNotNull(signup, 'zuletzt angelegte Benachrichtigungsanmeldung');
                assert.isNull(signup!.confirmedAt, 'confirmedAt should not be null');

                cy.task('getNotificationSignupConfirmationToken', signup!.id).then((token) => {

                    console.log('confirmation_token:', token);

                    assert.isString(token, 'confirmation_token');
                    assert.isNotEmpty(token, 'confirmation_token should not be empty');

                    cy.visit(`/notifications/${signup!.id}/confirm?token=${token}`);

                });

            });

        });
        */

        it('meldet sich erfolgreich für Benachrichtigungen an und bestätigt über den Double-Opt-In-Link', () => {

            const person = createTestContactPerson();

            cy.get('[role="dialog"]').within(() => {
                cy.get('[name="vorname"]').type(person.vorname);
                cy.get('[name="nachname"]').type(person.nachname);
                cy.get('[name="email"]').type(person.email);

                cy.completeTurnstile();

                cy.contains('button', 'Bestätigen').click();

            });

            cy.contains(`Fast geschafft, ${person.vorname}`, { timeout: 20000 }).should('be.visible');
            cy.contains('Benachrichtigungsanmeldung eingegangen').should('be.visible');
            cy.contains(person.email).should('be.visible');
            cy.get('[role="dialog"]').contains('button', 'Schließen').click();

            cy.task<TestNotificationSignup | null>('findLatestNotificationSignupByEmail', person.email).then((signup: TestNotificationSignup | null) => {
                
                assert.isNotNull(signup, 'zuletzt angelegte Benachrichtigungsanmeldung');

                if (!signup) return; // reine Typ-Absicherung für TS, assert oben wirft schon zur Laufzeit

                assert.isNull(signup.confirmedAt, 'confirmedAt should be null');

                cy.task<string | null>('getNotificationSignupConfirmationToken', signup!.id).then((token: string | null) => {

                    assert.isString(token, 'confirmation_token');
                    assert.isNotEmpty(token, 'confirmation_token should not be empty');

                    cy.visit(`/notifications/${signup!.id}/confirm?token=${token}`);

                    cy.contains('h1', 'Anmeldung bestätigen').should('be.visible');
                    cy.contains(person.vorname).should('be.visible');
                    cy.contains(person.nachname).should('be.visible');
                    cy.contains(person.email).should('be.visible');
                    cy.contains('Anmeldung bestätigt').should('be.visible');

                });

            });
        });

        it('zeigt bei einem ungültigen Token die "Nicht gefunden"-Meldung', () => {
            cy.visit('/notifications/00000000-0000-0000-0000-000000000000/confirm?token=ungueltiges-token');

            cy.contains('h1', 'Nicht gefunden').should('be.visible');
            cy.contains('Diese Workshop-Benachrichtigung wurde nicht gefunden oder der Link ist ungültig.').should(
                'be.visible'
            );
        });

    });

});