Imigize.define('Imigize.integration.views.sector.AboutCompatibilitySportmaster', {

    extend: 'Imigize.core.View',

    config: {
        ns: 'imigize-aboutCompatibility-sportmaster',
        popup: null
    },

    _init: function() {
        var me = this;

        this._initData();

        __super__._init.apply(me, arguments);
    },

    _initEvents: function() {
        var me = this;

        me.$$('btn-close').on('click', _.bind(me._onBtnCloseClick, me));
    },

    _onBtnCloseClick: function() {
        this.config.popup._onNeedHide();
    },

    _initData: function() {
        this.data = [
            {
                title: 'Идеально',
                text: 'Превосходно подходящая для Вас модель обуви, покупайте смело!',
                compatibility: '96-100%'
            },
            {
                title: 'Отлично',
                text: 'Отличная совместимость, покупайте смело!',
                compatibility: '90-95%'
            },
            {
                title: 'Хорошо',
                text: 'Отличная совместимость по многим параметрам. Обувь с высокой вероятностью будет комфортна.',
                compatibility: '80-89%'
            },
            {
                title: 'Приемлемо',
                text: 'Обувь подходит по многим критериям. Есть вероятность, что при первой примерке эта модель будет' +
                    ' не очень удобна, но со временем Вам станет в ней комфортно.',
                compatibility: '60-79%'
            },
            {
                title: 'Так себе',
                text: 'Обувь с высокой вероятностью может не подойти. Выбирайте её, только если модель очень' +
                    ' понравилась и Вы готовы мириться с возможным дискомфортом.',
                compatibility: '40-59%'
            },
            {
                title: 'Не подходит',
                text: 'Эта обувь, скорее всего, будет Вам неудобной. Советуем посмотреть соседний размер или выбрать' +
                    ' другую модель.',
                compatibility: '20-39%'
            },
            {
                title: 'Не подходит',
                text: 'Обувь не подходит по многим параметрам.',
                compatibility: '0-19%'
            }
        ];
    }
});