import { BADASS } from '../helper/config.mjs';

export class BadassActorSheet extends ActorSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ['badass', 'sheet', 'actor'],
            width: 600,
            height: 600,
            tabs: [
                {
                    navSelector: '.sheet-tabs',
                    contentSelector: '.sheet-body',
                    initial: 'equipment',
                },
            ],
        });
    }
    /** @override */
    get template() {
        return `${BADASS.systemPath}/templates/actor/${this.actor.type}.hbs`;
    }

    /** @override */
    async getData() {
        const context = super.getData();
        // Use a safe clone of the actor data for further operations.
        const actorData = this.document.toPlainObject();
        // Add the actor's data to context.data for easier access, as well as flags.
        context.system = actorData.system;
        context.flags = actorData.flags;

        context.config = CONFIG.BADASS;
        this._prepareItems(context);

        context.background = await TextEditor.enrichHTML(this.actor.system.background, {
            secrets: this.document.isOwner,
            rollData: this.actor.getRollData(),
            relativeTo: this.actor,
        });
        context.characterInfo = await TextEditor.enrichHTML(this.actor.system.characterInfo, {
            secrets: this.document.isOwner,
            rollData: this.actor.getRollData(),
            relativeTo: this.actor,
        });

        return context;
    }
    /**
     * Organize and classify Items for Actor sheets.
     *
     * @param {Object} context Context of the current actor sheet
     */
    _prepareItems(context) {
        let { actions, skills, classes, guns, shields, grenadeMods, potions, items } = context.items.reduce(
            (retVal, item) => {
                if (item.type === 'action') retVal.actions.push(item);
                else if (item.type === 'skill') retVal.skills.push(item);
                else if (item.type === 'class') retVal.classes.push(item);
                else if (item.type === 'gun') retVal.guns.push(item);
                else if (item.type === 'shield') retVal.shields.push(item);
                else if (item.type === 'grenadeMod') retVal.grenadeMods.push(item);
                else if (item.type === 'potion') retVal.potions.push(item);
                else items.push(item);
                return retVal;
            },
            { actions: [], skills: [], classes: [], guns: [], shields: [], grenadeMods: [], potions: [], items: [] },
        );
        context.actions = actions;
        context.skills = skills;
        context.classes = classes;
        context.guns = guns;
        context.shields = shields;
        context.grenadeMods = grenadeMods;
        context.potions = potions;
        context.items = items;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Render the item sheet for viewing/editing prior to the editable check.
        html.on('click', '.item-edit', (ev) => {
            const li = $(ev.currentTarget).parents('.item');
            const item = this.actor.items.get(li.data('itemId'));
            item.sheet.render(true);
        });

        // -------------------------------------------------------------
        // Everything below here is only needed if the sheet is editable
        if (!this.isEditable) return;

        // Add Inventory Item
        html.on('click', '.item-create', this._onItemCreate.bind(this));

        // Delete Inventory Item
        html.on('click', '.item-delete', (ev) => {
            const li = $(ev.currentTarget).parents('.item');
            const item = this.actor.items.get(li.data('itemId'));
            item.delete();
            li.slideUp(200, () => this.render(false));
        });

        // Drag events for macros.
        if (this.actor.isOwner) {
            let handler = (ev) => this._onDragStart(ev);
            html.find('li.item').each((i, li) => {
                if (li.classList.contains('inventory-header')) return;
                li.setAttribute('draggable', true);
                li.addEventListener('dragstart', handler, false);
            });
        }
    }

    /**
     * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
     * @param {Event} event   The originating click event
     * @private
     */
    async _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        const type = header.dataset.type;
        const data = duplicate(header.dataset);
        // Initialize a default name.
        const name = `New ${type.capitalize()}`;
        // Prepare the item object.
        const itemData = {
            name: name,
            type: type,
            system: data,
        };
        // Remove the type from the dataset since it's in the itemData.type prop.
        delete itemData.system['type'];
        // Finally, create the item!
        return await Item.create(itemData, { parent: this.actor });
    }
}
