angular.module("accRepositories")
.factory("CertificateOfSalesRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/CertificateOfSales/';
    return {
        getPLType: function () {
            return $http.post(areaUrl + '');
        },
        Add: function (data) {
            return $http.post(areaUrl + 'Add', data);
        },
        Delete: function (data) {
            return $http.post(areaUrl + 'Delete', data);
        },
        Update: function (data) {
            return $http.post(areaUrl + 'Update', data);
        },
        GetInvDisList: function (data) {
            return $http.post(areaUrl + 'GetInvDisList', data);
        },
        checkExcel: function (data) {
            return $http.post(areaUrl + 'CheckExcel', data);
        },
        getExcel: function (data) {
            location.href = (areaUrl + "GetExcel" + '?' + $.param(data));
        },
        GetInvDisDList: function (data) {
            return $http.post(areaUrl + 'GetInvDisDList', data);
        },
        getFinVendorList: function (data) {
            return $http.post(areaUrl + 'GetFinVendorList', data);
        },
        GetPurInv: function (data) {
            return $http.post(areaUrl + 'GetPurInv', data);
        },
        GetType: function (chType) {
            return $http.post(areaUrl + 'GetType', chType);
        }
    };
}]);