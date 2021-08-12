(function () {
    'use strict';

    angular.module('MenuApp').controller('categoriesListController', categoriesListController);

    categoriesListController.$inject = ['categoriesList'];
    function categoriesListController(categoriesList) {
        var list = this;
        list.categoriesList = categoriesList;
    }

}());