import type { TestParticipant } from "../types/test-participants";

import { uniqueEmail } from "./unique-email";

export function createTestParticipants(count: number): TestParticipant[] {
    return Array.from({ length: count }, (_unused, index) => ({
        vorname: `Teilnehmer${index + 1}`,
        nachname: `Nachname${index + 1}`,
        email: uniqueEmail(`teilnehmer${index + 1}`),
    }));
}