angular.module("prhRepositories")
.factory("HQOrderExcludeStoreRepository", ["$http", "baseUrl", "loadingService", function ($http, baseUrl, loadingService) {
    var areaUrl = baseUrl + 'PRH/HQOrderStore/';
    return {
        GetHorderExcludeStoreList: function () {                                    //取得[不主配門市]查詢紀錄
            return (areaUrl + "GetHorderExcludeStoreList");
        },
        GetHorderExcludeStoreItemList: function () {                                //取得[不主配門市]查詢細項紀錄
            return (areaUrl + "GetHorderExcludeStoreItemList");
        },
        GetHorderExcludeStoreItemByNo: function (data) {                         //取得[不主配門市]查詢細項紀錄
            return $http.post(areaUrl + "GetHorderExcludeStoreItemList", data);
        },
        GetStoreNM: function (data) {                                               //取得門市名稱
            return $http.post(areaUrl + "GetStoreNM", data);
        },
        GetCatNM: function (data) {                                                 //取得分類名稱
            return $http.post(areaUrl + "GetCatNM", data);
        },
        GetItemNM: function (data) {                                                //取得商品名稱
            return $http.post(areaUrl + "GetItemNM", data);
        },
        GetTanaBigClass: function (data) {                                          //驗證檯帳大分類
            return $http.post(areaUrl + "GetTanaBigClass", data);
        },
        GetTanaGroup: function (data) {                                             //驗證第一檯編號
            return $http.post(areaUrl + "GetTanaGroup", data);
        },
        GetHorderTanaGroupNo: function (data) {                                     //驗證主配檯帳群組
            return $http.post(areaUrl + "GetHorderTanaGroupNo", data);
        },
        GetTanaNo: function (data) {                                                //驗證檯帳編號
            return $http.post(areaUrl + "GetTanaNo", data);
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
        Delete: function (data) {
            return $http.post(areaUrl + "Delete", data, { modal: true });
        },
        DeleteBatch: function (data) {
            return $http.post(areaUrl + "DeleteBatch", data, { modal: true });
        },
        Export: function (queryDTO) {
            location.href = (areaUrl + 'Export?' + $.param(queryDTO));
        }
    };
}]);
