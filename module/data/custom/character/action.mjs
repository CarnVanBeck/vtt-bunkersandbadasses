import BaseModel from '../baseModel.mjs';

/**
 * System definition for an action
 */
export default class Action extends BaseModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        return schema;
    }

    /** @inheritDoc */
    prepareDerivedData() {}
}
