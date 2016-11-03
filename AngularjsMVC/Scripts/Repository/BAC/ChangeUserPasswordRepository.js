angular.module("bacRepositories")
.factory("ChangeUserPasswordRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "BAC/";
    return {
        save: function (data) {
            return $http.post(area  + 'ChangeUserPassword/save', data);
        }
    };
}]);