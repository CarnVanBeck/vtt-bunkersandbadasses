import CharacterModel from '../characterModel.mjs';

/**
 * System definition for an action
 */
export default class Action extends CharacterModel {
    constructor() {
        super();
        this.name = game.i18n.localize('TYPES.custom.action');
        this.type = 'action';
        this.key = this._generateKey('actions');
    }
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        return schema;
    }
    /** @inheritDoc */
    prepareDerivedData() {}
}
