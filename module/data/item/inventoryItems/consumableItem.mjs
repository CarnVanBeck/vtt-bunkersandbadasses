import InventoryItemData from '../inventoryItem.mjs';

/**
 * Base class for all consumable items
 */
export default class ConsumableItemData extends InventoryItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        return schema;
    }
}
