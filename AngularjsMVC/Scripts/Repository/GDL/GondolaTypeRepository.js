angular.module("gdlRepositories")
.factory("GondolaTypeRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl+"GDL/"
    return {
        getList: function () {
            return (area + "GondolaType/GetList");
        },
        saveData: function (data) {
            return $http.post(area + "GondolaType/Add", data);
        },
        editData: function (data) {
            return $http.post(area + "GondolaType/Edit", data);
        },
        delData: function (data) {
            return $http.post(area + "GondolaType/Delete", data);
        },
        checkDate: function (data) {
            return $http.post(area + "GondolaType/CheckDate", data);
        },
        downloadExcel: function (data) {
            var link = "GondolaType/ExportExcel?";
            var where = "";
            if (data) {
                if (data.TanaClassNo) {
                    where += "tanaClassNo=" + data.TanaClassNo.trim();
                }
                if (data.TanaClassName) {
                    if (where.length > 0)
                        where += "&";
                    where += "tanaClassName=" + data.TanaClassName.trim();
                }
                if (data.DataDate) {
                    if (where.length > 0)
                        where += "&";
                    where += "dataDate=" + data.DataDate.trim();
                } else {
                    if (where.length > 0)
                        where += "&";
                    where += "dataDate=01/01/0001";
                }
            } else {
                where += "dataDate=01/01/0001";

            }
            location.href = encodeURI(area + link + where);
        },
    };
}]);
