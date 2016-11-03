angular.module("accRepositories")
.factory("ECFeeChkRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/ECFeeChk/';
    return {
        getEcfcList: function (data) {
            return $http.post(areaUrl + 'GetEcfcList', data);
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