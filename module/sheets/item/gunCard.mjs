import { getSystemGunTypes, getSystemGunManufacturers, getGunAccuracyByLevel } from "../../helper/systemValues.mjs";
import { ManufacturedSheet } from "./manufactered.mjs";

export class GunCardSheet extends ManufacturedSheet {
    
    get template() {
        return `systems/vtt-bunkersandbadasses/templates/item/gunCard.hbs`;
    }

	static get defaultOptions() {
        const options = super.defaultOptions;
		
		return foundry.utils.mergeObject(options, {
            classes: ["sheet", "gun-card"],
            width: 600,
            height: 600,
            blockFavTab: true,
			makeDefault: true
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

		// Fallback: Set default if no accuracy is present
		if(context.data.system.accuracy.length == 0) {
			context.data.system.accuracy = [
				{low: 2, high: 7, hits: 0, crits: 0},
				{low: 8, high: 15, hits: 0, crits: 0},
				{low: 16, 			hits: 0, crits: 0}
			]
		}

		//Fallback to a default type if no or nonevalid present
		if(super.validateKeyInList(context.gunTypes, context.type) ) {
			context.data.system.type = 'ptl';
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
			"system.accuracy": accuracyList,
			"system.damage": damageDie,
			"system.range": gunRange
		};
		this.object.update(updateJSON);
	}

	updateSingleAccuracyValue(nValue, vIndex, vType) {
		let accuracyList = this.object.system.accuracy;
		accuracyList[vIndex][vType] = nValue;
		let updateJSON = {
			"system.accuracy": accuracyList,
		};
		this.object.update(updateJSON);
	}

	updateLevelAndGunSpecifics(newLevel, gunLevelData) {
		super.updateLevel(newLevel);
		this.updateLevelData(
			gunLevelData.accuracy,
			gunLevelData.damage,
			gunLevelData.range
		);
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
		let gunType = this.getData().data.system.type
		let gunLevelData = getGunAccuracyByLevel(newLevel, gunType);
		if(gunLevelData == undefined) {
			let gunTypeName = this.getData().gunTypes.find((value, index, array) => {return (gunType == value.key)}).name;
			this.showErrorWindow("It seems there exists no data for a " + gunTypeName + " of level: " + newLevel);
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
		html.find(".accuracyInput").on('change', (event) => {
			this.updateSingleAccuracyValue(
				event.target.value,
				event.target.dataset["index"],
				event.target.dataset["item"]
			);
		});
		// Active Effect management
		html.on('click', '.effect-control', (ev) =>
			onManageActiveEffect(ev, this.item)
		);
	}
		
}