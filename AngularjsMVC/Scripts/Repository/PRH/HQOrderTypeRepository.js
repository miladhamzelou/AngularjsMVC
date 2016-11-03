angular.module("prhRepositories")
.factory("HQOrderTypeRepository", ["$http", "baseUrl", "loadingService", function ($http, baseUrl, loadingService) {
    var areaUrl = baseUrl + 'PRH/HQOrderType/';
    return {
        GetHorderProcessList: function () {                                    //取得[主配類型]查詢紀錄
            return (areaUrl + "GetHorderProcessList");
        },
        GetHorderProcessItem: function (data) {                                //取得[主配類型]單筆查詢紀錄
            return $http.post(areaUrl + "GetHorderProcessList", data);
        },
        Update: function (data) {
            return $http.post(areaUrl + "Update", data, { modal: true });
        },
        Delete: function (data) {
            return $http.post(areaUrl + "Delete", data, { modal: true });
        },
        Add: function (data) {
            return $http.post(areaUrl + "Add", data, { modal: true });
        },
        Export: function () {
            location.href = (areaUrl + 'Export');
        }
    };
}]);
