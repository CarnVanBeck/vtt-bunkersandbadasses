import BaseModel from '../baseModel.mjs';

/**
 * System definition for a skill
 */
export default class Skill extends BaseModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.icon = new fields.FilePathField({
            initial: 'icons/svg/temple.svg',
            categories: ['IMAGE'],
            base64: false,
        });
        schema.level = new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            initial: 0,
        });
        schema.max = new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            initial: 1,
        });
        schema.effects = new fields.ArrayField(new fields.ObjectField());
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
