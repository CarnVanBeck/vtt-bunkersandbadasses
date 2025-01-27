import { getSystemElements, getSystemRarities } from "../../helper/systemValues.mjs";

export class ManufacturedSheet extends ItemSheet {
    
    /** @override */
	getData() {
		// Retrieve base data structure.
		const context = super.getData();

		// Use a safe clone of the item data for further operations.
		const itemData = context.data;

		// Retrieve the roll data for TinyMCE editors.
		context.rollData = this.item.getRollData();

		// Add the item's data to context.data for easier access, as well as flags.
		context.system = itemData.system;
		context.flags = itemData.flags;
		context.rarities = getSystemRarities();
		context.elements = getSystemElements();
		if(!context.data.system.rarity) {
			context.data.system.rarity = context.rarities[0].key;
		}

		return context;
	}

	/**
	 * 
	 * @param {*} level 
	 */
	updateLevel(level) {
		let updateJSON = {
			"system.level": level
		};
		this.object.update(updateJSON);
	}

	/**
	 * 
	 * @param {*} rarity 
	 */
	updateRarity(rarity) {
		let updateJSON = {
			"system.rarity": rarity
		};
		this.object.update(updateJSON);
	}

	updateManufaturer(manufacturer) {
		let updateJSON = {
			"system.manufacturer": {
				"name": manufacturer
			}
		};
		this.object.update(updateJSON);
	}

	updateType(type) {
		let updateJSON = {
			"system.type": type
		};
		this.object.update(updateJSON);
	}

	updateElement(element) {
		let updateJSON = {
			"system.element": element
		};
		this.object.update(updateJSON);
	}

	validateKeyInList(manufacturerList, key) {
		return (manufacturerList.find((value, index, array) => {return (key == value.key)}) != undefined);
	}

	/** @override */
	activateListeners(html) {
		super.activateListeners(html);

		// Everything below here is only needed if the sheet is editable
		if (!this.isEditable) return;

		html.find(".levelInput").on('change', (event) => {
			this.updateLevel(event.target.value);
		});
		html.find(".prePictureSelector").on('click', (event) => {
			event.target.parentNode.parentNode.querySelector(".pictureSelector").classList.toggle("picNoneDisplay");
		});
		html.find(".typePicOption").on('click', (event) => {
			this.updateType(event.target.dataset["key"]);
			event.target.parentNode.parentNode.querySelector(".pictureSelector").classList.toggle("picNoneDisplay");
		});
		html.find(".manufacturerPicOption").on('click', (event) => {
			this.updateManufaturer(event.target.dataset["key"]);
			event.target.parentNode.parentNode.querySelector(".pictureSelector").classList.toggle("picNoneDisplay");
		});
		html.find(".rarityPicOption").on('click', (event) => {
			this.updateRarity(event.target.dataset["key"]);
			event.target.parentNode.parentNode.querySelector(".pictureSelector").classList.toggle("picNoneDisplay");
		});
		html.find(".elementSelector").on('change', (event) => {
			this.updateElement(event.target.selectedOptions[0].value);
		});
		// Roll handlers, click handlers, etc. would go here.

		// Active Effect management
		html.on('click', '.effect-control', (ev) =>
			onManageActiveEffect(ev, this.item)
		);
	}
		
}