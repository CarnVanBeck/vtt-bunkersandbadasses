import BaseActorData from './baseActor.mjs';
import Archetype from '../custom/character/archetype.mjs';
import { getXPSegmentByLevel } from '../../helper/systemValues.mjs';
import Class from '../custom/character/class.mjs';

const fields = foundry.data.fields;
/**
 * System definition for Vault Hunter
 *
 * @property {Number} xp    Current experience of the Vault Hunter
 */
export default class VaultHunterData extends BaseActorData {
    /** @inheritDoc */
    static defineSchema() {
        const schema = super.defineSchema();
        schema.archetypes = new fields.ArrayField(new fields.EmbeddedDataField(Archetype));
        schema.archetype = new fields.StringField({
            required: false,
            nullable: true,
            initial: '',
        });
        schema.class = new fields.ArrayField(new fields.EmbeddedDataField(Class));
        schema.background = new fields.StringField({
            required: false,
            nullable: true,
            initial: '',
            label: 'badass.actor.vaultHunter.archetype.label',
            hint: 'badass.actor.vaultHunter.archetype.hint',
        });
        schema.level = new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 1,
            initial: 1,
            label: 'badass.actor.vaultHunter.level.label',
            hint: 'badass.actor.vaultHunter.level.hint',
        });
        schema.xp = new fields.SchemaField({
            current: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                min: 0,
                initial: 0,
            }),
            segment: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                min: 1,
                initial: 100,
            }),
            nextLevelPercentage: new fields.NumberField({
                required: false,
                nullable: true,
                min: 0.0,
                max: 1.0,
                initial: 0.0,
            }),
            levelUp: new fields.BooleanField({
                required: true,
                nullable: false,
                initial: false,
            }),
        });
        schema.stats = new fields.SchemaField({
            acc: VaultHunterData.getStatField(),
            dmg: VaultHunterData.getStatField(),
            spd: VaultHunterData.getStatField(),
            mst: VaultHunterData.getStatField(),
        });
        schema.checks = new fields.SchemaField({
            insight: VaultHunterData.getCheckField(),
            interact: VaultHunterData.getCheckField(),
            search: VaultHunterData.getCheckField(),
            sneak: VaultHunterData.getCheckField(),
            talk: VaultHunterData.getCheckField(),
            traverse: VaultHunterData.getCheckField(),
        });
        schema.initiative = new fields.SchemaField({
            miscMod: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                initial: 0,
            }),
            miscHint: new fields.StringField({
                required: false,
                nullable: true,
                initial: '',
            }),
            bonus: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                initial: 0,
            }),
            sum: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                initial: 0,
            }),
        });

        schema.badassRank = new fields.NumberField({
            required: true,
            nullable: false,
            integer: true,
            min: 1,
            initial: 1,
            label: 'badass.actor.vaultHunter.badassRank.label',
            hint: 'badass.actor.vaultHunter.badassRank.hint',
        });

        schema.favoredGuns = new fields.ArrayField(
            new fields.StringField({
                required: true,
                nullable: false,
                initial: '',
            }),
            {
                required: false,
                nullable: true,
                label: 'badass.actor.vaultHunter.favoredGuns.label',
                hint: 'badass.actor.vaultHunter.favoredGuns.hint',
            },
        );
        schema.melee = new fields.SchemaField({
            die: new fields.StringField({
                required: true,
                nullable: false,
                initial: '1d6',
            }),
            mod: new fields.NumberField({
                required: true,
                nullable: false,
                integer: true,
                initial: 0,
            }),
            bonus: new fields.NumberField({
                required: true,
                nullable: false,
                integer: true,
                initial: 0,
            }),
            sum: new fields.NumberField({
                required: true,
                nullable: false,
                integer: true,
                initial: 0,
            }),
        });

        schema.characterInfoHtml = new fields.HTMLField({
            required: false,
            nullable: true,
            initial: '',
            label: 'badass.actor.characterInfo.label',
            hint: 'badass.actor.characterInfo.hint',
        });
        schema.backgroundHtml = new fields.HTMLField({
            required: false,
            nullable: true,
            initial: '',
            label: 'badass.actor.background.label',
            hint: 'badass.actor.background.hint',
        });

        schema.equippableItemConfig = new fields.ArrayField(new fields.ObjectField(), {
            required: true,
            nullable: false,
        });
        schema.carriableItemConfig = new fields.ArrayField(new fields.ObjectField(), {
            required: true,
            nullable: false,
        });

        return schema;
    }

    static getStatField() {
        return new fields.SchemaField({
            base: new fields.NumberField({
                required: true,
                nullable: false,
                integer: true,
                min: 0,
                initial: 0,
                label: 'badass.stats.acc.label',
                hint: 'badass.stats.acc.hint',
            }),
            mod: new fields.StringField({
                required: false,
                nullable: true,
                initial: '',
            }),
            bonus: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                initial: 0,
            }),
            sum: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                initial: 0,
            }),
        });
    }

    static getCheckField() {
        return new fields.SchemaField({
            base: new fields.NumberField({
                required: true,
                nullable: false,
                integer: true,
                min: 0,
                initial: 0,
                label: 'badass.stats.acc.label',
                hint: 'badass.stats.acc.hint',
            }),
            mod: new fields.StringField({
                required: false,
                nullable: true,
                initial: '',
            }),
            miscMod: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                initial: 0,
            }),
            miscHint: new fields.StringField({
                required: false,
                nullable: true,
                initial: '',
            }),
            bonus: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                initial: 0,
            }),
            sum: new fields.NumberField({
                required: false,
                nullable: true,
                integer: true,
                initial: 0,
            }),
        });
    }

    _updateCheck(check, mod, base) {
        check.base = base;
        check.mod = mod;
    }

    prepareDerivedData() {
        this.archetypeNames = this.archetypes.map((archetype) => archetype.name).join('/');

        for (let stat in this.stats) {
            this.stats[stat].sum = this.stats[stat].base + this.stats[stat].bonus;
            this.stats[stat].mod = Math.floor(this.stats[stat].sum / 2);
        }

        for (let checkName in this.checks) {
            let check = this.checks[checkName];
            switch (checkName) {
                case 'insight':
                    this._updateCheck(check, 'ACC', this.stats.acc.mod);
                    break;
                case 'interact':
                    this._updateCheck(check, 'ACC', this.stats.acc.mod);
                    break;
                case 'search':
                    this._updateCheck(check, 'MST', this.stats.mst.mod);
                    break;
                case 'sneak':
                    this._updateCheck(check, 'MST', this.stats.mst.mod);
                    break;
                case 'talk':
                    this._updateCheck(check, 'SPD', this.stats.spd.mod);
                    break;
                case 'traverse':
                    this._updateCheck(check, 'SPD', this.stats.spd.mod);
                    break;
            }
            check.sum = check.base + check.bonus + check.miscMod;
        }

        for (let at in this.archetypes) {
            this.level += at.level;
        }
        this.xp.segment = getXPSegmentByLevel(this.level);
        this.xp.nextLevelPercentage = this.xp.current / (this.xp.segment * 10);
        this.xp.levelUp = this.xp.nextLevelPercentage >= 1;
    }

    /**
     * Called before a new actor is created and committed to the database
     * @param {Object} data
     * @param {Object} options
     * @param {Object} user
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

