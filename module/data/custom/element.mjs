import BadassDataModel from '../model.mjs';
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
export default class Element extends BadassDataModel {
    /** @override */
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};
        schema.key = new fields.StringField({
            required: true,
            nullable: false,
            label: 'SETTINGS.elements.key.label',
            hint: 'SETTINGS.elements.key.hint',
            default: '',
        });
        schema.name = new fields.StringField({
            required: true,
            nullable: false,
            label: 'SETTINGS.elements.name.label',
            hint: 'SETTINGS.elements.name.hint',
            default: '',
        });
        schema.description = new fields.StringField({
            label: 'SETTINGS.elements.description.label',
            hint: 'SETTINGS.elements.description.hint',
        });
        schema.icon = new fields.FilePathField({
            label: 'SETTINGS.elements.icon.label',
            hint: 'SETTINGS.elements.icon.hint',
            initial: `${CONFIG.BADASS.systemPath}/assets/standalone/elements/explosive.svg`,
            categories: ['IMAGE'],
            base64: false,
        });
        schema.color = new fields.ColorField({
            label: 'SETTINGS.elements.color.label',
            hint: 'SETTINGS.elements.color.hint',
        });
        schema.strongAgainst = new fields.ArrayField(new fields.StringField(), {
            label: 'SETTINGS.elements.strongAgainst.label',
            hint: 'SETTINGS.elements.strongAgainst.hint',
        });
        schema.weakAgainst = new fields.ArrayField(new fields.StringField(), {
            label: 'SETTINGS.elements.weakAgainst.label',
            hint: 'SETTINGS.elements.weakAgainst.hint',
        });
        schema.ignores = new fields.ArrayField(new fields.StringField(), {
            label: 'SETTINGS.elements.ignores.label',
            hint: 'SETTINGS.elements.ignores.hint',
        });
        return schema;
    }
}
