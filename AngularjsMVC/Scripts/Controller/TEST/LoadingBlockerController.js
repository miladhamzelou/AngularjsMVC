(function () {
    angular.module("topPos")
    .controller("LoadingBlockerCtrl", loadingBlockerCtrl);

    function loadingBlockerCtrl($scope, $http, baseUrl, loadingService) {
        $scope.data = { seconds: 3 };

        $scope.process = function () {
            $http.post(baseUrl + "Test/WaitForSeconds", $scope.data).then(function (result) {
                // do something
            });
        }

        $scope.processWithBlock = function () {
            $http.post(baseUrl + "Test/WaitForSeconds", $scope.data, { modal: true }).then(function (result) {
                // do something
            });
        }

        $scope.showLoadingMsg = function () {
            loadingService.show(false);
        }

        $scope.hideLoadingMsg = function () {
            loadingService.hide();
        }
    }

    loadingBlockerCtrl.$inject = ["$scope", "$http", "baseUrl", "loadingService"];
})()
