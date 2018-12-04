Imigize.define('Imigize.integration.main.shop.SportmasterHistory', {

    extend: 'Imigize.integration.main.shop.AbstractHistory',

    constructor: function() {
        var me = this;

        __super__.constructor.apply(this, arguments);

        me.CLASS_ORDER_ITEM = 'sm-checkout__order-item';
        me.CLASS_ORDER_ITEM_DESC = 'sm-checkout__order-item-description';
        me.CLASS_ORDER_ITEM_CANCEL = 'sm-checkout__order-item-cancel';

        me.initCompatibility();
        me.model = me.getApp().getModel();

        me._initEvents();

        me._getCompatibilityAll();
    },

    _initEvents: function() {
        var me = this;

        if (me.model) {
            me.model.on('change:compatibilityAllData', _.bind(me._onCompatibilityAllDataChange, me));
        }
    },

    _onCompatibilityAllDataChange: function() {
        this.appendCompatibilityAll();
    },

    _getCompatibilityAll: function() {
        this.model.requestCompatibilityAll();
    },

    appendCompatibilityAll: function() {
        var i, beforeTarget, sku, size, best, data, href,
            value, description, item,
            orderItems = $('.' + this.CLASS_ORDER_ITEM);

        for (i = 0; i < orderItems.length; i++) {
            item = orderItems.eq(i);
            description = item.find('.' + this.CLASS_ORDER_ITEM_DESC);
            href = description.find('a').eq(0).attr('href');
            sku = href.slice(href.indexOf('skuId') + 6);
            size = sku.slice(-2);

            best = this.model.getBestCompatibilityValue(sku, size);
            value = (best) ? best.value : 0;

            if (!value) {
                continue;
            }

            data = {
                brand: description.find('a').text(),
                type: '',
                sku: sku,
                size: size,
                value: value,
                imgSrc: ''
            };

            this.appendTh();

            beforeTarget = orderItems.eq(i).find('.first-child:last');

            this._appendCompatibilityBtn(beforeTarget, sku, size);
            this._appendCompatibilityResult(beforeTarget, data);
        }
    },

    appendTh: function() {
        if ($('.imigize-table-comfort').length) {
            return;
        }
        var beforeTarget = $('.sm-checkout__order th').filter('.first-child');
        $('<td class="imigize-table-comfort">Настройка комфорта</td>').insertAfter(beforeTarget);
        $('<td class="imigize-table-compatibility">Совместимость</td>').insertAfter(beforeTarget);
    },

    _appendCompatibilityBtn: function(beforeTarget, sku, size) {
        var btnOpenComfort = this._initBtnOpenComfortForm(sku, size).getEl();
        $('<td></td>').append(btnOpenComfort).insertAfter(beforeTarget);
    },

    _appendCompatibilityResult: function(beforeTarget, data) {
        var result = this._initResult(data).getEl();
        $('<td></td>').append(result).insertAfter(beforeTarget);
    },

    _initResult: function(data) {
        var textResult = this.model.getTextForResultCatalog(data.value),
            App = this.getApp();

        App.config.productCard = App.create(App.VIEW_PRODUCT_ITEM, {
            brand: data.brand,
            type: data.type,
            sku: data.sku,
            size: data.size,
            imgSrc: data.imgSrc
        });

        return App.create(App.VIEW_RESULT_BUSKET, {
            app: App,
            size: data.size,
            value: data.value,
            textResult: textResult
        });

    },

    _initBtnOpenComfortForm: function(sku, size) {
        var App = this.getApp(),
            comfortModel = this._initComfortModel();


        return App.create(App.VIEW_BTN_OPEN_COMFORT, {
            comfortModel: comfortModel,
            article: sku,
            size: size
        });
    },

    _initComfortModel: function() {
        var App = this.getApp();

        return App.create(App.VIEW_COMFORT_MODEL);
    }
});