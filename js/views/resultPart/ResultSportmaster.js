Imigize.define('Imigize.integration.views.resultPart.ResultSportmaster', {

    extend: 'Imigize.integration.imigize.compatibility.view.part.Result',

    config: {
        tpl: 'Imigize.integration.views.resultPart.ResultSportmaster',
        ns: 'imigize-integration-resultPart-sportmaster'
    },

    initSector: function(value) {
        var App = this.getApp();

        if (!this.sector) {
            if (Imigize.$window().width() > 767) {
                this.sector = App.create(App.VIEW_SECTOR, {
                    width: 96,
                    height: 96,
                    value: value,
                    disableClick: true,
                    fontSizeTitle: 36,
                    fontSizePercent: 24,
                    fontSizeText: 16,
                    cursor: false
                });
            } else {
                this.sector = App.create(App.VIEW_SECTOR, {
                    width: 68,
                    height: 68,
                    value: value,
                    disableClick: true,
                    fontSizeTitle: 24,
                    fontSizePercent: 16,
                    fontSizeText: 14,
                    cursor: false
                });
            }


            this.sector.getEl().appendTo(this.$$('sector-wrapper'));

        } else {
            this.sector.refreshView(0, value);
        }
    },

    _initColorText: function(value) {
        return this.sector._initTextColor(value);
    },

    initPopupConfig: function() {
        return {
            autoShow: false,
            lockBackgroundScroll: false,
            overflow: 'hidden',
            showContentShadow: true,
            position: 'relative',
            top: '0',
            left: '0',
            margin: '2% auto',
            padding: 0,
            width: '100%',
            height: 'auto',
            maxWidth: '560px',
            maxHeight: 'auto',
            positionCloseChangeable: true,
            overflowEl: 'auto',
            delete: true,
            borderRadius: '5px'
        };
    }
})
;