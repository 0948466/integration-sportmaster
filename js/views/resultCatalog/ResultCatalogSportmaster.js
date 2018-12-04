Imigize.define('Imigize.integration.views.resultCatalog.ResultCatalogSportmaster', {

    extend: 'Imigize.core.View',

    config: {
        ns: 'imigize-result-catalog-sportmaster',
        size: null,
        value: null,
        textResult: null
    },

    _init: function(ns) {

        this.size = this.config.size;
        this.value = this.config.value;
        this.textResult = this.config.textResult;

        __super__._init.apply(this, arguments);
    }
});