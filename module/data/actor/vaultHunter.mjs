import ClassItemData from '../item/characterItems/class.mjs';
import SkillItemData from '../item/characterItems/skill.mjs';
import ActorDataModel from './baseActor.mjs';

/**
 * System definition for Vault Hunter
 *
 * @property {number} xp    Current experience of the Vault Hunter
 */
export default class VaultHunterData extends ActorDataModel {
    /** @inheritDoc */
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();

        schema.xp = new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 0,
            initial: 0,
            label: 'badass.actor.vh.xp.label',
            hint: 'badass.actor.vh.xp.hint',
        });
        schema.equippableItemConfig = new fields.ArrayField(new fields.ObjectField(), {
            required: true,
            nullable: false,
        });
        schema.carriableItemConfig = new fields.ArrayField(new fields.ObjectField(), {
            required: true,
            nullable: false,
        });
        schema.skills = new fields.ArrayField(new fields.EmbeddedDataField(SkillItemData));
        schema.classes = new fields.ArrayField(new fields.EmbeddedDataField(ClassItemData));
        schema.characterInfo = new fields.HTMLField({
            required: false,
            nullable: true,
            label: 'badass.actor.characterInfo.label',
            hint: 'badass.actor.characterInfo.hint',
        });
        schema.background = new fields.HTMLField({
            required: false,
            nullable: true,
            label: 'badass.actor.background.label',
            hint: 'badass.actor.background.hint',
        });

        return schema;
    }

    /**
     * Called before a new actor is created and committed to the database
     * @param {object} data
     * @param {object} options
     * @param {object} user
     */
    _preCreate(data, options, user) {
        this.#preparePrototypeToken();
    }

    /**
     * Set default values for the prototype token of the newly created actor
     */
    #preparePrototypeToken() {
        this.parent.prototypeToken.actorLink = true;
        this.parent.prototypeToken.disposition = 1; //1 = Friendly
    }
}
