Imigize.define('Imigize.integration.views.sector.SectorSportmaster', {

    extend: 'Imigize.sector.Sector',

    config: {
        ns: 'imigize-sector-sportmaster',
        width: 82,
        height: 82,
        textHide: null,
        app: null,
        router: null
    },

    _initMainColor: function(color, value) {
        var colorNew;
        switch (true) {
            case value >= 80:
                colorNew = '#191919';
                break;
            case value >= 60:
                colorNew = '#646464';
                break;
            case value >= 40:
                colorNew = '#8b8b8b';
                break;
            case value >= 20:
                colorNew = '#d3d3d3';
                break;
            case value >= 0:
                colorNew = '#d6d6d6';
        }

        this.$main.css('color', colorNew);
    },

    initTextValue: function(value) {
        var textValue = this.$$('text-value'),
            text = this.$$('text');

        if (this.config.textHide) {
            textValue.hide();
            text.hide();
            this.getEl().css('padding', 0);
            return;
        }

        textValue.text(this._initText(value));

        textValue.css('color', this._initTextColor(value));

        if (value < 40) {
            text.hide();
        } else {
            text.show();
        }
    },

    _initTextColor: function(value) {
        switch (true) {
            case value >= 80:
                return '#000';
                break;
            case value >= 60:
                return '#646464';
                break;
            case value >= 40:
                return '#8b8b8b';
                break;
        }
    },

    _onSectorClick: function(e) {
        var me = this, App = this.getApp(),
            showDefault = true;

        if (!me.router) {
            me.router = App.getRouter();
        }

        App.requestCompatibility(me, showDefault);
    },

    goFullDefault: function() {
        this.router.goTo(this.router.ROUTE_FULL);
    },

    getRouter: function() {
        return this.config.router;
    },

    initCompatibilityModel: function() {
        return Imigize.integration.main.shop.SportmasterCompatibilityModel;
    },

    minusFontSizeTitle: function() {
        return 6;
    },
});