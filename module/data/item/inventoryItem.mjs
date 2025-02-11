import BaseItemData from './baseItem.mjs';

/**
 * Base class for all items that can be put into an inventory
 * @property {Number} value    The buying/selling value of the item
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
        });
        schema.rarity = new fields.StringField({
            required: true,
            nullable: false,
            initial: 'common',
        });
        schema.equipped = new fields.BooleanField({ initial: false });
        return schema;
    }
}
