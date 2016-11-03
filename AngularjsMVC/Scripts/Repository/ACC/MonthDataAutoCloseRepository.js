angular.module("bacRepositories")
.factory("MonthDataAutoCloseRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areasURL = baseUrl + "ACC/MonthDataAutoClose/";
    return {
        getViewInfo: function () {
            return $http.post(areasURL + "GetViewInfo");
        },
        runMonthClose: function (data) {
            return $http.post(areasURL + "RunMonthClose", data, { modal: true });
        },
        rollbackMonthClose: function (data) {
            return $http.post(areasURL + "RollbackMonthClose", data, { modal: true });
        },
    };
}]);