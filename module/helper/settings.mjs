import { BADASS, getDefaultDefenses, getDefaultElements, getDefaultGunTypes } from './config.mjs';
import DefenseConfig from '../applications/settings/defenseConfig.mjs';

export function registerSettings() {
    game.settings.register(BADASS.namespace, 'migrationVersion', {
        name: 'Migration Version',
        scope: 'world',
        config: false,
        type: String,
        default: '',
    });

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

    game.settings.register(BADASS.namespace, 'elements', {
        name: 'SETTINGS.elements.label',
        hint: 'SETTINGS.elements.hint',
        scope: 'world',
        config: true,
        type: Object,
        default: getDefaultElements(),
    });
    game.settings.register(BADASS.namespace, 'gunTypes', {
        name: 'SETTINGS.gunTypes.label',
        hint: 'SETTINGS.gunTypes.hint',
        scope: 'world',
        config: true,
        type: Object,
        default: getDefaultGunTypes(),
    });
    game.settings.register(BADASS.namespace, 'manufacturers', {
        name: 'SETTINGS.manufacturers.label',
        hint: 'SETTINGS.manufacturers.hint',
        scope: 'world',
        config: true,
        type: Object,
        default: '',
    });
}
