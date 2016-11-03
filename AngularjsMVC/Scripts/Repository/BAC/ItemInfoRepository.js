angular.module("bacRepositories")
.factory("ItemInfoRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var itemUrl = baseUrl + 'BAC/ItemInfo/';
    return {
        getList: function () {
            return (itemUrl + 'GetList');
        },
        getItemTypeList: function () {
            return $http.post(itemUrl + 'GetItemTypeList');
        },
        getSearchRangeList: function () {
            return $http.post(itemUrl + 'GetSearchRangeList');
        },
        getItemAttrList: function () {
            return $http.post(itemUrl + 'GetItemAttrList');
        },
        getChargeTypeList: function () {
            return $http.post(itemUrl + 'GetChargeTypeList');
        },
        getTaxTypeList: function () {
            return $http.post(itemUrl + 'GetTaxTypeList');
        },
        getPosResFlagList: function () {
            return $http.post(itemUrl + 'GetPosResFlagList');
        },
        getSuspenDelFlagList: function () {
            return $http.post(itemUrl + 'GetSuspenDelFlagList');
        },
        getSystemDate: function () {
            return $http.post(itemUrl + 'GetSystemDate')
        },
        getItemDetailGroup: function (data) {
            return $http.post(itemUrl + 'GetItemDetailGroup', { itemCode: data });
        },
        getItemSuspendMList: function () {
            return (itemUrl + 'GetItemSuspendMList');
        },
        getItemSuspendDList: function () {
            return (itemUrl + 'GetItemSuspendDList');
        },
        getSuspenDelFlag: function (data) {
            return $http.post(itemUrl + 'GetSuspenDelFlag', data);
        }
    };
}]);