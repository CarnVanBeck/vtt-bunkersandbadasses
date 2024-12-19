/**
 * Base stuff for all actors in Bunkers & Badasses
 */
export class BadassActor extends Actor {
    /**
     * Damage will allways be applied to the defenses of an Actor by using the order
     * after that the element of the attack needs to be identified if one is provided
     * @param {number} damage Integer of damage to apply to
     * @param {object} [options={element: {Element}, melee: {boolean}}] optional stuff to apply bonuses or maluses to the damage
     */
    async applyDamage(damage, options) {
        //TODO: @CarnVanBeck go through actors defenses and apply damage based on additional element attributes.
        await ChatMessage.implementation.create({
            content: `${this.name} took ${damage} damage!`,
        });
    }

    /**
     * Will return the defense attribute that is marked as isLife = true to determin which the actual hps are
     * if none or multiple are found the one with the highest order will be used
     *
     * @type {number}
     */
    get hp() {
        //TODO: @CarnVanBeck once the defense field is available add retrieval of these attributes
    }

    prepareDerivedData() {
        super.prepareDerivedData();
        //TODO: @CarnVanBeck check that every defense is withing 0 and max
    }
    toPlainObject() {
        return { ...this };
    }
}
