import GunAccuracy from './gunAccuracy.mjs';

/**
 * Definition of the GunLevel class that is used to preconfigure the levels for a GunType
 *
 * @property {Number}           start       The starting level to find guns with these values
 * @property {Number}           end         The end level to find guns with these values
 * @property {GunAccuracy[]}    accuracy    Array of GunAccuracy instances
 * @property {String}           damage      The damage die that is used for this type
 * @property {Number}           range       The number of squares the gun can be used for
 *
 * @see GunType
 * @see GunAccuracy
 */
export default class GunLevel extends foundry.abstract.DataModel {
    /** @override */
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};
        schema.start = new fields.NumberField({
            required: true,
            nullable: false,
            initial: 0,
        });
        schema.end = new fields.NumberField({
            required: true,
            nullable: false,
            initial: 0,
        });
        schema.accuracy = new fields.ArrayField(new fields.EmbeddedDataField(GunAccuracy));
        schema.damage = new fields.StringField({
            required: true,
            nullable: false,
            initial: '1d6',
        });
        schema.range = new fields.NumberField({
            required: true,
            nullable: false,
            initial: 0,
        });
        return schema;
    }
}
