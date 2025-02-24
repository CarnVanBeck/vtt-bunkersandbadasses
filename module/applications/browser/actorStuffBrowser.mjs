import Action from '../../data/custom/character/action.mjs';
import { BADASS } from '../../helper/config.mjs';
import ActionItemSheetV2 from '../../sheets/custom/actionItemSheetV2.mjs';
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
            addAction: ActorStuffBrowser.addAction,
            editAction: ActorStuffBrowser.editAction,
            deleteAction: ActorStuffBrowser.deleteAction,
        },
    };
    static PARTS = {
        ...BadassBrowser.PARTS,
        tabs: {
            // Foundry-provided generic template
            template: 'templates/generic/tab-navigation.hbs',
        },
        actions: {
            template: `${BADASS.systemPath}/templates/browser/browserTabActions.hbs`,
        },
        archetypes: {
            template: `${BADASS.systemPath}/templates/browser/browserTabArchetypes.hbs`,
        },
        classes: {
            template: `${BADASS.systemPath}/templates/browser/browserTabClasses.hbs`,
        },
    };

    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        context.tabs = this._getTabs();
        context.actions = game.settings.get(BADASS.namespace, 'actions');
        context.archetypes = game.settings.get(BADASS.namespace, 'archetypes');
        context.classes = game.settings.get(BADASS.namespace, 'classes');
        return context;
    }

    /** @override */
    async _preparePartContext(partId, context) {
        if (['actions', 'archetypes', 'classes'].includes(partId)) {
            context.tab = context.tabs[partId];
        }
        return context;
    }

    _getTabs() {
        this.tabGroups.primary = this.tabGroups.primary ?? 'actions';

        return {
            actions: {
                label: game.i18n.localize('BROWSER.actorStuffBrowser.tabs.actions.label'),
                icon: 'fas fa-forward',
                id: 'actions',
                group: 'primary',
                cssClass: this.tabGroups.primary === 'actions' ? 'active' : '',
            },
            archetypes: {
                label: game.i18n.localize('BROWSER.actorStuffBrowser.tabs.archetypes.label'),
                icon: 'fas fa-people-arrows',
                id: 'archetypes',
                group: 'primary',
                cssClass: this.tabGroups.primary === 'archetypes' ? 'active' : '',
            },
            classes: {
                label: game.i18n.localize('BROWSER.actorStuffBrowser.tabs.classes.label'),
                icon: 'fas fa-users',
                id: 'classes',
                group: 'primary',
                cssClass: this.tabGroups.primary === 'classes' ? 'active' : '',
            },
        };
    }

    static addAction(e, target) {
        let action = new Action();
        let actions = game.settings.get(BADASS.namespace, 'actions') ?? [];
        actions.push(action);
        game.settings.set(BADASS.namespace, 'actions', actions);
        new ActionItemSheetV2(action.key).render(true);
    }

    static editAction(e, target) {
        new ActionItemSheetV2(action.key).render(true);
    }

    static deleteAction(e, target) {
        let actions = game.settings.get(BADASS.namespace, 'actions').filter((a) => a.key !== target.dataset.key);
        game.settings.set(BADASS.namespace, 'actions', actions);
    }
}
