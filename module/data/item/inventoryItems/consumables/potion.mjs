import ConsumableItemData from '../consumableItem.mjs';

/**
 * System definition for a potion
 */
export default class PotionItemData extends ConsumableItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        return schema;
    }
}
