Imigize.define('Imigize.integration.views.radioBtn.RadioBtnSportmaster', {

    extend: 'Imigize.core.View',

    config: {
        ns: 'imigize-radio-btn-sportmaster',
        filterModel: null
    },

    _init: function(ns) {
        var me = this;

        __super__._init.apply(me, arguments);

        me.filterModel = me.config.filterModel;

        me.img = me.$$('img');
        me.CLASS_IMG_ACTIVE = ns.getClass('img', 'active');
    },

    _initEvents: function() {
        var me = this;

        if (me.filterModel) {
            me.filterModel.on('change:IsEnabledFilter', _.bind(me._onIsEnabledFilterChange, me));
        }

        me.addEventsOnImg();
    },

    addEventsOnImg: function() {
        var me = this;
        me.img.on('click', _.bind(me._onRadioBtnClick, me));
    },

    _onRadioBtnClick: function() {
        this.filterModel.trigger('onRadioBtnClick');
    },

    _onIsEnabledFilterChange: function() {
        var me = this;

        if (me.filterModel.isEnabledFilter() && !me.img.hasClass(me.CLASS_IMG_ACTIVE)) {
            me.img.addClass(me.CLASS_IMG_ACTIVE);
        }

        if (!me.filterModel.isEnabledFilter() && me.img.hasClass(me.CLASS_IMG_ACTIVE)) {
            me.img.removeClass(me.CLASS_IMG_ACTIVE);
        }
    },

    updateEvents: function() {
        this.addEventsOnImg();
    }
});