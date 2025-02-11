import BaseModel from '../baseModel.mjs';

/**
 * System definition for a red text to be used on manufactured items
 */
export default class RedText extends BaseModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.descriptionGM = new fields.StringField();
        return schema;
    }
}
