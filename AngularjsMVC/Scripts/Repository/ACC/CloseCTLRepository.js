angular.module("accRepositories")
.factory("CloseCTLRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areasURL = baseUrl + "ACC/";
    return {
        getDataList: function (data) {
            return $http.post(areasURL + 'CloseCTL/GetDataList', data);
        },
        saveDataList: function (data) {
            return $http.post(areasURL + 'CloseCTL/SaveDataList', data, { modal: true });
        },
        addNewCloseDate: function (data){
            return $http.post(areasURL + 'CloseCTL/AddNewCloseDate', data, { modal: true });
        },
        chkUserPermission: function () {
            return $http.post(areasURL + 'CloseCTL/ChkUserPermission');
        },
        exportExcel: function (data) {
            location.href = areasURL + 'CloseCTL/ExportExcel' + '?' + $.param(data);
        },
    };
}]);