angular.module("commonRepositories")
.factory("dialogRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    return {
        queryVNStore: function (data) {
            return $http.post(baseUrl + "Dialog/QueryVNStore", data);
        },
        queryStoreWithDate: function (dataStart, dataEnd) {
            return $http.post(baseUrl + "Dialog/QueryStoreWithDate", { modelStart: dataStart, modelEnd: dataEnd });
        },
        queryStoreByUserBM: function (data) {
            return $http.post(baseUrl + "Dialog/QueryStoreByUserBM", data);
        },
        queryArea: function (data) {
            return $http.post(baseUrl + "Dialog/QueryArea", data);
        },
        queryArea2: function (data) {
            return $http.post(baseUrl + "Dialog/QueryArea2", data);
        },
        queryArea3: function (data) {
            return $http.post(baseUrl + "Dialog/QueryArea3", data);
        },
        queryBrand: function (data) {
            return $http.post(baseUrl + "Dialog/QueryBrand", data);
        },
        queryTeam: function (data) {
            return $http.post(baseUrl + "Dialog/QueryTeam", data);
        },
        queryCategory: function (data) {
            return $http.post(baseUrl + "Dialog/QueryCategory", data);
        },
        queryCategoryAll: function (data) {
            return $http.post(baseUrl + "Dialog/QueryCategoryAll", data);
        },
        queryCategory2: function (data) {
            return $http.post(baseUrl + "Dialog/QueryCategory2", data);
        },
        queryCategory2Full: function (data) {
            return $http.post(baseUrl + "Dialog/QueryCategory2full", data);
        },
        queryCategory3: function (data) {
            return $http.post(baseUrl + "Dialog/QueryCategory3", data);
        },
        queryFirm: function (data) {
            return $http.post(baseUrl + "Dialog/QueryFirm", data);
        },
        queryItemUnit: function (data) {
            return $http.post(baseUrl + "Dialog/QueryItemUnit", data);
        },
        queryAccount: function (data) {
            return $http.post(baseUrl + "Dialog/QueryAccount", data);
        },
        queryProduct: function () {
            return baseUrl + "Dialog/QueryProduct";
        },
        queryProductList: function () {
            return baseUrl + "Dialog/QueryProduct";
        },
        queryVnProduct: function (data) {
            return $http.post(baseUrl + "Dialog/QueryVnProduct", data);
        },
        queryProPeriod: function (data) {
            return $http.post(baseUrl + "Dialog/QueryProPeriod", data);
        },
        queryUser: function (data) {
            return $http.post(baseUrl + "Dialog/QueryUser", data);
        },
        queryVendor: function (data) {
            return $http.post(baseUrl + "Dialog/QueryVendor", data);
        },
        queryVoucher: function (data) {
            return $http.post(baseUrl + "Dialog/QueryVoucher");
        },
        queryIcfc: function () {
            return $http.post(baseUrl + "Dialog/QueryIcfc");
        },
        querySubVendor: function (data) {
            return $http.post(baseUrl + "Dialog/QuerySubVendor", data);
        },
        querySubVendorInDC: function (data) {
            return $http.post(baseUrl + "Dialog/QuerySubVendorInDC", data);
        },
        queryRealSubVendor: function (data) {
            return $http.post(baseUrl + "Dialog/QueryRealSubVendor", data);
        },
        queryVNFSubVendor: function (data) {
            return $http.post(baseUrl + "Dialog/QueryVNFSubVendor", data);
        },
        queryTanaTmp: function (data) {
            return $http.post(baseUrl + "Dialog/QueryTanaTmp", data);
        },
        queryHorderTanaGroup: function (data) {
            return $http.post(baseUrl + "Dialog/QueryHorderTanaGroup", data);
        },
        queryIcfa: function () {
            return $http.post(baseUrl + "Dialog/QueryIcfa");
        },
        queryECFeeChk: function () {
            return $http.post(baseUrl + "Dialog/QueryECFeeChk");
        },
        queryCategory2WithParent: function () {
            return $http.post(baseUrl + "Dialog/QueryCategory2WithParent");
        },
        queryDiffReason: function (data) {
            return $http.post(baseUrl + "Dialog/QueryDiffReason", data);
        },
        queryTanaGroup: function (data) {
            return $http.post(baseUrl + "Dialog/QueryTanaGroup", data);
        },
        queryTanaList: function (data, data2) {
            return $http.post(baseUrl + "Dialog/QueryTanaList", { model: data, model2: data2 });
        },
        queryTanaStoreCopy: function (dataStart, dataEnd) {
            return $http.post(baseUrl + "Dialog/QueryTanaStoreCopy", { modelStart: dataStart, modelEnd: dataEnd });
        },
        queryTanaStore: function (data) {
            return $http.post(baseUrl + "Dialog/QueryTanaStore", { storeID: data });
        },
        queryTanaStoreForStore: function (data) {
            return $http.post(baseUrl + "Dialog/QueryTanaStoreForStore", data);
        },
        queryHorderType: function (data) {
            return $http.post(baseUrl + "Dialog/QueryHorderType", data);
        },
        queryItembyBarcode: function (data) {
            return $http.post(baseUrl + "Dialog/QueryItembyBarcode", data);
        },
        queryPosSubject: function (data) {
            return $http.post(baseUrl + "Dialog/QueryPOSSubject", data);
        },
        queryAdjustReason: function (data) {
            return $http.post(baseUrl + "Dialog/QueryAdjustReason", data);
        },
        queryZipcode: function (data) {
            return $http.post(baseUrl + "Dialog/QueryZipcode", data);
        },
        queryMasterDown: function (data) {
            return $http.post(baseUrl + "Dialog/QueryMasterDown", data);
        },
        queryCoupon: function (data) {
            return $http.post(baseUrl + "Dialog/QueryCoupon", data);
        },
        getCouponList: function (data) {
            return $http.post(baseUrl + "Dialog/GetCouponList", data);
        },
        getCpnHisList: function () {
            return (baseUrl + 'Dialog/GetCpnHisList');
        },
        getCouponHisExcel: function (data) {
            location.href = ('Dialog/GetCouponHisExcel' + '?' + $.param(data));
        },
        queryDailyCashStore: function (data) {
            return $http.post(baseUrl + "Dialog/QueryDailyCashStore", data);
        },
        queryBank: function (data) {
            return $http.post(baseUrl + "Dialog/QueryBank", data);
        },
        queryTeams: function () {
            return $http.post(baseUrl + "Dialog/QueryTeams");
        },
        queryAreas: function (data) {
            return $http.post(baseUrl + "Dialog/QueryAreas", data, { disableLoading: true });
        },
        queryStores: function (data) {
            return $http.post(baseUrl + "Dialog/QueryStores", data, { disableLoading: true });
        },
        searchStores: function (data) {
            return $http.post(baseUrl + "Dialog/SearchStores", data, { disableLoading: true });
        },
        queryBarcodeList: function (data) {
            return $http.post(baseUrl + "Dialog/QueryBarcodeList", data, { disableLoading: true });
        },
        getCategoryLv1: function () {
            return $http.post(baseUrl + "Dialog/GetCategoryLv1", { disableLoading: true });
        },
        getCategoryLv2: function (data) {
            return $http.post(baseUrl + "Dialog/GetCategoryLv2", data, { disableLoading: true });
        },
        getCategoryLv3: function (data) {
            return $http.post(baseUrl + "Dialog/GetCategoryLv3", data, { disableLoading: true });
        },
        searchCategory: function (data) {
            return $http.post(baseUrl + "Dialog/SearchCategory", data, { disableLoading: true });
        },
        searchCategoryLv1: function (data) {
            return $http.post(baseUrl + "Dialog/SearchCategoryLv1", data, { disableLoading: true });
        },
        searchCategoryLv1andLv2: function (data) {
            return $http.post(baseUrl + "Dialog/SearchCategoryLv1andLv2", data, { disableLoading: true });
        },
        getBarcodeItemcodeList: function (data){
            return $http.post(baseUrl + "Dialog/GetBarcodeItemcodeList", data);
        },
        querySubVendorByDate: function (data) {
            return $http.post(baseUrl + "Dialog/GetSubVendorByDate", data);
        },
        queryProMMAll: function (data) {
            return $http.post(baseUrl + "Dialog/QueryProMMAll", data);
        },
        queryProStairAll: function (data) {
            return $http.post(baseUrl + "Dialog/QueryProStairAll", data);
        },
        queryProDetails: function (data) {
            return $http.post(baseUrl + "Dialog/QueryProDetails", data);
        },
        queryProMHistory: function (data) {
            return $http.post(baseUrl + "Dialog/QueryProMHistory", data);
        },
        queryProMasterHistory: function (data) {
            return $http.post(baseUrl + "Dialog/QueryProMasterHistory", data);
        },
        queryEcfaDate: function () {
            return $http.post(baseUrl + "Dialog/QueryEcfaDate");
        },
        queryCanTranStore: function (data) {
            return $http.post(baseUrl + "Dialog/QueryCanTranStore", data);
        },
        querySubVendorHistory: function () {
            return (baseUrl + 'Dialog/QuerySubVendorHistory');
        },
        //TODO: 以下已列管，如需更改請洽昇峰
        queryStore: function (data) {
            return $http.post(baseUrl + "Dialog/QueryStore", data);
        },
        queryCharacterAll: function (data) {
            return $http.post(baseUrl + "Dialog/QueryCharacterAll", data);
        },
        queryTana: function (data) {
            return $http.post(baseUrl + "Dialog/QueryTana", data);
        },
        querytanaClass: function (data) {
            return $http.post(baseUrl + "Dialog/QueryTanaClass", data);
        },
        queryStoreCalStore: function (data) {
            return $http.post(baseUrl + "Dialog/QueryStoreCalStore", data);
        },
    };
}]);