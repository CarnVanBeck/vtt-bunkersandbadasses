import BaseItemData from './baseItem.mjs';

/**
 * System definition for a prefix to be used on manufactured items
 */
export default class PrefixItemData extends BaseItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
