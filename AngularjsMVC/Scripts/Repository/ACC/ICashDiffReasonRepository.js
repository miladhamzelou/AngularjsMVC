angular.module("bacRepositories")
.factory("ICashDiffReasonRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl+"ACC/"
    return {
        getList: function () {
            return area + "ICASHDiffReason/GetList";
        },
        getList2: function (data) {
            return $http.post(area + "ICASHDiffReason/GetList", data);
        },
        saveData: function (data) {
            return $http.post(area + "ICASHDiffReason/Add", data
        );
        },
        EditData: function (data) {
            return $http.post(area + "ICASHDiffReason/Edit", data
        );
        },
        delData: function (data) {
            return $http.post(area + "ICASHDiffReason/Delete", data
        );
        },
        DownloadExcel: function (data) {
            var link = "ICASHDiffReason/ExportExcel?";
            var where = "";
            if (data) {
                if (data.ReasonID != null && data.ReasonID.trim().length > 0) {
                    where += "ReasonID=" + data.ReasonID.trim();
                }
                if (data.ReasonNM != null && data.ReasonNM.trim().length > 0) {
                    if (where.length > 0)
                        where += "&";
                    where += "ReasonNM=" + data.ReasonNM.trim();
                }
            }
            location.href = encodeURI(area + link + where);
        },
    };
}]);
