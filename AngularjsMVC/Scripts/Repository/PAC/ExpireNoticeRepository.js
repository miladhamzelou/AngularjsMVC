angular.module("pacRepositories")
.factory("ExpireNoticeRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "PAC/";
    return {
        getExpireNoticeItemList: function (data) {             //取得[退貨通知商品明細檔]查詢紀錄
            return $http.post(area + "ExpireNotice/GetExpireNoticeItemList", data);
        },
        exportExcel: function (data ,array) {
            var link = "ExpireNotice/ExportExcel?";
            
            var where = "";
            if(array.length>0){
                where += "itemcode=";
                var q="";
                for (i = 0; i < array.length; ++i) {
                    if (i != 0) { q += ",";}
                    q += array[i];
                }
                where += q;
                where += "";
            }
            location.href = encodeURI(area + link + where);
        },
    };
}]);