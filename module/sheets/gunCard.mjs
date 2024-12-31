export class GunCardSheet extends ItemSheet {
    
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
        return options;
		
    }
	
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

		// Add system relevant data arrays
		context.gunTypes = game.settings.settings.get("badass.gunTypes").default;
		context.elements = game.settings.settings.get("badass.elements").default;
		
		//context.manufacturers = game.settings.settings.get("badass.manufacturers").default;
		context.manufacturers = [{name:"Dahlia"}, {name:"Feriore"}, {name:"Blackpowder"}];

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