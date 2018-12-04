Imigize.define('Imigize.integration.main.shop.SportmasterCatalogMobile', {

    extend: 'Imigize.integration.main.shop.AbstractCatalog',

    LS_NAME: 'imigize.sportmaster.sportmasterFilter',

    constructor: function() {
        var me = this;

        __super__.constructor.apply(this, arguments);

        me.CLASS_TARGET_RESULT_BEFORE = 'showcase__prices';

        me.CLASS_CATEGORY = 'showcase';
        me.CLASS_CATEGORY_ITEM = 'showcase__item';
        me.CLASS_CATEGORY_SORTING = 'sm-category__main-sorting_top-page-wrap';
        me.CLASS_ITEM_NO_COMPATIBILITY = 'item-no-compatibility';
        me.CLASS_SORTING_TITLE = 'sm-category__main-sorting_pseudoselect_trigger';
        me.CLASS_SORTING_LIST_ITEM = 'sm-category__main-sorting_pseudoselect_dropdown .ajax-facet-value';

        me.CLASS_CATEGORY_BREADCRUMBS_MB = 'breadcrumbs';

        me.initCompatibility();

        me.filterModel = me._initFilterModel();
        me.radioBtn = me._initRadioBtn();
        me.appendBannerMobile();
        me.appendRadioBtnMobile();
        me.model = me.getApp().getModel();

        me._initEvents();

        me._getCompatibilityAll();
    },


    _initEvents: function() {
        var me = this;

        if (me.model) {
            me.model.on('change:compatibilityAllData', _.bind(me._onCompatibilityAllDataChange, me));
        }

        if (me.filterModel) {
            me.filterModel.on('change:IsEnabledFilter', _.bind(me._onIsEnabledFilterChange, me));
            me.filterModel.on('onRadioBtnClick', _.bind(me._onRadioBtnClick, me));
        }

        me.getApp().getUserModel().on('enter', me._onUserEnter, me);
        me.getApp().getUserModel().on('enterFromCatalog', me._onUserEnterFromCatalog, me);
    },

    initCompatibility: function() {
        var App = Imigize.integration.App,
            me = this;

        me._app = App.create(App.aliases.COMPATIBILITY, {
            onlyInit: true,
            shop: me.getShop()
        });

        return me._app;
    },

    _onRadioBtnClick: function() {
        if (!this.isLogin()) {
            this.openEnter();
            return;
        }

        this.filterModel.setIsEnabledFilter(!this.filterModel.isEnabledFilter());
    },

    checkLocalStorage: function() {
        if (this.filterModel.isEnabledFilterInLocalStorage()) {
            this.filterModel.setIsEnabledFilter(true);
        }

        if (this.filterModel.isEnabledSortingInLocalStorage()) {
            this.filterModel.setIsEnabledSorting(true);
        }
    },

    _onIsEnabledFilterChange: function() {
        var me = this;
        if (this.filterModel.isEnabledFilter()) {
            me.hideNoCompatibilityItem();
        } else {
            me.showNoCompatibilityItem();
        }
    },

    _onUserEnter: function() {
        this.checkLocalStorage();
    },

    _onUserEnterFromCatalog: function() {
        this.checkLocalStorage();
    },

    openEnter: function() {
        var router = this.getApp().getRouter();
        router.goToMini();
        router.goTo(router.ROUTE_FULL_ENTER);
    },

    hideNoCompatibilityItem: function() {
        var itemNoCompatibility = $('.' + this.CLASS_ITEM_NO_COMPATIBILITY);
        itemNoCompatibility.hide();
    },

    showNoCompatibilityItem: function() {
        var itemNoCompatibility = $('.' + this.CLASS_ITEM_NO_COMPATIBILITY);
        itemNoCompatibility.show();
    },

    _initFilterModel: function() {
        var App = this.getApp();

        return App.create(App.VIEW_FILTER_MODEL);
    },

    _initRadioBtn: function() {
        var App = this.getApp();

        return App.create(App.VIEW_RADIO_BTN, {
            filterModel: this.filterModel
        });
    },

    appendRadioBtnMobile: function() {
        var me = this,
            banner = $('.imigize-banner-catalog-sportmaster');

        if (!banner.length) {
            setTimeout(function() {
                me.appendRadioBtnMobile();
            }, 100);
            return;
        }

        this.radioBtn.getEl().insertAfter(banner);
    },

    _getCompatibilityAll: function() {
        this.model.requestCompatibilityAll();
    },

    _onCompatibilityAllDataChange: function() {
        this.updateAllMobile();
    },

    changeSiteLayout: function() {
        this.changeSiteItem();
        this.appendBanner();

    },

    appendBannerMobile: function() {
        var breadcrumbs = $('.' + this.CLASS_CATEGORY_BREADCRUMBS_MB),
            me = this,
            App = this.getApp();

        if (!breadcrumbs.length) {
            setTimeout(function() {
                me.appendBannerMobile();
            }, 100);
            return;
        }

        if (!this.bannerCatalog) {
            this.bannerCatalog = App.create(App.VIEW_BANNER_CATALOG);
        }

        this.bannerCatalog.getEl().insertAfter(breadcrumbs);
    },

    changeSiteItem: function() {
        var items = $('.sm-category__item'), i;

        for (i = 0; i < items.length; i++) {
            items.eq(i).css('height', '475px');
            items.eq(i).find('.sm-category__item-add-to_compare').css('top', '455px');
        }
    },

    updateAll: function() {
        var me = this;
        this.changeSiteLayout();
        this.appendRadioBtn();
        if (this.isLogin()) {
            this.appendResultCatalog();
            this.appendToSorting();
            this.sortItems();
        }
    },

    updateAllMobile: function() {
        var me = this;

        this.appendResultCatalogMobile();
    },

    appendToSorting: function() {
        var sorting = $('.sm-category__main-sorting_pseudoselect_dropdown'), i,
            sortingLink = $
            ('<a href="https://www.sportmaster.ru/catalog/pokupka_obuvi_bez_primerki_/?sortOrder=compatibility">' +
                'По совместимости' +
                '</a>');

        sortingLink.on('click', _.bind(this._onSortingLinkClick, this));
        $('.' + this.CLASS_SORTING_LIST_ITEM).on('click', _.bind(this._onSortingListItemClick, this));

        for (i = 0; i < sorting.length; i++) {
            sortingLink.clone(true).appendTo(sorting.eq(i));
        }
    },

    _onSortingLinkClick: function(e) {
        e.preventDefault();

        if (this.filterModel.isEnabledSorting()) {
            this.filterModel.setIsEnabledSorting(false);
        } else {
            this.filterModel.setIsEnabledSorting(true);
        }
    },

    _onSortingListItemClick: function() {
        this.filterModel.setIsEnabledSorting(false);
    },

    appendResultCatalogMobile: function() {
        var App = this.getApp(), item, value,
            i, sku, best, textResult, resultCatalog;

        this.targetResultBefore = $('.' + this.CLASS_TARGET_RESULT_BEFORE);

        for (i = 0; i < this.targetResultBefore.length; i++) {
            item = this.targetResultBefore.eq(i)
                .closest('.' + this.CLASS_CATEGORY_ITEM);
            sku = item.attr('id');
            best = this.model.getBestCompatibilityForAllSize(sku);
            value = (best) ? best.value : 0;

            item.attr('data-compatibility', value)
                .attr('style', 'height: auto !important');

            if (value < 60) {
                item.addClass(this.CLASS_ITEM_NO_COMPATIBILITY);

                if (this.filterModel.isEnabledFilter()) {
                    item.hide();
                }
            }

            if (!value) {
                continue;
            }

            textResult = this.model.getTextForResultCatalog(value);

            resultCatalog = App.create(App.VIEW_RESULT_CATALOG, {
                size: best.size,
                value: value,
                textResult: textResult
            });

            resultCatalog.getEl()
                .insertAfter(this.targetResultBefore.eq(i));
        }

        this.addCssFlexToCatagoty();
    },

    addCssFlexToCatagoty: function() {
        $('.' + this.CLASS_CATEGORY).css({
            display: 'flex',
            flexWrap: 'wrap'
        });
    },

    sortItems: function() {
        if (!this.filterModel.isEnabledSorting()) {
            return;
        }

        $('.' + this.CLASS_SORTING_TITLE).text('По совместимости');

        var container = $('#categoryItemContainer'),
            items = $('.' + this.CLASS_CATEGORY_ITEM),
            sortProducts = items.sort(this.compareItems);

        container.empty();
        sortProducts.appendTo(container);
    },

    compareItems: function(a, b) {
        a = +($(a).data('compatibility') || '0');
        b = +($(b).data('compatibility') || '0');

        if (a > b) {
            return -1;
        }
        if (a < b) {
            return 1;
        }
    },

    getApp: function() {
        return this._app;
    },

    isLogin: function() {
        return this.getApp().getUserModel().getUserLoginNumber() || this.getApp().getUserModel()
            .getIsLoginFromCatalog();
    }
});