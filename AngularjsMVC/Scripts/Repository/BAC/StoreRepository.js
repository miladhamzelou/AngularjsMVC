angular.module("bacRepositories")
.factory("StoreRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var storeUrl = baseUrl + 'BAC/Store/';
    return {
        getSystemDate: function () {
            return $http.post(storeUrl + 'GetSystemDate')
        },
        getBizTypeList: function () {
            return $http.post(storeUrl + 'GetBizTypeList');
        },
        getStoreTypeList: function () {
            return $http.post(storeUrl + 'GetStoreTypeList');
        },
        getStoreStyleList: function () {
            return $http.post(storeUrl + 'GetStoreStyleList');
        },
        getBizGroupList: function () {
            return $http.post(storeUrl + 'GetBizGroupList');
        },
        getAreaTypeList: function () {
            return $http.post(storeUrl + 'GetAreaTypeList');
        },
        getTaxTypeList: function () {
            return $http.post(storeUrl + 'GetTaxTypeList');
        },
        getInvTypeList: function () {
            return $http.post(storeUrl + 'GetInvTypeList');
        },
        getMallTypeList: function () {
            return $http.post(storeUrl + 'GetMallTypeList');
        },
        getCityList: function () {
            return $http.post(storeUrl + 'GetCityList');
        },
        getTownList: function (data) {
            return $http.post(storeUrl + 'GetTownList', data);
        },
        getQueryResults: function () {
            return (storeUrl + 'GetQueryResults');
        },
        getAllAreaLvFromAreaLv3: function (data) {
            return $http.post(storeUrl + 'GetAllAreaLvFromAreaLv3', data);
        },
        checkIsCloseStore: function (data) {
            return $http.post(storeUrl + 'CheckIsCloseStore', data);
        },
        getMediaIP: function () {
            return $http.post(storeUrl + 'GetMediaIP');
        },
        add: function (data) {
            return $http.post(storeUrl + 'Add', data);
        },
        delete: function (data) {
            return $http.post(storeUrl + 'Delete', data);
        },
        updateStoreDetail: function (data) {
            return $http.post(storeUrl + 'UpdateStoreDetail', data);
        },
        getStoreDetail: function (data) {
            return $http.post(storeUrl + 'GetStoreDetail', data);
        },
        exportExcel: function (data) {
            location.href = (storeUrl + 'ExportExcel' + '?' + $.param(data));
        }
    };
}]);