angular.module("cpnRepositories")
.factory("couponTurnRateRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "CPN/";
    return {

        getSystemTime: function () {
            return $http.post(area + 'Coupon/GetSystemTime')
        },

        getReportTurnRate: function (data) {
            return $http.post(area + "CouponTurnOverRate_R/GetReportTurnRate", data);
        }

    };
}]);