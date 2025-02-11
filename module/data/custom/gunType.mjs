import GunLevel from './gunLevel.mjs';

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
export default class GunType extends foundry.abstract.DataModel {
    /** @override */
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};
        schema.key = new fields.StringField({
            required: true,
            nullable: false,
            initial: '',
        });
        schema.name = new fields.StringField({
            required: true,
            nullable: false,
            initial: '',
        });
        schema.description = new fields.StringField();
        schema.icon = new fields.FilePathField({
            initial: `${CONFIG.BADASS.systemPath}/assets/styleable/guns/pistol.svg`,
            categories: ['IMAGE'],
            base64: false,
        });
        schema.levels = new fields.ArrayField(new fields.EmbeddedDataField(GunLevel));
        return schema;
    }
}
