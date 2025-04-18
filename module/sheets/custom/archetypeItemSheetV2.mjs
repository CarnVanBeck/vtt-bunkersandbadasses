import CustomItemSheetV2 from './customItemSheetV2.mjs';
import Archetype from '../../data/custom/character/archetype.mjs';
import { BADASS } from '../../helper/config.mjs';
/**
 * A form application to edit, create or look at an archetype.
 * @extends {CustomItemSheetV2}
 */
export default class ArchetypeItemSheetV2 extends CustomItemSheetV2 {
    constructor(key, ...args) {
        super(...args);
        this.type = 'archetype';
        this.settingsName = 'archetypes';
        if (key) {
            let settings = game.settings.get(BADASS.namespace, 'archetypes');
            if (settings) {
                this.item = new Archetype(settings.find((archetype) => archetype.key === key));
            } else {
                this.item = new Archetype();
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
