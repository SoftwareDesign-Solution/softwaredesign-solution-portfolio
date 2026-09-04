/**
 * @file resend.ts
 * @description Zentraler Resend-Client für den Versand aller Transaktions-E-Mails.
 * @module lib/resend
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { Resend } from 'resend';

/** Zentraler Resend-Client für den Versand von Transaktions-E-Mails. */
export const resend = new Resend(process.env.RESEND_API_KEY);