angular.module("bacRepositories")
.factory("ItemGroupRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "BAC/";
    return {
        saveAdd: function (masterData, detailData) {
            return $http.post(area + 'ItemGroup/SaveAdd', { masterData: masterData, detailData: detailData },{ modal: true });
        },
        getItemGroupMList: function (model) {
            return $http.post(area + 'ItemGroup/GetItemGroupMList', model);
        },
        getItemGroupDList: function (itemGpID) {
            return $http.post(area + 'ItemGroup/GetItemGroupDList', { itemGpID: itemGpID });
        },
        delete: function (itemGpID) {
            return $http.post(area + 'ItemGroup/Delete', { itemGpID: itemGpID });
        },
        saveUpdate: function (masterData, detailData) {
            return $http.post(area + 'ItemGroup/SaveUpdate', { masterData: masterData, detailData: detailData });
        }
    };
}]);