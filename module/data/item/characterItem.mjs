import BaseItemData from './baseItem.mjs';

/**
 * Base class for all classes, skills and actions
 */
export default class CharacterItemData extends BaseItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        return schema;
    }
}
