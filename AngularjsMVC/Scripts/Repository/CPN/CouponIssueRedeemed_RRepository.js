angular.module("cpnRepositories")
.factory("couponIssueRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "CPN/";
    return {

        getCpnItem: function () {
            return $http.get(area + 'Coupon/GetCpnItem');
        },

        getSystemTime: function () {
            return $http.post(area + 'Coupon/GetSystemTime')
        },

        getReportAll: function (data) {
            return $http.post(area + "CouponIssueRedeemed_R/getReportAll", data);
        }
    };
}]);