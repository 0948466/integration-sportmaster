Imigize.define('Imigize.integration.views.landing.part.HowItWorks', {

    extend: 'Imigize.landing.wildberries._landingWildberries.HowItWorks',

    config: {
        ns: 'imigize-how-it-works-sportmaster',
        locale: null,
        user: null
    },

    CONST_RATIO_IMG: 0.2315,

    _init: function(ns) {
        var me = this;

        __super__._init.apply(this, arguments);

        me._initImgHeight();

        setTimeout(function() {
            me._initImgHeight();
        }, 0);
    },

    _onLinkClick: function(e) {
        e.preventDefault();
        window.open(this.getApi().getUrl().getTechnologyUrl());
    },

    _initImgHeight: function() {
        var img = this.$$('img');
        img.height(img.width() * this.CONST_RATIO_IMG);
    }
});