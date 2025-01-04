const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
import Defense from '../../data/custom/defense.mjs';
import { BADASS, getDefaultDefenses } from '../../helper/config.mjs';

/**
 * A form application for configuring the available Defenses in this world.
 * @param {Defense} selectedDefense  The Defense being configured.
 * @param {Defense[]} defenses       The Defenses that are stored in the game settings.
 * @extends {ApplicationV2}
 */
export default class DefenseConfig extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(...args) {
        super(...args);
        this.selectedDefense = null;
        this.defenses = null;
    }

    static DEFAULT_OPTIONS = {
        id: `${BADASS.namespace}.defenseConfig`,
        form: {
            closeOnSubmit: true,
            handler: DefenseConfig.#onSubmitForm,
        },
        position: {
            width: 800,
            height: 'auto',
        },
        tag: 'form',
        window: {
            controls: [
                {
                    icon: 'fa-solid fa-database',
                    action: 'defaultDefense',
                    label: 'SETTINGS.defenses.default.label',
                },
            ],
            icon: 'fa-solid fa-shield-heart',
            title: 'SETTINGS.defenses.config.label',
            contentClasses: ['badass', 'settings'],
        },
        actions: {
            addDefense: DefenseConfig.addDefense,
            editDefense: DefenseConfig.editDefense,
            removeDefense: DefenseConfig.removeDefense,
            saveDefense: DefenseConfig.saveDefense,
            defaultDefense: DefenseConfig.defaultDefense,
        },
    };
    static PARTS = {
        config: {
            id: 'defenseSidebar',
            template: `${BADASS.systemPath}/templates/settings/defenseConfig.hbs`,
        },
        footer: {
            template: 'templates/generic/form-footer.hbs',
        },
    };

    /**
     * The title of the Defense Config form.
     * @type {String}
     * @readonly
     */
    get title() {
        return game.i18n.localize(this.options.window.title);
    }

    /**
     * Prepare the context data for the Defense Config form.
     * @param {Object} options  The options provided to the application.
     * @returns {Object}        The data used to render the Defense Config form.
     * @override
     * @protected
     */
    async _prepareContext(options) {
        const context = {};
        context.CONFIG = CONFIG.BADASS;
        context.selectedDefense = this.selectedDefense;

        this.defenses = this.defenses ?? game.settings.get(BADASS.namespace, 'defenses') ?? [];
        this.defenses.sort((a, b) => a.order - b.order);
        context.defenses = this.defenses;

        context.buttons = [{ type: 'submit', icon: 'fa-solid fa-save', label: 'SETTINGS.Save' }];
        return context;
    }

    /**
     * Add a new Defense to the context Defenses.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target   The clicked Html element.
     */
    static addDefense(e, target) {
        let newDefense = new Defense();
        newDefense = {
            key: DefenseConfig._generateUniqueKey(this.defenses),
            name: 'New Defense',
            description: '',
            order: DefenseConfig._getUniqueOrder(this.defenses),
        };
        this.defenses.push(newDefense);
        this.selectedDefense = newDefense;
        this.render();
    }
    /**
     * Generate a unique key for a new defense.
     * @param {Defense[]} defenses  The array of existing defenses.
     * @returns {String}            A unique key for the new defense.
     */
    static _generateUniqueKey(defenses) {
        let index = 1;
        let key = `def${index}`;
        while (defenses.some((defense) => defense.key === key)) {
            index++;
            key = `def${index}`;
        }
        return key;
    }

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
     * Show the values of the clicked Defense in the form.
     * @param {DefenseConfig} this  Altough it's static, this will still be the current DefenseConfig instance.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The clicked Defense List Item.
     */
    static editDefense(e, target) {
        let key = target.getAttribute('data-key');
        this.selectedDefense = this.defenses.find((defense) => defense.key === key);
        this.render();
    }

    /**
     * Remove the selected Defense from the currently configured Defenses.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target   The clicked Html element.
     * @static
     */
    static removeDefense(e, target) {
        if (this.selectedDefense === null) return;

        let defenseIndex = this.defenses.findIndex((defense) => defense.key === this.selectedDefense.key);
        if (defenseIndex !== -1) {
            this.defenses.splice(defenseIndex, 1);
            this.selectedDefense = null;
            this.render();
        }
    }

    /**
     * Save the values of the currently selected Defense back into the currently configured Defenses.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target   The clicked Html element.
     * @static
     */
    static saveDefense(e, target) {
        let key = this.selectedDefense.key;
        let defenseIndex = this.defenses.findIndex((defense) => defense.key === key);
        let newDefense = new Defense();
        this.element.querySelectorAll('[data-property]').forEach((target) => {
            let prop = target.getAttribute('data-property');
            newDefense[prop] = target.type === 'checkbox' ? target.checked : target.value;
        });

        if (DefenseConfig._validateDefense(key, newDefense, this.defenses)) return;

        this.defenses[defenseIndex] = newDefense;
        this.selectedDefense = newDefense;

        this.render();
    }
    /**
     * Validate the Defense data and show error messages if necessary.
     * @param {String} selectedKey  The key of the selected Defense.
     * @param {Defense} defense      The Defense being validated.
     * @param {Defense[]} defenses   The Defenses that are stored in the game settings.
     * @returns {Boolean}            Whether the Defense data is valid.
     * @private
     * @static
     */
    static _validateDefense(selectedKey, defense, defenses) {
        let hasErrors = false;

        // Check if the defense name is unique but exclude the selectedKey to only check if it has changed.
        if (defenses.some((def) => def.key !== selectedKey && def.key === defense.key)) {
            ui.notifications.error(game.i18n.localize('SETTINGS.defenses.key.error.unique') + `: ${defense.key}`);
            hasErrors = true;
        }
        // Check if the defense order is unique.
        if (defenses.some((def) => def.key !== selectedKey && def.order === defense.order)) {
            ui.notifications.error(game.i18n.localize('SETTINGS.defenses.order.error.unique') + `: ${defense.order}`);
            hasErrors = true;
        }
        return hasErrors;
    }

    /**
     * Set the context Defenses to the default values defined by the system.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target   The clicked Html element.
     */
    static async defaultDefense(e, target) {
        this.defenses = getDefaultDefenses();
        this.render();
    }

    /**
     * Handle form submission.
     * @param {SubmitEvent} event          The submission event.
     * @param {HTMLFormElement} form       The submitted form element.
     * @param {FormDataExtended} formData  The submitted form data.
     * @private
     */
    static async #onSubmitForm(e, form, formData) {
        const defenses = this.defenses;
        await game.settings.set(BADASS.namespace, 'defenses', defenses);
    }
}
