import BaseItemData from './baseItem.mjs';

/**
 * Base class for all items that can be put into an inventory
 * @property {number} value    The buying/selling value of the item
 */
export default class InventoryItemData extends BaseItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.value = new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 0,
            label: game.i18n.localize('badass.item.value'),
        });
        schema.rarity = new fields.StringField();
        return schema;
    }
}
