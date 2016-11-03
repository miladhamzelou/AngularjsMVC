angular.module("accRepositories")
.factory("MonthDataExportRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/MonthDataExport/';
    return {
        getList: function (data) {
            return $http.post(areaUrl + 'GetList', data);
        },
        execute: function (data) {
            return $http.post(areaUrl + 'Execute', data);
        },
        delNasFileByExpDate: function () {
            return $http.post(areaUrl + 'DelNasFileByExpDate');
        },
        checkDownloadFile: function (data) {
            return $http.post(areaUrl + 'checkDownloadFile', data);
        },
        download: function (data) {
            if (data == undefined) {
                data = {};
            }
            return location.href = (areaUrl + 'Download' + '?' + 'serials=' + data);
        }
    };
}]);