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
        schema.damage = new fields.StringField();
        schema.range = new fields.NumberField({
            nullable: false,
            integer: true,
            min: 0,
            initial: 5,
        });
        schema.redText = new fields.EmbeddedDataField(RedText);
        schema.prefix = new fields.EmbeddedDataField(Prefix);
        schema.accuracy = new fields.ArrayField(new fields.EmbeddedDataField(GunAccuracy));
        schema.type = new fields.StringField();
        return schema;
    }
}
