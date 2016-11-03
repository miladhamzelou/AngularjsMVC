
angular.module("gdlRepositories")
.factory("GondolaItem_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl+"GDL/"
    return {
        getSearchStoreListdata: function (data) {
            return $http.post(area + "GondolaItem_R/GetSearchStoreListdata", data);
        },
        getSearchListdata: function (data) {
            return $http.post(area + "GondolaItem_R/GetSearchListdata", data);
        },
    };
}]);
