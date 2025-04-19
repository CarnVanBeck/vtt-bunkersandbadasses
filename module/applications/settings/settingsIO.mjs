const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
import { BADASS } from '../../helper/config.mjs';
import { getSystemActions, getSystemArchetypes, getSystemClasses, getSystemDefenses, getSystemElements, getSystemGunTypes, getSystemManufacturers } from '../../helper/systemValues.mjs';

/**
 * 
 */
export default class SettingsIO extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(...args) {
        super(...args);
    }

    static DEFAULT_OPTIONS = {
        form: {
            closeOnSubmit: true,
            handler: SettingsIO.#onSubmitForm,
        },
        position: {
            width: 400,
            height: 'auto',
        },
        tag: 'form',
        window: {
            contentClasses: ['badass', 'io'],
        },
        actions: {
            exportSettings: SettingsIO.exportSettings,
            importSettings: SettingsIO.importSettings,
        },
    };
    static PARTS = {
        config: {
            id: 'settingsIO',
            template: `${BADASS.systemPath}/templates/settings/settingsIO.hbs`,
        }
    };

    /**
     * The title of the Entry Config form.
     * @type {String}
     * @readonly
     */
    get title() {
        return "I/O Dialogue";
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
        context.buttons = [{ type: 'submit', icon: 'fa-solid fa-save', label: 'SETTINGS.Save' }];

        return context;
    }
    
    /**
     * Saves the entries back into the game.settings
     * @param {SubmitEvent} event          The submission event.
     * @param {HTMLFormElement} form       The submitted form element.
     * @param {FormDataExtended} formData  The submitted form data.
     * @private
     */
    static async #onSubmitForm(e, form, formData) {
        //await game.settings.set(BADASS.namespace, this.settingsName, entries);
    }

    static exportSettings(e, target) {
        let htmlA = document.createElement('a');
        let jsonFile = this.getSettingsSaveFile();
        htmlA.href = window.URL.createObjectURL(jsonFile);
        htmlA.download = jsonFile.name;
        htmlA.dispatchEvent(new MouseEvent("click", {bubbles: true, cancelable: true, view: window}));
        setTimeout(() => window.URL.revokeObjectURL(htmlA.href), 100);
    }

    getSettingsSaveFile() {
        // key has to be the same as in game.settings or the re-import will fail
        let systemDataSets = {
            "gunTypes" : getSystemGunTypes(),
            "elements" : getSystemElements(),
            "defenses" : getSystemDefenses(),
            "manufacturers" : getSystemManufacturers(),
            "actions": getSystemActions(),
            "archetypes": getSystemArchetypes(),
            "classes": getSystemClasses(),
        }
        let stringified = JSON.stringify(systemDataSets, undefined, 4); 
        return new File([stringified], "settings.json", {type: "application/json"});
    }
    
    static importSettings(e, target)  {
        let settingsFile = target.parentNode.parentNode.querySelector("input[name='data']").files[0];
        if(settingsFile) {
            this.loadSettingsSaveFile(settingsFile);
        } else {
            e.preventDefault();
            ui.notifications.error(game.i18n.localize('SETTINGS.io.noFile'));
        }
    }

    loadSettingsSaveFile(saveFile) {
        let reader = new FileReader();
        reader.onload = ((file) => {
            let readData = JSON.parse(file.target.result);
            for(let [key, data] of Object.entries(readData)) {
                if(game.settings.settings.has(BADASS.namespace + '.' + key)) {
                    game.settings.set(BADASS.namespace, key, data);
                    ui.notifications.notify(game.i18n.localize('SETTINGS.io.updated') + ' : ' + key);
                } else {
                    let errorMsg = game.i18n.localize('SETTINGS.io.failed')
                                    + ' : ' + key + ' '
                                    + game.i18n.localize('SETTINGS.io.unregistered');
                    console.log(errorMsg);
                    ui.notifications.error(errorMsg);
                }
            }
        });
        reader.readAsText(saveFile, 'utf8');
    }
}
