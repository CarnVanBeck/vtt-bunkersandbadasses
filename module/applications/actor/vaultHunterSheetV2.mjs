import BadassActorSheetV2 from './badassActorSheetV2.mjs';
import { BADASS } from '../../helper/config.mjs';
import DefenseConfig from '../settings/defenseConfig.mjs';
import { getSystemGunTypes } from '../../helper/systemValues.mjs';
import TestItemData from '../../data/test.mjs';

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
            // Foundry-provided generic template
            template: 'templates/generic/tab-navigation.hbs',
        },
        tabOverview: {
            template: `${BADASS.systemPath}/templates/actor/parts/tabs/vhTabOverview.hbs`,
        },
        tabInventory: {
            template: `${BADASS.systemPath}/templates/actor/parts/tabs/vhTabInventory.hbs`,
        },
        tabDetails: {
            template: `${BADASS.systemPath}/templates/actor/parts/tabs/vhTabDetails.hbs`,
        },
        tabActiveEffects: {
            template: `${BADASS.systemPath}/templates/actor/parts/tabs/activeEffects.hbs`,
        },
        xp: {
            template: `${BADASS.systemPath}/templates/actor/parts/vaultHunter/vhXP.hbs`,
        },
    };

    async _prepareContext(options) {
        let anonTest = { name: 'anon', defense: 'defense' };
        let dataModelTest = new TestItemData();
        dataModelTest.validate({ changes: anonTest });

        const context = await super._prepareContext(options);

        if (!this.tabGroups.primary) this.tabGroups.primary = 'overview';

        context.tabs = {
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

        context.gunTypes = getSystemGunTypes();
        return context;
    }
    /**
     * Organize and classify Items for Actor sheets.
     *
     * @param {Object} context Context of the current actor sheet
     */
    _prepareItems(context) {
        let { actions, skills, classes, archetypes, guns, shields, grenadeMods, potions, items } = context.items.reduce(
            (retVal, item) => {
                if (item.type === 'action') retVal.actions.push(item);
                else if (item.type === 'skill') retVal.skills.push(item);
                else if (item.type === 'class') retVal.classes.push(item);
                else if (item.type === 'archetype') retVal.archetypes.push(item);
                else if (item.type === 'gun') retVal.guns.push(item);
                else if (item.type === 'shield') retVal.shields.push(item);
                else if (item.type === 'grenadeMod') retVal.grenadeMods.push(item);
                else if (item.type === 'potion') retVal.potions.push(item);
                else items.push(item);
                return retVal;
            },
            {
                actions: [],
                skills: [],
                classes: [],
                archetypes: [],
                guns: [],
                shields: [],
                grenadeMods: [],
                potions: [],
                items: [],
            },
        );
        context.actions = actions;
        context.skills = skills;
        context.classes = classes;
        context.archetypes = archetypes;
        context.guns = guns;
        context.shields = shields;
        context.grenadeMods = grenadeMods;
        context.potions = potions;
        context.items = items;
    }

    static addDefense() {
        new DefenseConfig().render(true);
    }
}
