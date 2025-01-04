import * as dataModels from './module/data/_module.mjs';
import { VaultHunterActor } from './module/documents/actor/vhActor.mjs';
import { BadassItem } from './module/documents/badassItem.mjs';
import { BADASS } from './module/helper/config.mjs';
import { preloadHandlebarsTemplates, registerHandlebarHelpers } from './module/helper/handlebarHelper.mjs';
import { registerSettings } from './module/helper/settings.mjs';
import { GunCardSheet } from './module/sheets/item/gunCard.mjs';
import { ShieldCardSheet } from './module/sheets/item/shieldCard.mjs';
import { GrenadeCardSheet } from './module/sheets/item/grenadeCard.mjs';
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
    preloadHandlebarsTemplates();
    registerHandlebarHelpers();
});

Hooks.on('i18nInit', () => {
    console.log('i18nInit');
});
