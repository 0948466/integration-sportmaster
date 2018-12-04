Imigize.define('Imigize.integration.views.landing.LandingSportmaster', {

    extend: 'Imigize.landing.wildberries.LandingWildberries',

    config: {
        ns: 'imigize-integration-landing-sportmaster',
        wideMode: true,
        regions: null,
        bookingForm: null,
        app: null,
        router: null,
        model: null,
        popup: null
    },

    _init: function(ns) {
        var me = this;

        __super__._init.apply(this, arguments);

        me._appendNavigation();
        me._appendTopFrame();
        me._appendAboutProject();
        me._appendHowItWorks();
        me._appendHowKnowSize();
        me._appendMap();
        me._appendFooter();
    },

    _initEvents: function() {
        var me = this;

        __super__._initEvents.apply(me, arguments);

        me.getUserModel() && me.getUserModel().on('exit', me._onUserExit, me);

    },

    _appendRegistration: function() {
        return null;
    },

    _appendWhatNext: function() {
        return null;
    },

    _appendCongratulations: function() {
        return null;
    },

    _appendNavigation: function() {
        var me = this;

        if (!me._navigation) {
            me._navigation = Imigize.create('Imigize.integration.views.landing.part.Navigation', {
                user: me.config.user,
                landing: me,
                isLogin: me.isLogin()
            });
        }
        me._navigation.getEl().appendTo(me.$$('navigation'));
    },

    _appendTopFrame: function() {
        var me = this;

        if (!me._topFrame) {
            me._topFrame = Imigize.create('Imigize.integration.views.landing.part.TopFrame', {
                user: me.config.user,
                landing: me
            });
        }
        me._topFrame.getEl().appendTo(me.$$('topFrame'));
    },

    _appendAboutProject: function() {
        var me = this;

        if (!me._aboutProject) {
            me._aboutProject = Imigize.create('Imigize.integration.views.landing.part.AboutProject', {
                user: me.config.user,
                landing: me
            });
        }
        me._aboutProject.getEl().appendTo(me.$$('aboutProject'));
    },

    _appendHowItWorks: function() {
        var me = this;

        if (!me._howItWorks) {
            me._howItWorks = Imigize.create('Imigize.integration.views.landing.part.HowItWorks', {
                user: me.config.user,
                landing: me
            });
        }
        me._howItWorks.getEl().appendTo(me.$$('howItWorks'));
    },

    _appendHowKnowSize: function() {
        var me = this;

        if (!me._howKnowSize) {
            me._howKnowSize = Imigize.create('Imigize.integration.views.landing.part.HowKnowSize', {
                user: me.config.user,
                landing: me
            });
        }
        me._howKnowSize.getEl().appendTo(me.$$('howKnowSize'));
    },

    _appendMap: function() {
        var me = this;

        if (!me._map) {
            me._map = Imigize.create('Imigize.integration.views.landing.part.MapSportmaster', {
                user: me.config.user,
                landing: me
            });
        }
        me._map.getEl().appendTo(me.$$('map'));
    },

    _appendFooter: function() {
        var me = this;

        if (!me._footer) {
            me._footer = Imigize.create('Imigize.integration.views.landing.part.Footer', {
                user: me.config.user,
                landing: me
            });
        }
        me._footer.getEl().appendTo(me.$$('footer'));
    },

    _appendVideoFaq: function() {
        return null;
    },

    isLogin: function() {
        try {
            return this.getApp().getUserModel().getUserLoginNumber() || this.getApp().getUserModel()
                .getIsLoginFromCatalog();
        } catch (e) {
            return false;
        }
    }
});