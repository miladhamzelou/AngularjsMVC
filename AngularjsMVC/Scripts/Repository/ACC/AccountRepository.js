angular.module("accRepositories")
.factory("AccountRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/Account/';
    return {
        getList: function () {
            return (areaUrl + 'GetList');
        },
        getActiveFlag: function () {
            return $http.post(areaUrl + 'GetActiveFlag');
        },
        getDCFlag: function () {
            return $http.post(areaUrl + 'GetDCFlag');
        },
        Add: function (data) {
            return $http.post(areaUrl + 'Add', data, { modal: true });
        },
        Update: function (data) {
            return $http.post(areaUrl + 'Update', data, { modal: true });
        },
        Delete: function (data) {
            return $http.post(areaUrl + 'Delete', data, { modal: true });
        },
        Download: function (data) {
            if (data == undefined) {
                data = {};
            }
            location.href = (areaUrl + 'Download' + '?' + $.param(data));
        }
    };
}]);