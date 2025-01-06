const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
import { BADASS } from '../../helper/config.mjs';

/**
 * A base form application for configuring stuff inside the settings
 * @param {Object} selectedEntry  The Entry being configured.
 * @param {Object[]} entries      The Entries that are stored in the game settings.
 * @param {String} settingsname   The name of the settings that will be used to retrieve and store the entries
 * @param {String} newEntryName   The name of the new Entry.
 * @param {String} newEntryKey    The key of the new Entry.
 * @extends {ApplicationV2}
 */
export default class BaseConfig extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(...args) {
        super(...args);
        this.selectedEntry = null;
        this.entries = null;
        this.settingsName = null;
        this.newEntryName = null;
        this.newEntryKey = null;
    }

    static DEFAULT_OPTIONS = {
        form: {
            closeOnSubmit: true,
            handler: BaseConfig.#onSubmitForm,
        },
        position: {
            width: 800,
            height: 'auto',
        },
        tag: 'form',
        window: {
            contentClasses: ['badass', 'settings'],
        },
        actions: {
            addEntry: BaseConfig.addEntry,
            editEntry: BaseConfig.editEntry,
            removeEntry: BaseConfig.removeEntry,
            saveEntry: BaseConfig.saveEntry,
        },
    };
    static PARTS = {
        footer: {
            template: 'templates/generic/form-footer.hbs',
        },
    };

    /**
     * The title of the Entry Config form.
     * @type {String}
     * @readonly
     */
    get title() {
        return game.i18n.localize(this.options.window.title);
    }

    /**
     * Prepare the context data for the Entry Config form.
     * @param {Object} options  The options provided to the application.
     * @returns {Object}        The data used to render the Entry Config form.
     * @override
     * @protected
     */
    async _prepareContext(options) {
        const context = {};
        context.CONFIG = CONFIG.BADASS;
        context.selectedEntry = this.selectedEntry;

        this.entries = this.entries ?? game.settings.get(BADASS.namespace, this.settingsName) ?? [];
        // special stuff for gunTypes
        // Convert levels property from object to array loaded from settings because foundry saves the levels as an object
        this.entries = this.entries.map((entry) => {
            if (entry.levels && typeof entry.levels === 'object' && !Array.isArray(entry.levels)) {
                entry.levels = Object.values(entry.levels);
            }
            return entry;
        });
        this.entries = this._sortEntries(this.entries);
        context.entries = this.entries;

        context.buttons = [{ type: 'submit', icon: 'fa-solid fa-save', label: 'SETTINGS.Save' }];

        return this._setAdditionalContext(context);
    }

    // #region Add Entry
    /**
     * Creates a new object to add to the entries and then calls the
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target   The clicked Html element.
     */
    static addEntry(e, target) {
        let newEntry = {
            key: this._generateUniqueKey(this.entries),
            name: this.newEntryName,
            description: '',
        };
        newEntry = this._setDefaultValues(newEntry);

        this.entries.push(newEntry);
        this.selectedEntry = newEntry;
        this.render();
    }
    /**
     * Generate a unique key for a new entry.
     * @param {Entry[]} entries  The array of existing entries.
     * @returns {String}         A unique key for the new entry.
     */
    _generateUniqueKey(entries) {
        let index = 1;
        let key = this.newEntryKey + index;
        while (entries.some((entry) => entry.key === key)) {
            index++;
            key = this.newEntryKey + index;
        }
        return key;
    }
    // #endregion

    // #region Edit Entry
    /**
     * Show the values of the clicked Entry in the form.
     * @param {BaseConfig} this  Altough it's static, this will still be the current BaseConfig instance.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The clicked Entry List Item.
     */
    static editEntry(e, target) {
        let key = target.getAttribute('data-key');
        this.selectedEntry = this.entries.find((entry) => entry.key === key);
        this._editEntry();
        this.render();
    }
    // #endregion

    // #region Remove Entry
    /**
     * Remove the selected Entry from the currently configured Entries.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target   The clicked Html element.
     * @static
     */
    static removeEntry(e, target) {
        if (this.selectedEntry === null) return;

        let entryIndex = this.entries.findIndex((entry) => entry.key === this.selectedEntry.key);
        if (entryIndex !== -1) {
            this.entries.splice(entryIndex, 1);
            this.selectedEntry = null;
            this.render();
        }
    }
    // #endregion

    // #region Save Entry
    /**
     * Save the values of the currently selected Entry back into the currently configured Entries.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target   The clicked Html element.
     * @static
     */
    static saveEntry(e, target) {
        let key = this.selectedEntry.key;
        let entryIndex = this.entries.findIndex((entry) => entry.key === key);
        let newEntry = {};
        let needsOverrideEntryModification = false;
        this.element.querySelectorAll('[data-property]').forEach((target) => {
            let prop = target.getAttribute('data-property');
            // if either a '.' or '[' is in the property, it should not be written into the newEntry
            // but we also need to inform that the subclass will need to handle that stuff
            if (prop.includes('.') || prop.includes('[')) {
                needsOverrideEntryModification = true;
            } else {
                if (target.type === 'checkbox') {
                    newEntry[prop] = target.checked;
                } else if (target.type === 'number') {
                    newEntry[prop] = target.value === '' ? null : parseInt(target.value, 10);
                } else {
                    newEntry[prop] = target.value;
                }
            }
        });
        newEntry = this._modifyEntry(newEntry, needsOverrideEntryModification);
        if (this._validateEntryKey(key, newEntry)) return;
        if (this._validateEntry(key, newEntry)) return;

        this.entries[entryIndex] = newEntry;
        this.selectedEntry = newEntry;

        this.render();
    }
    /**
     * Validate the Entry data and show error messages if necessary.
     * @param {String} selectedKey  The key of the selected Entry.
     * @param {Entry} entry         The Entry being validated.
     * @returns {Boolean}           Whether the Entry data is valid.
     * @private
     * @static
     */
    _validateEntryKey(selectedKey, entry) {
        let hasErrors = false;

        // Check if the entry name is unique but exclude the selectedKey to only check if it has changed.
        if (this.entries.some((def) => def.key !== selectedKey && def.key === entry.key)) {
            ui.notifications.error(game.i18n.localize('SETTINGS.errors.key.unique') + `: ${entry.key}`);
            hasErrors = true;
        }
        return hasErrors;
    }
    // #endregion

    /**
     * Saves the entries back into the game.settings
     * @param {SubmitEvent} event          The submission event.
     * @param {HTMLFormElement} form       The submitted form element.
     * @param {FormDataExtended} formData  The submitted form data.
     * @private
     */
    static async #onSubmitForm(e, form, formData) {
        let entries = this.entries;
        entries = this._castEntries(this.entries);
        await game.settings.set(BADASS.namespace, this.settingsName, entries);
    }

    // #region Abstracts

    /**
     * Sort the entries by a property.
     * @param {Object[]} entries  The entries to sort.
     * @returns {Object[]}        The sorted entries.
     * @private
     * @abstract
     * @example
     * return entries.sort((a, b) => a.order - b.order);
     * @example
     * return entries.sort((a, b) => game.i18n.localize(a.name).localeCompare(game.i18n.localize(b.name)));
     */
    _sortEntries(entries) {
        throw new Error('_sortEntries needs to be overriden.');
    }

    /**
     * Method that can be overridden by subclasses to add additional context data.
     * @param {Object} context  The context data to be extended.
     * @returns {Object}        The extended context data.
     * @private
     * @abstract
     */
    _setAdditionalContext(context) {
        return context;
    }
    /**
     * Method that must be overridden by subclasses to define the default values for a new entry.
     * @param {Object} entry  This is the newEntry prefilled with key, name and description. You only need to set the other properties
     * @returns {Object}      Return the filled object. If you don't want to set any default values, just return the entry.
     * @private
     * @abstract
     */
    _setDefaultValues(entry) {
        throw new Error('_setDefaultValues needs to be overriden.');
    }

    /**
     * Method that allows changes to the selected entry before showing it in the form.
     * @private
     * @abstract
     * @example
     * this.selectedEntry.levels = [];
     */
    _editEntry() {
        return;
    }

    /**
     * Method that must be overridden by subclasses to define the validation for the entry.
     * @param {String} selectedKey  The key of the selected Entry.
     * @param {Entry} entry         The Entry being validated.
     * @returns {Boolean}           Whether the Entry data has Errors. If it's not valid, show an error message and return true.
     * @private
     * @abstract
     * @example
     * if (this.entries.some((def) => def.key !== selectedKey && def.order === entry.order)) {
     *     ui.notifications.error(game.i18n.localize('SETTINGS.errors.order.unique') + `: ${defense.order}`);
     *     hasErrors = true;
     * }
     * return hasErrors;
     */
    _validateEntry(selectedKey, entry) {
        throw new Error('_validateEntry needs to be overriden.');
    }

    /**
     * Method that can be overridden by subclasses to modify the selected entry before saving it.
     * @param {Object} entry  This is the newEntry prefilled with all the simple values from the form.
     * @returns {Object}      Return the filled object.
     * @private
     * @abstract
     */
    _modifyEntry(entry, showError = false) {
        if (showError)
            throw new Error(
                'The fields in this config are too complex to manage them in a generic matter.\n_modifyEntry needs to be overriden.',
            );
        return entry;
    }

    /**
     * Method that must be overridden by subclasses cast the entries into the DataModel format to validate them before saving.
     * @param {Object[]} entries  Array of the entries that get passed by the baseConfig class.
     * @returns {BadassDataModel[]}        Array of objects casted to the DataModel class.
     * @private
     * @abstract
     */
    _castEntries(entries) {
        throw new Error('_castEntries needs to be overriden.');
    }
    // #endregion
}
