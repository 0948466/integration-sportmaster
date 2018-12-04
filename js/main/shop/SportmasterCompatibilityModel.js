Imigize.define('Imigize.integration.main.shop.SportmasterCompatibilityModel', {
    extend: 'Imigize.integration.imigize.compatibility.model.CompatibilityModel',

    LS_NAME: 'imigize.sportmaster.compatibilityAll',
    LS_USER: 'imigize.compatibility.user',
    timeout: 0, //@todo timeout in sec for compatibility

    _data: {},

    getCompatibilityAllData: function() {
        return this.get('compatibilityAllData');
    },

    setCompatibilityAllData: function(data) {
        this.set('compatibilityAllData', data);
    },

    getColor: function(value) {
        var me = this;
        switch (true) {
            case value >= me.config.PERFECT:
                return 'rgb(0, 88, 175)';
            case value >= me.config.VERY_GOOD:
                return 'rgb(0, 88, 175)';
            case value >= me.config.GOOD:
                return 'rgb(0, 88, 175)';
            case value >= me.config.ACCEPTABLE:
                return 'rgb(100, 100, 100)';
            case value >= me.config.SOSO:
                return 'rgb(139, 139, 139)';
            case value >= me.config.BAD:
                return 'rgb(211, 211, 211)';
            default:
                return 'rgb(214, 214, 214)';
        }
    },

    requestCompatibilityAll: function(onUserEnter) {
        var me = this;

        me.getApi().requestCompatibilityAll().then(function(answer, errorCode) {
            if (errorCode) {
                me.removeUserFromLocalStorage();
                return false;
            } else {
                if (!answer || !answer.compatibilities) {
                    return;
                }
                me.setCompatibilityAll(answer.compatibilities, onUserEnter);
            }
        });
    },

    setCompatibilityAll: function(compatibilityAll, onUserEnter) {
        var data = [], i, sku, size, value;

        for (i = 0; i < compatibilityAll.length; i++) {
            sku = compatibilityAll[i].article;
            size = compatibilityAll[i].size;
            value = compatibilityAll[i].value;

            if (!data[sku]) {
                data[sku] = {};
            }

            data[sku][size] = value;
        }
        if ($.isEmptyObject(this.getUserFromLocalStorage())) {
            this.setUserInLocalStorage({'userLogin': true});
        }

        this.getApp().getUserModel().enterFromCatalog();
        this.setCompatibilityAllData(data);
    },

    setInLocalStorage: function(data) {
        localStorage.setItem(this.LS_NAME, JSON.stringify(data));
        localStorage.setItem(this.LS_NAME + '_ts', Math.floor(Date.now() / 1000));
    },

    getDataFromLocalStorage: function() {
        return JSON.parse(localStorage.getItem(this.LS_NAME));
    },

    getTimeFromLocalStorage: function() {
        return JSON.parse(localStorage.getItem(this.LS_NAME + '_ts'));
    },

    getUserFromLocalStorage: function() {
        return JSON.parse(localStorage.getItem(this.LS_USER));
    },

    setUserInLocalStorage: function(user) {
        localStorage.setItem(this.LS_USER, JSON.stringify(user));
    },

    removeUserFromLocalStorage: function() {
        localStorage.removeItem(this.LS_USER);
    },

    setUserId: function(userId) {
        this.getApp().getUserModel().setUserId(userId);
    },

    getUserId: function() {
        return this.getApp().getUserModel().getUserId();
    },

    getUserEmail: function() {
        return this.getApp().getUserModel().getUserEmail();
    },

    setUserEmail: function(email) {
        return this.getApp().getUserModel().setEmail(email);
    },

    getUserLoginNumber: function() {
        return this.getApp().getUserModel().getUserLoginNumber();
    },

    getCompatibilityBySku: function(sku, size) {
        if (!this.getCompatibilityAllData()[sku]) {
            return false;
        }
        return this.getCompatibilityAllData()[sku][size];
    },

    getBestCompatibilityValue: function(sku, sizesAvailable) {
        var best = {}, key,
            dataCompatibility = this.getCompatibilityAllData()[sku];

        if (!dataCompatibility) {
            return;
        }

        best.value = 0;

        for (key in dataCompatibility) {
            if (!dataCompatibility.hasOwnProperty(key)) {
                continue;
            }

            if (best.value < +dataCompatibility[key] && (sizesAvailable.indexOf(key) + 1)) {
                best.value = +dataCompatibility[key];
                best.size = key;
            }
        }
        return best;
    },

    getBestCompatibilityForAllSize: function(sku) {
        if (!this.getCompatibilityAllData()) {
            return;
        }
        var best = {}, key,
            dataCompatibility = this.getCompatibilityAllData()[sku];

        if (!dataCompatibility) {
            return;
        }

        best.value = 0;

        for (key in dataCompatibility) {
            if (!dataCompatibility.hasOwnProperty(key)) {
                continue;
            }

            if (best.value < +dataCompatibility[key]) {
                best.value = +dataCompatibility[key];
                best.size = key;
            }
        }

        return best;
    },

    getTextForResultCatalog: function(value) {
        var ApiError = Imigize.integration.compatibility.api.Error;
        var me = this, _ = Imigize.core.Gettext._.bind(Imigize.core.Gettext);
        switch (true) {
            case value >= me.config.PERFECT:
                return _('Подходит идеально');
            case value >= me.config.VERY_GOOD:
                return _('Подходит отлично');
            case value >= me.config.GOOD:
                return _('Подходит хорошо');
            case value >= me.config.ACCEPTABLE:
                return _('Подходит приемлемо');
            case value >= me.config.SOSO:
                return _('Подходит так себе');
            case value >= me.config.BAD:
                return _('Не подходит');
            default:
                return _('Не подходит');
        }
    },

    getCompatibilityAll: function(self, func) {
        var data = {}, dataTimeStamp;

        data = this.getDataFromLocalStorage() || {};
        dataTimeStamp = parseInt(this.getTimeFromLocalStorage()) || 0;


        if (dataTimeStamp + this.timeout < Math.floor(Date.now() / 1000) ||
            $.isEmptyObject(this.getUserFromLocalStorage())) {
            this.requestCompatibilityAll(self, func);
            return;
        }

        this.setCompatibilityAllData(data);

        func.call(self);
    }
});

Imigize.integration.main.shop.SportmasterCompatibilityModel =
    Imigize.create('Imigize.integration.main.shop.SportmasterCompatibilityModel');