import {
    getSystemGunTypes,
    getSystemGunManufacturers,
    getGunAccuracyByLevel,
    getSystemDice,
    getDefaultAccuracy,
} from '../../helper/systemValues.mjs';
import { ManufacturedSheet } from './manufactered.mjs';

export class GunCardSheet extends ManufacturedSheet {
    get template() {
        return `systems/vtt-bunkersandbadasses/templates/item/gunCard.hbs`;
    }

    static get defaultOptions() {
        const options = super.defaultOptions;

        return foundry.utils.mergeObject(options, {
            classes: ['sheet', 'gun-card'],
            width: 600,
            height: 600,
            blockFavTab: true,
            makeDefault: true,
        });
    }

    /** @override */
    getData() {
        // Retrieve base data structure.
        const context = super.getData();

        // Add system relevant data arrays
        context.gunTypes = getSystemGunTypes();

        //context.manufacturers = game.settings.settings.get("badass.manufacturers").default;
        context.manufacturers = getSystemGunManufacturers();

        context.dice = getSystemDice();

        // Fallback: Set default if no accuracy is present
        if (context.data.system.accuracy.length == 0) {
            context.data.system.accuracy = getDefaultAccuracy();
        }

        //Fallback to a default type if no or nonevalid present
        if (!this.validateKeyInList(context.gunTypes, context.data.system.type)) {
            this.showErrorWindow('typeKey: ' + context.data.system.type + ' is invalid');
            context.data.system.type = null;
        }

        // Prepare active effects for easier access
        //context.effects = prepareActiveEffectCategories(this.item.effects);

        return context;
    }

    /**
     * Update multiple system data (accuracy, damage, range) with a new value
     *
     * @param {*} element       the updated value
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
	async updateType(type) {
		await super.updateType(type);
		this.updateLevel(this.getData().data.system.level);
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
