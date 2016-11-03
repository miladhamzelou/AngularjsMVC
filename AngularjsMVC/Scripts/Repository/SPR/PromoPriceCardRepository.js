angular.module("bacRepositories")
.factory("PromoPriceCardRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "SPR/";
    return {
        export: function (tanaDate) {
            return $http.post(area + "PromoPriceCard/Export", { tanaDate: tanaDate });
        }
    };
}]);