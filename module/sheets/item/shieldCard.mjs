import { getSystemShieldManufacturers } from '../../helper/systemValues.mjs';
import { ManufacturedSheet } from './manufactered.mjs';

export class ShieldCardSheet extends ManufacturedSheet {
    get template() {
        return `systems/vtt-bunkersandbadasses/templates/item/shieldCard.hbs`;
    }

    static get defaultOptions() {
        const options = super.defaultOptions;

        return foundry.utils.mergeObject(options, {
            classes: ['sheet', 'shield-card'],
            width: 550,
            height: 600,
            blockFavTab: true,
            makeDefault: true,
        });
    }

    /** @override */
    getData() {
        // Retrieve base data structure.
        const context = super.getData();

        context.shields = [
            {
                description: '',
                icon: 'systems/vtt-bunkersandbadasses/assets/standalone/shield.svg',
                key: 'shd',
                name: 'Shield',
            },
        ];
        context.system.type = 'shd';

        //context.manufacturers = game.settings.settings.get("badass.manufacturers").default;
        context.manufacturers = getSystemShieldManufacturers();

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
        html.on('click', '.effect-control', (ev) => onManageActiveEffect(ev, this.item));
    }
}
