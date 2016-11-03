angular.module("accRepositories")
.factory("PurchaseRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/Purchase/';
    return {
        getList: function () {
            return (areaUrl + 'GetList');
        },
        getDetail: function (data) {
            return $http.post(areaUrl + 'GetDetailList', data);
        },
        Add: function (data) {
            return $http.post(areaUrl + 'Add', data , { modal: true });
        },
        Update: function (data) {
            return $http.post(areaUrl + 'Update', data, { modal: true });
        },
        getItemDetailByBarcode: function (data) {
            return $http.post(areaUrl + 'GetItemDetailByBarcode', data);
        },
        Delete: function (data) {
            return $http.post(areaUrl + 'Delete', data, { modal: true });
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