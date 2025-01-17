const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;
import { BADASS } from '../../helper/config.mjs';

/**
 * A base form application for configuring stuff inside the settings
 *
 * @extends {ActorSheetV2}
 */
export default class BadassActorSheetV2 extends HandlebarsApplicationMixin(ActorSheetV2) {
    constructor(...args) {
        super(...args);
    }
    static DEFAULT_OPTIONS = {
        position: {
            width: 800,
            height: 900,
        },
        form: {
            submitOnChange: true,
        },
        window: {
            contentClasses: ['badass', 'actor'],
        },
    };
    /**
     * The title of the Entry Config form.
     * @type {String}
     * @readonly
     */
    get title() {
        return this.actor?.name ?? game.i18n.localize('SHEETS.actor.vaultHunter.label');
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
        context.CONFIG = CONFIG.BADASS;
        context.actor = this.actor;
        context.system = this.actor.system;
        context.user = game.user;
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
