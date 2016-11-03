angular.module("sifRepositories")
.factory("screportPromotionItem_RRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var url = baseUrl + "SIF/SCReportPromotionItem_R/";

    return {
        getList: function (data) {
            return $http.post(url + "GetList", data, { modal: true });
        },
        initSelectList: function () {
            return $http.post(url + "InitSelectList");
        },
        getStoreIDByBmType: function (queryParams) {
            return $http.post(url + 'GetStoreIDByBmType', queryParams, { disableLoading: true });
        },
    };
}]);