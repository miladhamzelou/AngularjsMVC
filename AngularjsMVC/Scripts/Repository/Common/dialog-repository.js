angular.module("commonRepositories")
.factory("dialogRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    return {
        queryArea: function (data) {
            return $http.post(baseUrl + "Dialog/QueryArea", data);
        },
        queryStore: function (data) {
            return $http.post(baseUrl + "Dialog/QueryStore", data);
        }     
    };
}]);