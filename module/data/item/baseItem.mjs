import BadassDataModel from '../model.mjs';

/**
 * Base class for all items
 * @property {string} description    Html field for the description of the item
 */
export default class BaseItemData extends BadassDataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};
        schema.description = new fields.HTMLField({ label: game.i18n.localize('badass.item.description.label') });
        return schema;
    }
}
