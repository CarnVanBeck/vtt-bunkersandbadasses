import BadassActorSheetV2 from './badassActorSheetV2.mjs';
import { BADASS } from '../../helper/config.mjs';
import DefenseConfig from '../../applications/settings/defenseConfig.mjs';
import { getSystemGunTypes } from '../../helper/systemValues.mjs';

export default class VaultHunterSheetV2 extends BadassActorSheetV2 {
    static DEFAULT_OPTIONS = {
        ...BadassActorSheetV2.DEFAULT_OPTIONS,
        actions: {
            addDefense: BadassActorSheetV2.addDefense,
        },
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

    /** @override */
    async _preparePartContext(partId, context) {
        if (context.tabs[partId]) {
            context.tab = context.tabs[partId];
        }
        return context;
    }

    _getTabs() {
        this.tabGroups.primary = this.tabGroups.primary ?? 'overview';

        return {
            overview: {
                label: game.i18n.localize('SHEETS.actor.vaultHunter.tabs.overview'),
                icon: 'fas fa-home',
                id: 'overview',
                group: 'primary',
                cssClass: this.tabGroups.primary === 'overview' ? 'active' : '',
            },
            inventory: {
                label: game.i18n.localize('SHEETS.actor.vaultHunter.tabs.inventory'),
                icon: 'fas fa-boxes',
                id: 'inventory',
                group: 'primary',
                cssClass: this.tabGroups.primary === 'inventory' ? 'active' : '',
            },
            details: {
                label: game.i18n.localize('SHEETS.actor.vaultHunter.tabs.details'),
                icon: 'fas fa-info',
                id: 'details',
                group: 'primary',
                cssClass: this.tabGroups.primary === 'details' ? 'active' : '',
            },
            activeEffects: {
                label: game.i18n.localize('SHEETS.actor.generic.tabs.activeEffects'),
                icon: 'fas fa-bolt',
                id: 'activeEffects',
                group: 'primary',
                cssClass: this.tabGroups.primary === 'activeEffects' ? 'active' : '',
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
}
