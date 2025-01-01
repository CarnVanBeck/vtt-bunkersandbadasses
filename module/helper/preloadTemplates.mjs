import { BADASS } from './config.mjs';

/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
    // Define template paths to load
    const templatePaths = {

        // Item Parts
        optionSelector: `${BADASS.systemPath}/templates/item/parts/optionSelector.html`,
        manuItemHeader: `${BADASS.systemPath}/templates/item/parts/manufacturedItemHeader.html`,
        // Gun parts
        gunCardHitLine: `${BADASS.systemPath}/templates/item/parts/gunCardAccuracyLine.html`,

        // Dices
        d4: `${BADASS.systemPath}/assets/styleable/dice/d4.html`,
        d6: `${BADASS.systemPath}/assets/styleable/dice/d6.html`,
        d20: `${BADASS.systemPath}/assets/styleable/dice/d20.html`,

        // elements
        elementAcid: `${BADASS.systemPath}/assets/styleable/elements/acid.html`,
        elementCryo: `${BADASS.systemPath}/assets/styleable/elements/cryo.html`,

        actorActions: `${BADASS.systemPath}/templates/actor/parts/actions.hbs`,
        actorActiveEffects: `${BADASS.systemPath}/templates/actor/parts/activeEffects.hbs`,
        actorDefense: `${BADASS.systemPath}/templates/actor/parts/defense.hbs`,
        actorItems: `${BADASS.systemPath}/templates/actor/parts/items.hbs`,
        actorSkills: `${BADASS.systemPath}/templates/actor/parts/skills.hbs`,
        actorEquipment: `${BADASS.systemPath}/templates/actor/parts/equipment.hbs`,
    };

    // Load the template parts
    return loadTemplates(templatePaths);
};
