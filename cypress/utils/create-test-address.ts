import type { TestAddress } from "../types/test-address";

export function createTestAddress(): TestAddress {
    return {
        firma: 'Testfirma GmbH',
        strasse: 'Musterstraße 1',
        plz: '12345',
        ort: 'Musterstadt',
    };
};