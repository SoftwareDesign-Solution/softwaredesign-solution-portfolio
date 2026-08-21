/**
 * Cypress E2E: Navigation & MobileMenu
 * 
 * - Header/DesktopNavBar (Desktop)
 * - HamburgerButton/MobileMenu (Mobile)
 */

describe('Navigation & MobileMenu', () => {

    describe('Desktop-Navigation', () => {

        beforeEach(() => {

            cy.viewport(1280, 900);

            cy.visit('/');

            cy.window().its('innerWidth').should('eq', 1280)

        });

        it('zeigt Logo, Desktop-Navigation und keinen Hamburger-Button', () => {

            cy.get('header').within(() => {

                // Prüfen, ob das Logo angezeigt wird
                cy.get('img[alt="SoftwareDesign-Solution Logo"]').should('be.visible');

                cy.contains('nav a', 'Über mich').should('be.visible');

                cy.contains('nav a', 'Leistungen').should('be.visible');

                cy.contains('nav a', 'Workshops').should('be.visible');

                cy.contains('nav a', 'Kontakt').should('be.visible');

            });

            // HamburgerButton ist im DOM vorhanden, aber auf Desktop per md:hidden ausgeblendet
            cy.get('button[aria-label="Menü öffnen"]').should('not.be.visible');

        });

        it('das Logo verlinkt auf die Startseite', () => {
            cy.get('header a[href="/"]').should('exist');
        });

        it('Desktop-Navigationslinks zeigen auf die erwarteten Sektionen', () => {

            cy.contains('nav a', 'Über mich').should('have.attr', 'href', '/#ueber-mich');
            cy.contains('nav a', 'Leistungen').should('have.attr', 'href', '/#leistungen');
            cy.contains('nav a', 'Workshops').should('have.attr', 'href', '/#workshops');
            cy.contains('nav a', 'Kontakt').should('have.attr', 'href', '/#kontakt');

        });

        it('ein Klick auf "Workshops" springt zur Workshops-Sektion (Hash in der URL)', () => {
            cy.contains('nav a', 'Workshops').click();
            cy.location('hash').should('eq', '#workshops');
        });

        it('Footer verlinkt auf Impressum, Datenschutz und AGB', () => {
            cy.get('footer').within(() => {
                cy.contains('a', 'Impressum').should('have.attr', 'href', '/impressum');
                cy.contains('a', 'Datenschutz').should('have.attr', 'href', '/datenschutz');
                cy.contains('a', 'AGB').should('have.attr', 'href', '/agb');
            });
        });

        it('ein Klick auf "Impressum" im Footer navigiert zur Impressum-Seite', () => {
            cy.get('footer').contains('a', 'Impressum').click();
            cy.location('pathname').should('eq', '/impressum');
            cy.contains('h1', 'Impressum').should('be.visible');
        });

    });


    describe('Mobile-Navigation (MobileMenu)', () => {

        beforeEach(() => {
            cy.viewport('iphone-x');
            cy.visit('/');
        });

        it('zeigt auf Mobile den Hamburger-Button statt der Desktop-Navigation', () => {
            cy.get('button[aria-label="Menü öffnen"]').should('be.visible');
            cy.get('nav').should('not.be.visible');
        });

        it('öffnet das MobileMenu per Klick auf den Hamburger-Button', () => {
            cy.get('button[aria-label="Menü öffnen"]').click();

            cy.get('button[aria-label="Schließen"]').should('be.visible');
            cy.get('.fixed.inset-0').within(() => {
                cy.contains('a', 'Über mich').should('be.visible');
                cy.contains('a', 'Leistungen').should('be.visible');
                cy.contains('a', 'Workshops').should('be.visible');
                cy.contains('a', 'Kontakt').should('be.visible');
            });
        });

        it('sperrt das Body-Scrolling, solange das MobileMenu offen ist', () => {
            cy.get('body').should('not.have.css', 'overflow', 'hidden');
            
            cy.get('button[aria-label="Menü öffnen"]').click();

            cy.get('button[aria-label="Schließen"]').should('be.visible');

            cy.get('.fixed.inset-0').within(() => {
                cy.contains('a', 'Über mich').should('be.visible');
            });
            
            cy.get('body').should('have.css', 'overflow', 'hidden');

        });

        it('schließt das MobileMenu über den X-Button und entsperrt das Scrolling wieder', () => {
            cy.get('button[aria-label="Menü öffnen"]').click();
            cy.get('button[aria-label="Schließen"]').click();

            cy.get('button[aria-label="Schließen"]').should('not.exist');
            cy.get('body').should('not.have.css', 'overflow', 'hidden');
        });

        it('schließt das MobileMenu bei Klick auf das Overlay außerhalb des Panels', () => {
            cy.get('button[aria-label="Menü öffnen"]').click();
            cy.get('.fixed.inset-0').click(5, 5);
            cy.get('button[aria-label="Schließen"]').should('not.exist');
        });

        it('ein Klick auf einen Menüpunkt schließt das Menü und navigiert', () => {
            cy.get('button[aria-label="Menü öffnen"]').click();
            cy.get('.fixed.inset-0').contains('a', 'Kontakt').click();

            cy.location('hash').should('eq', '#kontakt');
            cy.get('button[aria-label="Schließen"]').should('not.exist');
        });

    });

})