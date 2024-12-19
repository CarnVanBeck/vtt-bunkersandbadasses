import InventoryItemData from '../inventoryItem.mjs';

/**
 * Base class for all items that have a manufacturer
 */
export default class ManufacturedItemData extends InventoryItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.manufacturer = new fields.ObjectField({
            name: 'manufacturer',
            required: false,
            nullable: true,
            label: game.i18n.localize('badass.item.manufacturer.label'),
        });
        return schema;
    }
}
