angular.module("bacRepositories")
.factory("cashReportAndInvDiffRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var url = baseUrl + "ACC/";

    return {
        getList: function (data) {
            return $http.post(url + "CashReportAndInvDiff/GetList", data);
        }
    };
}]);