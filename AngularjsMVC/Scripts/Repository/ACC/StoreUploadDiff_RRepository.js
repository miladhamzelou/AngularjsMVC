angular.module("accRepositories")
.factory("StoreUploadDiff_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/StoreUploadDiff_R/';
    return {
        getReport: function (data) {
            return $http.post(areaUrl + 'GetReport', data);
        }
    };
}]);