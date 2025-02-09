import GunAccuracy from '../../data/custom/gunAccuracy.mjs';
import GunLevel from '../../data/custom/gunLevel.mjs';
import GunType from '../../data/custom/gunType.mjs';
import { BADASS } from '../../helper/config.mjs';
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
        this.newEntryKey = 'gun';
        this.accuracies = null;
    }

    static DEFAULT_OPTIONS = {
        ...BaseConfig.DEFAULT_OPTIONS,
        id: `${BADASS.namespace}.gunTypeConfig`,
        window: {
            ...BaseConfig.DEFAULT_OPTIONS.window,
            icon: 'fa-solid fa-wand-magic-sparkles',
            title: 'SETTINGS.gunTypes.config.label',
        },
        actions: {
            ...BaseConfig.DEFAULT_OPTIONS.actions,
            addLevel: GunTypeConfig.addLevel,
            removeLevel: GunTypeConfig.removeLevel,
            addAccuracy: GunTypeConfig.addAccuracy,
            removeAccuracy: GunTypeConfig.removeAccuracy,
        },
    };
    static PARTS = {
        config: {
            id: 'gunTypeSidebar',
            template: `${BADASS.systemPath}/templates/settings/gunTypeConfig.hbs`,
        },
        ...BaseConfig.PARTS,
    };

    static addLevel(e, target) {
        if (!this.selectedEntry.levels) this.selectedEntry.levels = [];
        let level = new GunLevel();
        level.accuracy = this.accuracies.map((acc) => {
            let newAcc = new GunAccuracy();
            newAcc.hits = 0;
            newAcc.crits = 0;
            return newAcc;
        });
        this.selectedEntry.levels.push(level);
        this.render();
    }

    static removeLevel(e, target) {
        if (this.selectedEntry.levels.length > 2) {
            this.selectedEntry.levels.pop();
        } else {
            ui.notifications.warn('You cannot remove the last level.');
        }
        this.render();
    }

    static addAccuracy(e, target) {
        this.selectedEntry.levels.forEach((level) => {
            level.accuracy.push(new GunAccuracy());
        });
        this.render();
    }

    static removeAccuracy(e, target) {
        if (this.accuracies.length > 1) {
            this.selectedEntry.levels.forEach((level) => {
                level.accuracy.pop();
            });
        } else {
            ui.notifications.warn('You cannot remove the last accuracy.');
        }
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
        context.hasAccuracies = this.accuracies ? true : false;
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
                val = target.value === '' ? null : parseInt(target.value, 10);
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

    /**
     * @override
     */
    _castEntries(entries) {
        return entries.map((entry) => {
            entry.levels = entry.levels.map((level) => {
                level.accuracy = level.accuracy.map((acc) => new GunAccuracy(acc));
                return new GunLevel(level);
            });
            return new GunType(entry);
        });
    }
    // #endregion
}
