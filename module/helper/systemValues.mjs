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

function filterManufacturersByType(unfilteredManufacturers, type) {
    return unfilteredManufacturers.filter(
        (element) => {return element.allowedForItems.includes(type);}
    );
}

export function getSystemGunManufacturers() {
    let manufacturerType = "gun";
    return filterManufacturersByType(getSystemManufacturers(), manufacturerType);
}

export function getSystemShieldManufacturers() {
    let manufacturerType = "shield";
    return filterManufacturersByType(getSystemManufacturers(), manufacturerType);
}

export function getSystemGrenadeManufacturers() {
    let manufacturerType = "grenade";
    return filterManufacturersByType(getSystemManufacturers(), manufacturerType);
}

export function getSystemRarities() {
    return getDefaultRarities();
}
