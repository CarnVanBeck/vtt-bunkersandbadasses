/**
 * Definition of the Gun Accuracy class that is used by GunLevels to determin the hits and crits per dice roll
 *
 * @property {Number}   low             Lowest roll for this instance to be applied
 * @property {Number}   high            Highest roll for this instance to be applied
 * @property {Number}   hits            Amount of hits for this dice roll
 * @property {Number}   crits           Amount of crits for this dice roll
 *
 * @see GunLevel
 */
export default class GunAccuracy extends foundry.abstract.DataModel {
    /** @override */
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};
        schema.low = new fields.NumberField({
            required: true,
            nullable: false,
            initial: 0,
            min: 0,
        });
        schema.high = new fields.NumberField({
            required: false,
            nullable: true,
            initial: 1,
            min: 0,
        });
        schema.hits = new fields.NumberField({
            required: true,
            nullable: false,
            initial: 0,
            min: 0,
        });
        schema.crits = new fields.NumberField({
            required: true,
            nullable: false,
            initial: 0,
            min: 0,
        });
        return schema;
    }
}
