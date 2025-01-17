import BadassActorSheetV2 from './badassActorSheetV2.mjs';
import { BADASS } from '../../helper/config.mjs';
import DefenseConfig from '../settings/defenseConfig.mjs';

export default class BadassVaultHunterSheetV2 extends BadassActorSheetV2 {
    static DEFAULT_OPTIONS = {
        ...BadassActorSheetV2.DEFAULT_OPTIONS,
        actions: {
            addDefense: BadassActorSheetV2.addDefense,
        },
    };

    static PARTS = {
        header: {
            id: 'header',
            template: `${BADASS.systemPath}/templates/actor/parts/actorHeader.hbs`,
        },
        defenses: {
            id: 'defenses',
            template: `${BADASS.systemPath}/templates/actor/parts/actorDefenses.hbs`,
        },
        favoredGuns: {
            id: 'favoredGuns',
            template: `${BADASS.systemPath}/templates/actor/parts/actorFavoredGuns.hbs`,
        },
    };

    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        context.gunTypes = game.settings.get(BADASS.namespace, 'gunTypes');
        return context;
    }

    static addDefense() {
        new DefenseConfig().render(true);
    }
}
