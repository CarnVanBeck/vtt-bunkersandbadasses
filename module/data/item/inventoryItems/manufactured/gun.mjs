import ManufacturedItemData from '../manufacturedItem.mjs';

/**
 * System definition for a gun
 */
export default class GunItemData extends ManufacturedItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.damage = new fields.StringField({ label: 'badass.item.gun.damage' });
        schema.range = new fields.NumberField({
            nullable: false,
            integer: true,
            min: 0,
            initial: 5,
            label: 'badass.item.gun.range'
        });
        schema.redText = new fields.DocumentIdField(foundry.documents.BaseItem, {
            label: 'badass.item.gun.redText',
            required: false,
            nullable: true,
        });
        schema.prefix = new fields.DocumentIdField(foundry.documents.BaseItem, {
            label: 'badass.item.gun.prefix',
            required: false,
            nullable: true,
        });
        schema.accuracy = new fields.ArrayField(new fields.ObjectField());
        schema.type = new fields.StringField({ label: 'badass.item.gun.type' });
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {
        this.type = 'gun';
    }
}
