angular.module("bacRepositories")
.factory("CashInvChange_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areasURL = baseUrl + "ACC/CashInvChange_R/";
    return {
        getReportView: function (data) {
            return $http.post(areasURL + "GetReportView", data);
        },
        chkUserPermission: function () {
            return $http.post(areasURL + 'ChkUserPermission');
        },
        exportCSV: function (data) {
            location.href = areasURL + 'ExportCSV' + '?' + $.param(data);
        },
    };
}]);