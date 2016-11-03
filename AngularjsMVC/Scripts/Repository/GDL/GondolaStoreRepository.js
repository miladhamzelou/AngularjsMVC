
angular.module("gdlRepositories")
.factory("GondolaStoreRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "GDL/"
    var serialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                //str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                var value = (obj[p] == undefined && obj[p] == null) ? '' : obj[p];
                str.push(p + "=" + value);
            }
        return str.join("&");
    };
    return {
        getList: function () {
            return (area + "GondolaStore/GetList");
        },
        saveData: function (data,deleteData, maintainTab ) {
            return $http.post(area + "GondolaStore/Add", { data: data, deleteData: deleteData, maintainTab: maintainTab }, { modal: true });
        },
        editData: function (data, deleteData, maintainTab, oldData) {
            return $http.post(area + "GondolaStore/Edit", { data: data, deleteData: deleteData, maintainTab: maintainTab, oldData: oldData }, { modal: true });
        },
        delData: function (data) {
            return $http.post(area + "GondolaStore/Delete", data, { modal: true });
        },
        checkData: function (data) {
            return $http.post(area + "GondolaStore/CheckDate", data);
        },
        getTanaNameByNo: function (data) {
            return $http.post(area + "GondolaStore/GetTanaNameByNo", data);
        },
        getStoreNameById: function (data) {
            return $http.post(area + "GondolaStore/GetStoreNameById", data);
        },

        getQueryItemsDetail: function (data) {
            return $http.post(area + "GondolaStore/GetQueryItemsDetail",  data);
        },
        getDeleteList: function (data) {
            return $http.post(area + "GondolaStore/GetDeleteList", data);
        },
        checkInnerData: function (data,type) {
            return $http.post(area + "GondolaStore/CheckInnerData", { data: data, maintainTab:type });
        },
        getTanaNoFromGroupByTanaNo: function (data) {
            return $http.post(area + "GondolaStore/GetTanaNoFromGroupByTanaNo", { tanaNo: data });
        },
        
        downloadExcel: function (data) {
            var link = "GondolaStore/ExportExcel?";
            var where = "";
            if (data ) {
                where += serialize(data);
            } else {
                where += "dataDate=01/01/0001";

            }
            location.href = encodeURI(area + link + where);
        },
        downloadExcelinner: function (data) {
            var link = "GondolaStore/ExportExcelInner?";
            var where = "";
            if (data ) {
                //if (data.TanaNo ) {
                //    where += "tanaNo=" + data.TanaNo.trim();
                //}
                //if (data.StoreID ) {
                //    if (where.length > 0)
                //        where += "&";
                //    where += "storeID=" + data.StoreID.trim();
                //}
                //if (data.TanaStoreSdate ) {
                //    if (where.length > 0)
                //        where += "&";
                //    where += "tanaStoreSdate=" + data.TanaStoreSdate.trim();
                //}
                //if (data.TanaStoreEdate ) {
                //    if (where.length > 0)
                //        where += "&";
                //    where += "tanaStoreEdate=" + data.TanaStoreEdate.trim();
                //}
                //if (data.maintainTab) {
                //    if (where.length > 0)
                //        where += "&";
                //    where += "maintainTab=" + data.maintainTab.trim();
                //}
                where = serialize(data);
            }
            location.href = encodeURI(area + link + where);
        },

        downloadExcelDeleteinner: function (data) {
            var link = "GondolaStore/ExportExcelDeleteInner?";
            var where = "";
            //if (data) {
            //    if (data.StoreID) {
            //        if (where.length > 0)
            //            where += "&";
            //        where += "storeID=" + data.StoreID.trim();
            //    }
            //    if (data.TanaStoreSdate) {
            //        if (where.length > 0)
            //            where += "&";
            //        where += "tanaStoreSdate=" + data.TanaStoreSdate.trim();
            //    }
            //    if (data.TanaStoreEdate) {
            //        if (where.length > 0)
            //            where += "&";
            //        where += "tanaStoreEdate=" + data.TanaStoreEdate.trim();
            //    }
                
            //}
            where = serialize(data);
            location.href = encodeURI(area + link + where);
        },
    };
}]);
