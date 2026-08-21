import { TestContactPerson } from "../types/test-contact-person";
import { uniqueEmail } from "./unique-email";

export function createTestContactPerson(): TestContactPerson {
    return {
        anrede: 'Frau',
        vorname: 'Anna',
        nachname: 'Musterfrau',
        email: uniqueEmail('booking'),
        telefon: '0123 456789',
    };
};