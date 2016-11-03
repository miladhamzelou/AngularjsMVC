angular.module("prhRepositories")
.factory("HQOrderMaintainRepository", ["$http", "baseUrl", "loadingService", function ($http, baseUrl, loadingService) {
    var areaUrl = baseUrl + 'PRH/HQOrderMaintain/';
    return {
        queryProPeriod: function (data) {                                   //取得[檔期期間]查詢紀錄
            return $http.post(baseUrl + "Dialog/QueryProPeriod", data);
        },
        GetHorderOrderList: function () {                 //查詢頁面
            return (areaUrl + "GetHorderOrderList");
        },
        GetHorderOrderByNo: function (data) {                 //查詢主配訂單主檔內容(主配單號)
            return $http.post(areaUrl + "GetHorderOrderList", data);
        },
        GetHorderOrderDetail: function (data) {                 //查詢主配訂單維護明細檔內容(主配單號)
            return $http.post(areaUrl + "GetHorderOrderDetail", data);
        },
        GetOrderSuccessDetail: function (data) {                   //取得夜間處理成功資料
            return $http.post(areaUrl + "GetOrderSuccessDetail", data);
        },
        GetOrderFailDetail: function (data) {                   //取得夜間處理失敗資料
            return $http.post(areaUrl + "GetOrderFailDetail", data);
        },
        GetHorderProcessDetail: function (data) {               //取得主配類型區間設定
            return $http.post(baseUrl + "PRH/HQOrderType/GetHorderProcessDetail", data);
        },
        GetItemTanaDetial: function (data) {                    //取得商品品號檯帳相關資料
            return $http.post(areaUrl + "GetItemTanaDetial", data);
        },
        GetStore: function (data) {                    //取得商品品號檯帳相關資料
            return $http.post(areaUrl + "GetStore", data);
        },
        Delete: function (data) {
            return $http.post(areaUrl + "Delete", data, { modal: true });
        },
        Add: function (data) {
            return $http.post(areaUrl + "Add", data, { modal: true });
        },      
        Update: function (data) {
            return $http.post(areaUrl + "Update", data, { modal: true });
        },
        WeeklyExport: function (data) {
            location.href = (areaUrl + 'WeeklyExport?' + $.param(data));
        },
        Export: function (data) {

            var link = areaUrl + "Export?";
            var where = "";

            where = $.param(data);

            location.href = link + where;
        }
    };
}]);
