angular.module("bacRepositories")
.factory("storesTranIcashRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var url = baseUrl + "ACC/";

    return {
        getStoreName: function (data) {
            return $http.post(url + "ExcludeStore/getStoreName", {
                storeID: data
            });
        },
        getList: function (data) {
            return $http.post(url + "StoresTranIcash/GetList", data);
        },
        initSelectList: function () {
            return $http.post(url + "StoresTranIcash/InitSelectList");
        },
    };
}]);