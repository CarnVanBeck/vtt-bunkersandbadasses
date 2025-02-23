const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export default class BadassBrowser extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = {
        form: {
            closeOnSubmit: false,
        },
        position: {
            width: 1200,
            height: 800,
        },
        tag: 'form',
        window: {
            contentClasses: ['badass', 'browser'],
            controls: [
                {
                    icon: 'fa-solid fa-file-import',
                    action: 'importJSON',
                    label: 'BROWSER.import.label',
                },
                {
                    icon: 'fa-solid fa-file-export',
                    action: 'exportJSON',
                    label: 'BROWSER.export.label',
                },
            ],
            icon: 'fa-solid fa-search',
        },
    };
    static PARTS = {};

    static importJSON() {}

    static exportJSON() {}
}
