angular.module("bacRepositories")
.factory("ECAndCashChk_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaURL = baseUrl + "ACC/";
    return {
        getReportView: function (data) { 
            return $http.post(areaURL + "ECAndCashChk_R/GetList", data);
        }
    };
}]);