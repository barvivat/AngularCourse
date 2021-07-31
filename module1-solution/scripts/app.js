(function () {
    'use strict';

    angular.module("LunchCheck", []).controller('LunchController', LunchController);
    LunchController.$inject = ['$scope']

    function LunchController($scope) {
        $scope.list = "";
        $scope.message = "";
        $scope.color = "";

        $scope.displayMessage = function () {
            $scope.message = checkList($scope.list);
            
            if ($scope.message == "Please enter data first")
                $scope.color = "red";
            else
                $scope.color = "green";
        }

        function checkList(list) {
            if (list == "")
                return "Please enter data first";

            var items = list.split(',');
            var itemsNoEmpty = 0;

            for (var i = 0; i < items.length; i++) {
                if (items[i] != "")
                    itemsNoEmpty++;
            }
            if (itemsNoEmpty <= 3)
                return "Enjoy!";

            return "Too much!";
        }
    }
})();