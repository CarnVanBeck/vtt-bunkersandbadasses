import { BADASS, getDefaultElements, getDefaultRarities } from './config.mjs';

/**
 * Interface Module to easily access system-relevant data.
 *
 * Tiny Tina says: "This is where the magic happens, sugar! All the juicy system data, ready to blow your mind!"
 */

/**
 * Get an array of system defenses from the data system.
 *
 * @returns {Array} Array of system defenses.
 */
export function getSystemDefenses() {
    return game.settings.get(CONFIG.BADASS.namespace, 'defenses');
}

/**
 * Get a predefined array of dice used by the system.
 * Each entry contains the name, key, and a dedicated Handlebars template.
 *
 * @returns {Array} Array of dice definitions.
 *
 * Mr. Torgue says: "DICE! BECAUSE RANDOMNESS IS THE SPICE OF EXPLOSIONS!"
 */
export function getSystemDice() {
    return [
        { name: 'd4', key: 'd4', hbs: 'd4' },
        { name: 'd6', key: 'd6', hbs: 'd6' },
        { name: 'd8', key: 'd8', hbs: 'd8' },
        { name: 'd10', key: 'd10', hbs: 'd10' },
        { name: 'd12', key: 'd12', hbs: 'd12' },
        { name: 'd20', key: 'd20', hbs: 'd20' },
    ];
}

/**
 * Get an array of system elements from the data system.
 *
 * @returns {Array} Array of system elements.
 *
 * Lilith says: "Elements are the spice of life... and death."
 */
export function getSystemElements() {
    return game.settings.get(CONFIG.BADASS.namespace, 'elements');
}

/**
 * Get an array of system gun types from the data system.
 *
 * @returns {Array} Array of system gun types.
 *
 * Tiny Tina says: "Guns, guns, guns! Customize 'em, sugar!"
 */
export function getSystemGunTypes() {
    return game.settings.get(CONFIG.BADASS.namespace, 'gunTypes');
}

/**
 * Get an array of system manufacturers from the data system.
 *
 * @returns {Array} Array of system manufacturers.
 *
 * Marcus says: "No refunds! But you can customize your manufacturers."
 */
export function getSystemManufacturers() {
    return game.settings.get(CONFIG.BADASS.namespace, 'manufacturers');
}

/**
 * Get a predefined array of accuracy values with range, hits, and crits.
 *
 * @returns {Array} Array of default accuracy values.
 */
export function getDefaultAccuracy() {
    return [
        { low: 2, high: 7, hits: 0, crits: 0 },
        { low: 8, high: 15, hits: 0, crits: 0 },
        { low: 16, hits: 0, crits: 0 },
    ];
}

/**
 * Filter the given defense list for values that haven't been marked as 'life'.
 *
 * @param {Array} defenseList Array of all defenses.
 * @returns {Array} Array of filtered defenses.
 */
function _findNonLifeDefense(defenseList) {
    let foundDefenses = [];
    for (let singleDefense of defenseList) {
        if (!singleDefense.isLife) {
            foundDefenses.push(singleDefense);
        }
    }
    return foundDefenses;
}

/**
 * Lookup the single object of a given gun type in the provided gun list.
 *
 * @param {Array} gunList The complete array of gun types.
 * @param {String} gunType The desired gun type.
 * @returns {Object} The single object with the relevant accuracy array.
 */
function _findGunAccuracyByType(gunList, gunType) {
    let foundGunType = {};
    for (let singleGunType of gunList) {
        if (singleGunType.key === gunType) {
            foundGunType = singleGunType;
        }
    }
    return foundGunType;
}

/**
 * Find the gun level data for a specific level in the provided level list.
 *
 * @param {Array} levelList Array of level data.
 * @param {Number} gunLevel The desired gun level.
 * @returns {Object} The gun level data.
 */
function _findGunLevelData(levelList, gunLevel) {
    let gunLevelData;
    for (let accuracy of levelList) {
        if ((accuracy.start <= gunLevel) & (gunLevel <= accuracy.end)) {
            gunLevelData = accuracy;
        }
    }
    return gunLevelData;
}

/**
 * Filter the given manufacturers for the specified type and return the filtered list.
 *
 * @param {Array} unfilteredManufacturers System list with all manufacturers.
 * @param {String} type Item type to filter by.
 * @returns {Array} Filtered list of manufacturers.
 */
function _filterManufacturersByType(unfilteredManufacturers, type) {
    return unfilteredManufacturers.filter((element) => {
        return element.allowedForItems.includes(type);
    });
}

/**
 * Get the XP segment for a specific level.
 *
 * @param {Number} level The desired level.
 * @returns {Number} The XP segment for the level.
 *
 * Claptrap says: "LEVEL UP! Because being a noob is soooo last season."
 */
export function getXPSegmentByLevel(level) {
    let levels = game.settings.get(CONFIG.BADASS.namespace, 'levels');
    return levels.find((lvl) => lvl.level === level).xpSegment;
}

/**
 * Get the gun accuracy data for a specific level and gun type.
 *
 * @param {Number} level The desired level.
 * @param {String} gunType The desired gun type.
 * @returns {Object} The gun accuracy data.
 */
export function getGunAccuracyByLevel(level, gunType) {
    let completeGunList = game.settings.get(CONFIG.BADASS.namespace, 'gunTypes');
    let gunList = _findGunAccuracyByType(completeGunList, gunType);
    return _findGunLevelData(gunList.levels, level);
}

/**
 * Get the system manufacturers for guns.
 *
 * @returns {Array} Array of gun manufacturers.
 */
export function getSystemGunManufacturers() {
    let manufacturerType = 'gun';
    return _filterManufacturersByType(getSystemManufacturers(), manufacturerType);
}

/**
 * Get the system manufacturers for shields.
 *
 * @returns {Array} Array of shield manufacturers.
 */
export function getSystemShieldManufacturers() {
    let manufacturerType = 'defense';
    return _filterManufacturersByType(getSystemManufacturers(), manufacturerType);
}

/**
 * Get the system manufacturers for grenades.
 *
 * @returns {Array} Array of grenade manufacturers.
 */
export function getSystemGrenadeManufacturers() {
    let manufacturerType = 'grenadeMod';
    return _filterManufacturersByType(getSystemManufacturers(), manufacturerType);
}

/**
 * Get the system defenses that are not marked as 'life'.
 *
 * @returns {Array} Array of non-life defenses.
 */
export function getSystemLifeDefenses() {
    return _findNonLifeDefense(getSystemDefenses());
}

/**
 * Get the system rarities.
 *
 * @returns {Array} Array of system rarities.
 *
 * Moxxi says: "Rarity is like a good drink—common ones are fine, but the legendary ones? Oh, sugar, they’re unforgettable."
 */
export function getSystemRarities() {
    return getDefaultRarities();
}
