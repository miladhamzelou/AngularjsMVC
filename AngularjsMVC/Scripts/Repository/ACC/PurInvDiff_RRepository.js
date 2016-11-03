angular.module("accRepositories")
.factory("PurInvDiff_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/PurInvDiff_R/';
    return {
        getReport: function (data) {
            return $http.post(areaUrl + 'GetReport', data);
        }
    };
}]);