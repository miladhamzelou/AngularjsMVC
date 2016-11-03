angular.module("bacRepositories")
.factory("ECStoresTranRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaURL = baseUrl + "ACC/ECStoresTran/";
    return {
        getReportView: function (data) { 
            return $http.post(areaURL + "GetList", data);
        },
        downloadExcel: function (data) {
            location.href = (areaURL + "DownloadExcel" + '?' + $.param(data));
        }
    };
}]);