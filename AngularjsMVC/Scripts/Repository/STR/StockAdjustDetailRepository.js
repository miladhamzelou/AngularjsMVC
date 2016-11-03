angular.module("strRepositories")
.factory("StockAdjustDetailRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'STR/StockAdjustDetail/';
    return {
        getReport: function (data) {
            return $http.post(areaUrl + 'ReportingServer', data);
        }
    };
}]);