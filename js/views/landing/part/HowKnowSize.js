Imigize.define('Imigize.integration.views.landing.part.HowKnowSize', {

    extend: 'Imigize.landing.part.AbstractPart',

    config: {
        ns: 'imigize-how-know-size-sportmaster'
    },

    _init: function(ns) {
        var me = this;

        __super__._init.apply(this, arguments);

        me.$link = me.$$('link');
    },

    _initEvents: function() {
        var me = this;
        __super__._initEvents.apply(me, arguments);

        me.$link .on('click', _.bind(me._onLinkClick, me));
    },

    _onLinkClick: function(e) {
        e.preventDefault();
        window.location.pathname = this.getApi().getUrl().getSpecialCalatogPathname();
    }
});