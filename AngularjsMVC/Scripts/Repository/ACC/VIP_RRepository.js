angular.module("accRepositories")
.factory("VIP_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/VIP_R/';
    return {
        getReport: function (data) {
            return $http.post(areaUrl + 'GetReport', data);
        },
        checkisFileExist: function () {
            return $http.post(areaUrl + 'CheckisFileExist');
        },
        getFormula: function () {
            location.href = (areaUrl + 'getFormula');
        },
    };
}]);