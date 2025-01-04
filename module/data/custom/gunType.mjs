/**
 * Definition of the GunType class that is used to preconfigure types for guns
 *
 * @property {String}   key         A unique key to identify the type
 * @property {String}   name        Readable name that will be shown in Sheets
 * @property {String}   description A description for this Defense to provide an explanation
 * @property {String}   icon        Path to the image
 * @property {Object[]} levels      Array of GunLevels to specify the scaling
 */
export class GunType {
    key = '';
    name = '';
    description = '';
    icon = '';
    levels = [];
}
/**
 * Definition of the GunLevel class that is used to preconfigure types for guns
 *
 * @property {Number}   start  The starting level to find guns with these values
 * @property {Number}   end    The end level to find guns with these values
 * @property {Object[]} accuracy    Array of GunAccuracy instances
 * @property {String}   damage      The damage die that is used for this type
 * @property {Number}   range       The number of squares the gun can be used for
 */
export class GunLevel {
    start = 0;
    end = 0;
    accuracy = [];
    damage = '';
    range = 0;
}
