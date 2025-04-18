import CharacterItemModel from '../characterItemModel.mjs';

/**
 * System definition for a background
 */
export default class Background extends CharacterItemModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.effects = new fields.ArrayField(new fields.ObjectField());
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
