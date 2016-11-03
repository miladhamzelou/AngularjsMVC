angular.module("gdlRepositories")
.factory("GondolaItemList2Repository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "GDL/GondolaItemList2/";
    return {
        getMasterList: function () {
            return (area + "GetMasterList");
        },
        chkUserPermission: function () {
            return $http.post(area + 'ChkUserPermission');
        },
        exportGDLDayExcel: function () {
            location.href = area + 'ExportGDLDayExcel';
        },
        deleteTana: function (data) {
            return $http.post(area + 'DeleteTana', data);
        },
        loadFullItemPic: function (data) {
            return $http.post(area + 'LoadFullItmCode', data);
        },
        loadFullItemPicPath: function () {
            return area + 'LoadFullItmCode';
        },
        exportTanaExcel: function (data) {
            location.href = area + 'ExportTanaExcel' + '?' + $.param(data);
        },
        getTanaDetail: function (data) {
            return $http.post(area + 'GetTanaDetail', data);
        },
        getItemList: function () {
            return area + 'GetItemList';
        },
        setTanaGroup: function (data) {
            return $http.post(area + 'SetTanaGroup', data);
        },
    };
}]);
