angular.module("bacRepositories")
.factory("categoryRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "BAC/";
    return {
        getList: function (data) {
            return $http.post(area + 'Category/GetList', data);
        },
        Add: function (data) {
            return $http.post(area + 'Category/Add', data);
        },
        Update: function (data) {
            return $http.post(area + 'Category/Update', data);
        },
        Delete: function (data) {
            return $http.post(area + 'Category/Delete', data);
        },
        exportExcel: function (data) {
            location.href = (area + 'Category/Export?' + $.param(data));
        },
        getCategory2List: function (data) {
            return $http.post(area + 'Category/GetCategory2List', data);
        },
        getCategory3List: function (data, catID1) {
            return $http.post(area + 'Category/GetCategory3List', { cate: data, catID1: catID1 });
        },
        AddCate2: function (data) {
            return $http.post(area + 'Category/AddCate2', data);
        },
        UpdateCate2: function (data) {
            return $http.post(area + 'Category/UpdateCate2', data);
        },
        UpdateCate3: function (data) {
            return $http.post(area + 'Category/UpdateCate3', data);
        },
        AddCate3: function (data) {
            return $http.post(area + 'Category/AddCate3', data);
        },
        getTeamTreeList: function () {
            return $http.post(area + 'Category/GetTeamTreeList');
        },
        getUrl: function (data) {
            return (area + 'Category/GetList');
        },
        getCategory2Url: function (data) {
            return (area + 'Category/GetCategory2List');
        },
        getCategory3Url: function (data) {
            return (area + 'Category/GetCategory3List');
        },
    };
}]);