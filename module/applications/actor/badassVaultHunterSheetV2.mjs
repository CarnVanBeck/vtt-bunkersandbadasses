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

        context.gunTypes = game.settings.get(BADASS.namespace, 'gunTypes');
        return context;
    }

    static addDefense() {
        new DefenseConfig().render(true);
    }
}
