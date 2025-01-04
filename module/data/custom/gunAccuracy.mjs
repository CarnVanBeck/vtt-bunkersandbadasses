/**
 * Definition of the Gun Accuracy class that is used byguns to determin the hits and crits per dice roll
 *
 * @property {Number}   low             Lowest roll for this instance to be applied
 * @property {Number}   high            Highest roll for this instance to be applied
 * @property {Number}   hits            Amount of hits for this dice roll
 * @property {Number}   crits           Amount of crits for this dice roll
 */
export default class GunAccuracy {
    low = 0;
    high = 0;
    hits = 0;
    crits = 0;
}
