/**
 * Definition of the Defense class that is used on actors
 * to specify stuff like shields, hp and so on
 *
 * @property {string}   key         A unique key to identify the Defense
 * @property {string}   name        Readable name that will be shown in Sheets
 * @property {string}   description A description for this Defense to provide an explanation
 * @property {number}   order       The order in which the defense instances will be used during the damage calculation
 * @property {number}   max         The maximum value for this Defense instance
 * @property {number}   current     The current value of the actors Defense for this instance
 * @property {number}   recharge    How much the current increases if the Actor wasn't hit
 * @property {boolean}  isLife      Identifies if the actor counts as dead if this Defense instance gets to current = 0
 * @property {object}   item        Alternative to specified values (max, current and recharge) a item like a shield or armor can be used
 */
export default class Defense {
    key = '';
    name = '';
    description = '';
    order = 0;
    max = 0;
    current = 0;
    recharge = 0;
    isLife = false;
    item;
}
