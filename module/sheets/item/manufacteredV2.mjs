import { getSystemElements, getSystemRarities } from '../../helper/systemValues.mjs';
import BadassItemSheetV2 from './badassItemSheetV2.mjs';

export class ManufacturedSheet extends BadassItemSheetV2 {
    constructor(...args) {
        super(...args);
    }

    static DEFAULT_OPTIONS = {
        ...BadassItemSheetV2.DEFAULT_OPTIONS,
        actions: {
            updateManufaturer: ManufacturedSheet.updateManufaturer,
            updateLevel: ManufacturedSheet.updateLevel,
            updateRarity: ManufacturedSheet.updateRarity,
            updateType: ManufacturedSheet.updateType,
            updateElement:ManufacturedSheet.updateElement,
        },
    };
    static PARTS = {
        header: {
            template: `systems/vtt-bunkersandbadasses/templates/item/parts/manufacturedItemHeader.hbs`,
        },
		body: {
			template: ``,
		},
		notes: {
			template: `systems/vtt-bunkersandbadasses/templates/item/parts/manufacturedItemNotes.hbs`,
		},
    };

    /** @override */
    async _prepareContext(options) {
        // Retrieve base data structure.
        const context = await super._prepareContext(options);

        // Use a safe clone of the item data for further operations.
        const itemData = this.item;
        context.item = itemData;

        // Retrieve the roll data for TinyMCE editors.
        context.rollData = this.item.getRollData();

        // Add the item's data to context.data for easier access, as well as flags.
        context.system = this.item.system;
        context.flags = this.item.flags;
        context.rarities = getSystemRarities();
        context.elements = getSystemElements();

        return context;
    }

    /**
     * Update system.level with a new value
     *
     * @param {*} level         the updated value
     */
    updateLevel(level) {
        let updateJSON = {
            'system.level': level,
        };
        return this.object.update(updateJSON);
    }

    /**
     * Update system.rarity with a new value
     *
     * @param {*} rarity        the updated value
     */
    updateRarity(rarity) {
        let updateJSON = {
            'system.rarity': rarity,
        };
        return this.object.update(updateJSON);
    }

    /**
     * Update system.manufacturer with a new name
     *
     * @param {*} manufacturer  the updated value
     */
    updateManufaturer(manufacturer) {
        let updateJSON = {
            'system.manufacturer': {
                name: manufacturer,
            },
        };
        return this.object.update(updateJSON);
    }

    /**
     * Update system.type with a new value
     *
     * @param {*} type          the updated value
     */
    updateType(type) {
        let updateJSON = {
            'system.type': type,
        };
        return this.object.update(updateJSON);
    }

    /**
     * Update system.element with a new value
     *
     * @param {*} element       the updated value
     */
    updateElement(element) {
        let updateJSON = {
            'system.element': element,
        };
        return this.object.update(updateJSON);
    }

    validateKeyInList(validateList, key) {
        let found = false;
        for (let validateItem of validateList) {
            if (validateItem.key == key) {
                found = true;
            }
        }
        return found;
    }

    showErrorWindow(error) {
        ui.notifications.warn(error, {
            permanent: true,
            //localize: true,
            console: true,
        });
    }

    togglePicSelectDropdown(event) {
        event.delegateTarget.parentNode.parentNode.querySelector('.pictureSelector').classList.toggle('picNoneDisplay');
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.isEditable) return;

        html.find('.levelInput').on('change', (event) => {
            this.updateLevel(event.target.value);
        });
        html.find('.prePictureSelector').on('click', (event) => {
            event.delegateTarget.parentNode.querySelector('.pictureSelector').classList.toggle('picNoneDisplay');
        });
        html.find('.typePicOption').on('click', (event) => {
            this.updateType(event.target.dataset['key']);
            this.togglePicSelectDropdown(event);
        });
        html.find('.manufacturerPicOption').on('click', (event) => {
            this.updateManufaturer(event.target.dataset['key']);
            this.togglePicSelectDropdown(event);
        });
        html.find('.rarityPicOption').on('click', (event) => {
            this.updateRarity(event.target.dataset['key']);
            this.togglePicSelectDropdown(event);
        });
        html.find('.elementSelector').on('change', (event) => {
            this.updateElement(event.target.selectedOptions[0].value);
        });
        // Roll handlers, click handlers, etc. would go here.

        // Active Effect management
        html.on('click', '.effect-control', (ev) => onManageActiveEffect(ev, this.item));
    }
}

