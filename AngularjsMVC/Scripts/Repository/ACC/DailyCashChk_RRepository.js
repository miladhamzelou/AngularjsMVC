angular.module("accRepositories")
.factory("DailyCashChk_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/DailyCashChk_R/';
    return {
        getReport: function (data) {
            return $http.post(areaUrl + 'GetReport', data);
        }
    };
}]);