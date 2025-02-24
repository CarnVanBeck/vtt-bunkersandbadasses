import CharacterModel from '../characterModel.mjs';

/**
 * System definition for an archetype
 */
export default class Archetype extends CharacterModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.startStats = new fields.SchemaField({
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
        schema.level = new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            initial: 0,
        });
        schema.levels = new fields.ArrayField(
            new fields.SchemaField({
                level: new fields.NumberField({
                    required: true,
                    nullable: false,
                    integer: true,
                }),
                reward: new fields.ArrayField(new fields.ObjectField()),
            }),
        );
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
