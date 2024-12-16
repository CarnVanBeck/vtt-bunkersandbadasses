import CharacterItemData from '../characterItem.mjs';

/**
 * System definition for an action
 */
export default class ActionItemData extends CharacterItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
