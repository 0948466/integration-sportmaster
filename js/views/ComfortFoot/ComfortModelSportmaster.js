Imigize.define('Imigize.integration.views.ComfortFoot.ComfortModelSportmaster', {
    extend: 'Imigize.core.Model',

    LS_NAME: 'imigize.sportmaster.comfortFoot',

    _data: {},

    /**
     * @returns {*|Imigize.integration.compatibility.api.API}
     */
    getApi: function() {
        return Imigize.integration.App.getApi();
    },

    getData: function() {
        return this._data;
    },

    getStatus: function(article, size) {
        if (this._data[article] && this._data[article][size]) {
            return this._data[article][size].status;
        }
    },

    getPerfect: function(article, size) {
        if (this._data[article][size].perfect) {
            return this._data[article][size].perfect;
        }
    },

    getPoints: function(article, size, side) {
        var result = {}, points = this._data[article][size].points[side], i;
        for (i in points) {
            if (!points.hasOwnProperty(i)) {
                continue;
            }
            result[i] = points[i];
        }
        return result;
    },

    getValue: function(article, size, side, name) {
        if (this._data[article][size].points[side]) {
            return this._data[article][size].points[side][name];
        }
    },

    getSrc: function(article, size) {
        return this._data[article][size].src;
    },

    getNewSrc: function(article, size, callback) {
        var me = this;

        me.getApi().doGetImageUrl({shoeId: article})
            .then(function(answer) {
                callback(answer);
                try {
                    me._data[article][size].src = answer.pictures[0].preview;
                } catch (e) {
                    console.error(e.message);
                }
            });
    },

    getBrand: function(article, size) {
        return this._data[article][size].brand;
    },

    getType: function(article, size) {
        return this._data[article][size].type;
    },

    isEnabled: function(article, size) {
        return !!(this._data[article] && this._data[article][size]);
    },

    getComfort: function() {
        var me = this, shoes = [], article, size;
        for (article in this._data) {
            if (!this._data.hasOwnProperty(article)) {
                continue;
            }
            for (size in this._data[article]) {
                if (!this._data[article].hasOwnProperty(size)) {
                    continue;
                }
                shoes.push({
                    size: size,
                    code: article
                });
            }
        }

        me.getApi().doComfortGetShoes({shoes: shoes})
            .then(function(answer) {
                me._initShoes(answer.shoes);
                me.trigger('init');
                return answer;
            });
    },

    _initShoes: function(shoes) {
        var me = this, i;
        me._data = {};
        for (i in shoes) {
            if (!shoes.hasOwnProperty(i)) {
                continue;
            }
            if (!me._data[shoes[i].code]) {
                me._data[shoes[i].code] = {};
            }
            me._data[shoes[i].code][shoes[i].size] = {
                article: shoes[i].code,
                size: shoes[i].size,
                status: shoes[i].old ? 'add' : 'new',
                points: {}
            };
        }
    },

    initDataModel: function(shoe) {
        var me = this, data = me._data,
            article = shoe.article,
            size = shoe.size;

        if (shoe) {

            if (!data[article]) {
                data[article] = {};
            }

            if (!data[article][size]) {
                data[article][size] = {};
            }

            if (!data[article][size].points) {
                data[article][size].points = {};
            }

            data[article][size].src = shoe.src;
            data[article][size].brand = shoe.brand;
            data[article][size].type = shoe.type;
        }
    },

    setData: function(result) {
        var me = this, data = me._data;

        if (!data[result.article]) {
            data[result.article] = {};
        }

        if (!data[result.article][result.size]) {
            data[result.article][result.size] = {};
        }

        if (!data[result.article][result.size].points) {
            data[result.article][result.size].points = {};
        }

        if (!data[result.article][result.size].points.left) {
            data[result.article][result.size].points.left = {};
        }

        if (!data[result.article][result.size].points.right) {
            data[result.article][result.size].points.right = {};
        }

        if (result.value) {
            data[result.article][result.size].points[result.side][result.name] = result.value;
        }

        if (result.points) {
            data[result.article][result.size].points[result.side] = result.points;
        }

        if (result.status) {
            data[result.article][result.size].status = result.status;
        }

        if (result.perfect) {
            data[result.article][result.size].perfect = result.perfect;
        } else {
            data[result.article][result.size].perfect = 0;
        }

        if (result.new) {
            data[result.article][result.size].new = true;
        }
    },

    setAddNewPoints: function(result) {
        var me = this, data = me._data;

        if (!data[result.article]) {
            data[result.article] = {};
        }

        if (!data[result.article][result.size]) {
            data[result.article][result.size] = {};
        }

        if (result.image) {
            if (!data[result.article][result.size].addNewPoints) {
                data[result.article][result.size].addNewPoints = {};
            }

            if (!data[result.article][result.size].addNewPoints[result.image]) {
                data[result.article][result.size].addNewPoints[result.image] = {};
            }

            data[result.article][result.size].addNewPoints[result.image] = result.newPoints;
        }
    },

    getAddNewPoints: function(article, size, image) {
        if (!this._data[article][size].addNewPoints) {
            return;
        }
        if (this._data[article][size].addNewPoints[image]) {
            return this._data[article][size].addNewPoints[image];
        }
    },

    sendAddNewPoints: function(article, size, message) {
        var me = this, i = 0,
            data = me._data;

        for (i = 1; i < 8; i++) {
            if (!data[article][size].addNewPoints[i]) {
                data[article][size].addNewPoints[i] = [0];
            }
        }

        return me.getApi().doSendAddNewPoints({
            article: article,
            size: size,
            addNewPoints: data[article][size].addNewPoints,
            message: message
        });
    },

    getAddNewPointsAll: function(article, size) {
        if (!this._data[article][size].addNewPoints) {
            return;
        }
        return this._data[article][size].addNewPoints;

    },

    saveFittingOnDataBase: function(result) {
        var me = this;

        if (!me._data[result.article][result.size].new) {
            return;
        }
        me.getApi().doComfortSaveFitting({
            code: result.article,
            size: result.size,
            points: me._data[result.article][result.size].points,
            perfect: result.perfect ? 1 : 0
        });

        me._data[result.article][result.size].new = 0;
    },

    onButtonChange: function(func) {
        this.on('buttonChange', func);
    },

    triggerButtonChange: function(data) {
        this.setData(data);
        this.trigger('buttonChange');
    },

    triggerMenuListOpen: function() {
        this.trigger('menuListOpen');
    },

    triggerFirstOpenPointArea: function() {
        this.trigger('firstOpenPointArea');
    },

    triggerPaintAreaOpen: function(data) {
        this.trigger('paintAreaOpen', data);
    },

    triggerFaqOpen: function() {
        this.trigger('faqOpen');
    },

    triggerFaqNext: function() {
        this.trigger('faqNext');
    },

    triggerFaqBack: function() {
        this.trigger('faqBack');
    },

    triggerPointsValueChange: function() {
        this.trigger('pointsValueChange');
    },

    onInit: function(func) {
        this.on('init', func);
    },

    setActiveSide: function(data) {
        if (data === 'sideActive') {
            data = 'right';
        }
        this.set('sideActive', data);
    },

    getActiveSide: function() {
        return this.get('sideActive');
    },

    setCurrentArticle: function(data) {
        this.set('currentArticle', data);
    },

    getCurrentArticle: function() {
        return this.get('currentArticle');
    },

    setCurrentSize: function(data) {
        this.set('currentSize', data);
    },

    getCurrentSize: function() {
        return this.get('currentSize');
    },

    setCurrentPage: function(data) {
        this.set('currentPage', data);
    },

    getCurrentPage: function() {
        return this.get('currentPage');
    },

    setCurrentName: function(data) {
        this.set('currentName', data);
    },

    getCurrentName: function() {
        return this.get('currentName');
    },

    setAddPointLeft: function(data) {
        this.set('addPointLeft', data);
    },

    getAddPointLeft: function() {
        return this.get('addPointLeft');
    },

    setAddPointRight: function(data) {
        this.set('addPointRight', data);
    },

    getAddPointRight: function() {
        return this.get('addPointRight');
    },

    setWarehouse: function(warehouse) {
        this.set('warehouse', warehouse);
    },

    getWarehouse: function() {
        return this.get('warehouse');
    }
});