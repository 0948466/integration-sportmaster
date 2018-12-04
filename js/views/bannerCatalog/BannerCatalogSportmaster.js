Imigize.define('Imigize.integration.views.bannerCatalog.BannerCatalogSportmaster', {

    extend: 'Imigize.core.View',

    config: {
        ns: 'imigize-banner-catalog-sportmaster',
        app: null
    },

    _init: function(ns) {

        __super__._init.apply(this, arguments);

        this.link = this.$$('link');
        this.button = this.$$('button');
    },

    _initEvents: function(ns) {
        var me = this;
        __super__._initEvents.apply(me, arguments);

        me.addEvents();
    },

    addEvents: function() {
        var me = this;

        me.link.on('click', _.bind(me._onLinkClick, me));
        me.button.on('click', _.bind(me._onButtonClick, me));
    },

    _onLinkClick: function(e) {
        e.preventDefault();
        window.open(this.getApi().getUrl().getProfileUrl());
    },

    _onButtonClick: function(e) {
        e.preventDefault();
        var me = this, landing, popup,
            App = this.getApp(),
            widgetManager = App.getWidgetManager(),
            popupLandingCache = widgetManager._cache['Imigize.integration.views.landing.LandingRunlab'];

        if (!popupLandingCache) {
            popup = App.create(App.VIEW_POPUP_CLOSE, this.initLandingPopupConfig());
            landing = App.create(App.VIEW_FULL_LANDING, {
                popup: popup,
                app: App
            });

            popup._$elContent.append(landing.getEl());
            widgetManager._cache['Imigize.integration.views.landing.LandingRunlab'] = popup;
            popup.show();
        } else {
            popupLandingCache.showPopup();
        }
    },

    initLandingPopupConfig: function() {
        return {
            autoShow: false,
            lockBackgroundScroll: false,
            product: null,
            overflow: 'hidden',
            showContentShadow: true,
            position: 'relative',
            top: '0',
            left: '0',
            margin: '2% auto',
            padding: 0,
            width: '100%',
            height: 'auto',
            maxWidth: '990px',
            maxHeight: 'auto',
            model: null,
            positionCloseChangeable: true,
            overflowEl: 'auto',
            marginTopClose: '5px',
            marginLeftClose: '-33px'
        };
    },

    updateEvents: function() {
        this.addEvents();
    },

    /**
     * @returns {Imigize.integration.compatibility.api.API}
     */
    getApi: function() {
        return this.getApp().getApi();
    },

    /**
     * @returns {Imigize.integration.compatibility.Compatibility}
     */
    getApp: function() {
        return this.config.app;
    }
});