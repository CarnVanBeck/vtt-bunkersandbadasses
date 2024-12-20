/**
 * Base stuff for all actors in Bunkers & Badasses
 */
export class BadassItem extends Item {
    toPlainObject() {
        return { ...this };
    }
}
