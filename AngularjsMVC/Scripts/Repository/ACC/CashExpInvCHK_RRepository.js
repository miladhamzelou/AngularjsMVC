angular.module("bacRepositories")
.factory("CashExpInvCHK_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "ACC/CashExpInvCHK_R/";
    return {
        getReportView: function (data) {
            return $http.post(area + 'GetReportView', data);
        }
    };
}]);