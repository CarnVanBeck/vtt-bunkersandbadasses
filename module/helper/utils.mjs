import ActorStuffBrowser from '../applications/browser/actorStuffBrowser.mjs';

/**
 * Generates a UUID (Universally Unique Identifier).
 *
 * This function uses the `crypto.getRandomValues` method to generate random values
 * and constructs a UUID string based on these values. It's like Claptrap trying to
 * be unique, but unlike Claptrap, this function actually succeeds every time!
 *
 * @returns {string} A randomly generated UUID. Use it to identify your stuff,
 * because nobody likes duplicates—except maybe Marcus, who loves selling you the same gun twice.
 */
export function generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
    );
}

export function setupInputLookup(id) {
    document.querySelectorAll(`button.input-lookup-button#${id}`).forEach((button) => {
        console.log('browser', button.dataset.browser);
        button.addEventListener('click', () => {
            // Open the browser logic here
            console.log(`Browser opened for input lookup with ID: ${id}. Drag and drop your value here.`);

            new ActorStuffBrowser(button.dataset.browser).render(true);
        });
    });
}
