angular.module("accRepositories")
.factory("ProfitLossRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/ProfitLoss/';
    return {
        getMasterList: function () {
            return (areaUrl + 'GetMasterList');
        },
        getDetailList: function (data) {
            return $http.post(areaUrl + 'GetDetailList', data);
        },
        getUser: function() {
            return $http.post(areaUrl + 'GetUser');
        },
        getPLType: function () {
            return $http.post(areaUrl + 'GetPLType');
        },
        getPLVoucheType: function () {
            return $http.post(areaUrl + 'GetPLVoucheType');
        },
        GetVoucheNo: function () {
            return $http.post(areaUrl + 'GetVoucheNo');
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
        MultiDelete: function (data) {
            return $http.post(areaUrl + 'MultiDelete', data);
        },
        getItemDetailByBarcode: function (data) {
            return $http.post(areaUrl + 'GetItemDetailByBarcode', data);
        },
        Download: function (data) {
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