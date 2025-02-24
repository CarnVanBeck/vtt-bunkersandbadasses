import { BADASS } from '../../helper/config.mjs';
import { generateUUID } from '../../helper/utils.mjs';
import BaseModel from './baseModel.mjs';

/**
 * System definition for an archetype
 */
export default class CharacterModel extends BaseModel {
    constructor() {
        super();
    }
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.type = new fields.StringField({
            required: true,
            nullable: false,
            initial: '',
        });
        schema.key = new fields.StringField({
            required: true,
            nullable: false,
            initial: '',
        });
        schema.name = new fields.StringField({
            required: true,
            nullable: false,
            initial: '',
        });
        schema.description = new fields.HTMLField();
        schema.icon = new fields.FilePathField({
            initial: 'icons/svg/temple.svg',
            categories: ['IMAGE'],
            base64: false,
        });
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}

    /**
     * Generate a unique key for this type
     * @private
     */
    _generateKey(settingsName) {
        let newKey = `${this.type}-${generateUUID()}`;
        let settings = game.settings.get(BADASS.namespace, settingsName);
        while (settings.some((setting) => setting.key === newKey)) {
            newKey = `${this.type}-${generateUUID()}`;
        }
        return newKey;
    }
}
