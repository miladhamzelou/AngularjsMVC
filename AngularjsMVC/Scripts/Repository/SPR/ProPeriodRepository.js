angular.module("sprRepositories")
.factory("ProPeriodRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areasURL = baseUrl + "SPR/ProPeriod/";

    return {
        getList: function (dataobj) {
            return $http.post(areasURL + 'GetList', dataobj);
        },
        Add: function (dataobj) {
            return $http.post(areasURL + 'Add', dataobj);
        },
        Delete: function (dataobj) {
            return $http.post(areasURL + 'Delete', dataobj);
        },
        Update: function (dataobj) {
            return $http.post(areasURL + 'Update', dataobj);
        },
        checkExcel: function (data) {
            return $http.post(areasURL + 'CheckExcel', data);
        },
        getExcel: function (data) {
            location.href = (areasURL + "GetExcel" + '?' + $.param(data));
        },
        checkPromotions: function (data) {
            return $http.post(areasURL + 'CheckPromotions', data);
        }
    };
}]);