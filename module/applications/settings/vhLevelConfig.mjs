import BaseConfig from './baseConfig.mjs';
import { BADASS, getDefaultVaultHunterLevels } from '../../helper/config.mjs';

/**
 * A form application for configuring the available Defenses in this world.
 * @extends {BaseConfig}
 */
export default class VaultHunterLevelConfig extends BaseConfig {
    constructor(...args) {
        super(...args);
        this.settingsName = 'levels';
    }

    static DEFAULT_OPTIONS = {
        ...BaseConfig.DEFAULT_OPTIONS,
        id: `${BADASS.namespace}.levelConfig`,
        window: {
            ...BaseConfig.DEFAULT_OPTIONS.window,
            controls: [
                {
                    icon: 'fa-solid fa-database',
                    action: 'defaultLevels',
                    label: 'SETTINGS.levels.default',
                },
            ],
            icon: 'fa-solid fa-user',
            title: 'SETTINGS.levels.config',
        },
        actions: {
            ...BaseConfig.DEFAULT_OPTIONS.actions,
            defaultLevels: VaultHunterLevelConfig.defaultLevels,
            addLevel: VaultHunterLevelConfig.addLevel,
            removeLevel: VaultHunterLevelConfig.removeLevel,
        },
    };
    static PARTS = {
        config: {
            template: `${BADASS.systemPath}/templates/settings/vhLevelConfig.hbs`,
        },
        ...BaseConfig.PARTS,
    };

    /**
     * Set the context Defenses to the default values defined by the system.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target   The clicked Html element.
     */
    static async defaultLevels(e, target) {
        this.entries = getDefaultVaultHunterLevels();
        this.render();
    }
    static async addLevel() {
        this.entries.push({
            level: this.entries[this.entries.length - 1].level + 1,
            xpSegment: this.entries[this.entries.length - 1].xpSegment,
        });
        this.render();
    }

    static async removeLevel() {
        this.entries.pop();
        this.render();
    }

    // #region overrides

    /**
     * @override
     */
    _sortEntries(entries) {
        return entries.sort((a, b) => a.level - b.level);
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
    _castEntries(entries) {
        this.element.querySelectorAll('[data-level][data-property="xpSegment"]').forEach((lvl) => {
            let level = parseInt(lvl.getAttribute('data-level'));
            entries.find((entry) => entry.level === level).xpSegment = parseInt(lvl.value);
        });
        return entries;
    }
    // #endregion
}
