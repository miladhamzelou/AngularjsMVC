angular.module("strRepositories")
.factory("QueryMerchandisingRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areasURL = baseUrl + "STR/QueryMerchandisingTurnover/";
    return {
        //搜尋報表
        getList: function () {
            return (areasURL + 'GetList');
        },

        //前往連結 (browser 直接連結 excel 網址) 匯出Excel
        getExcel: function (data) {
            location.href = (areasURL + 'Download?' + data);
        },

        //取得 重點商品群組
        getItemGroup: function () {
            return $http.post(areasURL + 'GetItemGroupList');
        },
        
        //使用 Barcode 查詢品號
        getItemCodeByBarcode: function (data) {
            return $http.post(areasURL + 'GetItemCodeAndName', data);
        }
    };
}]);