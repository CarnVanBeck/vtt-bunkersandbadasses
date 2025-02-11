import BaseModel from '../baseModel.mjs';

/**
 * System definition for a prefix to be used on manufactured items
 */
export default class Prefix extends BaseModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.descriptionGM = new fields.StringField();
        return schema;
    }
}
