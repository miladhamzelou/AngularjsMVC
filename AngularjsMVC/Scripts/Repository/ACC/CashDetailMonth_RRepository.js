angular.module("bacRepositories")
.factory("CashDetailMonth_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areasURL = baseUrl + "ACC/CashDetailMonth_R/";
    return {
        getReportView: function (data) {
            return $http.post(areasURL + "GetReportView", data);
        },
        getStoreIDByBmType: function (data) {
            return $http.post(areasURL + "GetStoreIDByBmType", data);
        },
    };
}]);