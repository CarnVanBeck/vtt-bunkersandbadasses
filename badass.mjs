import * as dataModels from './module/data/_module.mjs';
import { BADASS } from './module/helper/config.mjs';
import { registerSettings } from './module/helper/settings.mjs';
import { GunCardSheet } from './module/helper/gunCard.mjs';
import { preloadHandlebarsTemplates  } from './module/helper/preloadTemplates.mjs';

Hooks.on('init', () => {
    CONFIG.BADASS = BADASS;
    registerSettings();

    // Apply Badass DataModels
    CONFIG.Actor.dataModels = {
        vaultHunter: dataModels.vaultHunter,
    };
    CONFIG.Item.dataModels = {
        gun: dataModels.gun,
        redText: dataModels.redText,
        prefix: dataModels.prefix,
    };

    preloadHandlebarsTemplates();
    
});

/**
 * Register Item Sheets
 */
Items.registerSheet("bunkers-and-badasses", GunCardSheet, {
    types: ["gun"],
    makeDefault: true,
});

/**
 * Handlebar Helpers;
 */
Handlebars.registerHelper('getDiceCount', function (aString) {
    return aString.split('d')[0];
})

Handlebars.registerHelper('getDiceSize', function (aString) {
    return aString.split('d')[1];
})

Handlebars.registerHelper('equals', function(value, key, opts) {
	if (value === key) {
		return opts.fn()
	} else {
		return opts.inverse();
	}
});

Handlebars.registerHelper('unequals', function(value, key, opts) {
	if (value === key) {
		return opts.inverse()
	} else {
		return opts.fn();
	}
});