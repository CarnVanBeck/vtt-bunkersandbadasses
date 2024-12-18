import ManufacturedItemData from '../manufacturedItem.mjs';

/**
 * System definition for a gun
 */
export default class GunItemData extends ManufacturedItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.level = new fields.StringField({ label: game.i18n.localize('badass.item.gun.level') });
        schema.damage = new fields.StringField({ label: game.i18n.localize('badass.item.gun.damage') });
        schema.range = new fields.NumberField({ label: game.i18n.localize('badass.item.gun.range') });
        schema.redText = new fields.ObjectField({
            name: 'redText',
            label: game.i18n.localize('badass.item.gun.redText'),
            required: false,
            nullable: true,
        });
        schema.prefix = new fields.ObjectField({
            name: 'prefix',
            label: game.i18n.localize('badass.item.gun.prefix'),
            required: false,
            nullable: true,
        });
        schema.accuracy = new fields.ArrayField(new fields.ObjectField());
        schema.type = new fields.StringField({ label: game.i18n.localize('badass.item.gun.type') });
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
