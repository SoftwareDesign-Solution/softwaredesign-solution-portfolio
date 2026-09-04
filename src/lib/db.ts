/**
 * @file db.ts
 * @description Zentraler Neon-Postgres-Client (serverless) für alle Datenbankzugriffe.
 * @module lib/db
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { neon } from '@neondatabase/serverless';

// Ohne DATABASE_URL kann keine Verbindung zur Neon-Postgres-Instanz aufgebaut werden
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
};

/** Neon-SQL-Client (serverless) für Datenbankzugriffe in Server Actions/Routen. */
export const db = neon(process.env.DATABASE_URL);