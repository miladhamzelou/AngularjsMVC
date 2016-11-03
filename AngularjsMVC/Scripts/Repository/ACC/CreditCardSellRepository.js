angular.module("accRepositories")
.factory("CreditCardSellRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/CreditCardSell/';
    return {
        getList: function (data) {
            return $http.post(areaUrl + 'GetList', data);
        },
        getExcel: function (data) {
            location.href = (areaUrl + "getExcel?" + $.param(data));
        },
        strike1: function (data) {
            return $http.post(areaUrl + 'Strike1', data);
        },
        strike2: function (data) {
            return $http.post(areaUrl + 'Strike2', data);
        }
    };
}]);