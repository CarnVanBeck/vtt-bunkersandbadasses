import SkillTier from './skillTier.mjs';
import Action from './action.mjs';
import Background from './background.mjs';
import BaseModel from '../baseModel.mjs';

/**
 * System definition for a class
 */
export default class Class extends BaseModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.appearance = new fields.StringField();
        schema.favoredGuns = new fields.ArrayField(new fields.StringField());
        schema.statMods = new fields.SchemaField({
            acc: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                initial: 0,
            }),
            dmg: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                initial: 0,
            }),
            spd: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                initial: 0,
            }),
            mst: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                initial: 0,
            }),
        });
        schema.meleeDie = new fields.StringField({
            required: true,
            nullable: false,
            initial: '1d4',
        });
        schema.skillTree = new fields.StringField();
        schema.skillTiers = new fields.ArrayField(new fields.EmbeddedDataField(SkillTier));
        schema.actionSkill = new fields.EmbeddedDataField(Action);
        schema.backgrounds = new fields.ArrayField(new fields.EmbeddedDataField(Background));
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
