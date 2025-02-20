/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export function preloadHandlebarsTemplates() {
    // Define template paths to load
    const templatePaths = {
        // Item Parts
        optionSelector: `${CONFIG.BADASS.systemPath}/templates/item/parts/optionSelector.hbs`,
        pictureSelector: `${CONFIG.BADASS.systemPath}/templates/item/parts/pictureSelector.hbs`,
        hbsSelector: `${CONFIG.BADASS.systemPath}/templates/item/parts/hbsSelector.hbs`,
        manuItemHeader: `${CONFIG.BADASS.systemPath}/templates/item/parts/manufacturedItemHeader.hbs`,
        gunCardDataAndImage: `${CONFIG.BADASS.systemPath}/templates/item/parts/gunCardDataAndImage.hbs`,
        manuItemNotes: `${CONFIG.BADASS.systemPath}/templates/item/parts/manufacturedItemNotes.hbs`,
        stdInput: `${CONFIG.BADASS.systemPath}/templates/item/parts/stdInput.hbs`,

        // Gun parts
        gunCardHitLine: `${CONFIG.BADASS.systemPath}/templates/item/parts/gunCardAccuracyLine.hbs`,

        // Dices
        d4: `${CONFIG.BADASS.systemPath}/assets/styleable/dice/d4.hbs`,
        d6: `${CONFIG.BADASS.systemPath}/assets/styleable/dice/d6.hbs`,
        d8: `${CONFIG.BADASS.systemPath}/assets/styleable/dice/d8.hbs`,
        d10: `${CONFIG.BADASS.systemPath}/assets/styleable/dice/d10.hbs`,
        d12: `${CONFIG.BADASS.systemPath}/assets/styleable/dice/d12.hbs`,
        d20: `${CONFIG.BADASS.systemPath}/assets/styleable/dice/d20.hbs`,

        // elements
        elementAcid: `${CONFIG.BADASS.systemPath}/assets/styleable/elements/acid.hbs`,
        elementCryo: `${CONFIG.BADASS.systemPath}/assets/styleable/elements/cryo.hbs`,
        // Settings
        gunTypeLevel: `${CONFIG.BADASS.systemPath}/templates/settings/parts/gunTypeLevel.hbs`,

        // Actor Parts
        vhTabDetails: `${CONFIG.BADASS.systemPath}/templates/actor/parts/tabs/vhTabDetails.hbs`,
        vhTabInventory: `${CONFIG.BADASS.systemPath}/templates/actor/parts/tabs/vhTabInventory.hbs`,
        vhTabOverview: `${CONFIG.BADASS.systemPath}/templates/actor/parts/tabs/vhTabOverview.hbs`,

        vhArchetypeFeats: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhArchetypeFeats.hbs`,
        vhBackgrounds: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhBackgrounds.hbs`,
        vhBadass: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhBadass.hbs`,
        vhChecks: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhChecks.hbs`,
        vhDefenses: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhDefenses.hbs`,
        vhFavoredGuns: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhFavoredGuns.hbs`,
        vhGold: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhGold.hbs`,
        vhGrenades: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhGrenades.hbs`,
        vhHeader: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhHeader.hbs`,
        vhInitiative: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhInitiative.hbs`,
        vhMelee: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhMelee.hbs`,
        vhMovement: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhMovement.hbs`,
        vhPlaceholder: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhPlaceholder.hbs`,
        vhPotions: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhPotions.hbs`,
        vhSkills: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhSkills.hbs`,
        vhTraits: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhTraits.hbs`,
        vhXP: `${CONFIG.BADASS.systemPath}/templates/actor/parts/vaultHunter/vhXP.hbs`,
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
        selectInArray: selectInArray,
        checkInArray: checkInArray,
        isNumber: isNumber,
    });
}

/**
 * Handlebar Helpers;
 */
function getDiceCount(aString) {
    return Number.parseInt(aString.split('d')[0]);
}

function getDiceSize(aString) {
    return Number.parseInt(aString.split('d')[1]);
}

function equals(value, key, opts) {
    if (value == key) {
        return opts.fn();
    } else {
        return opts.inverse();
    }
}

function unequals(value, key, opts) {
    if (value == key) {
        return opts.inverse();
    } else {
        return opts.fn();
    }
}

function selectInArray(value, array) {
    return array?.includes(value) ? 'selected' : '';
}

function checkInArray(value, array) {
    return array?.includes(value) ? 'checked' : '';
}

function isNumber(value) {
    return typeof value === 'number';
}
