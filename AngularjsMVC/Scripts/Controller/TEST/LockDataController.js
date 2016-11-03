(function () {
    angular.module("topPos")
    .controller("lockDataController", lockDataController);

    function lockDataController($scope, $http, baseUrl, $location, lockDataService, dialogService) {
        $scope.items = [
            { key: "0001", value: "Data 1" },
            { key: "0002", value: "Data 2" },
            { key: "0003", value: "Data 3" },
            { key: "0004", value: "Data 4" },
            { key: "0005", value: "Data 5" }
        ];

        $scope.displayMode = "list";

        $scope.viewData = function (item) {
            $scope.selectedItem = item;
            $scope.displayMode = "view";
        }

        $scope.editData = function (item) {
            $scope.selectedItem = item;
            $scope.displayMode = "edit";
        }

        $scope.backToList = function () {
            $scope.selectedItem = null;
            $scope.displayMode = "list";
        }

        $scope.backToView = function () {
            $scope.displayMode = "view";
        }

        $scope.saveData = function () {
            return $http.post(baseUrl + "Test/WaitForSeconds", { seconds: 3 })
                .then(function (response) {
                    $scope.backToList();
                });
        }

        $scope.refreshData = function () {
            return $http.get(baseUrl + "DataHandle/GetItems")
                .then(function (response) {
                    $scope.lockDataItems = response.data;
                });
        }

        $scope.deleteItems = function () {
            var postData = { itemKeys: [], routePath: $location.path() };

            angular.forEach($scope.items, function (item) {
                if (item.isChecked) {
                    postData.itemKeys.push(item.key)
                }
            });

            if (postData.itemKeys.length > 0) {
                lockDataService.check(postData)
                    .then(function (response) {
                        _deleteItems(postData.itemKeys);
                    });
            } else {
                dialogService.messageDialog({
                    title: "刪除多筆資料",
                    kind: "warning",
                    message: "請選取要刪除的資料"
                });
            }
        }

        $scope.deleteItem = function () {
            // 搭配 delete-confirm directive 使用時，需自行使用 lockDataService 執行資料解鎖
            $http.post(baseUrl + "Test/WaitForSeconds", { seconds: 3 })
                .then(function (response) {
                    $scope.backToList();
                })
                .then(function () {
                    lockDataService.unlock();
                })
        }

        var _deleteItems = function (itemKeys) {
            dialogService.messageDialog({
                title: "刪除資料",
                message: angular.toJson(itemKeys)
            });
        }
    }

    lockDataController.$inject = ["$scope", "$http", "baseUrl", "$location", "lockDataService", "dialogService"];
})()