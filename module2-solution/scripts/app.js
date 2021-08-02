(function (){
    'use strict';

    angular.module("ShoppingListCheckOff", [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var ToBuy = this;

        ToBuy.curName = "";
        ToBuy.curQuantity = "";
        ToBuy.addItem = function(){
            ShoppingListCheckOffService.addItem(ToBuy.curName, ToBuy.curQuantity);
        }
        ToBuy.moveToBoughtList = function(idx){
            ShoppingListCheckOffService.moveToBoughtList(idx);
        }
        ToBuy.toBuyList = ShoppingListCheckOffService.getToBuyList();
        
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var AlreadyBought = this;

        AlreadyBought.boughtList = ShoppingListCheckOffService.getBoughtList();
    }

    function ShoppingListCheckOffService(){
        var service = this;

        var toBuyList = [];
        var boughtList = []; 

        service.addItem = function(name, quantity) {
            var item = {
                name: name,
                quantity: quantity
            };

            toBuyList.push(item);
        };

        service.moveToBoughtList = function(idx){
            var item = toBuyList.splice(idx, 1)[0];
            boughtList.push(item);
        }
        service.getToBuyList = function() {
            return toBuyList;
        };

         service.getBoughtList = function() {
            return boughtList;
        };
    }
})();