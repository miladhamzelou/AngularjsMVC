angular.module("bacRepositories")
.factory("ECAppropriationRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaURL = baseUrl + "ACC/";
    return {
        getReportView: function (data) { 
            return $http.post(areaURL + "ECAppropriation/GetList", data);
        }
    };
}]);