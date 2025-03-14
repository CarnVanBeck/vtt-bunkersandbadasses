import BaseModel from '../baseModel.mjs';

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
export default class Defense extends BaseModel {
    /** @override */
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.icon = new fields.FilePathField({
            initial: `${CONFIG.BADASS.systemPath}/assets/standalone/defense/shield.svg`,
            categories: ['IMAGE'],
            base64: false,
        });
        schema.order = new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            initial: 0,
        });
        schema.max = new fields.NumberField({
            integer: true,
            min: 0,
        });
        schema.current = new fields.NumberField({
            integer: true,
            min: 0,
        });
        schema.recharge = new fields.NumberField({
            integer: true,
            min: 0,
        });
        schema.isLife = new fields.BooleanField({
            initial: false,
        });
        schema.requiresItem = new fields.BooleanField({
            initial: false,
        });
        schema.item = new fields.DocumentIdField();
        return schema;
    }
}
