import BaseModel from '../baseModel.mjs';

/**
 * Definition of the Manufacturer class that is used by Items with a manufacturer
 *
 * @property {String}   key                 A unique key to identify the Manufacturer
 * @property {String}   name                Readable name that will be shown
 * @property {String}   icon                Path to the image
 * @property {String}   description         Description for this Manufacturer
 * @property {String[]} allowedForItems     List of item types this manufacturer is allowed for
 * @property {String[]} allowedForGunTypes  List of gun type keys this manufacturer is allowed for
 */
export default class Manufacturer extends BaseModel {
    /** @override */
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.icon = new fields.FilePathField({
            initial: 'icons/svg/temple.svg',
            categories: ['IMAGE'],
            base64: false,
        });
        schema.allowedForItems = new fields.ArrayField(new fields.StringField());
        schema.allowedForGunTypes = new fields.ArrayField(new fields.StringField());
        return schema;
    }
}
