angular.module("accRepositories")
.factory("IDO_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/IDO_R/';
    return {
        getReport: function (data) {
            return $http.post(areaUrl + 'GetReport', data);
        },
        checkExcel: function (data) {
            return $http.post(areaUrl + 'CheckExcel', data);
        },
        getExcel: function (data) {
            location.href = (areaUrl + "GetExcel" + '?' + $.param(data));
        }
    };
}]);