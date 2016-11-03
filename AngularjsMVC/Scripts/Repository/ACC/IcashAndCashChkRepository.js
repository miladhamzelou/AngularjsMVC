angular.module("accRepositories")
.factory("IcashAndCashChkRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areas = baseUrl + 'ACC/';

    return {
        getReport: function (model) {
            return $http.post(areas + 'IcashAndCashChk/ReportingServer', { model });
        }
    };
}]);