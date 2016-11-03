angular.module("bacRepositories")
.factory("PosSHCRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "BAC/";
    return {
        saveAdd: function (masterData, detailData) {
            return $http.post(area + 'PosSHC/SaveAdd', { masterData: masterData, detailData: detailData });
        },
        getPosSHCMUrl: function () {
            return (area + 'PosSHC/GetPosSHCMList');
        },
        getPosSHCDList: function (shcType, shcID) {
            return $http.post(area + 'PosSHC/GetPosSHCDList', { shcType: shcType, shcID: shcID });
        },
        delete: function (shcID) {
            return $http.post(area + 'PosSHC/Delete', { shcID: shcID });
        },
        saveUpdate: function (masterData, detailData) {
            return $http.post(area + 'PosSHC/SaveUpdate', { masterData: masterData, detailData: detailData });
        },
        getItemBasic: function (itemCode) {
            return $http.post(area + 'PosSHC/GetItemBasic', { itemCode: itemCode });
        },
    };
}]);