angular.module("cpnRepositories")
.factory("couponStatusRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "CPN/";
    return {

        getSystemTime: function () {
            return $http.post(area + 'Coupon/GetSystemTime')
        },

        statusExcel: function (data) {
            location.href = (area + 'CouponStatus/StatusExcel' + '?' + $.param(data));
        },

        getCpnStatus: function () {
            return area + ('CouponStatus/GetCpnStatus')
        },

    };
}]);