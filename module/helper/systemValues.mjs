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

export function getSystemRarities() {
    return getDefaultRarities();
}
