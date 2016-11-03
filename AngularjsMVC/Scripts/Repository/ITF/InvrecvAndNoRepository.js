angular.module("bacRepositories")
.factory("invrecvAndNoRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var url = baseUrl + "ITF/";

    return {
        initSelectList: function () {
            return $http.post(url + "InvrecvAndNo/InitSelectList");
        },
        getList: function (data) {
            return url + "InvrecvAndNo/Query";
        },
    };
}]);