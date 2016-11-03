angular.module("accRepositories")
.factory("OutPutInvExportRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/OutPutInvExport/';
    return {
        exportTXT: function (data) {
            location.href = areaUrl + 'ExportTXT' + '?' + $.param(data);
        }
    };
}]);