angular.module("bacRepositories")
.factory("CreditCardTot_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areasURL = baseUrl + "ACC/CreditCardTot_R/";
    return {
        getReportView: function (data) {
            return $http.post(areasURL + "GetReportView", data);
        },
    };
}]);