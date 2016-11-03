angular.module("accRepositories")
.factory("IcashAutoFeeChkRepository ", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + "ACC/IcashAutoFeeChk/";

    return {
        getIcfaList: function (data) {
            return $http.post(areaUrl + 'GetIcfaList', data);
        },
        getTxlogAllList: function () {
            return (areaUrl + 'GetTxlogAllList');
        },
        getTxlogStoreList: function () {
            return (areaUrl + 'GetTxlogStoreList');
        },
        getTxlogDetailList: function () {
            return (areaUrl + 'GetTxlogDetailList');
        },
        doCheckout: function (data) {
            return $http.post(areaUrl + 'DoCheckout', data);
        },
        download: function (data) {
            location.href = (areaUrl + 'Download' + '?' + $.param(data));
        }
    };
}]);