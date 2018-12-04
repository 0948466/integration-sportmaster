Imigize.define('Imigize.integration.main.shop.SportmasterDefaultRouter', {

    extend: 'Imigize.integration.compatibility.router.DefaultRouter',

    _showFull: function() {
        var App = this.getApp();

        if (this._route === 'full/enter') {
            this._full = App.create(App.VIEW_WINDOW_ENTER);
            this._full.show();
            return;
        }

        if (!this._full) {
            this._full = App.create(App.VIEW_WINDOW);
        } else {
            this._full.show();
        }
    },
});