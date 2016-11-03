angular.module("bacRepositories")
.factory("versionRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "BAC/";
    return {
        getList: function (data) {
            return $http.post(area + 'Version/GetList', data);
        },
        getEquipList: function () {
            return $http.get(area + "Version/GetEquipList");
        },
        excel: function (data) {
            location.href = (area + 'Version/Excel' + '?' + $.param(data));
        },
        getListLine: function () {
            return (area + 'Version/GetList');
        }
    };
}]);