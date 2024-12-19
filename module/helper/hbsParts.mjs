import { BADASS } from './config.mjs';

/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
    return loadTemplates([
        `${BADASS.systemPath}/templates/actor/parts/actions.hbs`,
        `${BADASS.systemPath}/templates/actor/parts/activeEffects.hbs`,
        `${BADASS.systemPath}/templates/actor/parts/defense.hbs`,
        `${BADASS.systemPath}/templates/actor/parts/items.hbs`,
        `${BADASS.systemPath}/templates/actor/parts/skills.hbs`,
        `${BADASS.systemPath}/templates/actor/parts/equipment.hbs`,
    ]);
};
