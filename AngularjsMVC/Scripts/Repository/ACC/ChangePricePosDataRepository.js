angular.module("accRepositories")
.factory("ChangePricePosDataRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaURL = baseUrl + "ACC/ChangePricePosData/";
    return {
        queryAbnormal: function (data) {
            return areaURL + 'GetAbnormal';
        },
        queryVoucher: function (data) {
            return $http.post(areaURL + 'GetVoucher', data);
        },
        getAbnormalExcel: function (data) {
            location.href = (areaURL + "GetAbnormalExcel" + '?' + $.param(data));
        },
        getToVoucheExcel: function (data) {
            location.href = (areaURL + "GetToVoucheExcel" + '?' + $.param(data));
        },
        executeAbnormal: function (data) {
            return $http.post(areaURL + 'ExecuteAbnormalRegister', data);
        },
        executeVoucher: function (data) {
            return $http.post(areaURL + 'ExecuteVoucherRegister', data);
        }
    };
}]);