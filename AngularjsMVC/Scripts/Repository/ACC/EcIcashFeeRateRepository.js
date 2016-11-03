angular.module("accRepositories")
.factory("EcIcashFeeRateRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/EcIcashFeeRate/';

    return {
        //查詢
        GetList: function (data) {
            return $http.post(areaUrl + 'GetList', data);
        },
        GetListUrl: function () {
            return (areaUrl + 'GetList');
        },
        GetMaxAcctDate: function () {                  //取得已結帳最大的日期
            return $http.post(areaUrl + 'GetMaxAcctDate');
        },
        Add: function (data) {
            return $http.post(areaUrl + 'Add', data, {modal : true});
        },
        Delete: function (data) {
            return $http.post(areaUrl + 'Delete', data, {modal : true});
        },
        Update: function (data) {
            return $http.post(areaUrl + 'Update', data, {modal : true});
        },
        Export: function (data) {
            location.href = (areaUrl + 'Export' + '?' + $.param(data));
        }
    };
}]);