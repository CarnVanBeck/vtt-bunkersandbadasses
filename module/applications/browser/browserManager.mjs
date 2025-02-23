import ActorStuffBrowser from './actorStuffBrowser.mjs';

export default class BrowserManager {
    static injectButtons() {
        // Select the target element
        const headerActions = document.querySelector('.actors-sidebar .directory-header .header-actions');

        if (headerActions) {
            // Create a new div element with the class 'header-actions'
            const newHeaderActionsDiv = document.createElement('div');
            newHeaderActionsDiv.classList.add('header-actions');
            newHeaderActionsDiv.classList.add('action-buttons');

            // Create a new button element
            const button = document.createElement('button');
            button.innerHTML = '<i class="fas fa-search"></i> ' + game.i18n.localize('BROWSER.actorStuffBrowser.label');
            button.title = game.i18n.localize('BROWSER.actorStuffBrowser.hint');
            button.addEventListener('click', () => {
                this.openActorStuffBrowser();
            });
            // Append the button inside the new header-actions div
            newHeaderActionsDiv.appendChild(button);

            // Insert the new header-actions div after the existing header-actions div
            headerActions.insertAdjacentElement('afterend', newHeaderActionsDiv);
        }
    }

    static openActorStuffBrowser() {
        new ActorStuffBrowser().render(true);
    }
}
