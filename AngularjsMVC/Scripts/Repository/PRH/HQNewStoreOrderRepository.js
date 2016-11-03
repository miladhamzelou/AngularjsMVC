angular.module("prhRepositories")
.factory("HQNewStoreOrderRepository", ["$http", "baseUrl", "loadingService", function ($http, baseUrl, loadingService) {
    var areaUrl = baseUrl + 'PRH/HQNewStoreOrder/';
    return {
        GetHNewStorePurchaseOrderList: function () {                 //查詢頁面
            return (areaUrl + "GetHNewStorePurchaseOrderList");
        },
        GetNewStorePurchaseOrderByHNStoreOrderNo: function (data) {        //取得新開店訂貨明細檔(訂單單號)
            return $http.post(areaUrl + "GetHNewStorePurchaseOrderList", data);
        },
        GetHNewStorePurchaseOrderDetail: function (data) {                 //新開店訂貨明細檔(主配單號)
            return $http.post(areaUrl + "GetHNewStorePurchaseOrderDetail", data);
        },
        checkStoreDetial: function (data) {        //檢查此門市是否已有資料
            return $http.post(areaUrl + "checkStoreDetial", data);
        },
        GetItemStoreDetial: function (data) {                //取得商品品號檯帳相關資料
            return $http.post(areaUrl + "GetItemStoreDetial", data, { modal: true });
        },
        Delete: function (data) {
            return $http.post(areaUrl + "Delete", data);
        },
        Update: function (data) {
            return $http.post(areaUrl + "Update", data, { modal: true });
        },
        Add: function (data) {
            return $http.post(areaUrl + "Add", data, { modal: true });
        },
        Export: function (data) {

            var link = areaUrl + "Export?";
            var where = "";

            where = $.param(data);

            location.href = link + where;
        }
    };
}]);
