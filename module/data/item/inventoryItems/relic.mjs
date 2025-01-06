import InventoryItemData from '../inventoryItem.mjs';

/**
 * System definition for a relic
 */
export default class RelicItemData extends InventoryItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
