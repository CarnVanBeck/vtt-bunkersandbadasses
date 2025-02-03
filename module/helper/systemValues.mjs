import { BADASS, getDefaultElements, getDefaultRarities } from "./config.mjs";

export function getSystemDefenses() {
    return game.settings.get(CONFIG.BADASS.namespace, 'defenseTypes');
}

export function getSystemDice() {
    return [
        {name: "d4", key:"d4", icon:"systems/vtt-bunkersandbadasses/assets/standalone/dice/d4.svg"},
        {name: "d6", key:"d6", icon:"systems/vtt-bunkersandbadasses/assets/standalone/dice/d6.svg"},
        {name: "d8", key:"d8", icon:"systems/vtt-bunkersandbadasses/assets/standalone/dice/d8.svg"},
        {name: "d10", key:"d10", icon:"systems/vtt-bunkersandbadasses/assets/standalone/dice/d10.svg"},
        {name: "d12", key:"d12", icon:"systems/vtt-bunkersandbadasses/assets/standalone/dice/d12.svg"},
        {name: "d20", key:"d20", icon:"systems/vtt-bunkersandbadasses/assets/standalone/dice/d20.svg"},
    ];
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

export function getDefaultAccuracy() {
    return [
        {low: 2, high: 7, hits: 0, crits: 0},
        {low: 8, high: 15, hits: 0, crits: 0},
        {low: 16, 			hits: 0, crits: 0}
    ];
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

