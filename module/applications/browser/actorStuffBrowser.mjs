import Action from '../../data/custom/character/action.mjs';
import Archetype from '../../data/custom/character/archetype.mjs';
import { BADASS } from '../../helper/config.mjs';
import ActionItemSheetV2 from '../../sheets/custom/actionItemSheetV2.mjs';
import ArchetypeItemSheetV2 from '../../sheets/custom/archetypeItemSheetV2.mjs';
import BadassBrowser from './badassBrowser.mjs';

export default class ActorStuffBrowser extends BadassBrowser {
    constructor(startTab, ...args) {
        super(...args);
        this.startTab = startTab ?? 'actions';
        this.#dragDrop = this.#createDragDropHandlers();
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
            addaction: ActorStuffBrowser.addAction,
            editaction: ActorStuffBrowser.editAction,
            deleteaction: ActorStuffBrowser.deleteAction,
            addarchetype: ActorStuffBrowser.addArchetype,
            editarchetype: ActorStuffBrowser.editArchetype,
            deletearchetype: ActorStuffBrowser.deleteArchetype,
        },
        dragDrop: [{ dragSelector: '[data-drag]' }],
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
        this.tabGroups.primary = this.tabGroups.primary ?? this.startTab;

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

    _onRender(context, options) {
        this.#dragDrop.forEach((d) => d.bind(this.element));
    }

    //#region Action Methods
    static async addAction(e, target) {
        let action = new Action();
        let actions = game.settings.get(BADASS.namespace, 'actions') ?? [];
        actions.push(action);
        await game.settings.set(BADASS.namespace, 'actions', actions);
        this.render();
        new ActionItemSheetV2(action.key, () => {
            this.render();
        }).render(true);
    }

    static editAction(e, target) {
        new ActionItemSheetV2(target.dataset.key, () => {
            this.render();
        }).render(true);
    }

    static async deleteAction(e, target) {
        let actions = game.settings.get(BADASS.namespace, 'actions').filter((a) => a.key !== target.dataset.key);
        await game.settings.set(BADASS.namespace, 'actions', actions);
        this.render();
    }
    //#endregion

    //#region Archetype Methods
    static async addArchetype(e, target) {
        let archetype = new Archetype();
        let archetypes = game.settings.get(BADASS.namespace, 'archetypes') ?? [];
        archetypes.push(archetype);
        await game.settings.set(BADASS.namespace, 'archetypes', archetypes);
        this.render();
        new ArchetypeItemSheetV2(archetype.key, () => {
            this.render();
        }).render(true);
    }

    static editArchetype(e, target) {
        new ArchetypeItemSheetV2(target.dataset.key, () => {
            this.render();
        }).render(true);
    }

    static async deleteArchetype(e, target) {
        let archetypes = game.settings.get(BADASS.namespace, 'archetypes').filter((a) => a.key !== target.dataset.key);
        await game.settings.set(BADASS.namespace, 'archetypes', archetypes);
        this.render();
    }
    //#endregion

    //#region Drag and Drop Implementation
    /**
     * Create drag-and-drop workflow handlers for this Application
     * @returns {DragDrop[]}     An array of DragDrop handlers
     * @private
     */
    #createDragDropHandlers() {
        return this.options.dragDrop.map((d) => {
            d.callbacks = {
                dragstart: this._onDragStart.bind(this),
            };
            return new DragDrop(d);
        });
    }

    #dragDrop;

    /**
     * Returns an array of DragDrop instances
     * @type {DragDrop[]}
     */
    get dragDrop() {
        return this.#dragDrop;
    }

    _onDragStart(event) {
        console.debug('dragstart', event);

        const el = event.currentTarget;
        if ('link' in event.target.dataset) return;

        // Extract the data you need
        let dragData = Archetype.getByKey(event.target.dataset.itemid);

        if (!dragData) return;

        // Set data transfer
        event.dataTransfer.setData('text/plain', JSON.stringify(dragData));
    }
    //#endregion
}
