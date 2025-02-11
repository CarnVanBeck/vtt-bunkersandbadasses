import BaseConfig from './baseConfig.mjs';
import { BADASS, getDefaultDefenses } from '../../helper/config.mjs';
import Defense from '../../data/custom/system/defense.mjs';

/**
 * A form application for configuring the available Defenses in this world.
 * @extends {BaseConfig}
 */
export default class DefenseConfig extends BaseConfig {
    constructor(...args) {
        super(...args);
        this.settingsName = 'defenses';
        this.newEntryName = 'New Defense';
        this.newEntryKey = 'def';
    }

    static DEFAULT_OPTIONS = {
        ...BaseConfig.DEFAULT_OPTIONS,
        id: `${BADASS.namespace}.defenseConfig`,
        window: {
            ...BaseConfig.DEFAULT_OPTIONS.window,
            controls: [
                {
                    icon: 'fa-solid fa-database',
                    action: 'defaultDefense',
                    label: 'SETTINGS.defenses.default.label',
                },
            ],
            icon: 'fa-solid fa-shield-heart',
            title: 'SETTINGS.defenses.config.label',
        },
        actions: {
            ...BaseConfig.DEFAULT_OPTIONS.actions,
            defaultDefense: DefenseConfig.defaultDefense,
        },
    };
    static PARTS = {
        config: {
            id: 'defenseSidebar',
            template: `${BADASS.systemPath}/templates/settings/defenseConfig.hbs`,
        },
        ...BaseConfig.PARTS,
    };
    /**
     * Get a unique order for a new defense.
     * @param {Defense[]} defenses  The array of existing defenses.
     * @returns {Number}            A unique order for the new defense.
     * @private
     * @static
     */
    static _getUniqueOrder(defenses) {
        let index = 0;
        let order = index;
        while (defenses.some((defense) => defense.order === order)) {
            index++;
            order = index;
        }
        return order;
    }

    /**
     * Set the context Defenses to the default values defined by the system.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target   The clicked Html element.
     */
    static async defaultDefense(e, target) {
        this.entries = getDefaultDefenses();
        this.selectedEntry = null;
        this.render();
    }

    // #region overrides

    /**
     * @override
     */
    _sortEntries(entries) {
        return entries.sort((a, b) => a.order - b.order);
    }

    /**
     * @override
     */
    _setAdditionalContext(context) {
        return context;
    }

    /**
     * @override
     */
    _setDefaultValues(entry) {
        entry.order = DefenseConfig._getUniqueOrder(this.entries);
        return entry;
    }

    /**
     * @override
     */
    _validateEntry(selectedKey, entry) {
        let hasErrors = false;
        // Check if the defense order is unique.
        if (this.entries.some((def) => def.key !== selectedKey && def.order === entry.order)) {
            ui.notifications.error(game.i18n.localize('SETTINGS.errors.order.unique') + `: ${entry.order}`);
            hasErrors = true;
        }
        return hasErrors;
    }

    /**
     * @override
     */
    _castEntries(entries) {
        return entries.map((entry) => {
            return new Defense(entry);
        });
    }
    // #endregion
}
