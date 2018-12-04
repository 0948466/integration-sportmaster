Imigize.define('Imigize.integration.views.landing.part.Footer', {

    extend: 'Imigize.landing.wildberries._landingWildberries.Footer',

    config: {
        ns: 'imigize-footer-sportmaster',
        locale: null,
        user: null
    },

    _init: function(ns) {
        var me = this;

        __super__._init.apply(this, arguments);

        me.$iconScrollsUp = me.$$('icon-scrolls-up');
    },

    _initEvents: function() {
        var me = this;
        __super__._initEvents.apply(me, arguments);

        me.$iconScrollsUp.on('click', _.bind(me._onIconScrollsUpClick, me));
    },

    _onIconScrollsUpClick: function() {
        var me = this,
            popupWindow = $(me.$el.closest('.imigize-popupWindow'));

        popupWindow.animate({scrollTop: ($(me.getLanding()._topFrame.el)
            .offset().top - popupWindow.offset().top)}, 500);
    }
});