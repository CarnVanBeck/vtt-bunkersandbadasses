import { BADASS } from '../../helper/config.mjs';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * A base form application for configuring stuff inside the settings
 *
 * @extends {ActorSheetV2}
 */
export default class CustomItemSheetV2 extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(callback, ...args) {
        super(...args);
        this.callback = callback;
        this.type = null;
        this.settingsName = null;
    }
    static DEFAULT_OPTIONS = {
        tag: 'form',
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
        actions: {
            save: CustomItemSheetV2.#saveDescription,
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
        return `Edit ${this.type}`;
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
        context.item = this.item;
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
        context.descriptionHtml = await TextEditor.enrichHTML(context.item.description, { secrets: game.user.isGM });
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
        e.preventDefault();
        e.stopPropagation();

        let updateData = {};
        if (e.target.dataset.hasOwnProperty('target')) {
            updateData[e.target.dataset['target']] = e.target.value;
            CustomItemSheetV2._saveItem(this.item, updateData, this.settingsName, this.callback);
        }
    }

    static #saveDescription(e, formData) {
        if (e.target.dataset.action === 'save') {
            const proseMirrorElement = document.querySelector(`prose-mirror[data-document-u-u-i-d="${this.item.key}"]`);
            if (proseMirrorElement) {
                const editorContentDiv = proseMirrorElement.querySelector('.editor-content');
                if (editorContentDiv) {
                    const descriptionHtml = editorContentDiv.innerHTML;
                    let updateData = {};
                    updateData.description = descriptionHtml;
                    CustomItemSheetV2._saveItem(this.item, updateData, this.settingsName, this.callback);
                }
            }
        }
    }

    static async _saveItem(item, updateData, settingsName, callback) {
        try {
            item.validate({ changes: updateData });
            for (let key in updateData) {
                item[key] = updateData[key];
            }

            let settingsArray = game.settings.get(BADASS.namespace, settingsName);
            let itemIndex = settingsArray.findIndex((i) => i.key === item.key);
            if (itemIndex !== -1) {
                settingsArray[itemIndex] = item;
                await game.settings.set(BADASS.namespace, settingsName, settingsArray);
                if (callback && typeof callback === 'function') {
                    callback();
                }
            }
        } catch (validationError) {
            if (validationError instanceof foundry.data.validation.DataModelValidationError) {
                ui.notifications.error(validationError.message);
            } else {
                console.error('Generic Error during validation:', validationError);
            }
        }
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
