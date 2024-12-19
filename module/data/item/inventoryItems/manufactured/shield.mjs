import ManufacturedItemData from '../manufacturedItem.mjs';

/**
 * System definition for a shield
 */
export default class ShieldItemData extends ManufacturedItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.recharge = new fields.NumberField();
        schema.current = new fields.NumberField();
        schema.max = new fields.NumberField();
        schema.element = new fields.ObjectField();
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {
        this.type = 'shield';
    }
}
