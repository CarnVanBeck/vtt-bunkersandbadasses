import { BADASS } from '../../helper/config.mjs';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * A base form application for configuring stuff inside the settings
 *
 * @extends {ActorSheetV2}
 */
export default class CustomItemSheetV2 extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(key, ...args) {
        super(...args);
        this.key = key;
        this.type = null;
    }
    static DEFAULT_OPTIONS = {
        position: {
            width: 620,
            height: 620,
        },
        form: {
            submitOnChange: true,
            handler: CustomItemSheetV2.#onSubmitForm,
        },
        id: `${BADASS.namespace}.actionItemSheet.{id}`,
        window: {
            contentClasses: ['badass'],
            resizable: true,
        },
    };

    static PARTS = {
        header: {
            template: `${BADASS.systemPath}/templates/custom/parts/customItemHeader.hbs`,
        },
        tabs: {
            template: 'templates/generic/tab-navigation.hbs',
        },
        details: {
            template: `${BADASS.systemPath}/templates/custom/parts/customItemTabDetails.hbs`,
        },
    };

    /**
     * The title of the Entry Config form.
     * @type {String}
     * @readonly
     */
    get title() {
        return this.item?.name;
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
        this.tabGroups.primary = this.tabGroups.primary ?? 'details';
        let tabs = {
            details: {
                label: 'Details', //game.i18n.localize('SHEETS.actor.vaultHunter.tabs.overview'),
                icon: 'fas fa-home',
                id: 'details',
                group: 'primary',
                cssClass: this.tabGroups.primary === 'details' ? 'active' : '',
            },
        };
        context.tabs = { ...tabs, ...this._getTabs() };
        this._getTabs();
        return this._setAdditionalContext(context);
    }

    /** @override */
    async _preparePartContext(partId, context) {
        if (context.tabs[partId]) {
            context.tab = context.tabs[partId];
        }
        return context;
    }

    /**
     * Handle form submission
     * @param {Event} event The form submission event
     * @param {Object} formData The form data
     * @private
     */
    static #onSubmitForm(e, formData, formDataExtended) {
        console.debug('submit on change', e, formData, formDataExtended);
        e.preventDefault();
        e.stopPropagation();
    }

    // #region Abstracts

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
     * Method that can be overridden by subclasses to add more tabs.
     * @returns {Object}        Additional tabs.
     * @private
     * @abstract
     */
    _getTabs() {
        return {};
    }
    // #endregion
}
