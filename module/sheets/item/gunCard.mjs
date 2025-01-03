import { getDefaultGunTypes } from "../../helper/config.mjs";
import { ManufacturedSheet } from "./manufactered.mjs";

export class GunCardSheet extends ManufacturedSheet {
    
    get template() {
        return `systems/vtt-bunkersandbadasses/templates/item/gunCard.html`;
    }

	static get defaultOptions() {
        const options = super.defaultOptions;
		
		return foundry.utils.mergeObject(options, {
            classes: ["sheet", "gun-card"],
            width: 550,
            height: 550,
            blockFavTab: true,
			makeDefault: true
        });
		
    }
	
    /** @override */
	getData() {
		// Retrieve base data structure.
		const context = super.getData();

		// Add system relevant data arrays
		context.gunTypes = getDefaultGunTypes();
		
		//context.manufacturers = game.settings.settings.get("badass.manufacturers").default;
		context.manufacturers = [{name:"Dahlia", key:"dahlia"}, {name:"Feriore", key:"feriore"}, {name:"Blackpowder", key: "blackpowder"}];

		// Prepare active effects for easier access
		//context.effects = prepareActiveEffectCategories(this.item.effects);

		return context;
	}
	
	/** @override */
	activateListeners(html) {
		super.activateListeners(html);

		// Everything below here is only needed if the sheet is editable
		if (!this.isEditable) return;

		// Roll handlers, click handlers, etc. would go here.

		// Active Effect management
		html.on('click', '.effect-control', (ev) =>
			onManageActiveEffect(ev, this.item)
		);
	}
		
}