
angular.module("gdlRepositories")
.factory("GondolaItemCSVRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl+"GDL/"
    return {
        getSearchStoreListdata: function (data) {
            return $http.post(area + "GondolaItemCSV/GetSearchStoreListdata", data);
        },
        getSearchListdata: function (data) {
            return $http.post(area + "GondolaItemCSV/GetSearchListdata", data);
        },
        
        saveData: function (data) {
            return $http.post(area + "GondolaItemCSV/Add", data);
        },
        editData: function (data,deleteData, maintainTab,deleteTanaGroup) {
            return $http.post(area + "GondolaItemCSV/Edit", { data: data, deleteData: deleteData, maintainTab: maintainTab, deleteTanaGroup: deleteTanaGroup });
        },
        delData: function (data) {
            return $http.post(area + "GondolaItemCSV/Delete", data);
        },
        exportCSV: function (data,dataEnd) {
            var link = "GondolaItemCSV/TestExportCsv?";
            var where = "";
            location.href = encodeURI(area + link + where);

        },
    };
}]);
