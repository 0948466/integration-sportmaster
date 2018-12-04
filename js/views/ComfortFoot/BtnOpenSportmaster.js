Imigize.define('Imigize.integration.views.ComfortFoot.BtnOpenSportmaster', {

    extend: 'Imigize.landing.part.ComfortFoot.ComfortForm__BtnOpen',

    config: {
        ns: 'imigize-comfortForm-btnOpen-sportmaster',
        comfortModel: null,
        hide: null,
        eventChangeSize: null,
        eventMenuNav: null,
        maxWidth: null
    },

    _init: function(ns) {
        var me = this,
            userModel = Imigize.integration.compatibility.model.getUserModel(),
            localStorageNav = localStorage.getItem('imigize.menuNavigation');

        __super__._init.apply(this, arguments);

        me.maxWidth = me.config.maxWidth || '300px';

        if (me.config.hide && !localStorageNav) {
            me.getEl().hide();
        }

        if (me.config.eventMenuNav) {
            userModel.on('showComfortBtn', me._showComfortBtn, me);
            userModel.on('hideComfortBtn', me._hideComfortBtn, me);
        }

        if (me.config.eventChangeSize) {
            userModel.on('onSizesClick', me._onSizesClick, me);
        }
    },

    _onSizesClick: function(size) {
        var me = this;

        me.size = size;
        this._getModel().setCurrentSize(size);

        this._getModel().initDataModel({
            article: me.getArticle(),
            size: me.size,
            src: '//img1.imigize.ru/{{ product.productId }}/Images/N2-13.jpg'
        });
    },

    linkComfortForm: function() {
        return 'Imigize.integration.views.ComfortFoot.ComfortForm_Sportmaster';
    },

    _showComfortBtn: function() {
        this.getEl().show();
    },

    _hideComfortBtn: function() {
        this.getEl().hide();
    },

    toCenter: function(popup) {
        popup._contentToCenter(530);
    },

    _getModel: function() {
        return this.config.comfortModel;
    },
});