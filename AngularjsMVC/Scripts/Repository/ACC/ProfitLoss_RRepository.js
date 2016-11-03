angular.module("accRepositories")
.factory("ProfitLoss_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/ProfitLoss_R/';
    return {
        getPLType: function () {
            return $http.post(areaUrl + 'GetPLType');
        },
        getReport: function (data) {
            return $http.post(areaUrl + 'GetReport', data);
        },
    };
}]);