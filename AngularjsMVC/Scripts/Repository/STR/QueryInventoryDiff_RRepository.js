angular.module("bacRepositories")
.factory("QueryInventoryDiff_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "STR/";
    return {
        changeshow: function (data) {
            return $http.post(area + 'QueryInventoryDiff_R/ReportingServer', data);
        }
    };
}]);