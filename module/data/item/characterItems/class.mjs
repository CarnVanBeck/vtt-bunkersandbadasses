import CharacterItemData from '../characterItem.mjs';

/**
 * System definition for a class
 */
export default class ClassItemData extends CharacterItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
