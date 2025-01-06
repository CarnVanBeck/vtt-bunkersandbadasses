import ManufacturedItemData from '../manufacturedItem.mjs';

/**
 * System definition for a grenade mod
 */
export default class GrenadeModItemData extends ManufacturedItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.damage = new fields.StringField({ label: 'badass.item.grenade.damage' });
        schema.effect = new fields.ObjectField();
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
