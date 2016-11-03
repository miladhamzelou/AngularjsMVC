angular.module("accRepositories")
.factory("CertificateOfSales_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/CertificateOfSales_R/';
    return {
        getReport: function (data) {
            return $http.post(areaUrl + 'GetReport', data);
        }
    };
}]);