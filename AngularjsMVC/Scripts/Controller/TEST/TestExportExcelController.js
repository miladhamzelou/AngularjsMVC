angular.module("topPos")
.controller("TestExportExcel", ["$scope", "properiodRepository", function ($scope, properiodRepository) {
    $scope.tabName = "example";

    $scope.exportExcel = function () {
        properiodRepository.exportExcel({});
    }
}]);
