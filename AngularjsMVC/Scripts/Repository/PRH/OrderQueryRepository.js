angular.module("prhRepositories")
.factory("OrderQueryRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "PRH/OrderQuery/";
    return {
        GetOrderQueryList: function () {
            return (area + "GetOrderQueryList");
        },
        GetOrderQueryDetail: function () {
            return (area + "GetOrderQueryDetail");
        },
        GetUserData: function () {
            return $http.post(area + "GetUserData");
        },
        Export: function (data) {
            location.href = (area + 'Export' + '?' + $.param(data));
        }
    };
}]);

