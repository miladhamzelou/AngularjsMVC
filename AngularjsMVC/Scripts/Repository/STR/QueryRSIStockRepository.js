angular.module("strRepositories")
.factory("QueryRSIStockRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaURL = baseUrl + "STR/QueryRsiStock/";
    return {
        GetList: function () {
            return (areaURL + 'GetList');
        },
        GetExcel: function (data) {
            location.href = (areaURL + 'Download?' + data);
        },
        GetItemCodeByBarcode: function (data) {
            return $http.post(areaURL + 'GetItemCodeAndName', data);
        },
    };
}]);