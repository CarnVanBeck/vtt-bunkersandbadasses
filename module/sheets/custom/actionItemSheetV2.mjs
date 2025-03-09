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
            let settings = game.settings.get(BADASS.namespace, 'actions');
            if (settings) {
                this.item = new Action(settings.find((action) => action.key === key));
            } else {
                this.item = new Action();
            }
            this.window.title = this.item.name;
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
        return context;
    }
}
