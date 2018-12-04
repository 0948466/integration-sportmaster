Imigize.define('Imigize.integration.main.shop.SportmasterFilterModel', {
    extend: 'Imigize.core.Model',

    LS_NAME: 'imigize.sportmaster.filter',
    LS_NAME_SORT: 'imigize.sportmaster.filter.sorting',

    isEnabledFilter: function() {
        return !!this.get('IsEnabledFilter');
    },

    setIsEnabledFilter: function(IsEnabledFilter) {
        this.set('IsEnabledFilter', IsEnabledFilter);
        this.setIsEnabledFilterInLocalStorage(IsEnabledFilter);
    },

    isEnabledFilterInLocalStorage: function() {
        return localStorage.getItem(this.LS_NAME);
    },

    setIsEnabledFilterInLocalStorage: function(IsEnabledFilter) {
        IsEnabledFilter ? localStorage.setItem(this.LS_NAME, IsEnabledFilter) : localStorage.removeItem(this.LS_NAME);
    },

    isEnabledSorting: function() {
        return !!this.get('isEnabledSorting');
    },

    setIsEnabledSorting: function(isEnabledSorting) {
        this.set('isEnabledSorting', isEnabledSorting);
        this.setIsEnabledSortingInLocalStorage(isEnabledSorting);
    },

    isEnabledSortingInLocalStorage: function() {
        return localStorage.getItem(this.LS_NAME_SORT);
    },

    setIsEnabledSortingInLocalStorage: function(isEnabledSorting) {
        isEnabledSorting ?
            localStorage.setItem(this.LS_NAME_SORT, isEnabledSorting) : localStorage.removeItem(this.LS_NAME_SORT);
    }
});

Imigize.integration.main.shop.SportmasterFilterModel =
    Imigize.create('Imigize.integration.main.shop.SportmasterFilterModel');