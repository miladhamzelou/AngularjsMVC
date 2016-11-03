angular.module("sifRepositories")
.factory("SCXLSDataImportRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "SIF/";
    return {
        getList: function () {
            return $http.post(area + 'SCXLSDataImport/GetList'); 
        }
    };
}]);