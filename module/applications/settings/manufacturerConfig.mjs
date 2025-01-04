import { BADASS } from '../../helper/config.mjs';
import BaseConfig from './baseConfig.mjs';

/**
 * A form application for configuring the available Manufacturers in this world.
 * @extends {BaseConfig}
 */
export default class ManufacturerConfig extends BaseConfig {
    constructor(...args) {
        super(...args);
        this.settingsName = 'manufacturers';
        this.newEntryName = 'New Manufacturer';
        this.newEntryKey = 'man';
        this.itemTypes = null;
        this.gunTypes = null;
    }

    static DEFAULT_OPTIONS = {
        ...BaseConfig.DEFAULT_OPTIONS,
        id: `${BADASS.namespace}.manufacturerConfig`,
        window: {
            ...BaseConfig.DEFAULT_OPTIONS.window,
            controls: [
                {
                    icon: 'fa-solid fa-database',
                    action: 'defaultManufacturer',
                    label: 'SETTINGS.manufacturers.default.label',
                },
            ],
            icon: 'fa-solid fa-wand-magic-sparkles',
            title: 'SETTINGS.manufacturers.config.label',
        },
        actions: {
            ...BaseConfig.DEFAULT_OPTIONS.actions,
            defaultManufacturer: ManufacturerConfig.defaultManufacturer,
        },
    };
    static PARTS = {
        config: {
            id: 'manufacturerSidebar',
            template: `${BADASS.systemPath}/templates/settings/manufacturerConfig.hbs`,
        },
        ...BaseConfig.PARTS,
    };

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
        let excludedTypes = ['action', 'class', 'prefix', 'redText', 'skill'];
        this.itemTypes = [];
        for (let type in game.system.documentTypes.Item) {
            if (excludedTypes.includes(type)) {
                continue;
            }
            let itemType = {
                type: type,
                name: `TYPES.Item.${type}`,
            };
            this.itemTypes.push(itemType);
        }
        this.itemTypes.sort((a, b) => game.i18n.localize(a.name).localeCompare(game.i18n.localize(b.name)));
        context.itemTypes = this.itemTypes;

        this.gunTypes = this.gunTypes ?? game.settings.get(BADASS.namespace, 'gunTypes') ?? [];
        this.gunTypes.sort((a, b) => game.i18n.localize(a.name).localeCompare(game.i18n.localize(b.name)));
        context.gunTypes = this.gunTypes;

        return context;
    }

    /**
     * @override
     */
    _setDefaultValues(entry) {
        entry.icon = '';
        entry.allowedForItems = [];
        entry.allowedForGunTypes = [];
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
