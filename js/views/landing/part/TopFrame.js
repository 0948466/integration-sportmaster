Imigize.define('Imigize.integration.views.landing.part.TopFrame', {

    extend: 'Imigize.landing.wildberries._landingWildberries.TopFrame',

    config: {
        ns: 'imigize-topFrame-sportmaster',
        locale: null,
        user: null
    },

    _init: function(ns) {
        var me = this;

        __super__._init.apply(this, arguments);

        me.$linkToMap = me.$$('link', 'to-map');
        me.$specialCatalog = me.$$('link', 'special-catalog');
    },

    _initEvents: function() {
        var me = this;
        __super__._initEvents.apply(me, arguments);

        me.$linkToMap .on('click', _.bind(me._onLinkToMapClick, me));
        me.$specialCatalog .on('click', _.bind(me._onSpecialCatalogClick, me));
    },

    _onLinkToMapClick: function(e) {
        e.preventDefault();
        var me = this,
            popupWindow = $(me.$el.closest('.imigize-popupWindow'));

        popupWindow.animate({
            scrollTop: ($(me.getLanding()._map.el)
                .position().top)
        }, 500);
    },

    _onSpecialCatalogClick: function(e) {
        e.preventDefault();
        window.location.pathname = this.getApi().getUrl().getSpecialCalatogPathname();
    }
});