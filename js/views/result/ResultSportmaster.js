Imigize.define('Imigize.integration.views.result.ResultSportmaster', {

    extend: 'Imigize.integration.compatibility.view.mini.CompatibilityResultDefault',

    config: {
        tpl: 'Imigize.integration.views.result.ResultSportmaster',
        ns: 'imigize-integration-result-sportmaster'
    },

    _init: function() {
        this._initBestSize();

        __super__._init.apply(this, arguments);
    },

    _onButtonClick: function() {
        var router = this.getRouter();

        setTimeout(function() {
            router.goTo(router.ROUTE_FULL);
        }, 0);

    },

    _initBestSize: function() {
        try {
            this.bestSize = this.getModel().getBestCompatibility().size;
        } catch (e) {
            console.error(e.message);
        }

    },

    _updateView: function(data) {
        var title = Imigize._('Подходит %s'),
            value = data.value,
            valuePercent = data.valuePercent,
            gradient1 = '',
            gradient2 = '',
            backgroundColor = '',
            Model = Imigize.integration.main.shop.SportmasterCompatibilityModel,
            color = Model.getColor(value),
            sector;

        if (value < 40) {
            title = Imigize._('Не подходит');
        }

        if (value < 50) {
            backgroundColor = color;
            gradient1 = '90deg, ' + color + ' 50%, transparent 50%';
            gradient2 = Math.round(value * 3.60 + 90) + 'deg, transparent 50%, ' + color + ' 50%';
        } else {
            gradient1 = '90deg, transparent 50%, ' + color + ' 50%';
            gradient2 = Math.round(value * 3.60 - 90) + 'deg, transparent 50%, ' + color + ' 50%';
        }

        this.$$('compatibility').text(data.value);

        this.$$('title').html(Imigize.core.String
            .sprintf(title, data.wrap.valueString));

        this.$$('graph-image-value').css('left', valuePercent);
    },

    _initSector: function(value) {
        var App = this.getApp();

        if (!this.sector) {
            this.sector = App.create(App.VIEW_SECTOR, {
                width: 66,
                height: 66,
                value: value,
                disableClick: true,
                cursor: false,
                textHide: true,
                fontSizeTitle: 23,
                fontSizePercent: 18,
                renderTo: this.$$('sector-wrapper')
            });
        } else {
            this.sector.refreshView(null, value);
        }
    }
});