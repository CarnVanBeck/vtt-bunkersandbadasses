/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export function preloadHandlebarsTemplates() {
    // Define template paths to load
    const templatePaths = {
        // Item Parts
        optionSelector: `${CONFIG.BADASS.systemPath}/templates/item/parts/optionSelector.html`,
        manuItemHeader: `${CONFIG.BADASS.systemPath}/templates/item/parts/manufacturedItemHeader.html`,
        // Gun parts
        gunCardHitLine: `${CONFIG.BADASS.systemPath}/templates/item/parts/gunCardAccuracyLine.html`,

        // Dices
        d4: `${CONFIG.BADASS.systemPath}/assets/styleable/dice/d4.html`,
        d6: `${CONFIG.BADASS.systemPath}/assets/styleable/dice/d6.html`,
        d20: `${CONFIG.BADASS.systemPath}/assets/styleable/dice/d20.html`,

        // elements
        elementAcid: `${CONFIG.BADASS.systemPath}/assets/styleable/elements/acid.html`,
        elementCryo: `${CONFIG.BADASS.systemPath}/assets/styleable/elements/cryo.html`,

        actorActions: `${CONFIG.BADASS.systemPath}/templates/actor/parts/actions.hbs`,
        actorActiveEffects: `${CONFIG.BADASS.systemPath}/templates/actor/parts/activeEffects.hbs`,
        actorDefense: `${CONFIG.BADASS.systemPath}/templates/actor/parts/defense.hbs`,
        actorItems: `${CONFIG.BADASS.systemPath}/templates/actor/parts/items.hbs`,
        actorSkills: `${CONFIG.BADASS.systemPath}/templates/actor/parts/skills.hbs`,
        actorEquipment: `${CONFIG.BADASS.systemPath}/templates/actor/parts/equipment.hbs`,
    };

    // Load the template parts
    return loadTemplates(templatePaths);
}

export function registerHandlebarHelpers() {
    Handlebars.registerHelper({
        getProperty: foundry.utils.getProperty,
        getDiceCount: getDiceCount,
        getDiceSize: getDiceSize,
        equals: equals,
        unequals: unequals,
        isInArray: isInArray,
    });
}

/**
 * Handlebar Helpers;
 */
function getDiceCount(aString) {
    return aString.split('d')[0];
}

function getDiceSize(aString) {
    return aString.split('d')[1];
}

function equals(value, key, opts) {
    if (value === key) {
        return opts.fn();
    } else {
        return opts.inverse();
    }
}

function unequals(value, key, opts) {
    if (value === key) {
        return opts.inverse();
    } else {
        return opts.fn();
    }
}

function isInArray(value, array) {
    return array?.includes(value) ? 'selected' : '';
}
