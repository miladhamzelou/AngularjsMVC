angular.module("bacRepositories")
.factory("queryStoreDepositCashPage_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var url = baseUrl + "ACC/";

    return {
        getList: function () {
            return url + "QueryStoreDepositCashPage_R/Query";
        },
        initSelectList: function () {
            return $http.post(url + "QueryStoreDepositCashPage_R/InitSelectList");
        },
        outputExcel: function (data) {
            var json = "{";
            json += '"StartDate":"' + data.StartDate + '",';
            json += '"EndDate":"' + data.EndDate + '",';
            json += '"CheckType":"' + data.CheckType + '",';
            json += '"OutCash":"' + data.OutCash + '"';
            json += "}";
            
            location.href = (url + "QueryStoreDepositCashPage_R/OutputExcel?jsonStr=" + json);
        }
    };
}]);