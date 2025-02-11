export default class BaseModel extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};
        schema.key = new fields.StringField({
            required: true,
            nullable: false,
            initial: '',
        });
        schema.name = new fields.StringField({
            required: true,
            nullable: false,
            initial: '',
        });
        schema.description = new fields.StringField();
        return schema;
    }
    /**
     * Convert the schema to a plain object.
     *
     * The built in `toObject()` method will ignore derived data when using Data Models.
     * This additional method will instead use the spread operator to return a simplified
     * version of the data.
     *
     * @returns {Object} Plain object either via deepClone or the spread operator.
     */
    toPlainObject() {
        return { ...this };
    }

    /**
     * Convert the schema to a plain object.
     * Because writing an instance of a Data Model to the settings will clear the values with
     * the way Foundry saves the data.
     * Foundry uses the toObject method and using it on a DataModel will return an the correct properties
     * defined in the schema but not the values in the properties.
     * @returns {Object} Plain object. Savable to settings.
     * @override
     */
    toObject() {
        //TODO: @CarnVanBeck foundry.utils.deepClone auschecken
        let obj = {};
        for (let key in this) {
            obj[key] = this[key];
        }
        return obj;
    }
}
