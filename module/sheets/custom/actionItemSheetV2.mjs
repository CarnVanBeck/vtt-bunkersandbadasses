import CustomItemSheetV2 from './customItemSheetV2.mjs';
import Action from '../../data/custom/character/action.mjs';
import { BADASS } from '../../helper/config.mjs';
/**
 * A form application to edit, create or look at an action.
 * @extends {CustomItemSheetV2}
 */
export default class ActionItemSheetV2 extends CustomItemSheetV2 {
    constructor(key, ...args) {
        super(...args);
        this.type = 'action';
        this.settingsName = 'actions';
        if (key) {
            this.item = new Action(game.settings.get(BADASS.namespace, 'actions').find((action) => action.key === key));
        }
    }

    static DEFAULT_OPTIONS = {
        ...CustomItemSheetV2.DEFAULT_OPTIONS,
        window: {
            ...CustomItemSheetV2.DEFAULT_OPTIONS.window,
        },
        actions: {
            ...CustomItemSheetV2.DEFAULT_OPTIONS.actions,
        },
    };

    static PARTS = {
        ...CustomItemSheetV2.PARTS,
    };

    /**
     * @override
     */
    _setAdditionalContext(context) {
        if (this.item) {
            context.item = this.item;
        } else {
            context.item = new Action();
        }

        return context;
    }
}
