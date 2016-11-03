angular.module("sprRepositories").factory("PromotionRepository", [
    "$http",
    "baseUrl"
, function (
    $http,
    baseUrl
) {

    var areaUrl = baseUrl + "SPR/Promotion/";

    /**
     * 同步(Synchronous)載入資料
     * 注意! 一旦資料量大時，使用同步載入會導致畫面卡住。
     **/
    var getDataBySync = function (url, defaultValue) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send(null);
        if (xhr.status === 200) {
            return xhr.responseText;
        } else {
            return defaultValue;
        }
    };

    return {
        createPromotion: function (data) {
            return $http.post(areaUrl + "CreatePromotion", data);
        },
        updatePromotion: function (data) {
            return $http.post(areaUrl + "UpdatePromotion", data);
        },
        deletePromotion: function(data) {
            return $http.post(areaUrl + "DeletePromotion", data);
        },
        getPromotionsUrl: function () {
            return areaUrl + "GetPromotions";
        },
        getProDetailsHistoryUrl: function (data) {
            return areaUrl + "GetProDetailsHistory";
        },
        getEffStoreName: function (data) {
            return $http.post(areaUrl + "GetEffStore", data);
        },
        getProStores: function (data) {
            return $http.post(areaUrl + "GetProStores", data);
        },
        getPromotion: function (data) {
            return $http.post(areaUrl + "GetPromotion", data);
        },
        getMainPromotionsForCopy: function (data) {
            return $http.post(areaUrl + "GetMainPromotionsForCopy", data);
        },
        getMainPromotionsByCondition: function (data) {
            return $http.post(areaUrl + "GetMainPromotionsByCondition", data);
        },
        getPromotionsWithSameEffStore: function (data) {
            return $http.post(areaUrl + "GetPromotionsWithSameEffStore", data);
        },
        getItemPrice: function (data) {
            return $http.post(areaUrl + "GetItemPrice", data);
        },
        getCagetoryByID: function (data) {
            return $http.post(areaUrl + "GetCagetoryByID", data);
        },
        getSystemDate: function () {
            //同步載入目前系統日期 (不使用非同步, 避免系統日期尚未取得就需使用到)
            var date = getDataBySync(areaUrl + "GetSystemDate", new Date());
            if (typeof date === "string" && !isNullOrWhiteSpace(date)) {
                date = new Date(date);
            }
            return date;
        },
        getSystemDateTime: function () {
            return $http.get(areaUrl + "GetSystemDateTime");
        },
        checkItemsWithPriorityFlag: function (data) {
            return $http.post(areaUrl + "CheckItemsWithPriorityFlag", data);
        },
        checkProStores: function (data) {
            return $http.post(areaUrl + "CheckProStores", data);
        },
        checkProItems: function (data) {
            return $http.post(areaUrl + "CheckProItems", data);
        },
        exportFile: function (data) {
            location.href = (areaUrl + 'ExportFile' + '?' + $.param(data));
        },
        isMemberListPromotionExist: function (data) {
            return $http.post(areaUrl + "IsMemberListPromotionExist", data);
        }
    };
}]);