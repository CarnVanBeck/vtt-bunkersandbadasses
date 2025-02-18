import {
    getSystemGunTypes,
    getSystemGunManufacturers,
    getGunAccuracyByLevel,
    getSystemDice,
    getDefaultAccuracy,
} from '../../helper/systemValues.mjs';
import BadassItemSheetV2 from './badassItemSheetV2.mjs';
import { ManufacturedSheet } from './manufacteredV2.mjs';

export class GunCardSheetV2 extends ManufacturedSheet {
    constructor(...args) {
        super(...args);
    }

    static DEFAULT_OPTIONS = {
        ...ManufacturedSheet.DEFAULT_OPTIONS,
        window: {
            contentClasses: ['sheet', 'itemCard', 'gun-card', 'scrollable'],
			icon: ``,
        },
        actions: {
            updateFromDamageDie: GunCardSheetV2.updateFromDamageDie,
        },
    };
    static PARTS = {
		...ManufacturedSheet.PARTS,
        body: {
			template: `systems/vtt-bunkersandbadasses/templates/item/parts/gunCardDataAndImage.hbs`,
		}
    };

    /** @override */
    async _prepareContext(options) {
        // Retrieve base data structure.
        const context = await super._prepareContext(options);

        // Add system relevant data arrays
        context.gunTypes = getSystemGunTypes();

        //context.manufacturers = game.settings.settings.get("badass.manufacturers").default;
        context.manufacturers = getSystemGunManufacturers();

        context.dice = getSystemDice();

        // Fallback: Set default if no accuracy is present
        if (context.system.accuracy.length == 0) {
            context.system.accuracy = getDefaultAccuracy();
        }

        //Fallback to a default type if no or nonevalid present
        if (super.validateKeyInList(context.gunTypes, context.type)) {
            context.system.type = 'ptl';
        }

        // Prepare active effects for easier access
        //context.effects = prepareActiveEffectCategories(this.item.effects);

        return context;
    }

    /**
     *
     * @param {*} rarity
     */
    updateLevelData(accuracyList, damageDie, gunRange) {
        let updateJSON = {
            'system.accuracy': accuracyList,
            'system.damage.base': damageDie,
            'system.range.base': gunRange,
        };
        this.object.update(updateJSON);
    }

    updateSingleAccuracyValue(nValue, vIndex, vType) {
        let accuracySize = this.object.system.accuracy.length;
        let accuracyList = accuracySize > 0 ? this.object.system.accuracy : getDefaultAccuracy();
        accuracyList[vIndex][vType] = nValue;
        let updateJSON = {
            'system.accuracy': accuracyList,
        };
        this.object.update(updateJSON);
    }

    updateDie(damageDie, dieCount) {
        let damage = dieCount + damageDie;
        let updateJSON = {
            'system.damage.base': damage,
        };
        this.object.update(updateJSON);
    }

    updateFromDamageDie(event) {
        let dieCount = this.object.system.damage.base ? this.object.system.damage.base.split('d')[0] : 1;
        let dieValue = event.delegateTarget.dataset['key'];
        this.updateDie(dieValue, dieCount);
        event.delegateTarget.parentNode.parentNode.querySelector('.pictureSelector').classList.toggle('picNoneDisplay');
    }

    updateFromDieMulti(event) {
        let delimiter = 'd';
        let dieCount = event.target.value;
        let dieValue = this.object.system.damage.base
            ? delimiter + this.object.system.damage.base.split(delimiter)[1]
            : 'd4';
        this.updateDie(dieValue, dieCount);
    }

    updateLevelAndGunSpecifics(newLevel, gunLevelData) {
        super.updateLevel(newLevel);
        this.updateLevelData(gunLevelData.accuracy, gunLevelData.damage, gunLevelData.range);
    }

    showErrorWindow(error) {
        ui.notifications.warn(error, {
            permanent: true,
            //localize: true,
            console: true,
        });
    }

    /** @override */
    updateLevel(newLevel) {
        let gunType = this.getData().data.system.type;
        let gunLevelData = getGunAccuracyByLevel(newLevel, gunType);
        if (gunLevelData == undefined) {
            let gunTypeName = this.getData().gunTypes.find((value, index, array) => {
                return gunType == value.key;
            }).name;
            this.showErrorWindow('It seems there exists no data for a ' + gunTypeName + ' of level: ' + newLevel);
            return;
        }
        this.updateLevelAndGunSpecifics(newLevel, gunLevelData);
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.isEditable) return;

        // Roll handlers, click handlers, etc. would go here.
        html.find('.accuracyInput').on('change', (event) => {
            this.updateSingleAccuracyValue(
                event.target.value,
                event.target.dataset['index'],
                event.target.dataset['item'],
            );
        });
        html.find('.damageDiePicOption').on('click', (event) => {
            this.updateFromDamageDie(event);
        });
        html.find('.gunCardDiceMultiInput').on('change', (event) => {
            this.updateFromDieMulti(event);
        });
        // Active Effect management
        html.on('click', '.effect-control', (ev) => onManageActiveEffect(ev, this.item));
    }
}

