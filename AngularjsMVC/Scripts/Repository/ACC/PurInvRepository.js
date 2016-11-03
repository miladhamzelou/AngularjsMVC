angular.module("bacRepositories")
.factory("purInvRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var url = baseUrl + "ACC/";
    return {
        GetByCloseDate: function (data) {
            return $http.post(url + "PurInv/GetByCloseDate", data);
        },
        getDetail: function (data) {
            return $http.post(url + "PurInv/GetDetail", data);
        },
        CheckInvNoExist: function (data) {
            return $http.post(url + "PurInv/CheckInvNoExist", data);
        },
        getParam: function () {
            return $http.post(url + 'PurInv/GetParam');
        },
        getInvTrack: function (dataobj) {
            return $http.post(url + 'PurInv/GetInvTracks', dataobj);
        },
        getTax: function (dataobj) {
            return $http.post(url + 'PurInv/GetTax', dataobj);
        },
        addPurinv: function (data) {
            return $http.post(url + 'PurInv/AddPurinv', data);
        },
        chkInvDisExist: function (data) {
            return $http.post(url + 'PurInv/CheckInvDisExist', data);
        },
        updatePurInv: function (data) {
            return $http.post(url + 'PurInv/UpdatePurInv', data);
        },
        ExportExcelByCloseDate: function (data) {
            location.href = (url + "PurInv/ExportExcelByCloseDate?" + $.param(data));
        },
        ExportExcelByAccDate: function (data) {
            location.href = (url + "PurInv/ExportExcelByAccDate?" + $.param(data));
        }
    };
}]);