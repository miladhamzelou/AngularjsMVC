angular.module("bacRepositories")
.factory("excludeStoreRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var url = baseUrl + "ACC/";

    return {
        getList: function () {
            return url + "ExcludeStore/Query";
        },
        create: function (data) {
            return $http.post(url + "ExcludeStore/Create", data);
        },
        initSelectList: function () {
            return $http.post(url + "ExcludeStore/InitSelectList");
        },
        update: function (data) {
            return $http.post(url + "ExcludeStore/Update", data);
        },
        delete: function (data) {
            return $http.post(url + "ExcludeStore/Delete", data);
        },
        getStoreName: function (data) {
            return $http.post(url + "ExcludeStore/getStoreName", {
                storeID: data
            });
        },
        outputExcel: function (StoreId, ActiveFlag) {
            location.href = (url + "ExcludeStore/OutputExcel?storeId=" + StoreId + "&activeFlag=" + ActiveFlag);
        }
    };
}]);