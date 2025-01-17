import { BADASS, getDefaultElements, getDefaultRarities } from "./config.mjs";

export function getSystemDefenses() {
    return game.settings.get(CONFIG.BADASS.namespace, 'defenseTypes');
}

export function getSystemElements() {
    return getDefaultElements();
}

export function getSystemGunTypes() {
    return game.settings.get(CONFIG.BADASS.namespace, 'gunTypes');
}

export function getSystemManufacturers() {
    return game.settings.get(CONFIG.BADASS.namespace, 'manufacturers');
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
    return unfilteredManufacturers.filter(
        (element) => {return element.allowedForItems.includes(type);}
    );
}

export function getSystemGunManufacturers() {
    let manufacturerType = "gun";
    return _filterManufacturersByType(getSystemManufacturers(), manufacturerType);
}

export function getSystemShieldManufacturers() {
    let manufacturerType = "shield";
    return _filterManufacturersByType(getSystemManufacturers(), manufacturerType);
}

export function getSystemGrenadeManufacturers() {
    let manufacturerType = "grenade";
    return _filterManufacturersByType(getSystemManufacturers(), manufacturerType);
}

export function getSystemRarities() {
    return getDefaultRarities();
}

