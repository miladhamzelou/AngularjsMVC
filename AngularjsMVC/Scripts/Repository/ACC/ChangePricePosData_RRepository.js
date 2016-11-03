angular.module("accRepositories")
.factory("ChangePricePosData_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaURL = baseUrl + "ACC/ChangePricePosData_R/";
    return {
        GetSummaryReport: function (data) {
            return $http.post(areaURL + 'GetSummaryReport', data);
        },
        GetDetailReport: function (data) {
            return $http.post(areaURL + 'GetDetailReport', data);
        }
    };
}]);