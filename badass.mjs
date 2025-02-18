import * as dataModels from './module/data/_module.mjs';
import { VaultHunterActor } from './module/documents/actor/vhActor.mjs';
import { BadassItem } from './module/documents/badassItem.mjs';
import { BADASS } from './module/helper/config.mjs';
import { preloadHandlebarsTemplates, registerHandlebarHelpers } from './module/helper/handlebarHelper.mjs';
import { registerSettings } from './module/helper/settings.mjs';
import { GunCardSheet } from './module/sheets/item/gunCard.mjs';
import { GunCardSheetV2 } from './module/sheets/item/gunCardV2.mjs';
import { ShieldCardSheet } from './module/sheets/item/shieldCard.mjs';
import { GrenadeCardSheet } from './module/sheets/item/grenadeCard.mjs';
import { BadassActorSheet } from './module/sheets/actorSheet.mjs';
import VaultHunterSheetV2 from './module/applications/actor/vaultHunterSheetV2.mjs';

Hooks.on('init', () => {
    console.log('init');
    CONFIG.BADASS = BADASS;
    registerSettings();

    // Apply Badass DataModels
    CONFIG.Actor.dataModels = {
        vaultHunter: dataModels.vaultHunter,
        nonVaultHunter: dataModels.baseActor,
    };
    CONFIG.Actor.documentClass = VaultHunterActor;
    CONFIG.Item.dataModels = {
        gun: dataModels.gun,
        defense: dataModels.defense,
        grenadeMod: dataModels.grenadeMod,
        potion: dataModels.potion,
        questItem: dataModels.questItem,
        relic: dataModels.relic,
    };

    CONFIG.Item.documentClass = BadassItem;

    // Manufactured Item Sheets
    Items.registerSheet(CONFIG.BADASS.namespace, GunCardSheet, {
        types: ['gun'],
        makeDefault: true,
    });
    Items.registerSheet(CONFIG.BADASS.namespace, GunCardSheetV2, {
        types: ['gun'],
        makeDefault: false,
    });
    Items.registerSheet(CONFIG.BADASS.namespace, ShieldCardSheet, {
        types: ['defense'],
        makeDefault: true,
    });
    Items.registerSheet(CONFIG.BADASS.namespace, GrenadeCardSheet, {
        types: ['grenadeMod'],
        makeDefault: true,
    });

    // Actor Sheets
    Actors.unregisterSheet('core', ActorSheet);

    // Actors.registerSheet(BADASS.namespace, BadassActorSheet, {
    //     makeDefault: true,
    //     label: 'badass.sheets.vaultHunter',
    // });
    DocumentSheetConfig.registerSheet(Actor, CONFIG.BADASS.namespace, VaultHunterSheetV2, {
        types: ['vaultHunter'],
        makeDefault: true,
        label: 'SHEETS.actor.vaultHunter.label',
    });

    preloadHandlebarsTemplates();
    registerHandlebarHelpers();
});

Hooks.on('i18nInit', () => {
    console.log('i18nInit');
});
