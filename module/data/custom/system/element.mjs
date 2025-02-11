import BaseModel from '../baseModel.mjs';

/**
 * Definition of the Element class that is used by lots of things
 *
 * @property {String}   key             A unique key to identify the Element
 * @property {String}   name            Readable name that will be shown
 * @property {String}   description     A description for this Element to provide an explanation
 * @property {String}   icon            Path to the image
 * @property {String}   color           Color to use for this Element
 * @property {String[]} strongAgainst   Array of Defense keys this element deals double damage to
 * @property {String[]} weakAgainst     Array of Defense keys this element deals half damage to
 * @property {String[]} ignores         Array of Defense keys this element ignores, skiping them in the damage calculation
 */
export default class Element extends BaseModel {
    /** @override */
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        schema.icon = new fields.FilePathField({
            initial: `${CONFIG.BADASS.systemPath}/assets/stylable/elements/bullet.svg`,
            categories: ['IMAGE'],
            base64: false,
        });
        schema.color = new fields.ColorField();
        schema.strongAgainst = new fields.ArrayField(new fields.StringField());
        schema.weakAgainst = new fields.ArrayField(new fields.StringField());
        schema.ignores = new fields.ArrayField(new fields.StringField());
        return schema;
    }
}
