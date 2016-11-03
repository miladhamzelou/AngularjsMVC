angular.module("topPos")
.controller("areaListDialogCtrl", ["$scope", "dialogRepository", function ($scope, dialogRepository) {
    $scope.updateData = function () {
        var data = [];
        angular.forEach($scope.items, function (item) {
            if (item.Checked) {
                data.push(item);
            }
        });
        $scope.setToolDialogData(data);
    }

    $scope.queryData = function (data) {
        dialogRepository.queryArea({ model: data }).success(function (items) {
            $scope.items = items;
        });
    }
}]);