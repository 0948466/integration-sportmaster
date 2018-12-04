Imigize.define('Imigize.integration.views.landing.part.MapSportmaster', {

    extend: 'Imigize.landing.part.AbstractPart',

    config: {
        ns: 'imigize-map-sportmaster',
        locale: null,
        user: null
    },

    _init: function(ns) {
        var me = this;

        __super__._init.apply(this, arguments);

        me.CLASS_YANDEX_MAP = ns.getClass('yandex-map');
        me.shops = me.$$('shops');
        me.shopItem = me.$$('shops-item');
        me.CLASS_SHOP_ITEM_ACTIVE = ns.getClass('shops-item', 'active');

        me.shopsDescriptionItem = me.$$('shops-description-item');

        me.addMap();
    },

    _initEvents: function() {
        var me = this;

        __super__._initEvents.apply(this, arguments);

        me.shops.on('click', _.bind(me._onShopsClick, me));
    },

    addMap: function() {
        var me = this;

        Imigize.ya.maps.Loader.load(function(YMaps) {
            Imigize.ya.maps.Loader.sportmasterMap = Imigize.create('Imigize.ya.maps.map.SportmasterMap', {
                el: '.' + me.CLASS_YANDEX_MAP,
                lang: 'ru'
            });
        });
    },

    _onShopsClick: function(e) {
        var me = this,
            target = $(e.target),
            dataShop = target.data('shop');

        if (target.hasClass(me.CLASS_SHOP_ITEM_ACTIVE)) {
            return;
        }

        me.shopItem.removeClass(me.CLASS_SHOP_ITEM_ACTIVE);
        target.addClass(me.CLASS_SHOP_ITEM_ACTIVE);

        me.showShopsDesc(dataShop);
        me.scrollMapToPlacemark(dataShop);
    },

    scrollMapToPlacemark: function(dataShop) {
        switch (dataShop) {
            case 3:
                Imigize.ya.maps.Loader.sportmasterMap._placemark5.openBalloon();
                break;
            case 5:
                Imigize.ya.maps.Loader.sportmasterMap._placemark3.openBalloon();
                break;
        }
    },

    showShopsDesc: function(dataShop) {
        var me = this;

        me.shopsDescriptionItem.hide();
        me.shopsDescriptionItem.filter('[data-shop="' + dataShop + '"]').show();
    }
});