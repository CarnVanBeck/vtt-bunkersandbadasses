import { BADASS, getDefaultGunTypes } from '../../helper/config.mjs';
import BaseConfig from './baseConfig.mjs';

/**
 * A form application for configuring the available GunTypes in this world.
 * @extends {BaseConfig}
 */
export default class GunTypeConfig extends BaseConfig {
    constructor(...args) {
        super(...args);
        this.settingsName = 'gunTypes';
        this.newEntryName = 'New GunType';
        this.newEntryKey = 'man';
        this.accuracies = null;
    }

    static DEFAULT_OPTIONS = {
        ...BaseConfig.DEFAULT_OPTIONS,
        id: `${BADASS.namespace}.gunTypeConfig`,
        window: {
            ...BaseConfig.DEFAULT_OPTIONS.window,
            controls: [
                {
                    icon: 'fa-solid fa-database',
                    action: 'defaultGunType',
                    label: 'SETTINGS.gunTypes.default.label',
                },
            ],
            icon: 'fa-solid fa-wand-magic-sparkles',
            title: 'SETTINGS.gunTypes.config.label',
        },
        actions: {
            ...BaseConfig.DEFAULT_OPTIONS.actions,
            defaultGunType: GunTypeConfig.defaultGunType,
        },
    };
    static PARTS = {
        config: {
            id: 'gunTypeSidebar',
            template: `${BADASS.systemPath}/templates/settings/gunTypeConfig.hbs`,
        },
        ...BaseConfig.PARTS,
    };

    /**
     * Set the context Defenses to the default values defined by the system.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target   The clicked Html element.
     */
    static async defaultGunType(e, target) {
        this.entries = getDefaultGunTypes();
        this.selectedEntry = null;
        this.render();
    }

    // #region overrides

    /**
     * @override
     */
    _sortEntries(entries) {
        return entries.sort((a, b) => game.i18n.localize(a.name).localeCompare(game.i18n.localize(b.name)));
    }

    /**
     * @override
     */
    _setAdditionalContext(context) {
        this.accuracies = this.entries[0]?.levels[0]?.accuracy;
        context.accuracies = this.accuracies;
        return context;
    }

    /**
     * @override
     */
    _setDefaultValues(entry) {
        entry.icon = '';
        entry.levels = [];
        return entry;
    }

    /**
     * @override
     */
    _validateEntry(selectedKey, entry) {
        return false;
    }

    /**
     * @override
     */
    _modifyEntry(entry) {
        entry.levels = { ...this.selectedEntry.levels };
        this.element.querySelectorAll('[data-sub-property]').forEach((target) => {
            let prop = target.getAttribute('data-sub-property');
            let levelIndex = target.getAttribute('data-level');
            let accuracyIndex = target.getAttribute('data-accuracy');
            let val;
            if (target.type === 'checkbox') {
                val = target.checked;
            } else if (target.type === 'number') {
                val = parseInt(target.value, 10);
            } else {
                val = target.value;
            }

            if (accuracyIndex) {
                if (levelIndex === 'all') {
                    this.selectedEntry.levels.forEach((x, index) => {
                        entry.levels[index].accuracy[accuracyIndex][prop] = val;
                    });
                } else {
                    entry.levels[levelIndex].accuracy[accuracyIndex][prop] = val;
                }
            } else if (levelIndex) {
                entry.levels[levelIndex][prop] = val;
            }
        });
        return entry;
    }
    // #endregion
}
