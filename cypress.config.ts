import { neon } from "@neondatabase/serverless";
import { defineConfig } from "cypress";

import { NotificationSignup } from "./cypress/types/test-notification-signup";
import { TestQuoteRequest } from "./cypress/types/test-quote-request";

export default defineConfig({
  allowCypressEnv: false,

  e2e: {

    baseUrl: 'http://localhost:3000',
    scrollBehavior: 'center',

    setupNodeEvents(on, config) {
      
      const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

      on('task', {

        /**
         * Liest das Double-Opt-In confirmation_token einer
         * Workshop-Benachrichtigungs-Anmeldung direkt aus der DB.
         */
        async getNotificationSignupConfirmationToken(notificationSignupId: string) {
          if (!sql) throw new Error("DATABASE_URL ist nicht gesetzt.");

          const rows = await sql`
            SELECT confirmation_token AS token
            FROM workshop_benachrichtigung
            WHERE id = ${notificationSignupId}
          `;

          return (rows[0]?.token as string) ?? null;

        },

        async getQuoteRequestConfirmationToken(quoteRequestId: string) {
          if (!sql) throw new Error("DATABASE_URL ist nicht gesetzt.");

          const rows = await sql`
            SELECT confirmation_token AS token
            FROM angebotsanfrage
            WHERE id = ${quoteRequestId}
          `;

          return (rows[0]?.token as string) ?? null;
        },

        async findLatestNotificationSignupByEmail(email: string): Promise<NotificationSignup | null> {
          if (!sql) throw new Error("DATABASE_URL ist nicht gesetzt.");

          const rows = await sql`
            SELECT id, workshop_titel AS "workshopTitel", confirmed_at AS "confirmedAt"
            FROM workshop_benachrichtigung
            WHERE email = ${email}
            ORDER BY created_at DESC
            LIMIT 1
          ` as NotificationSignup[];

          return rows[0] ?? null;
        },

        async findLatestQuoteRequestByEmail(email: string): Promise<TestQuoteRequest | null> {
          if (!sql) throw new Error("DATABASE_URL ist nicht gesetzt.");

          const rows = await sql`
            SELECT id, workshop_titel AS "workshopTitel", confirmed_at AS "confirmedAt"
            FROM angebotsanfrage
            WHERE email = ${email}
            ORDER BY created_at DESC
            LIMIT 1
          ` as TestQuoteRequest[];

          return rows[0] ?? null;
        },

      });
        
      
      console.log(
        `Cypress-Umgebung: ${process.env.APP_ENV}`
      )
      
      return config;

    },
  },
});
