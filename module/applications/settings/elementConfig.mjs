const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
import Element from '../../data/custom/element.mjs';
import { BADASS, getDefaultElements } from '../../helper/config.mjs';

/**
 * A form application for configuring the available Elements in this world.
 * @param {Element} selectedElement  The Element being configured.
 * @param {Element[]} elements       The Elementss that are stored in the game settings.
 * @extends {ApplicationV2}
 */
export default class ElementConfig extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(...args) {
        super(...args);
        this.selectedElement = null;
        this.elements = null;
        this.defenses = null;
    }

    static DEFAULT_OPTIONS = {
        id: `${BADASS.namespace}.elementConfig`,
        form: {
            closeOnSubmit: true,
            handler: ElementConfig.#onSubmitForm,
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
                    action: 'defaultElement',
                    label: 'SETTINGS.elements.default.label',
                },
            ],
            icon: 'fa-solid fa-wand-magic-sparkles',
            title: 'SETTINGS.elements.config.label',
            contentClasses: ['badass', 'settings'],
        },
        actions: {
            addElement: ElementConfig.addElement,
            editElement: ElementConfig.editElement,
            removeElement: ElementConfig.removeElement,
            saveElement: ElementConfig.saveElement,
            defaultElement: ElementConfig.defaultElement,
        },
    };
    static PARTS = {
        config: {
            id: 'elementSidebar',
            template: `${BADASS.systemPath}/templates/settings/elementConfig.hbs`,
        },
        footer: {
            template: 'templates/generic/form-footer.hbs',
        },
    };

    /**
     * The title of the Element Config form.
     * @type {String}
     * @readonly
     */
    get title() {
        return game.i18n.localize(this.options.window.title);
    }

    /**
     * Prepare the context data for the Element Config form.
     * @param {Object} options  The options provided to the application.
     * @returns {Object}        The data used to render the Element Config form.
     * @override
     * @protected
     */
    async _prepareContext(options) {
        const context = {};
        context.CONFIG = CONFIG.BADASS;
        context.selectedElement = this.selectedElement;

        this.elements = this.elements ?? game.settings.get(BADASS.namespace, 'elements') ?? [];
        this.elements.sort((a, b) => game.i18n.localize(a.name).localeCompare(game.i18n.localize(b.name)));
        context.elements = this.elements;

        this.defenses = this.defenses ?? game.settings.get(BADASS.namespace, 'defenses') ?? [];
        this.defenses.sort((a, b) => a.order - b.order);
        context.defenses = this.defenses;

        context.buttons = [{ type: 'submit', icon: 'fa-solid fa-save', label: 'SETTINGS.Save' }];
        return context;
    }

    /**
     * Add a new Element to the context Elements.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target   The clicked Html element.
     */
    static addElement(e, target) {
        let newElement = new Element();
        newElement = {
            key: ElementConfig._generateUniqueKey(this.elements),
            name: 'New Element',
            description: '',
            icon: '',
            color: '',
            strongAgainst: [],
            weakAgainst: [],
            ignores: [],
        };
        this.elements.push(newElement);
        this.selectedElement = newElement;
        this.render();
    }
    /**
     * Generate a unique key for a new element.
     * @param {Element[]} elements  The array of existing elements.
     * @returns {String}            A unique key for the new element.
     */
    static _generateUniqueKey(elements) {
        let index = 1;
        let key = `el${index}`;
        while (elements.some((element) => element.key === key)) {
            index++;
            key = `el${index}`;
        }
        return key;
    }

    /**
     * Show the values of the clicked Element in the form.
     * @param {ElementConfig} this  Altough it's static, this will still be the current ElementConfig instance.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The clicked Element List Item.
     */
    static editElement(e, target) {
        let key = target.getAttribute('data-key');
        this.selectedElement = this.elements.find((element) => element.key === key);
        this.render();
    }

    /**
     * Remove the selected Element from the currently configured Elements.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target   The clicked Html element.
     * @static
     */
    static removeElement(e, target) {
        if (this.selectedElement === null) return;

        let elementIndex = this.elements.findIndex((element) => element.key === this.selectedElement.key);
        if (elementIndex !== -1) {
            this.elements.splice(elementIndex, 1);
            this.selectedElement = null;
            this.render();
        }
    }

    /**
     * Save the values of the currently selected Element back into the currently configured Elements.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target   The clicked Html element.
     * @static
     */
    static saveElement(e, target) {
        e.preventDefault();
        e.stopPropagation();

        let key = this.selectedElement.key;
        let elementIndex = this.elements.findIndex((element) => element.key === key);
        let newElement = new Element();
        this.element.querySelectorAll('[data-property]').forEach((target) => {
            let prop = target.getAttribute('data-property');
            newElement[prop] = target.value;
        });

        if (ElementConfig._validateElement(key, newElement, this.elements)) return;

        this.elements[elementIndex] = newElement;
        this.selectedElement = newElement;

        this.render();
    }
    /**
     * Validate the Element data and show error messages if necessary.
     * @param {String} selectedKey  The key of the selected Element.
     * @param {Element} element      The Element being validated.
     * @param {Element[]} elements   The Elements that are stored in the game settings.
     * @returns {Boolean}            Whether the Element data is valid.
     * @private
     * @static
     */
    static _validateElement(selectedKey, element, elements) {
        let hasErrors = false;

        // Check if the element name is unique but exclude the selectedKey to only check if it has changed.
        if (elements.some((def) => def.key !== selectedKey && def.key === element.key)) {
            ui.notifications.error(game.i18n.localize('SETTINGS.elements.key.error.unique') + `: ${element.key}`);
            hasErrors = true;
        }
        return hasErrors;
    }

    /**
     * Set the context Elements to the default values defined by the system.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target   The clicked Html element.
     */
    static async defaultElement(e, target) {
        this.elements = getDefaultElements();
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
        const elements = this.elements;
        await game.settings.set(BADASS.namespace, 'elements', elements);
    }
}
