angular.module("bacRepositories")
.factory("menuRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "BAC/";
    return {
        getList: function () {
            return $http.post(area + 'Menu/GetList');
        },
        getParentList: function () {
            return $http.get(area + 'Menu/GetParentList');
        },
        getUnavailableIdList: function () {
            return $http.get(area + 'Menu/GetUnavailableIdList');
        },
        add: function (data) {
            return $http.post(area + 'Menu/Add', data);
        },
        update: function (data, oldParentNo) {
            return $http.post(area + 'Menu/Update', { data: data, oldParentNo: oldParentNo });
        },
        delete: function (menuNO) {
            return $http.post(area + 'Menu/Delete', { menuNO: menuNO });
        }
    };
}]);