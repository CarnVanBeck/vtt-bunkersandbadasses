import CharacterModel from '../characterModel.mjs';

/**
 * System definition for a background
 */
export default class Background extends CharacterModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.effects = new fields.ArrayField(new fields.ObjectField());
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
