import { BADASS } from '../../helper/config.mjs';
import BadassBrowser from './badassBrowser.mjs';

export default class ActorStuffBrowser extends BadassBrowser {
    constructor(...args) {
        super(...args);
    }

    static DEFAULT_OPTIONS = {
        ...BadassBrowser.DEFAULT_OPTIONS,
        id: `${BADASS.namespace}.actorStuffBrowser`,
        window: {
            ...BadassBrowser.DEFAULT_OPTIONS.window,
            title: 'BROWSER.actorStuffBrowser.label',
        },
        actions: {
            ...BadassBrowser.DEFAULT_OPTIONS.actions,
        },
    };
    static PARTS = {
        ...BadassBrowser.PARTS,
    };
}
