/**
 * Definition of the GunType class that is used to preconfigure types for guns
 *
 * @property {string}   key         A unique key to identify the type
 * @property {string}   name        Readable name that will be shown in Sheets
 * @property {string}   description A description for this Defense to provide an explanation
 * @property {string}   icon        Path to the image
 * @property {object[]} levels      Array of GunLevels to specify the scaling
 */
export default class GunType {
    key = '';
    name = '';
    description = '';
    icon = '';
    levels = [];
}
/**
 * Definition of the GunLevel class that is used to preconfigure types for guns
 *
 * @property {number}   start  The starting level to find guns with these values
 * @property {number}   end    The end level to find guns with these values
 * @property {object[]} accuracy    Array of GunAccuracy instances
 * @property {string}   damage      The damage die that is used for this type
 * @property {number}   range       The number of squares the gun can be used for
 */
export class GunLevel {
    start = 0;
    end = 0;
    accuracy = [];
    damage = '';
    range = 0;
}
