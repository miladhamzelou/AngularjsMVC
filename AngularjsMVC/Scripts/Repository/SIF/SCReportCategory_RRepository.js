angular.module("sifRepositories")
.factory("SCReportCategory_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + "SIF/SCReportCategory_R/";
    return {
        getAllReport: function (queryParams) {
            return $http.post(areaUrl + 'GetAllReport', queryParams, { modal: true });
        },
        getStoreIDByBmType: function (queryParams) {
            return $http.post(areaUrl + 'GetStoreIDByBmType', queryParams, { disableLoading: true });
        },
    };
}]);