import BadassDataModel from '../model.mjs';

/**
 * Definition of the Manufacturer class that is used by Items with a manufacturer
 *
 * @property {String}   key             A unique key to identify the Manufacturer
 * @property {String}   name            Readable name that will be shown
 * @property {String}   icon            Path to the image
 * @property {String}   description     Description for this Manufacturer
 * @property {String[]} allowedForItems List of item types this manufacturer is allowed for
 */
export default class Manufacturer extends BadassDataModel {
    /** @override */
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};
        schema.key = new fields.StringField({
            required: true,
            nullable: false,
            label: 'SETTINGS.manufacturer.key.label',
            hint: 'SETTINGS.manufacturer.key.hint',
            initial: '',
        });
        schema.name = new fields.StringField({
            required: true,
            nullable: false,
            label: 'SETTINGS.manufacturer.name.label',
            hint: 'SETTINGS.manufacturer.name.hint',
            initial: '',
        });
        schema.icon = new fields.FilePathField({
            label: 'SETTINGS.manufacturer.icon.label',
            hint: 'SETTINGS.manufacturer.icon.hint',
            initial: 'icons/svg/temple.svg',
            categories: ['IMAGE'],
            base64: false,
        });
        schema.description = new fields.StringField({
            label: 'SETTINGS.manufacturer.description.label',
            hint: 'SETTINGS.manufacturer.description.hint',
        });
        schema.allowedForItems = new fields.ArrayField(new fields.StringField(), {
            label: 'SETTINGS.manufacturer.allowedForItems.label',
            hint: 'SETTINGS.manufacturer.allowedForItems.hint',
        });
        schema.allowedForGunTypes = new fields.ArrayField(new fields.StringField(), {
            label: 'SETTINGS.manufacturer.allowedForGunTypes.label',
            hint: 'SETTINGS.manufacturer.allowedForGunTypes.hint',
        });
        return schema;
    }
}
