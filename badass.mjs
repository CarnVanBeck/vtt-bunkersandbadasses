import * as dataModels from './module/data/_module.mjs';
import { VaultHunterActor } from './module/documents/actor/vhActor.mjs';
import { BadassItem } from './module/documents/badassItem.mjs';
import { BADASS, getDefaultElements } from './module/helper/config.mjs';
import { preloadHandlebarsTemplates } from './module/helper/hbsParts.mjs';
import { registerSettings } from './module/helper/settings.mjs';
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
