angular.module("bacRepositories")
.factory("PurchaseTot_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areasURL = baseUrl + "ACC/PurchaseTot_R/";
    return {
        getReportView: function (data) {
            return $http.post(areasURL + "GetReportView", data);
        },
        checkisFileExist: function () {
            return $http.post(areasURL + 'CheckisFileExist');
        },
        downloadInstructions: function () {
            location.href = (areasURL + "DownloadInstructions");
        },
    };
}]);