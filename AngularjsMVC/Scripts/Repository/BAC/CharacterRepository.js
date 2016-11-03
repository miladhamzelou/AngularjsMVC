angular.module("bacRepositories")
.factory("CharacterRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "BAC/";
    return {
        getList: function (ChType) {
            return $http.post(area + 'Character/GetList', ChType);
        },
        Add: function (data) {
            return $http.post(area + 'Character/Add', data);
        },
        Update: function (data) {
            return $http.post(area + 'Character/Update', data);
        },
        Delete: function (data) {
            return $http.post(area + 'Character/Delete', data);
        },
        getMasterList: function () {
            return $http.post(area + 'Character/GetMasterList');
        },
        getMasterUrl: function () {
            return (area + 'Character/GetMasterList');
        },
        getUrl: function () {
            return (area + 'Character/GetList');
        },
    };
}]);