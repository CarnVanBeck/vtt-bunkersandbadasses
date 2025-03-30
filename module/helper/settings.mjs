/**
 * Settings Module for Bunkers and Badasses
 *
 * This module handles the registration of system settings, menus, and default configurations.
 * It ensures that the Game Master (GM) has full control over the system's customization options.
 *
 * Tiny Tina says: "Settings, sugar! Without 'em, your game is like a gun without bullets—pointless!"
 */

import { BADASS, getDefaultDefenses, getDefaultElements, getDefaultVaultHunterLevels } from './config.mjs';
import DefenseConfig from '../applications/settings/defenseConfig.mjs';
import ElementConfig from '../applications/settings/elementConfig.mjs';
import ManufacturerConfig from '../applications/settings/manufacturerConfig.mjs';
import GunTypeConfig from '../applications/settings/gunTypeConfig.mjs';
import SettingsIO from '../applications/settings/settingsIO.mjs';
import VaultHunterLevelConfig from '../applications/settings/vhLevelConfig.mjs';

/**
 * Register System Settings
 *
 * This function registers all settings and menus for the Bunkers and Badasses system.
 * It includes configurations for defenses, elements, manufacturers, gun types, and Vault Hunter levels.
 *
 * Moxxi says: "Customizing your game is like mixing a good drink—get the balance right, and it's unforgettable!"
 */
export function registerSettings() {
    // Migration Version
    game.settings.register(BADASS.namespace, 'migrationVersion', {
        name: 'Migration Version',
        scope: 'world',
        config: false,
        type: String,
        default: '',
    });

    // #region Defenses
    /**
     * Defenses Settings
     *
     * Mr. Torgue says: "DEFENSES! BECAUSE SOMETIMES YOU NEED TO NOT EXPLODE!"
     */
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
    /**
     * Elements Settings
     *
     * Lilith says: "Elements are the spice of life... and death."
     */
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
    /**
     * Gun Types Settings
     *
     * Tiny Tina says: "Guns, guns, guns! Customize 'em, sugar!"
     */
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
        default: [],
    });
    // #endregion

    // #region Manufacturers
    /**
     * Manufacturers Settings
     *
     * Marcus says: "No refunds! But you can customize your manufacturers."
     */
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

    // #region Vault Hunter Levels
    /**
     * Vault Hunter Levels Settings
     *
     * Claptrap says: "LEVEL UP! Because being a noob is soooo last season."
     */
    game.settings.registerMenu(BADASS.namespace, 'levels', {
        name: 'SETTINGS.levels.label',
        label: 'SETTINGS.levels.config',
        hint: 'SETTINGS.levels.hint',
        icon: 'fa-solid fa-user',
        type: VaultHunterLevelConfig,
        restricted: true,
    });
    game.settings.register(BADASS.namespace, 'levels', {
        name: 'SETTINGS.levels.label',
        label: 'SETTINGS.levels.label',
        hint: 'SETTINGS.levels.hint',
        icon: 'fa-solid fa-user',
        scope: 'world',
        config: false,
        type: Array,
        default: getDefaultVaultHunterLevels(),
    });
    // #endregion

    // #region Settings IO
    /**
     * Settings Import/Export
     *
     * Moxxi says: "Sharing is caring, sugar! Export your settings and spread the love."
     */
    game.settings.registerMenu(BADASS.namespace, 'settingsIO', {
        name: 'SETTINGS.io.label',
        label: 'SETTINGS.io.label',
        hint: 'SETTINGS.io.hintShort',
        icon: 'fa-solid fa-industry',
        type: SettingsIO,
        restricted: true,
    });
    // #endregion

    // #region Data Settings
    /**
     * Data Settings
     *
     * Tiny Tina says: "Data, data, data! Keep it clean and organized, sugar!"
     */
    game.settings.register(BADASS.namespace, 'actions', {
        scope: 'world',
        config: false,
        type: Array,
        default: [],
        onChange: (value) => {
            if (!game.settings.get(BADASS.namespace, 'actions')) {
                game.settings.set(BADASS.namespace, 'actions', []);
            }
        },
    });
    game.settings.register(BADASS.namespace, 'archetypes', {
        scope: 'world',
        config: false,
        type: Array,
        default: [],
        onChange: (value) => {
            if (!game.settings.get(BADASS.namespace, 'archetypes')) {
                game.settings.set(BADASS.namespace, 'archetypes', []);
            }
        },
    });
    game.settings.register(BADASS.namespace, 'classes', {
        scope: 'world',
        config: false,
        type: Array,
        default: [],
        onChange: (value) => {
            if (!game.settings.get(BADASS.namespace, 'classes')) {
                game.settings.set(BADASS.namespace, 'classes', []);
            }
        },
    });
    // #endregion
}
