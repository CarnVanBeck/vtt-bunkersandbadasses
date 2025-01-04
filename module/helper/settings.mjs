import { BADASS, getDefaultDefenses, getDefaultElements, getDefaultGunTypes } from './config.mjs';
import DefenseConfig from '../applications/settings/defenseConfig.mjs';
import ElementConfig from '../applications/settings/elementConfig.mjs';
import ManufacturerConfig from '../applications/settings/manufacturerConfig.mjs';
import GunTypeConfig from '../applications/settings/gunTypeConfig.mjs';

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
    game.settings.registerMenu(BADASS.namespace, 'gunTypes', {
        name: 'SETTINGS.gunTypes.label',
        label: 'SETTINGS.gunTypes.config.label',
        hint: 'SETTINGS.gunTypes.hint',
        icon: 'fa-solid fa-gun',
        type: GunTypeConfig,
        restricted: true,
    });
    game.settings.register(BADASS.namespace, 'gunTypes', {
        name: 'SETTINGS.gunTypes.label',
        label: 'SETTINGS.gunTypes.label',
        hint: 'SETTINGS.gunTypes.hint',
        icon: 'fa-solid fa-gun',
        scope: 'world',
        config: false,
        type: Array,
        default: getDefaultGunTypes(),
    });
    // #endregion

    // #region Manufacturers
    game.settings.registerMenu(BADASS.namespace, 'manufacturers', {
        name: 'SETTINGS.manufacturers.label',
        label: 'SETTINGS.manufacturers.config.label',
        hint: 'SETTINGS.manufacturers.hint',
        icon: 'fa-solid fa-industry',
        type: ManufacturerConfig,
        restricted: true,
    });
    game.settings.register(BADASS.namespace, 'manufacturers', {
        name: 'SETTINGS.manufacturers.label',
        label: 'SETTINGS.manufacturers.label',
        hint: 'SETTINGS.manufacturers.hint',
        icon: 'fa-solid fa-industry',
        scope: 'world',
        config: false,
        type: Array,
        default: [],
    });
    // #endregion
}
