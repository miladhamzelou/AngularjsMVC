angular.module("prhRepositories")
.factory("OrderDeadlineRepository", ["$http", "baseUrl", "loadingService", function ($http, baseUrl, loadingService) {
    var areaUrl = baseUrl + 'PRH/OrderDeadline/';
    return {
        GetOrderFrequencList: function () {                                   //取得[主配檯帳群組]查詢紀錄
            return $http.post(areaUrl + "GetOrderFrequencList");
        },
        GetSubVenderByID: function (data) {                                      //取得檯帳名稱
            return $http.post(areaUrl + "GetSubVenderByID", data);
        },
        Update: function (data) {
            return $http.post(areaUrl + "Update", data, { modal: true });
        },
        Add: function (data) {
            return $http.post(areaUrl + "Add", data, { modal: true });
        },
        AddBatch: function (data) {
            return $http.post(areaUrl + "AddBatch", data, { modal: true });
        },
        CheckSubVenderItem: function (data) {    //檢查檯帳上是否還有該配送商商品
            return $http.post(areaUrl + "CheckSubVenderItem", data);
        },
        CheckSubVenderHPurchaseOrder: function (data) {    //檢核未轉單訂單是否還有該配送商商品
            return $http.post(areaUrl + "CheckSubVenderHPurchaseOrder", data);
        },
        Delete: function (data) {
            return $http.post(areaUrl + "Delete", data);
        }
    };
}]);
