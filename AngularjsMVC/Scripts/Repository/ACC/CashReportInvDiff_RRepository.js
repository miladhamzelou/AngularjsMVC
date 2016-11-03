angular.module("accRepositories")
.factory("CashReportInvDiff_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/CashReportInvDiff_R/';
    return {
        getReport: function (data) {
            return $http.post(areaUrl + 'GetReport', data);
        }
    };
}]);