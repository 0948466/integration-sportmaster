Imigize.define('Imigize.integration.views.landing.part.Navigation', {

    extend: 'Imigize.landing.wildberries._landingWildberries.Navigation',

    config: {
        ns: 'imigize-navigation-sportmaster',
        locale: null,
        user: null,
        landing: null,
        isLogin: null
    },

    _init: function(ns) {
        var me = this;

        me.isNoLogin = !me.config.isLogin;

        __super__._init.apply(this, arguments);
    },

    _scrollToAnimate: function(data) {
        var me = this,
            popupWindow = $(me.$el.closest('.imigize-popupWindow'));

        switch (data) {
            case 'howItWorks':
                popupWindow.animate({
                    scrollTop: ($(me.getLanding()._howItWorks.el)
                        .offset().top - popupWindow.offset().top)
                }, 500);
                break;
            case 'sliderFaq':
                popupWindow.animate({
                    scrollTop: ($(me.getLanding()._sliderFaq.el)
                        .offset().top - popupWindow.offset().top)
                }, 500);
                break;
        }
    }
});