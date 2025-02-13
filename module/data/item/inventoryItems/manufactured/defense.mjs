import BaseModifyableNumeric from '../../../custom/BaseModNumeric.mjs';
import ManufacturedItemData from '../manufacturedItem.mjs';

/**
 * System definition for a defense items like shields or armor
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
            initial: 0,
        });
        schema.max = new fields.EmbeddedDataField(BaseModifyableNumeric);
        schema.regen = new fields.EmbeddedDataField(BaseModifyableNumeric);
        schema.defenseType = new fields.StringField();
        return schema;
    }
}
