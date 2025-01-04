import BadassDataModel from '../model.mjs';

/**
 * Definition of the GunType class that is used to preconfigure types for guns
 *
 * @property {String}       key         A unique key to identify the type
 * @property {String}       name        Readable name that will be shown in Sheets
 * @property {String}       description A description for this Defense to provide an explanation
 * @property {String}       icon        Path to the image
 * @property {GunLevel[]}   levels      Array of GunLevels to specify the scaling
 *
 * @see GunLevel
 */
export default class GunType extends BadassDataModel {
    /** @override */
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};
        schema.key = new fields.StringField({
            required: true,
            nullable: false,
            label: 'SETTINGS.gunTypes.key.label',
            hint: 'SETTINGS.gunTypes.key.hint',
            default: '',
        });
        schema.name = new fields.StringField({
            required: true,
            nullable: false,
            label: 'SETTINGS.gunTypes.name.label',
            hint: 'SETTINGS.gunTypes.name.hint',
            default: '',
        });
        schema.description = new fields.StringField({
            label: 'SETTINGS.gunTypes.description.label',
            hint: 'SETTINGS.gunTypes.description.hint',
        });
        schema.icon = new fields.FilePathField({
            label: 'SETTINGS.gunTypes.icon.label',
            hint: 'SETTINGS.gunTypes.icon.hint',
            initial: `${CONFIG.BADASS.systemPath}/assets/styleable/guns/pistol.svg`,
            categories: ['IMAGE'],
            base64: false,
        });
        schema.levels = new fields.ArrayField(new fields.ObjectField(), {
            label: 'SETTINGS.gunTypes.levels.label',
            hint: 'SETTINGS.gunTypes.levels.hint',
        });
        return schema;
    }
}
