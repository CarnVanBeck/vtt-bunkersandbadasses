import { getDefaultDefenses, getDefaultElements, getDefaultGunTypes } from './config.mjs';

export function registerSettings() {
    game.settings.register('badass', 'defenses', {
        name: 'SETTINGS.defenses.label',
        hint: 'SETTINGS.defenses.hint',
        scope: 'world',
        config: true,
        type: String,
        default: JSON.stringify(getDefaultDefenses()),
    });
    game.settings.register('badass', 'elements', {
        name: 'SETTINGS.elements.label',
        hint: 'SETTINGS.elements.hint',
        scope: 'world',
        config: true,
        type: String,
        default: JSON.stringify(getDefaultElements()),
    });
    game.settings.register('badass', 'gunTypes', {
        name: 'SETTINGS.gunTypes.label',
        hint: 'SETTINGS.gunTypes.hint',
        scope: 'world',
        config: true,
        type: String,
        default: JSON.stringify(getDefaultGunTypes()),
    });
    game.settings.register('badass', 'manufacturers', {
        name: 'SETTINGS.manufacturers.label',
        hint: 'SETTINGS.manufacturers.hint',
        scope: 'world',
        config: true,
        type: String,
        default: '',
    });
}
