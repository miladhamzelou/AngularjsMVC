angular.module("pacRepositories")
.factory("ReturnQueryRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "PAC/ReturnQuery/";
    return {
        GetRtnQueryList: function () {
            return (area + "GetRtnQueryList");
        },
        GetRtnQueryDetail: function () {
            return (area + "GetRtnQueryDetail");
        },
        GetUserData: function () {
            return $http.post(area + "GetUserData");
        },
        Export: function (data) {
            location.href = (area + 'Export' + '?' + $.param(data));
        }
    };
}]);

