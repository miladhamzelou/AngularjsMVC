angular.module("accRepositories")
.factory("Scrapped_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/Scrapped_R/';
    return {
        getReport: function (data) {
            return $http.post(areaUrl + 'GetReport', data);
        },
        ExportExcel: function (data) {
            location.href = (areaUrl + 'ExportExcel' + '?' + $.param(data));
        }
    };
}]);