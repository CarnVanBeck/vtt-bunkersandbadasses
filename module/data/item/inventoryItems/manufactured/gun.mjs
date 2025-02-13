import BaseModifyableNumeric from '../../../custom/BaseModNumeric.mjs';
import Prefix from '../../../custom/item/prefix.mjs';
import RedText from '../../../custom/item/redText.mjs';
import GunAccuracy from '../../../custom/system/structure/gunAccuracy.mjs';
import ManufacturedItemData from '../manufacturedItem.mjs';

/**
 * System definition for a gun
 */
export default class GunItemData extends ManufacturedItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.damage = new fields.SchemaField({
            base: new fields.StringField({
                required: false,
                nullable: true,
                initial: '',
            }),
            mod: new fields.StringField({
                required: false,
                nullable: true,
                initial: '',
            }),
            //TODO: Check for approach
        });
        schema.range = new fields.EmbeddedDataField(BaseModifyableNumeric);
        schema.redText = new fields.EmbeddedDataField(RedText);
        schema.prefix = new fields.EmbeddedDataField(Prefix);
        schema.accuracy = new fields.ArrayField(new fields.EmbeddedDataField(GunAccuracy));
        schema.type = new fields.StringField();
        return schema;
    }
}
