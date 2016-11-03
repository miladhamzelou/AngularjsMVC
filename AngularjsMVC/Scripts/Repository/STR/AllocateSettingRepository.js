angular.module("bacRepositories")
.factory("AllocateSettingRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "STR/AllocateSetting/";
    return {
        GetAllocateSetting: function (data) {
            return $http.post(area + 'GetAllocateSettingByFromStoreID', data);
        },
        GetStoreCloseDate: function (data) {
            return $http.post(area + 'GetStoreCloseDate', data);
        },
        save: function (data) {
            return $http.post(area + 'save', data);
        },
        getListLine: function () {
            return area + 'GetList';
        },
        deleteAllocateSetting: function (data) {
            return $http.post(area + 'Delete', data);
        },
        outputExcel: function (data) {
            link = "Download?"

            var json = "{";
            json += '"storeIDFrom":"' + data.storeIDFrom + '",';
            json += '"startDateCls":"' + data.startDateCls + '",';
            json += '"endDateCls":"' + data.endDateCls + '",';
            json += '"startDateExec":"' + data.startDateExec + '",';
            json += '"endDateExec":"' + data.endDateExec + '"';
            json += "}";

            location.href = (area + "Download?jsonStr=" + json);
        }
    };
}]);