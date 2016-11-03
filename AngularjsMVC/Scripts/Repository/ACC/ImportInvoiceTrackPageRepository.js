angular.module("accRepositories")
.factory("ImportInvoiceTrackPageRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/ImportInvoiceTrackPage/';
    return {
        getList: function () {
            return (areaUrl + 'GetList');
        },
        Delete: function (data) {
            return $http.post(areaUrl + 'Delete', data);
        },
        Download: function (data) {
            if (data == undefined) {
                data = {};
            }
            location.href = (areaUrl + 'Download' + '?' + $.param(data));
        },
        Import: function (data) {
            return $http.post(areaUrl + 'Import', data, {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,

            });
        }
    };
}]);