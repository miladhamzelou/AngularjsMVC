angular.module("topPos")
.controller("areaDialogCtrl", ["$scope", "dialogRepository", function ($scope, dialogRepository) {
    $scope.updateData = function (data) {
        $scope.setToolDataAndClose(data);
    }

    $scope.queryData = function (data) {
        dialogRepository.queryArea({ model: data }).success(function (items) {
            $scope.items = items;
        });
    }
}]);