import CharacterItemData from '../characterItem.mjs';
import ClassItemData from './class.mjs';

/**
 * System definition for a skill
 */
export default class SkillItemData extends CharacterItemData {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.class = new fields.EmbeddedDataField(ClassItemData);
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {
        this.type = 'skill';
    }
}
