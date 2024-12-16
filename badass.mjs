import * as dataModels from './module/data/_module.mjs';
import { BADASS } from './module/helper/config.mjs';
import { registerSettings } from './module/helper/settings.mjs';

Hooks.on('init', () => {
    CONFIG.BADASS = BADASS;
    registerSettings();

    // Apply Badass DataModels
    CONFIG.Actor.dataModels = {
        vaultHunter: dataModels.vaultHunter,
    };
    CONFIG.Item.dataModels = {
        gun: dataModels.gun,
    };
});
