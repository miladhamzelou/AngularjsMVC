angular.module("accRepositories")
.factory("CashExpInvRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    return {
        getList: function (dataobj) {
            return $http.post(baseUrl + 'ACC/CashExpInv/GetList', dataobj);
        },
        save: function (dataobj) {
            return $http.post(baseUrl + 'ACC/CashExpInv/Save', dataobj);
        },
        getParam: function () {
            return $http.post(baseUrl + 'ACC/CashExpInv/GetParam');
        },
        getInvTrack: function (dataobj) {
            return $http.post(baseUrl + 'ACC/CashExpInv/GetInvTracks', dataobj);
        },
        getTax: function (dataobj) {
            return $http.post(baseUrl + 'ACC/CashExpInv/GetTax', dataobj);
        },
        chkCloseCTL: function (dataobj) {
            return $http.post(baseUrl + 'ACC/CashExpInv/ChkCloseCTL', dataobj);
        },
        ExportExcel: function (data) {
            location.href = (baseUrl + 'ACC/CashExpInv/ExportExcel' + '?' + $.param(data));
        },
    };
}]);