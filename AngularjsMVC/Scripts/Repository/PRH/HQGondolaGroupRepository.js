angular.module("prhRepositories")
.factory("HQGondolaGroupRepository", ["$http", "baseUrl", "loadingService", function ($http, baseUrl, loadingService) {
    var areaUrl = baseUrl + 'PRH/HQGondolaGroup/';
    return {
        GetHorderTanaGroupList: function () {                                   //取得[主配檯帳群組]查詢紀錄
            return (areaUrl + "GetHorderTanaGroupList");
        },
        GetHorderTanaGroupItemList: function () {                               //取得[主配檯帳群組]查詢細項紀錄
            return (areaUrl + "GetHorderTanaGroupItemList");
        },
        GetHorderTanaGroupByNo: function (horderTanaGroupNo) {                  //取得[主配檯帳群組]查詢細項紀錄
            return $http.post(areaUrl + "GetHorderTanaGroupByNo", horderTanaGroupNo);
        },
        GetTanaNameByNo: function (data) {                                      //取得檯帳名稱
            return $http.post(areaUrl + "GetTanaNameByNo", data);
        },
        Update: function (data) {
            return $http.post(areaUrl + "Update", data, { modal: true });
        },
        Add: function (data) {
            return $http.post(areaUrl + "Add", data, { modal: true });
        },
        AddBatch: function (data) {
            return $http.post(areaUrl + "AddBatch", data, { modal: true });
        },
        Delete: function (data) {
            return $http.post(areaUrl + "Delete", data, { modal: true });
        },
        DeleteBatch: function (horderTanaGroupNo) {
            return $http.post(areaUrl + "DeleteBatch", horderTanaGroupNo, { modal: true });
        },
        ExportAllGroup: function () {    //全部資料轉EXCEL

            var link = areaUrl + "ExportAllGroup";  

            location.href = link ;
        },
        ExportNotGroup: function () {   //未設定群組EXCEL

            var link = areaUrl + "ExportNotGroup";        

            location.href = link ;
        },
        Export: function (data) {

            var link = areaUrl + "Export?";
            var where = "";

            where = $.param(data);

            location.href = link + where;
        }
    };
}]);
