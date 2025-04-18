import CharacterItemModel from '../characterItemModel.mjs';
import Skill from './skill.mjs';

/**
 * System definition for a skill
 */
export default class SkillTier extends CharacterItemModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.order = new fields.NumberField({ required: true, initial: 1, min: 1 });
        schema.skills = new fields.ArrayField(new fields.EmbeddedDataField(Skill));
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {
        this.name = `${game.i18n.localize('badass.actor.vaultHunter.class.skills.tier')} ${this.order}`;
    }
}
