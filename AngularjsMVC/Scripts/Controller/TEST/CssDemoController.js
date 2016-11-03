angular.module("topPos")
.controller("cssDemo", ["$scope", "baseUrl", "dialogService", function ($scope, baseUrl, dialogService) {
    $scope.pagingOpts = {
        pageSize: 3,
        auto: true,
        url: baseUrl + "Dialog/QueryStore",
        callback: function (items) {
            $scope.items = items;
        }
    };

    $scope.openDialog = function (kind) {
        dialogService.messageDialog({
            kind: kind,
            message: "<p>訊息內容一</p><p>訊息內容二</p><p>訊息內容三</p><p>訊息內容四</p>"
        });
    }

    $scope.openInfoDialog = function () {
        dialogService.messageDialog({
            message: "<p>訊息內容一</p><p>訊息內容二</p><p>訊息內容三</p><p>訊息內容四</p>"
        });
    }

    $scope.openWarningDialog = function () {
        $scope.openDialog("warning");
    }

    $scope.openErrorDialog = function () {
        $scope.openDialog("error");
    }
}]);