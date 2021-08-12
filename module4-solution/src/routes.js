(function () {
    'use strict';

    angular.module('MenuApp').config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './src/templates/homeView.html'
            })
            
            .state('categories', {
                url: '/categories',
                templateUrl: './src/templates/categoriesView.html',
                controller: 'categoriesListController as list',
                resolve: {
                    categoriesList: ['MenudataService', function(MenudataService) {
                        return MenudataService.getAllCategories();
                    }]
                }
            })
            
            .state('items', {
                url: '/items/{shortName}',
                templateUrl: './src/templates/itemsView.html',
                controller: 'itemsListController as list',
                resolve: {
                    itemList: ['$stateParams', 'MenudataService', function($stateParams, MenudataService) {
                        return MenudataService.getItemsForCategory($stateParams.shortName);
                    }]
                }
            });
    }

}());