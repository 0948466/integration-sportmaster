var cache = {};
Imigize.define('Imigize.integration.main.shop.SportmasterBasketItem', {

    extend: 'Imigize.integration.main.shop.AbstractProductCard',

    config: {
        data: null,
        target: null,
        size: null
    },

    constructor: function() {

        this.initCompatibility();

        __super__.constructor.apply(this, arguments);

    },

    initCompatibility: function() {
        return '';
    },

    getModelName: function() {
        return this.config.data.type;
    },

    getBrand: function() {
        return this.config.data.brand;
    },

    getArticle: function() {
        return this.config.data.article;
    },

    getSizes: function() {
        return [this.config.size];
    },

    getImage: function() {
        return this.config.data.src;
    },

    allowAddToBasket: function() {
        return false;
    },

    _collectSizeInfo: function() {
        return '';
    },

    injectCompatibilityButton: function(button) {

        var $button = button.getEl();

        $button.appendTo(this.config.target);
    }
});