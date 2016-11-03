angular.module("accRepositories")
.factory("Purchase_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/Purchase_R/';
    return {
        getPLType: function () {
            return $http.post(areaUrl + 'GetPLType');
        },
        getReport: function (data) {
            return $http.post(areaUrl + 'GetReport', data);
        },
        ExportExcel: function (data) {
            location.href = (areaUrl + 'ExportExcel' + '?' + $.param(data));
        }
    };
}]);