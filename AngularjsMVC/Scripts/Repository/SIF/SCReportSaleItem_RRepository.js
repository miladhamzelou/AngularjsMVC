angular.module("sifRepositories")
.factory("SCReportSaleItem_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var url = baseUrl + "SIF/SCReportSaleItem_R/";
    return {
        getReportAll: function (data) {
            return $http.post(url + "getReportAll", data, { modal: true });
        },
        getStoreIDByBmType: function (queryParams) {
            return $http.post(url + 'GetStoreIDByBmType', queryParams, { disableLoading: true });
        },
    };
}]);