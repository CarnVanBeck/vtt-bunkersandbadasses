import Defense from '../data/custom/defense.mjs';
import Element from '../data/custom/element.mjs';
import GunType from '../data/custom/gunType.mjs';
import GunLevel from '../data/custom/gunLevel.mjs';
import GunAccuracy from '../data/custom/gunAccuracy.mjs';

export const BADASS = {};
BADASS.namespace = 'vtt-bunkersandbadasses';
BADASS.systemPath = 'systems/vtt-bunkersandbadasses';

export function getDefaultDefenses() {
    let shield = new Defense();
    shield.key = 'sld';
    shield.name = 'badass.defense.shield.label';
    shield.description = 'badass.defense.shield.hint';
    shield.requiresItem = true;
    shield.order = 0;
    let armor = new Defense();
    armor.key = 'arm';
    armor.name = 'badass.defense.armor.label';
    armor.description = 'badass.defense.armor.hint';
    armor.order = 10;
    let hp = new Defense();
    hp.key = 'hp';
    hp.name = 'badass.defense.hp.label';
    hp.description = 'badass.defense.hp.hint';
    hp.isLife = true;
    hp.order = 20;
    let generic = new Defense();
    generic.key = 'gen';
    generic.name = 'badass.defense.generic.label';
    generic.description = 'badass.defense.generic.hint';
    generic.isLife = true;
    generic.order = 30;
    return [shield, armor, hp, generic];
}

export function getDefaultElements() {
    let incendiary = new Element();
    incendiary.key = 'inc';
    incendiary.name = 'badass.element.incendiary.label';
    incendiary.description = 'badass.element.incendiary.hint';
    incendiary.strongAgainst = ['hp'];
    let corrosive = new Element();
    corrosive.key = 'cor';
    corrosive.name = 'badass.element.corrosive.label';
    corrosive.description = 'badass.element.corrosive.hint';
    corrosive.strongAgainst = ['arm'];
    let shock = new Element();
    shock.key = 'shk';
    shock.name = 'badass.element.shock.label';
    shock.description = 'badass.element.shock.hint';
    shock.strongAgainst = ['sld'];
    let explosive = new Element();
    explosive.key = 'xpl';
    explosive.name = 'badass.element.explosive.label';
    explosive.description = 'badass.element.explosive.hint';
    let radiation = new Element();
    radiation.key = 'rad';
    radiation.name = 'badass.element.radiation.label';
    radiation.description = 'badass.element.radiation.hint';
    radiation.ignores = ['sld', 'arm'];
    let cryo = new Element();
    cryo.key = 'cry';
    cryo.name = 'badass.element.cryo.label';
    cryo.description = 'badass.element.cryo.hint';

    return [incendiary, corrosive, shock, explosive, radiation, cryo];
}

export function getDefaultGunTypes() {
    let combatRifle = new GunType();
    combatRifle.key = 'cmb';
    combatRifle.name = 'badass.item.gun.types.combatRifle.label';
    combatRifle.description = 'badass.item.gun.types.combatRifle.hint';
    combatRifle.levels = combatRifleLevels();

    return [combatRifle];
}

export function getDefaultRarities() {
    let common = { name: 'common', key: 'common' };
    let uncommon = { name: 'uncommon', key: 'uncommon' };
    let rare = { name: 'rare', key: 'rare' };
    let epic = { name: 'epic', key: 'epic' };
    let legendary = { name: 'legendary', key: 'legendary' };
    return [common, uncommon, rare, epic, legendary];
}

function combatRifleLevels() {
    let level1 = new GunLevel();
    level1.start = 1;
    level1.end = 6;
    level1.damage = '1d6';
    level1.range = 6;
    level1.accuracy = [gunAccuracy(2, 7, 1, 0), gunAccuracy(8, 15, 3, 0), gunAccuracy(16, null, 3, 1)];

    let level2 = new GunLevel();
    level2.start = 7;
    level2.end = 12;
    level2.damage = '1d8';
    level2.range = 6;
    level2.accuracy = [gunAccuracy(2, 7, 2, 0), gunAccuracy(8, 15, 3, 0), gunAccuracy(16, null, 2, 1)];

    let level3 = new GunLevel();
    level3.start = 13;
    level3.end = 18;
    level3.damage = '1d8';
    level3.range = 6;
    level3.accuracy = [gunAccuracy(2, 7, 1, 1), gunAccuracy(8, 15, 2, 1), gunAccuracy(16, null, 2, 2)];

    let level4 = new GunLevel();
    level4.start = 19;
    level4.end = 24;
    level4.damage = '2d6';
    level4.range = 6;
    level4.accuracy = [gunAccuracy(2, 7, 1, 0), gunAccuracy(8, 15, 2, 1), gunAccuracy(16, null, 3, 1)];

    let level5 = new GunLevel();
    level5.start = 25;
    level5.end = 30;
    level5.damage = '1d10';
    level5.range = 6;
    level5.accuracy = [gunAccuracy(2, 7, 1, 2), gunAccuracy(8, 15, 2, 1), gunAccuracy(16, null, 2, 3)];

    return [level1, level2, level3, level4, level5];
}

function gunAccuracy(low, high, hits, crits) {
    let retVal = new GunAccuracy();
    retVal.low = low;
    retVal.high = high;
    retVal.hits = hits;
    retVal.crits = crits;
    return retVal;
}
