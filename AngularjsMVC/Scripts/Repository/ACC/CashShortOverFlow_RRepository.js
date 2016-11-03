angular.module("accRepositories")
.factory("CashShortOverFlow_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areasURL = baseUrl + "ACC/CashShortOverFlow_R/";
    return {
        getBCMList: function () {
            return $http.post(areasURL + "GetBCMList");
        },
        getReportView: function (data) {
            return $http.post(areasURL + "GetReportView", data);
        }
    };
}]);