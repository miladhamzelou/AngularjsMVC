angular.module("sifRepositories")
.factory("SCReportMMItem_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var url = baseUrl + "SIF/SCReportMMItem_R/";

    return {
        queryItemGroup: function (data) {
            return $http.post(url + "QueryItemGroup", data, { modal: true });
        },
        getAllReport: function (queryParams) {
            return $http.post(url + 'GetAllReport', queryParams, { modal: true });
        },
        getDetailReport: function (queryParams) {
            return $http.post(url + 'GetDetailReport', queryParams, { modal: true });
        },
        getStoreIDByBmType: function (queryParams) {
            return $http.post(url + 'GetStoreIDByBmType', queryParams, { disableLoading: true });
        },
    };
}]);