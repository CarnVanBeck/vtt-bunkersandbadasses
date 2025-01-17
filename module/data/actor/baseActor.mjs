import BaseItemData from '../item/baseItem.mjs';
import ActionItemData from '../item/characterItems/action.mjs';
import InventoryItemData from '../item/inventoryItem.mjs';
import BadassDataModel from '../model.mjs';

/**
 * Base class for all actors
 * @property {Number} movement    The amount of squares the actor can move in combat
 */
export default class BaseActorData extends BadassDataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};
        schema.movement = new fields.SchemaField({
            base: new fields.NumberField({
                required: true,
                nullable: false,
                integer: true,
                initial: 3,
            }),
            miscMod: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                initial: 0,
            }),
            miscHint: new fields.StringField({
                required: false,
                nullable: true,
                initial: '',
            }),
            bonus: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                initial: 0,
            }),
            sum: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                initial: 0,
            }),
        });
        schema.defenses = new fields.ArrayField(new fields.ObjectField(), {
            required: false,
            nullable: true,
            label: 'badass.actor.defense.label',
            hint: 'badass.actor.defense.hint',
        });
        schema.inventory = new fields.ArrayField(new fields.EmbeddedDataField(InventoryItemData));
        schema.actions = new fields.ArrayField(new fields.EmbeddedDataField(ActionItemData));
        schema.notes = new fields.StringField({
            required: false,
            nullable: true,
            label: 'badass.actor.notes.label',
            hint: 'badass.actor.notes.hint',
        });
        schema.publicInfo = new fields.HTMLField({
            required: false,
            nullable: true,
            label: 'badass.actor.publicInfo.label',
            hint: 'badass.actor.publicInfo.hint',
        });
        schema.tookDamage = new fields.BooleanField({
            initial: false,
            label: 'badass.actor.tookDamage.label',
            hint: 'badass.actor.tookDamage.hint',
        });
        return schema;
    }
}
