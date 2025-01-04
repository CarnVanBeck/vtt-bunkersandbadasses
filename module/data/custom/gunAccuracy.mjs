import BadassDataModel from '../model.mjs';

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
export default class GunAccuracy extends BadassDataModel {
    low = 0;
    high = 0;
    hits = 0;
    crits = 0;

    /** @override */
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};
        schema.low = new fields.NumberField({
            required: true,
            nullable: false,
            label: 'SETTINGS.gunAccuracy.low.label',
            hint: 'SETTINGS.gunAccuracy.low.hint',
            initial: 0,
        });
        schema.high = new fields.NumberField({
            required: true,
            nullable: false,
            label: 'SETTINGS.gunAccuracy.high.label',
            hint: 'SETTINGS.gunAccuracy.high.hint',
            initial: 1,
        });
        schema.hits = new fields.NumberField({
            required: true,
            nullable: false,
            label: 'SETTINGS.gunAccuracy.hits.label',
            hint: 'SETTINGS.gunAccuracy.hits.hint',
            initial: 0,
        });
        schema.crits = new fields.NumberField({
            required: true,
            nullable: false,
            label: 'SETTINGS.gunAccuracy.crits.label',
            hint: 'SETTINGS.gunAccuracy.crits.hint',
            initial: 0,
        });
        return schema;
    }
}
