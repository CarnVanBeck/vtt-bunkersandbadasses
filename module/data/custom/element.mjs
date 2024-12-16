/**
 * Definition of the Element class that is used by lots of things
 *
 * @property {string}   key             A unique key to identify the Element
 * @property {string}   name            Readable name that will be shown
 * @property {string}   description     A description for this Element to provide an explanation
 * @property {string}   icon            Path to the image
 * @property {string[]} strongAgainst   Array of Defense keys this element deals double damage to
 * @property {string[]} weakAgainst     Array of Defense keys this element deals half damage to
 * @property {string[]} ignores         Array of Defense keys this element ignores, skiping them in the damage calculation
 */
export default class Defense {
    key = '';
    name = '';
    description = '';
    icon = '';
    strongAgainst = [];
    weakAgainst = [];
    ignores = [];
}
