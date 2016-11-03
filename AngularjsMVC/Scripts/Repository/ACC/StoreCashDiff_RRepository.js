angular.module("bacRepositories")
.factory("StoreCashDiff_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areasURL = baseUrl + "ACC/StoreCashDiff_R/";
    return {
        getReportView: function (data) {
            return $http.post(areasURL + "GetReportView", data);
        },
    };
}]);