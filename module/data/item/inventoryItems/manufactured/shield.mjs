import ManufacturedItemData from '../manufacturedItem.mjs';

/**
 * System definition for a shield
 */
export default class ShieldItemData extends ManufacturedItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.current = new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 20,
            //label: game.i18n.localize('badass.item.value'),
        });
        schema.max = new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 20,
            //label: game.i18n.localize('badass.item.value'),
        });
        schema.recharge = new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 5,
            //label: game.i18n.localize('badass.item.value'),
        });
        schema.element = new fields.ObjectField();
        schema.effect = new fields.ObjectField();
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
