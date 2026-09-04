/**
 * E2E: Kontakt-/Anfrageformular (/anfrage) — Happy Path + Validierungsfehler.
 */

describe('Kontakt-/Anfrageformular (/anfrage) - Happy Path + Validierungsfehler', () => {

    beforeEach(() => {
        cy.viewport(1280, 1400);
        cy.visit('/anfrage');
    });

    it('rendert alle Formular-Abschnitte', () => {
        cy.contains('h1', 'Ihre Anfrage').should('be.visible');
        cy.contains('h2', 'Unternehmensdaten').should('be.visible');
        cy.contains('h2', 'Persönliche Daten').should('be.visible');
        cy.contains('h2', 'Beschreibung').should('be.visible');
        cy.contains('button[type="submit"]', 'Anfrage absenden').should('be.visible');
    });

    describe('Validierungsfehler', () => {

        it('zeigt die Zod-Schema-Fehlermeldungen, wenn das Formular komplett leer abgesendet wird', () => {
            
            // Lerres Formular absenden
            cy.contains('button[type="submit"]', 'Anfrage absenden').click();

            // Unternehmensdaten
            // Firmenname
            cy.get('[name="adresse.firma"]').parent('div').within(() => {
                cy.get('p').should('contain.text', 'Bitte geben Sie den Firmennamen ein.');
            })

            // Straße
            cy.get('[name="adresse.strasse"]').parent('div').within(() => {
                cy.get('p').should('contain.text', 'Bitte geben Sie die Straße ein.');
            });

            // PLZ
            cy.get('[name="adresse.plz"]').parent('div').within(() => {
                cy.get('p').should('contain.text', 'Bitte geben Sie die Postleitzahl ein.');
            });

            // Ort
            cy.get('[name="adresse.ort"]').parent('div').within(() => {
                cy.get('p').should('contain.text', 'Bitte geben Sie den Ort ein.');
            });


            // Persönliche Daten
            // Vorname
            cy.get('[name="ansprechpartner.vorname"]').parent('div').within(() => {
                cy.get('p').should('contain.text', 'Pflichtfeld');
            });

            // Nachname
            cy.get('[name="ansprechpartner.nachname"]').parent('div').within(() => {
                cy.get('p').should('contain.text', 'Pflichtfeld');
            });

            // E-Mail
            cy.get('[name="ansprechpartner.email"]').parent('div').within(() => {
                cy.get('p').should('contain.text', 'Ungültige E-Mail-Adresse');
            });

            // Beschreibung
            cy.contains('Die Beschreibung muss mindestens 20 Zeichen enthalten.').should('be.visible');

            cy.contains('Bitte stimmen Sie der Verarbeitung Ihrer Daten zu.').should('be.visible');

            cy.contains('Bitte Sicherheitsabfrage bestätigen').should('be.visible');

        });

        // Zeigt die Browser-Fehlermeldung für eine ungültige E-Mail-Adresse an, wenn das Feld "ansprechpartner.email" mit einem ungültigen Wert ausgefüllt wird.
        // Lösung: in den Forms noValidate-Attribut setzen, damit die Browser-Validierung deaktiviert wird und die Zod-Validierung greift.
        it('zeigt eine ungültige E-Mail-Adresse als Fehler an', () => {
            cy.get('[name="ansprechpartner.email"]').type('keine-email-adresse');
            cy.contains('button[type="submit"]', 'Anfrage absenden').click();

            cy.get('[name="ansprechpartner.email"]').parent().should('contain.text', 'Ungültige E-Mail-Adresse');
        });

        it('lässt den Live-Zeichenzähler für die Nachricht korrekt mitzählen', () => {
            cy.get('textarea[name="nachricht"]').type('12345');
            cy.contains('5 / 4000').should('be.visible');
        });

        it('zeigt standardmäßig den 20-Zeichen-Hinweis unter der Nachricht, solange kein Fehler vorliegt', () => {
            cy.contains('Mindestens 20 Zeichen.').should('be.visible');
        });

    });

    describe('Happy Path', () => {

        it('sendet die Kontaktanfrage erfolgreich ab und zeigt die Erfolgsmeldung', () => {

            cy.get('[name="adresse.firma"]').type('SoftwareDesign-Solution');
            cy.get('[name="adresse.strasse"]').type('Steinbergstr. 2');
            cy.get('[name="adresse.plz"]').type('72202');
            cy.get('[name="adresse.ort"]').type('Nagold');

            cy.get('[name="ansprechpartner.anrede"]').select('Herr');
            cy.get('[name="ansprechpartner.vorname"]').type('Manuel');
            cy.get('[name="ansprechpartner.nachname"]').type('Kübler');
            cy.get('[name="ansprechpartner.email"]').type('mail@softwaredesign-solution.de');

            cy.get('textarea[name="nachricht"]').type(
                'Dies ist eine automatisiert erzeugte Testnachricht für den Cypress E2E-Test des Kontaktformulars.'
            );

            cy.get('[name="source"]').select('LinkedIn');

            cy.get('input[name="bereitsKunde"]').check();
            cy.get('input[name="acceptDataProcessing"]').check();

            cy.completeTurnstile();

            cy.contains('button[type="submit"]', 'Anfrage absenden').click();

            cy.contains('Danke, Manuel', { timeout: 20000 }).should('be.visible');
            cy.contains('Ihre Nachricht ist bei mir eingegangen.').should('be.visible');
            cy.contains('mail@softwaredesign-solution.de').should('be.visible');

            cy.get('[role="dialog"]').contains('button', 'Schließen').click();
            cy.get('[role="dialog"]').should('not.exist');

        });

    });

});