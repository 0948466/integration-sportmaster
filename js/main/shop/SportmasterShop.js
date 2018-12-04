Imigize.define('Imigize.integration.main.shop.SportmasterShop', {

    extend: 'Imigize.integration.main.shop.AbstractShop',

    initOnReady: function() {
        var me = this,
            _isMobile = $(window).width() < 1000;
        if (_isMobile) {
            window.imigizeUpdate = function() {
                $(_.bind(me._onReady, me));
            };
        } else {
            $(_.bind(me._onReady, me));
        }
    },

    currentPageIsProductCard: function() {
        var $el = $('.sm-goods_main'),
            desktop = ($el.length === 1 && $el.attr('itemtype') == 'http://schema.org/Product'),
            mobile = window.location.href.indexOf('m.sportmaster.ru/product/') + 1;

        return (desktop || mobile);
    },

    currentPageIsBasket: function() {
        return ($('.sm-basket').length >= 1);
    },

    currentPageIsCatalog: function() {
        return !!(window.location.href.indexOf('sportmaster.ru/catalog/pokupka_obuvi_bez_primerki_') + 1);
    },

    currentPageIsHistory: function() {
        return !!(window.location.href.indexOf('sportmaster.ru/user/profile/order.do') + 1);
    },

    _createCatalog: function($container) {
        var _isMobile = $(window).width() < 1000,
            catalogName = (!_isMobile) ? 'CATALOG' : 'CATALOG_MOBILE',
            App = Imigize.integration.App,
            /**
             * @type {Imigize.integration.main.shop.AbstractCatalog}
             * @private
             */
            catalog = App.create(App.aliases[catalogName], {
                shop: this,
                $container: $container
            });
    },
});