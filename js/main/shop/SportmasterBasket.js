Imigize.define('Imigize.integration.main.shop.SportmasterBasket', {

    extend: 'Imigize.integration.main.shop.AbstractBasket',

    _items: [],

    constructor: function() {
        this._table = $('.sm-basket__table');
        this._tableRow = this._table.find('tbody tr');
        this.$basketListTableHead = this._table.find('thead tr');

        this.initCompatibility();

        this._initEvents();
        this._addEventsOnChangeTable();

        __super__.constructor.apply(this, arguments);

        Imigize.integration.compatibility.model.getUserModel().onExit(this._onUserExit.bind(this));

        Imigize.integration.compatibility.model.getUserModel().on('showComfortBtn', this._showComfortBtn, this);
        Imigize.integration.compatibility.model.getUserModel().on('hideComfortBtn', this._hideComfortBtn, this);
    },

    _initEvents: function() {
        var me = this;

        if (me.model) {
            me.model.on('change:compatibilityAllData', _.bind(me._onCompatibilityAllDataChange, me));
        }
    },

    _addEventsOnChangeTable: function(count) {
        count = count || 0;
        var me = this,
            iconsDel = $('span[data-selenium="remove_from_basket"]');

        if (!iconsDel.length) {
            if (count < 20) {
                setTimeout(function() {
                    me._addEventsOnChangeTable(++count);
                }, 150);
            }
            return;
        }

        iconsDel.on('click', _.bind(me._onIconsDelClick, me));
    },

    _onIconsDelClick: function() {
        var me = this;

        setTimeout(function() {
            me._delayOnIconsDelClick();
        }, 1000);
    },

    _delayOnIconsDelClick: function(count) {
        count = count || 0;
        var me = this,
            sportmasterOverlay = $('.sm-wrap__ajax-overlay-rotor');

        if (sportmasterOverlay.length) {
            if (count < 30) {
                setTimeout(function() {
                    me._delayOnIconsDelClick(++count);
                }, 100);
            }
            return;
        }
        this.addSector();
    },

    _onCompatibilityAllDataChange: function() {
        this.addSector();
    },

    _onUserExit: function() {
        this.hideBtnOpenNic();
    },

    hideBtnOpenNic: function() {
        $('.imigize-comfortForm__btnOpen').hide();
    },

    _hideComfortBtn: function() {
        $('.imigize-table-comfort').hide();
        $('.imigize-td-btnOpenSportmaster').hide();
    },

    _showComfortBtn: function() {
        $('.imigize-table-comfort').show();
        $('.imigize-td-btnOpenSportmaster').show();
    },

    addSector: function(noLogin, count) {
        count = count || 0;

        if (noLogin) {
            return;
        }

        var me = this,
            _table = $('.sm-basket__table'),
            _tableRow = _table.find('tbody tr');

        if (!_tableRow.length) {
            if (count < 20) {
                setTimeout(function() {
                    me.addSector(noLogin, ++count);
                }, 150);
            }
            return;
        }

        var i, data, value, target, descrTD, targetComfortBtn, noValue = 1,
            isShopRack = me._isShopRack();

        for (i = 0; i < _tableRow.length; i++) {
            if (_tableRow.eq(i).find('.imigize-td-sector').length) {
                continue;
            }
            data = me._getRowInfo(_tableRow.eq(i));
            value = me.model.getCompatibilityBySku(data.article, data.size);

            descrTD = _tableRow.eq(i).find('td:eq(1)');

            target = $('<td class="imigize-td-sector">');
            target.insertBefore(descrTD);

            if (isShopRack) {
                targetComfortBtn = $('<td class="imigize-td-btnOpenSportmaster">')
                    .insertAfter(_tableRow.eq(i).find('.imigize-td-sector'));
            }

            if (value !== false && !isNaN(+value)) {
                me.editTable();
                data.value = value;
                me.initCompatibilityBtn(i, data, target);

                if (isShopRack) {
                    me.editTableAddComfortBtn();
                    me.addComfortBtn(i, data, targetComfortBtn);
                }
            }
        }

        me.editTable(noValue);
    },

    addComfortBtn: function(i, data, targetComfortBtn) {
        var comfortModel = Imigize.landing.part.ComfortFoot.ComfortModel;

        Imigize.create('Imigize.integration.views.ComfortFoot.BtnOpenSportmaster', {
            model: comfortModel,
            article: data.article,
            size: data.size,
            renderTo: targetComfortBtn
        });
    },

    _isShopRack: function() {
        var dataImigize = $('body').data('imigize');

        if (!dataImigize) {
            return false;
        }
        return dataImigize.shopRack;
    },

    _getRowInfo: function($row) {
        return {
            'brand': $row.find('span[data-bind="text: name"]').text().replace(/\s{2,}/g, ' ').trim(),
            'type': '',
            'article': $row.find('span[data-bind="text: articul"]').text().trim(),
            'src': $row.find('img').attr('src'),
            'size': $row.find('span[data-bind="text: size"]').text().replace(',', '.').trim()
        };
    },

    editTableAddComfortBtn: function() {
        var sectorTH = $('.imigize-table-sector');

        if (!$('.imigize-table-compatibility-btn').length) {
            $('<th class="imigize-table-compatibility-btn">Настройка комфорта:</th>').css('textAlign', 'left')
                .insertAfter(sectorTH);
        }
    },

    editTable: function(noValue) {
        var firstTH, text = 'Совместимость';
        if (!$('.imigize-table-sector').length) {

            firstTH = $('.sm-basket__table').find('thead tr').find('th:eq(0)');

            if (noValue) {
                text = '';
            }
            $('<th class="imigize-table-sector">' + text + '</th>').css('textAlign', 'left')
                .insertAfter(firstTH);
        }
    },

    getBuyButton: function() {
        return $();
    },

    initCompatibilityBtn: function(i, data, target, margetTop) {
        var App = Imigize.integration.App,
            me = this, item;

        item = App.create(App.aliases.COMPATIBILITY, {
            dataCompatibility: data,
            size: data.size,
            basket: true,
            productCard: Imigize.create('Imigize.integration.main.shop.SportmasterBasketItem',
                {
                    data: data,
                    target: target,
                    size: data.size
                }),
            warehouse: 'sportmaster',
            marginTop: margetTop
        });

        me._items.push(item);
    }

});