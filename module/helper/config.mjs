/**
 * Configuration module for the Bunkers and Badasses system.
 * This file contains the default configurations for defenses, elements, rarities, and Vault Hunter levels.
 *
 * Tiny Tina says: "This is where the magic happens, sugar! Shields, elements, and all that juicy loot logic!"
 */

import Defense from '../data/custom/system/defense.mjs';
import Element from '../data/custom/system/element.mjs';

export const BADASS = {};
BADASS.namespace = 'vtt-bunkersandbadasses';
BADASS.systemPath = 'systems/vtt-bunkersandbadasses';

/**
 * Get the default defenses used in the system.
 * These defenses define how damage interacts with actors and items.
 *
 * @returns {Array<Defense>} An array of Defense objects.
 *
 * Mr. Torgue says: "DEFENSES! BECAUSE SOMETIMES YOU NEED TO NOT EXPLODE!"
 */
export function getDefaultDefenses() {
    let shield = new Defense();
    shield.key = 'sld';
    shield.name = 'Shield';
    shield.description = 'Used by Shields and takes double damage from Shock damage.';
    shield.requiresItem = true;
    shield.order = 0;

    let armor = new Defense();
    armor.key = 'arm';
    armor.name = 'Armor';
    armor.description = 'Used for actors with the Armored trait and takes double damage from Corrosive damage.';
    armor.order = 10;

    let hp = new Defense();
    hp.key = 'hp';
    hp.name = 'Health';
    hp.description = 'Used for actors with the Flesh trait and takes double damage from Incendiary damage.';
    hp.isLife = true;
    hp.order = 20;

    let generic = new Defense();
    generic.key = 'gen';
    generic.name = 'Health';
    generic.description = "Used if the actor doesn't have any weaknesses against any element.";
    generic.isLife = true;
    generic.order = 30;

    return [shield, armor, hp, generic];
}

/**
 * Get the default elements used in the system.
 * Elements define the type of damage and their interactions with defenses.
 *
 * @returns {Array<Element>} An array of Element objects.
 *
 * Lilith says: "Elements are the spice of life... and death."
 */
export function getDefaultElements() {
    let incendiary = new Element();
    incendiary.key = 'inc';
    incendiary.name = 'Incendiary';
    incendiary.description = '';
    incendiary.strongAgainst = ['hp'];

    let corrosive = new Element();
    corrosive.key = 'cor';
    corrosive.name = 'Corrosive';
    corrosive.description = '';
    corrosive.strongAgainst = ['arm'];

    let shock = new Element();
    shock.key = 'shk';
    shock.name = 'Shock';
    shock.description = '';
    shock.strongAgainst = ['sld'];

    let explosive = new Element();
    explosive.key = 'xpl';
    explosive.name = 'Explosive';
    explosive.description = '';

    let radiation = new Element();
    radiation.key = 'rad';
    radiation.name = 'Radiation';
    radiation.description = '';
    radiation.ignores = ['sld', 'arm'];

    let cryo = new Element();
    cryo.key = 'cry';
    cryo.name = 'Cryo';
    cryo.description = '';

    return [incendiary, corrosive, shock, explosive, radiation, cryo];
}

/**
 * Get the default rarities for items in the system.
 * Rarities define the quality and uniqueness of items.
 *
 * @returns {Array<Object>} An array of rarity objects.
 *
 * Moxxi says: "Rarity is like a good drink—common ones are fine, but the legendary ones? Oh, sugar, they’re unforgettable."
 */
export function getDefaultRarities() {
    return [
        { name: 'common', key: 'common', icon: `${BADASS.systemPath}/assets/standalone/rarity/common.svg` },
        { name: 'uncommon', key: 'uncommon', icon: `${BADASS.systemPath}/assets/standalone/rarity/uncommon.svg` },
        { name: 'rare', key: 'rare', icon: `${BADASS.systemPath}/assets/standalone/rarity/rare.svg` },
        { name: 'epic', key: 'epic', icon: `${BADASS.systemPath}/assets/standalone/rarity/epic.svg` },
        { name: 'legendary', key: 'legendary', icon: `${BADASS.systemPath}/assets/standalone/rarity/legendary.svg` },
    ];
}

/**
 * Get the default Vault Hunter levels and their XP requirements.
 * Levels define the progression system for characters.
 *
 * @returns {Array<Object>} An array of level objects with XP segments.
 *
 * Claptrap says: "LEVEL UP! Because being a noob is soooo last season."
 */
export function getDefaultVaultHunterLevels() {
    return [
        { level: 1, xpSegment: 100 },
        { level: 2, xpSegment: 100 },
        { level: 3, xpSegment: 100 },
        { level: 4, xpSegment: 150 },
        { level: 5, xpSegment: 150 },
        { level: 6, xpSegment: 200 },
        { level: 7, xpSegment: 200 },
        { level: 8, xpSegment: 200 },
        { level: 9, xpSegment: 250 },
        { level: 10, xpSegment: 250 },
        { level: 11, xpSegment: 300 },
        { level: 12, xpSegment: 300 },
        { level: 13, xpSegment: 300 },
        { level: 14, xpSegment: 350 },
        { level: 15, xpSegment: 350 },
        { level: 16, xpSegment: 400 },
        { level: 17, xpSegment: 400 },
        { level: 18, xpSegment: 400 },
        { level: 19, xpSegment: 450 },
        { level: 20, xpSegment: 450 },
        { level: 21, xpSegment: 500 },
        { level: 22, xpSegment: 500 },
        { level: 23, xpSegment: 500 },
        { level: 24, xpSegment: 550 },
        { level: 25, xpSegment: 550 },
        { level: 26, xpSegment: 600 },
        { level: 27, xpSegment: 600 },
        { level: 28, xpSegment: 600 },
        { level: 29, xpSegment: 650 },
        { level: 30, xpSegment: 650 },
    ];
}
