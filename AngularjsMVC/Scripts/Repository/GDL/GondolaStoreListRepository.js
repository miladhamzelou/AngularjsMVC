
angular.module("gdlRepositories")
.factory("GondolaStoreListRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl+"GDL/"
    return {
        getList: function () {
            return (area + "GondolaStoreList/GetList");
        },
        saveData: function (data) {
            return $http.post(area + "GondolaStoreList/Add", data);
        },
        editData: function (data,deleteData, maintainTab,deleteTanaGroup) {
            return $http.post(area + "GondolaStoreList/Edit", { data: data, deleteData: deleteData, maintainTab: maintainTab, deleteTanaGroup: deleteTanaGroup });
        },
        delData: function (data) {
            return $http.post(area + "GondolaStoreList/Delete", data);
        },
        downloadTanaExcel: function (data,dataEnd) {
            var link = "GondolaStoreList/TanaExcel?";
            var where = "";
            if (data) {
                if (data.TanaNo ) {
                    if (where.length > 0)
                        where += "&";
                    where += "tanaNo=" + data.TanaNo.trim();
                }
                if (data.TanaBigClass) {
                    if (where.length > 0)
                        where += "&";
                    where += "tanaBigClass=" + data.TanaBigClass.trim();
                }
                if (data.TanaGroup ) {
                    if (where.length > 0)
                        where += "&";
                    where += "tanaGroup=" + data.TanaGroup.trim();
                }
                if (data.DataDate) {
                    if (where.length > 0)
                        where += "&";
                    where += "dataDate=" + data.DataDate.trim();
                } else {
                    if (where.length > 0)
                        where += "&";
                    where += "dataDate=01/01/0001" ;
                }
            }
            if (dataEnd) {
                if (dataEnd.TanaNo) {
                    if (where.length > 0)
                        where += "&";
                    where += "tanaNoEnd=" + dataEnd.TanaNo.trim();
                }
                
            }
            location.href = encodeURI(area + link + where);
        },
        downloadStoreExcel: function (data,dataEnd) {
            var link = "GondolaStoreList/StoreExcel?";
            var where = "";
            if (data) {
                if (data.TanaNo) {
                    if (where.length > 0)
                        where += "&";
                    where += "tanaNo=" + data.TanaNo.trim();
                }
                if (data.TanaBigClass) {
                    if (where.length > 0)
                        where += "&";
                    where += "tanaBigClass=" + data.TanaBigClass.trim();
                }
                if (data.TanaGroup) {
                    if (where.length > 0)
                        where += "&";
                    where += "tanaGroup=" + data.TanaGroup.trim();
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
            }
            if (dataEnd) {
                if (dataEnd.TanaNo) {
                    if (where.length > 0)
                        where += "&";
                    where += "tanaNoEnd=" + dataEnd.TanaNo.trim();
                }

            }
            location.href = encodeURI(area + link + where);
        },
        downloadExcelinner: function (data, dataEnd) {
            var link = "GondolaStoreList/Excelinner?";
            var where = "";
            if (data) {
                if (data.TanaBigClass) {
                    if (where.length > 0)
                        where += "&";
                    where += "tanaBigClass=" + data.TanaBigClass.trim();
                }
                if (data.TanaGroup) {
                    if (where.length > 0)
                        where += "&";
                    where += "tanaGroup=" + data.TanaGroup.trim();
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
            if (dataEnd) {
                if (dataEnd ) {
                    if (where.length > 0)
                        where += "&";
                    where += "tanaNo=" + dataEnd.trim();
                }
                if (dataEnd) {
                    if (where.length > 0)
                        where += "&";
                    where += "tanaNoEnd=" + dataEnd.trim();
                }

            }
            location.href = encodeURI(area + link + where);
        },
    };
}]);
