const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;
import { BADASS } from '../../helper/config.mjs';

/**
 * A base form application for configuring stuff inside the settings
 *
 * @extends {ActorSheetV2}
 */
export default class BadassItemSheetV2 extends HandlebarsApplicationMixin(ItemSheetV2) {
    constructor(...args) {
        super(...args);
    }

    static DEFAULT_OPTIONS = {
        position: {
            width: 550,
            height: 600,
        },
        form: {
            submitOnChange: true,
        },
        window: {
            contentClasses: ['badass', 'sheet', 'item'],
        },
    };

    /**
     * The title of the Entry Config form.
     * @type {String}
     * @readonly
     */
    get title() {
        return this.item?.name ?? RandomItem;
    }

    /**
     * Prepare the context data for the Entry Config form.
     * @param {Object} options  The options provided to the application.
     * @returns {Object}        The data used to render the Entry Config form.
     * @override
     * @protected
     */
    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        return context;
    }

    /**
     * Handle form submission
     * @param {Event} event The form submission event
     * @param {Object} formData The form data
     * @private
     */
    static #submitOnChange(event, formData, formDataExtended) {
        console.debug('submit on change', event, formData);

        // console.debug(``
        // console.debug('more', formDataExtended);
    }
}

