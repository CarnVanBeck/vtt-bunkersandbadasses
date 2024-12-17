import BaseItemData from './baseItem.mjs';

/**
 * System definition for a red text to be used on manufactured items
 */
export default class RedTextItemData extends BaseItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.descriptionGM = new fields.StringField({
            name: 'descriptionGM',
            label: game.i18n.localize('badass.item.redText.descriptionGM.label'),
            hint: game.i18n.localize('badass.item.redText.descriptionGM.hint'),
        });
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
