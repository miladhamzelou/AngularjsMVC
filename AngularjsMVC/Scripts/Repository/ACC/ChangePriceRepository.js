angular.module("accRepositories")
.factory("ChangePriceRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areasURL = baseUrl + "ACC/ChangePrice/";
    return {
        getMasterList: function () {
            return (areasURL + 'GetMasterList');
        },
        exportExcel: function (data) {
            location.href = areasURL + 'ExportExcel' + '?' + $.param(data);
        },
        deleteMasterSelectedList: function (data) {
            return $http.post(areasURL + 'DeleteMasterSelectedList', data, { modal: true });
        },
        getDetailList: function (data) {
            return $http.post(areasURL + 'GetDetailList', data);
        },
        getItemDetailByBarcode: function (data) {
            return $http.post(areasURL + 'GetItemDetailByBarcode', data);
        },
        saveMDChange: function (data) {
            return $http.post(areasURL + 'SaveMDChange', data, { modal: true });
        },
        getCPReason: function () {
            return $http.post(areasURL + 'GetCPReason');
        },
        chkUserPermission: function () {
            return $http.post(areasURL + 'ChkUserPermission');
        },
        Import: function (data) {
            return $http.post(areasURL + 'Import', data, {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                modal: true
            });
        },
    };
}]);