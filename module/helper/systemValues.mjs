import { BADASS, getDefaultElements, getDefaultRarities } from './config.mjs';

/**
 * Interface Module to easily access system relevant Data
 * 
 */

/**
 * Get an array of system defenses from the data system
 * 
 * @returns     array of system defenses
 */
export function getSystemDefenses() {
    return game.settings.get(CONFIG.BADASS.namespace, 'defenses');
}

/**
 * Get a predefined array of dice used by the system. Each entry contain name, key and a dedicated hbs
 * 
 * @returns 
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
 * Get an array of system elements from the data system
 * 
 * @returns     array of system elements
 */
export function getSystemElements() {
    return game.settings.get(CONFIG.BADASS.namespace, 'elements');
}

/**
 * Get an array of system gunTypes from the data system
 * 
 * @returns     array of system gunTypes
 */
export function getSystemGunTypes() {
    return game.settings.get(CONFIG.BADASS.namespace, 'gunTypes');
}

/**
 * Get an array of system manufacturers from the data system
 * 
 * @returns     array of system manufacturers
 */
export function getSystemManufacturers() {
    return game.settings.get(CONFIG.BADASS.namespace, 'manufacturers');
}

/**
 * Get a predefined array of accuracy values with range, hits and crits
 * 
 * @returns 
 */
export function getDefaultAccuracy() {
    return [
        { low: 2, high: 7, hits: 0, crits: 0 },
        { low: 8, high: 15, hits: 0, crits: 0 },
        { low: 16, hits: 0, crits: 0 },
    ];
}

/**
 * Filter the given defenseList for values that havent been signed as 'life'
 * 
 * @param {*} defenseList       array with all defenses
 * @returns                     array of filter defenses
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
 * Lookup the single object of a given gunType in the given gunList
 * 
 * @param {*} gunList       the complete array of gunTypes
 * @param {*} gunType       the desired gunType
 * @returns                 the single object with the relevant accuracy array
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

function _findGunLevelData(levelList, gunLevel) {
    let gunLevelData;
    for (let accuracy of levelList) {
        if ((accuracy.start <= gunLevel) & (gunLevel <= accuracy.end)) {
            gunLevelData = accuracy;
        }
    }
    return gunLevelData;
}

export function getGunAccuracyByLevel(level, gunType) {
    let completeGunList = game.settings.get(CONFIG.BADASS.namespace, 'gunTypes');
    let gunList = _findGunAccuracyByType(completeGunList, gunType);
    return _findGunLevelData(gunList.levels, level);
}

/**
 * Filter the given unfilteredManufacturers for the given type and return the filtered
 * list.
 *
 * @param {Array} unfilteredManufacturers   system list with all manufacturers
 * @param {String} type                     itemType to filter by
 * @returns {Array}                         filtered list
 */
function _filterManufacturersByType(unfilteredManufacturers, type) {
    return unfilteredManufacturers.filter((element) => {
        return element.allowedForItems.includes(type);
    });
}

export function getSystemGunManufacturers() {
    let manufacturerType = 'gun';
    return _filterManufacturersByType(getSystemManufacturers(), manufacturerType);
}

export function getSystemShieldManufacturers() {
    let manufacturerType = 'defense';
    return _filterManufacturersByType(getSystemManufacturers(), manufacturerType);
}

export function getSystemGrenadeManufacturers() {
    let manufacturerType = 'grenadeMod';
    return _filterManufacturersByType(getSystemManufacturers(), manufacturerType);
}

export function getSystemLifeDefenses() {
    return _findNonLifeDefense(getSystemDefenses());
}

export function getSystemRarities() {
    return getDefaultRarities();
}

