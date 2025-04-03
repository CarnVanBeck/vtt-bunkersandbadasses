/**
 * Handlebar Helper Module for Bunkers and Badasses
 *
 * This module provides utility functions and preloads templates for use with Handlebars in FoundryVTT.
 * It ensures that templates and helpers are registered and ready for dynamic rendering of the system's UI.
 *
 * Tiny Tina says: "Templates and helpers, sugar! Without 'em, your UI is as bland as a Claptrap dance-off!"
 */

/**
 * Preload Handlebars Templates
 *
 * This function defines and preloads a set of template paths for use in the system.
 * Preloaded templates are compiled and cached for fast access during rendering.
 *
 * @returns {Promise} A promise that resolves when all templates are loaded.
 *
 * Moxxi says: "Preloading templates is like shaking a good cocktail—smooth and ready to serve!"
 */
export function preloadHandlebarsTemplates() {
    // Define template paths to load
    const templatePaths = {
        // Item Parts
        optionSelector: `${CONFIG.BADASS.systemPath}/templates/item/parts/optionSelector.hbs`,
        pictureSelector: `${CONFIG.BADASS.systemPath}/templates/item/parts/pictureSelector.hbs`,
        hbsSelector: `${CONFIG.BADASS.systemPath}/templates/item/parts/hbsSelector.hbs`,
        manuItemHeader: `${CONFIG.BADASS.systemPath}/templates/item/parts/manufacturedItemHeader.hbs`,
        gunCardDataAndImage: `${CONFIG.BADASS.systemPath}/templates/item/parts/gunCardDataAndImage.hbs`,
        manuItemNotes: `${CONFIG.BADASS.systemPath}/templates/item/parts/manufacturedItemNotes.hbs`,
        stdInput: `${CONFIG.BADASS.systemPath}/templates/item/parts/stdInput.hbs`,

        // Gun Parts
        gunCardHitLine: `${CONFIG.BADASS.systemPath}/templates/item/parts/gunCardAccuracyLine.hbs`,

        // Dices
        d4: `${CONFIG.BADASS.systemPath}/assets/styleable/dice/d4.hbs`,
        d6: `${CONFIG.BADASS.systemPath}/assets/styleable/dice/d6.hbs`,
        d8: `${CONFIG.BADASS.systemPath}/assets/styleable/dice/d8.hbs`,
        d10: `${CONFIG.BADASS.systemPath}/assets/styleable/dice/d10.hbs`,
        d12: `${CONFIG.BADASS.systemPath}/assets/styleable/dice/d12.hbs`,
        d20: `${CONFIG.BADASS.systemPath}/assets/styleable/dice/d20.hbs`,

        // Elements
        elementAcid: `${CONFIG.BADASS.systemPath}/assets/styleable/elements/acid.hbs`,
        elementCryo: `${CONFIG.BADASS.systemPath}/assets/styleable/elements/cryo.hbs`,

        // Settings
        gunTypeLevel: `${CONFIG.BADASS.systemPath}/templates/settings/parts/gunTypeLevel.hbs`,

        // Actor Parts
        vhTabDetails: `${CONFIG.BADASS.systemPath}/templates/actor/parts/tabs/vhTabDetails.hbs`,
        vhTabInventory: `${CONFIG.BADASS.systemPath}/templates/actor/parts/tabs/vhTabInventory.hbs`,
        vhTabOverview: `${CONFIG.BADASS.systemPath}/templates/actor/parts/tabs/vhTabOverview.hbs`,

        vhArchetypeFeats: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhArchetypeFeats.hbs`,
        vhBackgrounds: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhBackgrounds.hbs`,
        vhBadass: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhBadass.hbs`,
        vhChecks: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhChecks.hbs`,
        vhDefenses: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhDefenses.hbs`,
        vhFavoredGuns: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhFavoredGuns.hbs`,
        vhGold: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhGold.hbs`,
        vhGrenades: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhGrenades.hbs`,
        vhHeader: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhHeader.hbs`,
        vhInitiative: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhInitiative.hbs`,
        vhMelee: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhMelee.hbs`,
        vhMovement: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhMovement.hbs`,
        vhPlaceholder: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhPlaceholder.hbs`,
        vhPotions: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhPotions.hbs`,
        vhStats: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhStats.hbs`,
        vhTraits: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhTraits.hbs`,
        epBar: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/epBar.hbs`,

        // Browser Parts
        browserAvailableItems: `${CONFIG.BADASS.systemPath}/templates/browser/parts/browserAvailableItems.hbs`,

        // Custom Inputs
        lookup: `${CONFIG.BADASS.systemPath}/templates/generic/inputLookup.hbs`,
    };

    // Load the template parts
    return loadTemplates(templatePaths);
}

/**
 * Register Handlebars Helpers
 *
 * This function registers custom Handlebars helpers for use in templates.
 * These helpers provide additional functionality for dynamic rendering.
 *
 * @example
 * {{#if (equals value 'key')}} ... {{/if}}
 *
 * Claptrap says: "Helpers are like me—indispensable, lovable, and totally not annoying!"
 */
export function registerHandlebarHelpers() {
    Handlebars.registerHelper({
        getProperty: foundry.utils.getProperty,
        getDiceCount: getDiceCount,
        getDiceSize: getDiceSize,
        equals: equals,
        unequals: unequals,
        selectInArray: selectInArray,
        checkInArray: checkInArray,
        isNumber: isNumber,
    });
}

/**
 * Extract the number of dice from a dice string (e.g., '2d6').
 *
 * @param {string} aString - The dice string to parse.
 * @returns {number} The number of dice.
 *
 * Mr. Torgue says: "MORE DICE MEANS MORE EXPLOSIONS!"
 */
function getDiceCount(aString) {
    return Number.parseInt(aString.split('d')[0]);
}

/**
 * Extract the size of dice from a dice string (e.g., '2d6').
 *
 * @param {string} aString - The dice string to parse.
 * @returns {number} The size of the dice.
 *
 * Lilith says: "Size matters... when it comes to dice."
 */
function getDiceSize(aString) {
    return Number.parseInt(aString.split('d')[1]);
}

/**
 * Check if two values are equal.
 *
 * @param {*} value - The first value to compare.
 * @param {*} key - The second value to compare.
 * @param {Object} opts - Handlebars options object.
 * @returns {Function} The Handlebars block to render.
 */
function equals(value, key, opts) {
    if (value == key) {
        return opts.fn();
    } else {
        return opts.inverse();
    }
}

/**
 * Check if two values are not equal.
 *
 * @param {*} value - The first value to compare.
 * @param {*} key - The second value to compare.
 * @param {Object} opts - Handlebars options object.
 * @returns {Function} The Handlebars block to render.
 */
function unequals(value, key, opts) {
    if (value == key) {
        return opts.inverse();
    } else {
        return opts.fn();
    }
}

/**
 * Check if a value is selected in an array.
 *
 * @param {*} value - The value to check.
 * @param {Array} array - The array to search.
 * @returns {string} 'selected' if the value is in the array, otherwise an empty string.
 */
function selectInArray(value, array) {
    return array?.includes(value) ? 'selected' : '';
}

/**
 * Check if a value is checked in an array.
 *
 * @param {*} value - The value to check.
 * @param {Array} array - The array to search.
 * @returns {string} 'checked' if the value is in the array, otherwise an empty string.
 */
function checkInArray(value, array) {
    return array?.includes(value) ? 'checked' : '';
}

/**
 * Check if a value is a number.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a number, otherwise false.
 */
function isNumber(value) {
    return typeof value === 'number';
}
