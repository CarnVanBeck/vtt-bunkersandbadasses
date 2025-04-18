import { BADASS } from '../../../helper/config.mjs';
import CharacterItemModel from '../characterItemModel.mjs';

/**
 * System definition for an archetype
 */
export default class Archetype extends CharacterItemModel {
    constructor(data = {}) {
        super();
        this.type = 'archetype';

        const defaults = {
            name: game.i18n.localize('TYPES.custom.archetype'),
            key: this._generateKey('archetypes'),
        };

        Object.assign(this, defaults, data);
        console.log(this);
    }
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
            initial: 1,
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

    static getByKey(key) {
        const archetypes = game.settings.get(BADASS.namespace, 'archetypes') ?? [];

        return archetypes.find((a) => a.key === key);
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
