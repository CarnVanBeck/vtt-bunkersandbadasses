import { BADASS, getDefaultElements } from '../../helper/config.mjs';
import BaseConfig from './baseConfig.mjs';

/**
 * A form application for configuring the available Elements in this world.
 * @extends {BaseConfig}
 */
export default class ElementConfig extends BaseConfig {
    constructor(...args) {
        super(...args);
        this.settingsName = 'elements';
        this.newEntryName = 'New Element';
        this.newEntryKey = 'el';
        this.defenses = null;
    }

    static DEFAULT_OPTIONS = {
        ...BaseConfig.DEFAULT_OPTIONS,
        id: `${BADASS.namespace}.elementConfig`,
        window: {
            ...BaseConfig.DEFAULT_OPTIONS.window,
            controls: [
                {
                    icon: 'fa-solid fa-database',
                    action: 'defaultElement',
                    label: 'SETTINGS.elements.default.label',
                },
            ],
            icon: 'fa-solid fa-wand-magic-sparkles',
            title: 'SETTINGS.elements.config.label',
        },
        actions: {
            ...BaseConfig.DEFAULT_OPTIONS.actions,
            defaultElement: ElementConfig.defaultElement,
        },
    };
    static PARTS = {
        config: {
            id: 'elementSidebar',
            template: `${BADASS.systemPath}/templates/settings/elementConfig.hbs`,
        },
        ...BaseConfig.PARTS,
    };

    /**
     * Set the context Elements to the default values defined by the system.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target   The clicked Html element.
     */
    static async defaultElement(e, target) {
        this.elements = getDefaultElements();
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
        this.defenses = this.defenses ?? game.settings.get(BADASS.namespace, 'defenses') ?? [];
        this.defenses.sort((a, b) => a.order - b.order);
        context.defenses = this.defenses;

        return context;
    }

    /**
     * @override
     */
    _setDefaultValues(entry) {
        entry.icon = '';
        entry.color = '';
        entry.strongAgainst = [];
        entry.weakAgainst = [];
        entry.ignores = [];
        return entry;
    }

    /**
     * @override
     */
    _validateEntry(selectedKey, entry) {
        return false;
    }
    // #endregion
}
