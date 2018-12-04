Imigize.define('Imigize.integration.views.resultBusket.ResultBusketSportmaster', {

    extend: 'Imigize.core.View',

    config: {
        ns: 'imigize-result-busket-sportmaster',
        app: null,
        size: null,
        value: null,
        textResult: null
    },

    _init: function(ns) {

        this.size = this.config.size;
        this.value = this.config.value;
        this.textResult = this.config.textResult;

        __super__._init.apply(this, arguments);
    },

    _initEvents: function() {
        var me = this;

        me.$$('result').on('click', _.bind(me._onResultBusketClick, me));
        me.$$('link').on('click', _.bind(me._onLinkClick, me));
    },

    _onLinkClick: function() {
        var App = this.getApp(),
            about, popup;

        popup = App.create(App.VIEW_POPUP_CLOSE, this.initPopupConfig());
        about = App.create(App.VIEW_FULL_ABOUT_COMP, {
            popup: popup
        });

        popup._$elContent.append(about.getEl());
        popup.show();

    },

    initPopupConfig: function() {
        return {
            autoShow: false,
            lockBackgroundScroll: false,
            overflow: 'hidden',
            showContentShadow: true,
            position: 'relative',
            top: '0',
            left: '0',
            margin: '2% auto',
            padding: 0,
            width: '100%',
            height: 'auto',
            maxWidth: '560px',
            maxHeight: 'auto',
            positionCloseChangeable: true,
            overflowEl: 'auto',
            delete: true,
            borderRadius: '5px'
        };
    },

    _onResultBusketClick: function() {
        var me = this, App = this.getApp(),
            showDefault = true;

        if (!me.router) {
            me.router = App.getRouter();
        }

        App.requestCompatibility(me, showDefault);
    },

    goFullDefault: function() {
        this.router.goTo(this.router.ROUTE_FULL);
    },

    getApp: function() {
        return this.config.app;
    }
});