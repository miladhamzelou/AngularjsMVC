angular.module("accRepositories")
.factory("IDORepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/IDO/';
    return {
        getList: function () {
            return (areaUrl + 'GetList');
        },
        getExcel: function (data) {
            location.href = (areaUrl + "GetExcel" + '?' + $.param(data));
        },
        getDetail: function (data) {
            return $http.post(areaUrl + 'GetDetailList', data);
        },
        getgetVoucheType: function (data) {
            return $http.post(areaUrl + 'GetVoucheType', data);
        },
        getUser: function () {
            return $http.post(baseUrl + 'ACC/ProfitLoss/GetUser');
        },
        getItemDetailByBarcode: function (data) {
            return $http.post(areaUrl + 'GetItemDetailByBarcode', data);
        },
        Add: function (data) {
            return $http.post(areaUrl + 'Add', data);
        },
        Update: function (data) {
            return $http.post(areaUrl + 'Update', data);
        },
        Delete: function (data) {
            return $http.post(areaUrl + 'Delete', data);
        },
        Download: function (data) {
            location.href = (areaUrl + 'Download' + '?' + $.param(data));
        },
        Import: function (data) {
            return $http.post(areaUrl + 'Import', data, {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                modal: true
            });
        }
    };
}]);