import BadassDataModel from '../model.mjs';

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
export default class GunLevel extends BadassDataModel {
    /** @override */
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};
        schema.start = new fields.NumberField({
            required: true,
            nullable: false,
            label: 'SETTINGS.gunLevels.start.label',
            hint: 'SETTINGS.gunLevels.start.hint',
            initial: 0,
        });
        schema.end = new fields.NumberField({
            required: true,
            nullable: false,
            label: 'SETTINGS.gunLevels.end.label',
            hint: 'SETTINGS.gunLevels.end.hint',
            initial: 0,
        });
        schema.accuracy = new fields.ArrayField(new fields.ObjectField(), {
            label: 'SETTINGS.gunTypes.accuracies.label',
            hint: 'SETTINGS.gunTypes.accuracies.hint',
        });
        schema.damage = new fields.StringField({
            required: true,
            nullable: false,
            label: 'SETTINGS.gunLevels.damage.label',
            hint: 'SETTINGS.gunLevels.damage.hint',
            initial: '1d6',
        });
        schema.range = new fields.NumberField({
            required: true,
            nullable: false,
            label: 'SETTINGS.gunLevels.range.label',
            hint: 'SETTINGS.gunLevels.range.hint',
            initial: 0,
        });
        return schema;
    }
}
