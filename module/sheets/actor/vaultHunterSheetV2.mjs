import BadassActorSheetV2 from './badassActorSheetV2.mjs';
import { BADASS } from '../../helper/config.mjs';
import DefenseConfig from '../../applications/settings/defenseConfig.mjs';
import { getSystemGunTypes } from '../../helper/systemValues.mjs';
import { setupInputLookup } from '../../helper/utils.mjs';
import ActorStuffBrowser from '../../applications/browser/actorStuffBrowser.mjs';
import Archetype from '../../data/custom/character/archetype.mjs';

export default class VaultHunterSheetV2 extends BadassActorSheetV2 {
    constructor(options = {}) {
        super(options);
        this.#dragDrop = this.#createDragDropHandlers();
    }
    static DEFAULT_OPTIONS = {
        ...BadassActorSheetV2.DEFAULT_OPTIONS,
        actions: {
            addDefense: BadassActorSheetV2.addDefense,
        },
        window: {
            resizable: true,
        },
        position: {
            width: 777,
        },
        dragDrop: [
            {
                dropSelector: null,
            },
        ],
    };

    static PARTS = {
        header: {
            template: `${BADASS.systemPath}/templates/actor/parts/vaultHunter/vhHeader.hbs`,
        },
        tabs: {
            template: 'templates/generic/tab-navigation.hbs',
        },
        overview: {
            template: `${BADASS.systemPath}/templates/actor/parts/tabs/vhTabOverview.hbs`,
        },
        inventory: {
            template: `${BADASS.systemPath}/templates/actor/parts/tabs/vhTabInventory.hbs`,
        },
        details: {
            template: `${BADASS.systemPath}/templates/actor/parts/tabs/vhTabDetails.hbs`,
            scrollable: [''],
        },
        activeEffects: {
            template: `${BADASS.systemPath}/templates/actor/parts/tabs/activeEffects.hbs`,
        },
        xp: {
            template: `${BADASS.systemPath}/templates/actor/parts/vaultHunter/vhXP.hbs`,
        },
    };

    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        context.tabs = this._getTabs();
        context.gunTypes = getSystemGunTypes();
        return context;
    }

    _onRender() {
        this.#dragDrop.forEach((d) => d.bind(this.element));
        setupInputLookup('archetype', () => {
            new ActorStuffBrowser('archetypes').render(true);
        });
    }

    /** @override */
    async _preparePartContext(partId, context) {
        if (context.tabs[partId]) {
            context.tab = context.tabs[partId];
        }
        return context;
    }

    _ccsTabHelper(primary, current) {
        let defaultClasses = 'scrollable';
        let additionalClasses = 'scrollable';
        return primary === current ? 'active ' + additionalClasses : defaultClasses;
    }

    _getTabs() {
        this.tabGroups.primary = this.tabGroups.primary ?? 'overview';

        return {
            overview: {
                label: game.i18n.localize('SHEETS.actor.vaultHunter.tabs.overview'),
                icon: 'fas fa-home',
                id: 'overview',
                group: 'primary',
                cssClass: this._ccsTabHelper(this.tabGroups.primary, 'overview'),
            },
            inventory: {
                label: game.i18n.localize('SHEETS.actor.vaultHunter.tabs.inventory'),
                icon: 'fas fa-boxes',
                id: 'inventory',
                group: 'primary',
                cssClass: this._ccsTabHelper(this.tabGroups.primary, 'inventory'),
            },
            details: {
                label: game.i18n.localize('SHEETS.actor.vaultHunter.tabs.details'),
                icon: 'fas fa-info',
                id: 'details',
                group: 'primary',
                cssClass: this._ccsTabHelper(this.tabGroups.primary, 'details'),
            },
            activeEffects: {
                label: game.i18n.localize('SHEETS.actor.generic.tabs.activeEffects'),
                icon: 'fas fa-bolt',
                id: 'activeEffects',
                group: 'primary',
                cssClass: this._ccsTabHelper(this.tabGroups.primary, 'activeEffects'),
            },
        };
    }

    /**
     * Organize and classify Items for Actor sheets.
     *
     * @param {Object} context Context of the current actor sheet
     */
    _prepareItems(context) {
        let { guns, grenadeMods, defenseItems, potions, relics, questItems, items } = context.items.reduce(
            (retVal, item) => {
                if (item.type === 'gun') retVal.guns.push(item);
                else if (item.type === 'grenadeMod') retVal.grenadeMods.push(item);
                else if (item.type === 'defense') retVal.defenseItems.push(item);
                else if (item.type === 'potion') retVal.potions.push(item);
                else if (item.type === 'relic') retVal.relics.push(item);
                else if (item.type === 'questItem') retVal.questItems.push(item);
                else items.push(item);
                return retVal;
            },
            {
                guns: [],
                grenadeMods: [],
                defenseItems: [],
                potions: [],
                relics: [],
                questItems: [],
                items: [],
            },
        );
        context.guns = guns;
        context.grenadeMods = grenadeMods;
        context.defenseItems = defenseItems;
        context.potions = potions;
        context.relics = relics;
        context.quests = quests;
        context.items = items;
    }

    static addDefense() {
        new DefenseConfig().render(true);
    }

    async _onDrop(event) {
        let data = TextEditor.getDragEventData(event);
        console.debug('getDragEventData', TextEditor.getDragEventData(event));
        if (data.type === 'archetype') {
            //TODO: add validation like unique assignment etc.

            let archetypes = this.document.system.archetypes ?? [];
            archetypes.push(data);
            await this.document.update({ 'system.archetypes': archetypes });
        } else if (data.type === 'background') {
            //TODO: add validation like overwrite protection etc.
            await this.document.update({ background: data });
        } else if (data.type === 'class') {
            //TODO: add validation like overwrite protection etc.
            await this.document.update({ class: data });
        } else if (data.type === 'action') {
            //TODO: add validation like unique assignment etc.

            let actions = this.document.system.actions ?? [];
            actions.push(data);
            await this.document.update({ actions: actions });
        }
    }

    //#region Drag and Drop Implementation
    /**
     * Create drag-and-drop workflow handlers for this Application
     * @returns {DragDrop[]}     An array of DragDrop handlers
     * @private
     */
    #createDragDropHandlers() {
        return this.options.dragDrop.map((d) => {
            console.log('dragDrop', d);
            d.permissions = {
                drop: this._canDragDrop.bind(this),
            };
            d.callbacks = {
                drop: this._onDrop.bind(this),
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

    /**
     * Define whether a user is able to begin a dragstart workflow for a given drag selector
     * @param {string} selector       The candidate HTML selector for dragging
     * @returns {boolean}             Can the current user drag this selector?
     * @protected
     */
    _canDragStart(selector) {
        // game.user fetches the current user
        return true;
    }

    /**
     * Define whether a user is able to conclude a drag-and-drop workflow for a given drop selector
     * @param {string} selector       The candidate HTML selector for the drop target
     * @returns {boolean}             Can the current user drop on this selector?
     * @protected
     */
    _canDragDrop(selector) {
        // game.user fetches the current user
        return true;
    }
    //#endregion Drag and Drop Handlers
}
