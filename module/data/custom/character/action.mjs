import CharacterItemModel from '../characterItemModel.mjs';

/**
 * System definition for an action
 */
export default class Action extends CharacterItemModel {
    constructor(data = {}) {
        super();
        this.type = 'action';

        const defaults = {
            name: game.i18n.localize('TYPES.custom.action'),
            key: this._generateKey('actions'),
        };

        Object.assign(this, defaults, data);
        console.log(this);
    }

    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
