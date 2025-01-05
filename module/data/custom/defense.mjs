import BadassDataModel from '../model.mjs';

/**
 * Definition of the Defense class that is used on actors
 * to specify stuff like shields, hp and so on
 *
 * @property {String}   key             A unique key to identify the Defense
 * @property {String}   name            Readable name that will be shown in Sheets
 * @property {String}   description     A description for this Defense to provide an explanation
 * @property {Number}   order           The order in which the defense instances will be used during the damage calculation
 * @property {Number}   max             The maximum value for this Defense instance
 * @property {Number}   current         The current value of the actors Defense for this instance
 * @property {Number}   recharge        How much the current increases if the Actor wasn't hit
 * @property {Boolean}  isLife          Identifies if the actor counts as dead if this Defense instance gets to current = 0
 * @property {Boolean}  requiresItem    Specifies if the Defense instance requires an Item or values once added to an Actor
 * @property {Object}   item            Alternative to specified values (max, current and recharge) a item like a shield or armor can be used
 */
export default class Defense extends BadassDataModel {
    /** @override */
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};
        schema.key = new fields.StringField({
            required: true,
            nullable: false,
            label: 'SETTINGS.defenses.key.label',
            hint: 'SETTINGS.defenses.key.hint',
            initial: '',
        });
        schema.name = new fields.StringField({
            required: true,
            nullable: false,
            label: 'SETTINGS.defenses.name.label',
            hint: 'SETTINGS.defenses.name.hint',
            initial: '',
        });
        schema.description = new fields.StringField({
            label: 'SETTINGS.defenses.description.label',
            hint: 'SETTINGS.defenses.description.hint',
        });
        schema.order = new fields.NumberField({
            required: true,
            nullable: false,
            label: 'SETTINGS.defenses.order.label',
            hint: 'SETTINGS.defenses.order.hint',
            initial: 0,
        });
        schema.max = new fields.NumberField({
            label: 'SETTINGS.defenses.max.label',
            hint: 'SETTINGS.defenses.max.hint',
        });
        schema.current = new fields.NumberField({
            label: 'SETTINGS.defenses.current.label',
            hint: 'SETTINGS.defenses.current.hint',
        });
        schema.recharge = new fields.NumberField({
            label: 'SETTINGS.defenses.recharge.label',
            hint: 'SETTINGS.defenses.recharge.hint',
        });
        schema.isLife = new fields.BooleanField({
            label: 'SETTINGS.defenses.isLife.label',
            hint: 'SETTINGS.defenses.isLife.hint',
            initial: false,
        });
        schema.requiresItem = new fields.BooleanField({
            label: 'SETTINGS.defenses.requiresItem.label',
            hint: 'SETTINGS.defenses.requiresItem.hint',
            initial: false,
        });
        schema.item = new fields.DocumentIdField({
            label: 'SETTINGS.defenses.item.label',
            hint: 'SETTINGS.defenses.item.hint',
        });
        return schema;
    }
}
