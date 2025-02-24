/**
 * Generates a UUID (Universally Unique Identifier).
 *
 * This function uses the `crypto.getRandomValues` method to generate random values
 * and constructs a UUID string based on these values.
 *
 * @returns {string} A randomly generated UUID.
 */
export function generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
    );
}
