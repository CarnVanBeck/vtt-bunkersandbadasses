import BadassDataModel from '../model.mjs';

/**
 * Base class for all items in the Bunkers & Badasses system.
 *
 * This class serves as the foundation for all item data models, providing a standardized schema
 * for item-related data. It extends the `BadassDataModel` to leverage Foundry's data model
 * validation and management capabilities.
 *
 * @property {String} description    An HTML field for the item's description. This is where you can
 *                                   write all the juicy details about your item, like "This sword is so sharp,
 *                                   it could cut through Claptrap's ego!".
 * @property {Array} effects         An array of objects representing the item's effects. Each effect is an object
 *                                   that can define custom properties, such as buffs, debuffs, or other magical
 *                                   shenanigans. Think of it as the "BOOM" in Mr. Torgue's vocabulary.
 */
export default class BaseItemData extends BadassDataModel {
    /**
     * Defines the schema for the BaseItemData model.
     *
     * The schema specifies the structure and validation rules for item data. It includes:
     * - `description`: A rich text field for item descriptions.
     * - `effects`: An array of objects to store item effects.
     *
     * @returns {Object} The schema definition for the BaseItemData model.
     */
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};
        schema.description = new fields.HTMLField();
        schema.effects = new fields.ArrayField(new fields.ObjectField());

        return schema;
    }
}
