angular.module("bacRepositories")
.factory("SCStoreDeviceRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "BAC/";
    return {
        getList: function (data) {
            return $http.post(area + 'SCStoreDevice/GetList', data);
        },
        getIPList: function (chtype) {
            return $http.post(area + "SCStoreDevice/GetIPList", { chtype: chtype });
        },
        getSCStoreDeviceD: function (model, chtype) {
            return $http.post(area + "SCStoreDevice/GetSCStoreDeviceD", { model: model, chtype: chtype });
        },
        save: function (masterData, detailData, futureDeviceDateS) {
            return $http.post(area + 'SCStoreDevice/Save', { masterData: masterData, detailData: detailData, futureDeviceDateS: futureDeviceDateS });
        },
        exportExcel: function (data) {
            location.href = (area + 'SCStoreDevice/Export?' + $.param(data));
        },
        delete: function (data) {
            return $http.post(area + 'SCStoreDevice/Delete', { storeID: data });
        },
    };
}]);