import * as dataModels from './module/data/_module.mjs';
import { VaultHunterActor } from './module/documents/actor/vhActor.mjs';
import { BadassItem } from './module/documents/badassItem.mjs';
import { BADASS, getDefaultElements } from './module/helper/config.mjs';
import { preloadHandlebarsTemplates } from './module/helper/preloadTemplates.mjs';
import { registerSettings } from './module/helper/settings.mjs';
import { GunCardSheet } from './module/sheets/gunCard.mjs';
import { ShieldCardSheet } from './module/sheets/shieldCard.mjs';
import { GrenadeCardSheet } from './module/sheets/grenadeCard.mjs';
import { BadassActorSheet } from './module/sheets/actorSheet.mjs';

Hooks.on('init', () => {
    console.log('init');
    CONFIG.BADASS = BADASS;
    registerSettings();

    // Apply Badass DataModels
    CONFIG.Actor.dataModels = {
        vaultHunter: dataModels.vaultHunter,
    };
    CONFIG.Actor.documentClass = VaultHunterActor;
    CONFIG.Item.dataModels = {
        gun: dataModels.gun,
        redText: dataModels.redText,
        prefix: dataModels.prefix,
    };

    CONFIG.Item.documentClass = BadassItem;

    // Manufactured Item Sheets
    Items.registerSheet('bunkers-and-badasses', GunCardSheet, {
        types: ['gun'],
        makeDefault: true,
    });
    Items.registerSheet('bunkers-and-badasses', ShieldCardSheet, {
        types: ['shield'],
        makeDefault: true,
    });
    Items.registerSheet('bunkers-and-badasses', GrenadeCardSheet, {
        types: ['grenadeMod'],
        makeDefault: true,
    });

    // Actor Sheets
    Actors.unregisterSheet('core', ActorSheet);
    Actors.registerSheet(BADASS.namespace, BadassActorSheet, {
        makeDefault: true,
        label: 'badass.sheets.vaultHunter',
    });
    return preloadHandlebarsTemplates();
});

Hooks.on('i18nInit', () => {
    console.log('i18nInit');
});

/**
 * Handlebar Helpers;
 */
Handlebars.registerHelper('getDiceCount', function (aString) {
    return aString.split('d')[0];
});

Handlebars.registerHelper('getDiceSize', function (aString) {
    return aString.split('d')[1];
});

Handlebars.registerHelper('equals', function (value, key, opts) {
    if (value === key) {
        return opts.fn();
    } else {
        return opts.inverse();
    }
});

Handlebars.registerHelper('unequals', function (value, key, opts) {
    if (value === key) {
        return opts.inverse();
    } else {
        return opts.fn();
    }
});
