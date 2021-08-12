(function () {
    'use strict';

    angular
        .module('MenuApp')
        .controller('itemsListController', itemsListController)

    itemsListController.$inject = ['itemList'];

    function itemsListController(itemList) {
        var list = this;
        console.log(itemList);
        list.title = itemList.category.name;
        list.items = itemList.menu_items;
        

    }

}());