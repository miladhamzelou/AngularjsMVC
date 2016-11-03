angular.module("accRepositories")
.factory("DailyCashRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/DailyCash/';
    return {
        getList: function (data) {
            return $http.post(areaUrl + 'GetList', data);
        },
        getType: function (chType) {
            return $http.post(areaUrl + 'GetType', chType);
        },
        getTax: function (date) {
            return $http.post(areaUrl + 'GetTax', date);
        },
        getInv_Fortax: function (data) {
            return $http.post(areaUrl + 'GetInv_Fortax', data);
        },
        getStoreData: function (data) {
            return $http.post(areaUrl + 'GetStoreData', data);
        },
        saveData: function (data) {
            return $http.post(areaUrl + 'SaveData', data, { modal: true });
        },
        saveInv_Fortax: function (data) {
            return $http.post(areaUrl + 'SaveDetail', data, { modal: true });
        },
        Download: function (data) {
            location.href = (areaUrl + 'Download' + '?' + $.param(data));
        },
        CheckCloseCTL: function (data) {
            return $http.post(areaUrl + 'CheckCloseCTL', data);
        },
    };
}]);