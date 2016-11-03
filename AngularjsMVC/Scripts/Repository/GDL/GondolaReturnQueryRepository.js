
angular.module("gdlRepositories")
.factory("GondolaReturnQueryRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl+"GDL/"
    return {
        getList: function () {
            return (area + "GondolaReturnQuery/GetList");
        },
        getManager: function (data) {
            return $http.post(area + "GondolaReturnQuery/GetManager", data);
        },
        downloadExcel: function (data ) {
            var link = "GondolaReturnQuery/DownloadExcel?";
            var where = "";
            if (data) {
                if (data.ReturnReason) {
                    if (where.length != 0) {
                        where += "&";
                    } where += "returnReason=" + data.ReturnReason.trim();
                }
                if (data.CatID ) {
                    if (where.length != 0) {
                        where += "&";
                    }
                    where += "tanaBigClass=" + data.CatID.trim();
                }
                if (data.TanaGroup) {
                    if (where.length != 0) {
                        where += "&";
                    } where += "tanaGroup=" + data.TanaGroup.trim();
                }
                if (data.StoreID) {
                    if (where.length != 0) {
                        where += "&";
                    } where += "storeID=" + data.StoreID.trim();
                }
            }
            location.href = encodeURI(area + link + where);
        },
    };
}]);
