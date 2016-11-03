angular.module("bacRepositories")
.factory("IcashAppropriationRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/IcashAppropriation/';
    return {
        getReport: function (data) {
            return $http.post(areaUrl + 'GetReport', data);
        },
    };
}]);