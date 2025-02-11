import Element from '../../custom/system/element.mjs';
import InventoryItemData from '../inventoryItem.mjs';
/**
 * Base class for all items that have a manufacturer
 */
export default class ManufacturedItemData extends InventoryItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.manufacturer = new fields.ObjectField({
            required: false,
            nullable: true,
        });
        schema.level = new fields.NumberField();
        schema.element = new fields.EmbeddedDataField(Element);
        return schema;
    }
}
