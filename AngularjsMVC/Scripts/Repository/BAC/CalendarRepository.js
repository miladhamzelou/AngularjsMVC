angular.module("bacRepositories")
.factory("calendarRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "BAC/";
    return {
        getList: function (data) {
            return $http.post(area + 'Calendar/GetList', data);
        },
        Update: function (data, queryStoreID) {
            return $http.post(area + 'Calendar/Update', { model: data, queryStoreID: queryStoreID });
        }
    };
}]);