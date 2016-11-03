angular.module("sifRepositories")
.factory("SCReportTop100_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var url = baseUrl + "SIF/SCReportTop100_R/";

    return {
        getList: function (data) {
            return $http.post(url + "GetList", data, { modal: true });
        },
        getStoreIDByBmType: function (queryParams) {
            return $http.post(url + 'GetStoreIDByBmType', queryParams, { disableLoading: true });
        },
    };
}]);