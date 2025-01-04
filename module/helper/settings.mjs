import { BADASS, getDefaultDefenses, getDefaultElements, getDefaultGunTypes } from './config.mjs';
import DefenseConfig from '../applications/settings/defenseConfig.mjs';
import ElementConfig from '../applications/settings/elementConfig.mjs';

export function registerSettings() {
    game.settings.register(BADASS.namespace, 'migrationVersion', {
        name: 'Migration Version',
        scope: 'world',
        config: false,
        type: String,
        default: '',
    });

    // #region Defenses
    game.settings.registerMenu(BADASS.namespace, 'defenses', {
        name: 'SETTINGS.defenses.label',
        label: 'SETTINGS.defenses.config.label',
        hint: 'SETTINGS.defenses.hint',
        icon: 'fa-solid fa-shield-heart',
        type: DefenseConfig,
        restricted: true,
    });
    game.settings.register(BADASS.namespace, 'defenses', {
        name: 'SETTINGS.defenses.label',
        label: 'SETTINGS.defenses.label',
        hint: 'SETTINGS.defenses.hint',
        icon: 'fa-solid fa-shield-heart',
        scope: 'world',
        config: false,
        type: Array,
        default: getDefaultDefenses(),
    });
    // #endregion

    // #region Elements
    game.settings.registerMenu(BADASS.namespace, 'elements', {
        name: 'SETTINGS.elements.label',
        label: 'SETTINGS.elements.config.label',
        hint: 'SETTINGS.elements.hint',
        icon: 'fa-solid fa-wand-magic-sparkles',
        type: ElementConfig,
        restricted: true,
    });
    game.settings.register(BADASS.namespace, 'elements', {
        name: 'SETTINGS.elements.label',
        label: 'SETTINGS.elements.label',
        hint: 'SETTINGS.elements.hint',
        icon: 'fa-solid fa-wand-magic-sparkles',
        scope: 'world',
        config: false,
        type: Array,
        default: getDefaultElements(),
    });
    // #endregion

    // #region Gun Types
    game.settings.register(BADASS.namespace, 'gunTypes', {
        name: 'SETTINGS.gunTypes.label',
        hint: 'SETTINGS.gunTypes.hint',
        scope: 'world',
        config: true,
        type: Array,
        default: getDefaultGunTypes(),
    });
    // #endregion

    // #region Manufacturers
    game.settings.register(BADASS.namespace, 'manufacturers', {
        name: 'SETTINGS.manufacturers.label',
        hint: 'SETTINGS.manufacturers.hint',
        scope: 'world',
        config: true,
        type: Array,
        default: '',
    });
    // #endregion
}
