import InventoryItemData from '../inventoryItem.mjs';

/**
 * System definition for a quest item
 */
export default class QuestItemData extends InventoryItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
