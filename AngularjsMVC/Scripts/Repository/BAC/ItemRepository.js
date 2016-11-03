angular.module("bacRepositories")
.factory("ItemRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var itemUrl = baseUrl + 'BAC/Item/';
    return {
        getList: function () {
            return (itemUrl + 'GetList');
        },
        getCatList: function () {
            return $http.post(itemUrl + 'GetCatList');
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
        getCatListFromCat3: function (data) {
            return $http.post(itemUrl + 'GetCatListFromCat3', data)
        },
        isExistItemCode: function (data) {
            return $http.post(itemUrl + 'IsExistItemCode', data);
        },
        add: function (data) {
            return $http.post(itemUrl + 'Add', data, {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                modal: true
            });
        },
        delete: function (data) {
            return $http.post(itemUrl + 'Delete', { itemCode: data }, { modal: true });
        },
        updateItemBasic: function (data) {
            return $http.post(itemUrl + 'UpdateItemBasic', data, { modal: true });
        },
        updateItemBarcode: function (data) {
            return $http.post(itemUrl + 'UpdateItemBarcode', data, { modal: true });
        },
        updateItemSellOrder: function (data) {
            return $http.post(itemUrl + 'UpdateItemSellOrder', data, { modal: true });
        },
        updateItemPrice: function (data) {
            return $http.post(itemUrl + 'UpdateItemPrice', data, { modal: true });
        },
        updateItemStorePrice: function (data) {
            return $http.post(itemUrl + 'UpdateItemStorePrice', data, { modal: true });
        },
        updateItemdec: function (data) {
            return $http.post(itemUrl + 'UpdateItemdec', data, {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                modal: true
            });
        },
        getItemDetailGroup: function (data) {
            return $http.post(itemUrl + 'GetItemDetailGroup', { itemCode: data }, { modal: true });
        },
        getItemSuspendMList: function (data) {
            return $http.post(itemUrl + 'GetItemSuspendMList', data);
        },
        getItemSuspendDList: function (data) {
            return $http.post(itemUrl + 'GetItemSuspendDList', data);
        },
        getItemSuspendByQuerySuspendDate: function (data) {
            return $http.post(itemUrl + 'GetItemSuspendByQuerySuspendDate', data);
        },
        queryItemDeletedList: function () {
            return (itemUrl + "QueryItemDeletedList");
        },
        exportExcel: function (data) {
            location.href = (itemUrl + 'ExportExcel' + '?' + $.param(data));
        }
    };
}]);