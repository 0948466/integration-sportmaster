Imigize.define('Imigize.integration.views.ComfortFoot.ComfortForm_Sportmaster', {

    extend: 'Imigize.landing.part.ComfortFoot.ComfortForm',

    config: {
        ns: 'imigize-comfortForm-sportmaster'
    },

    _init: function(ns) {
        var me = this;

        me.CLASS_ICON_CLOSE_WHITE = ns.getClass('icon-close', 'white');

        __super__._init.apply(this, arguments);

    },

    _changeCloseIconColor: function() {
        this.iconClose.toggleClass(this.CLASS_ICON_CLOSE_WHITE);
    },

    linkToFolder: function(part) {
        part = part || '';
        return 'Imigize.integration.views.ComfortFoot.' + part;
    },

    linkWarehouse: function() {
        return '_Sportmaster';
    }
});