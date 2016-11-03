angular.module("topPos")
.controller("formValidationCtrl", ["$scope", "$http", "baseUrl", "dialogService", function ($scope, $http, baseUrl, dialogService) {
    $scope.startWithAlphabeta = new RegExp("^[a-z]");
    $scope.sendServerCustom = function (data) {
        $http.post(baseUrl + 'Test/ServerValidation', data).success(function (r) {
            dialogService.messageDialog({
                message: "檢核成功"
            });
        });
    }
    $scope.rest = function () {
        $scope.serverCustom = {};
    }
}]);