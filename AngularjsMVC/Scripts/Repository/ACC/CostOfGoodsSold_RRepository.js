angular.module("accRepositories")
.factory("CostOfGoodsSold_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/CostOfGoodsSold_R/';
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
        getSCMandRSI: function (data) {
            return $http.post(areaUrl + 'GetSCMandRSI', data);
        }
    };
}]);