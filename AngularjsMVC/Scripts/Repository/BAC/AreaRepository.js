angular.module("bacRepositories")
.factory("areaRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "BAC/";
    return {
        getUrl: function (data) {
            return (area + 'Area/GetList');
        },
        getParentList: function (dataobj) {
            return $http.post(area + "Area/GetParentList", dataobj);
        },
        Add: function (dataobj) {
            return $http.post(area + 'Area/Add', dataobj);
        },
        Delete: function (dataobj) {
            return $http.post(area + 'Area/Delete', dataobj);
        },
        Update: function (dataobj) {
            return $http.post(area + 'Area/Update', dataobj);
        },
        exportExcel: function (data) {
            location.href = (area + 'Area/Export?' + $.param(data));
        },
    };
}]);