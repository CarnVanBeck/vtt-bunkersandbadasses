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

	/** @override */
	activateListeners(html) {
		super.activateListeners(html);

		// Everything below here is only needed if the sheet is editable
		if (!this.isEditable) return;

		html.find(".manufacturerSelector").on('change', (event) => {
			this.updateManufaturer(event.target.selectedOptions[0].value);
		});
		html.find(".raritySelector").on('change', (event) => {
			this.updateRarity(event.target.selectedOptions[0].value);
		});
		html.find(".levelInput").on('change', (event) => {
			this.updateLevel(event.target.value);
		});
		html.find(".typeSelector").on('change', (event) => {
			this.updateType(event.target.selectedOptions[0].value);
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