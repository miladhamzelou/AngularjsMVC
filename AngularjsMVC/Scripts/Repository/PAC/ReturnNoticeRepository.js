angular.module("pacRepositories")
.factory("ReturnNoticeRepository", ["$http", "baseUrl", "loadingService", function ($http, baseUrl, loadingService) {
    var area = baseUrl + "PAC/";

    return {
        getRtnNoticeList: function () {                 //查詢模式-查詢(取得退貨通知主檔指定條件的資料)
            return (area + "ReturnNotice/GetRtnNoticeList");
        },
        getRtnNoticeItemBarcodeList: function () {      //查詢模式-查詢\瀏覽、修改(取得退貨單號所對應的[退貨通知商品條碼明細檔]資料)
            return (area + "ReturnNotice/GetRtnNoticeItemBarcodeList");
        },
        getRtnNoticeStoreList: function () {            //查詢模式-查詢\瀏覽、修改(取得退貨單號所對應的[退貨通知門市明細檔]資料)
            return (area + "ReturnNotice/GetRtnNoticeStoreList");
        },
        getSubVendorList: function () {                 //下拉選單-配送商區分
            return $http.post(area + "ReturnNotice/GetSubVendorList");
        },
        getRtnNoticebyRtnnNo: function (data) {         //查詢模式-查詢\瀏覽、修改(取得退貨通知主檔指定退貨單號的資料)
            return $http.post(area + "ReturnNotice/GetRtnNoticebyRtnnNo", data);
        },
        getRtnNoticeItemList: function (data) {         //查詢模式-查詢\瀏覽、修改(取得退貨單號所對應的[退貨通知商品明細檔]資料)
            return $http.post(area + "ReturnNotice/GetRtnNoticeItemList", data);
        },
        exportExcel: function (data) {                  //瀏覽模式-匯出Excel

            var link = area + "ReturnNotice/Export?";
            var where = $.param(data);

            location.href = encodeURI(link + where);
        },
        alterSave: function (data) {                    //修改模式-存檔(返回查詢)
            return $http.post(area + "ReturnNotice/AlterSave", data, { modal: true });
        },
        copyCreate: function (data) {                   //複製模式-存檔(返回查詢)
            return $http.post(area + "ReturnNotice/CopyCreate", data, { modal: true });
        },
        getRelationColumnInfo: function (rtnNotice, rtnnItemcode, rtnnStoreID, rtnnBarcode) {    //手key模式-取得相關欄位資訊(品號名稱、大分類、配送商)
            return $http.post(area + "ReturnNotice/GetRelationColumnInfo", { rtnNotice: rtnNotice, itemCode: rtnnItemcode, storeID: rtnnStoreID, barcode: rtnnBarcode });
        },
        getRtnnNo: function () {                        //新增模式-取得退貨單號
            return $http.post(area + "ReturnNotice/GetRtnnNo");

        },
        addCreate: function (data) {                    //新增模式-存檔(連續新增)
            return $http.post(area + "ReturnNotice/AddCreate", data, { modal: true });
        },
    };
}]);
