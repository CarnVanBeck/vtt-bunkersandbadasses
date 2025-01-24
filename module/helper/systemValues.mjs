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

function _findGunAccuracyByType(gunList, gunType) {
    let foundGunType = {};
    for (let singleGunType of gunList) {
        if(singleGunType.key === gunType) {
            foundGunType = singleGunType;
        }
    }
    return foundGunType;
}

function _findGunLevelData(levelList, gunLevel) {
    let gunLevelData;
    for (let accuracy of levelList) {
        if((accuracy.start <= gunLevel)
            & (gunLevel <= accuracy.end)) 
        {
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
    let manufacturerType = "grenadeMod";
    return _filterManufacturersByType(getSystemManufacturers(), manufacturerType);
}

export function getSystemRarities() {
    return getDefaultRarities();
}

