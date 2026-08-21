export function uniqueEmail(prefix = 'cypress'): string {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}@e2e-fixtures.test`;
}