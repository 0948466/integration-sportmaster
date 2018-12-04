Imigize.define('Imigize.integration.main.shop.SportmasterProductCard', {

    extend: 'Imigize.integration.main.shop.AbstractProductCard',

    constructor: function() {

        var me = this,
            userModel = Imigize.integration.compatibility.model.getUserModel();

        me._isMobile = $(window).width() < 1000;

        if (me._isMobile) {
            me._$elSizes = [];
        } else {
            me._$elSizes = $('.js-size-item');
        }

        __super__.constructor.apply(me, arguments);

        me.carouselContainer = $('.sm-images__preview-block .bx-viewport');

        if (!me._isMobile) {
            me.init3D();
            me._$elSizes.on('click', me._onSizesClick.bind(me));
        }
    },

    initCompatibility: function() {
        var me = this;

        if (me._isMobile && !me._$elSizes.length) {
            me._initSizesMobile();
            return;
        }

        __super__.initCompatibility.apply(this, arguments);
    },

    _initSizesMobile: function(count) {
        if (count > 100) {
            return;
        }

        var me = this,
            sizeBtns = $('.facetButton-text');

        count = count || 0;

        if (!sizeBtns.length) {
            setTimeout(function() {
                me._initSizesMobile(++count);
            }, 100);
            return;
        }

        me._$elSizes = sizeBtns;
        me._$elSizes.on('click', me._onSizesClick.bind(me));
        me.initCompatibility();
    },

    _onSizesClick: function(e) {
        var target = $(e.target), size;

        size = target.text().trim().replace(',', '.');

        if (!size) {
            return;
        }

        Imigize.integration.compatibility.model.getUserModel().triggerOnSizesClick(size);
    },

    init3D: function(count) {
        var me = this, cloneLi, icon3d,
            _3dData = this._app.getModel().get3D();

        count = count || 0;

        if (!_3dData) {
            if (count > 7) {
                return;
            }
            setTimeout(function() {
                me.init3D(++count);
            }, 1000);
            return;
        }

        icon3d = Imigize.create('Imigize.3dviewer.Icon3d', {
            _3dData: _3dData
        });

        cloneLi = me.carouselContainer.find('li:eq(1)').clone().empty().append(icon3d.getEl())
            .css({'width': '90px', 'height': '62px'});

        me.carouselContainer.find('ul').prepend(cloneLi);
        me.carouselContainer.find('ul').css({'marginLeft': 92, 'left': -92});
    },

    injectCompatibilityButton: function(button) {
        var target = (this._isMobile) ? $('.productCard--sizes') : $('.sm-goods_main_details_size');
        target.after(button.getEl());
    },

    getModelName: function() {
        if (!this._isMobile) {
            return $('h1[itemprop=name]').text();
        }

        return '';
    },

    getBrand: function() {
        if (!this._isMobile) {
            return $('.characteristics_values td')
                .filter(function() {
                    return $(this).text() == 'Производитель';
                }).first().next().text();
        }
        return $('.sm-goods_main_details h1').text();
    },

    getArticle: function() {
        if (!this._isMobile) {
            return $('.characteristics_values td')
                .filter(function() {
                    return $(this).text() == 'Артикул производителя';
                }).first().next().text();
        }

        // TODO доделать получение артикуля в мобильной версии
        return '534355';
    },

    _collectSizeInfo: function() {
        if (!this._isMobile) {
            return '';
        }

        var me = this, $sizes = $('.sm-goods__param-value.js-size-item');

        $sizes.each(function() {
            var size = $(this).text(),
                count = 1,
                available = $(this).is('.disable'),
                $label = $(this);

            me._addSizeInfo(size, available, count, $label);
        });

    },

    getPrice: function() {
        if (!this._isMobile) {
            return $('sm-amount[params="value: window.globals.cardModel.product.price"]').text().replace(/\D+/, '');
        }
        return '';
    },

    getImage: function() {
        if (!this._isMobile) {
            return $('.sm-goods_main_photo.sm-image-holder img').attr('src');
        }
        return '';
    },

    allowAddToBasket: function() {
        if (!this._isMobile) {
            return $('.sm-goods_main_details_buy-straight').is('.disabled');
        }
        return false;
    },

    addToBasket: function(size) {
        __super__.addToBasket.apply(this, arguments);

        $('#AddToBasket').click();
    }

});