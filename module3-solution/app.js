(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', foundItemsDirective);

    function foundItemsDirective() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                onRemove: '&',
                empty: '<'
            }
        };

        return ddo;
    }
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        
        var ctrl = this;
        
        ctrl.searchItem = "";
        ctrl.empty = false;
        ctrl.found = [];
        
        ctrl.getMatchedMenuItems = function() {
            if(ctrl.searchItem == "" || ctrl.searchItem == undefined)
                ctrl.empty = true;
            
            else { 
                ctrl.empty = false;
                MenuSearchService.getMatchedMenuItems(ctrl.searchItem)
                .then(function(response) {
                    ctrl.found = response;
                    if(ctrl.found.length == 0)
                        ctrl.empty = true;
                })
                .catch(function() {
                    console.log("Something went wrong...");
                });
            }
        };
        
        ctrl.removeItem = function(idx) {
            ctrl.found.splice(idx, 1);
        };
    }
    
    MenuSearchService.$inject = ['$http']
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function(searchItem) {
            var foundItems = [];

            return $http({
                method: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json'})
                .then(function (response) {
                    var items = response.data.menu_items;
                    for(var i=0; i<items.length; i++){
                        var prop = items[i].name.toUpperCase();
                       
                        if(prop.includes(searchItem.toUpperCase()))
                            foundItems.push(items[i]);
                    }
                    return foundItems;
                });
        };
    }

}());