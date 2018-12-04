Imigize.define('Imigize.integration.main.shop.SportmasterCompatibilityDefault', {

    extend: 'Imigize.integration.compatibility.view.CompatibilityDefault',

    config: {
        tpl: 'Imigize.integration.main.shop.SportmasterCompatibilityDefault'
    },

    filterSize: function(sizesDiv, best) {
        var size = sizesDiv.filter(':contains( ' + best.size.replace('.', ',') + ' )');

        if (!size.length) {
            size = sizesDiv.filter(':contains(' + best.size + ')');
        }
        return size;
    },

    _showCompatibilityInBusket: function(value, size) {
        var me = this,
            resultBusket = me._resultBusket,
            App = this.getApp(),
            model = App.getModel(),
            textResult = model.getTextForResultCatalog(value);

        if (!resultBusket) {
            resultBusket = me._resultBusket = App.create(App.VIEW_RESULT_BUSKET, {
                app: App,
                size: size,
                value: value,
                textResult: textResult
            });
        }

        me._clear();

        me._current = resultBusket;

        me._setContent(resultBusket.getEl());
    },
});
