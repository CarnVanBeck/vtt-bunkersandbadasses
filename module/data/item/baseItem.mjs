import BadassDataModel from '../model.mjs';

/**
 * Base class for all items
 * @property {String} description    Html field for the description of the item
 */
export default class BaseItemData extends BadassDataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};
        schema.description = new fields.HTMLField();
        schema.effects = new fields.ArrayField(new fields.ObjectField());
        return schema;
    }
}
