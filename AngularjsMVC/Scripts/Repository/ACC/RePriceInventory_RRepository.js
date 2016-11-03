angular.module("accRepositories")
.factory("RePriceInventory_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/RePriceInventory_R/';
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
        getStoreIDByBmType: function (data) {
            return $http.post(areaUrl + "GetStoreIDByBmType", data);
        },
    };
}]);