angular.module("cpnRepositories")
.factory("couponMRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "CPN/";
    return {
        ckIssDate: function (data) {
            return $http.post(area + 'Coupon/CkIssDate', data);
        },
        getCpnItem: function () {
            return $http.get(area + 'Coupon/GetCpnItem');
        },
        getMasterList: function () {
            return area + ('Coupon/GetMasterList')
        },
        getReport: function (data) {
            return $http.post(area + 'Coupon/GetReport', data, { modal: true });
        },
        getCpnClass: function () {
            return $http.post(area + 'Coupon/GetCpnClass')
        },
        getDetailPageCouponM: function (data) {
            return $http.post(area + 'Coupon/GetDetailPageCouponM', data, { modal: true })
        },
        getCpnPsample: function (data) {
            return $http.post(area + 'Coupon/GetCpnPsample', data)
        },
        update: function (data) {
            return $http.post(area + 'Coupon/Update', data, {
                modal: true,
                withCredentials: true,
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
        },
        isExitCpnQtyM: function (data) {
            return $http.post(area + 'Coupon/IsExitCpnQtyM', data)
        },
        exportCpnQtyMExcel: function (data) {
            location.href = (area + 'Coupon/ExportCpnQtyMExcel' + '?' + $.param(data))
        },
        setEmgDate: function (data) {
            return $http.post(area + 'Coupon/SetEmgDate', data)
        },
        delete: function (data) {
            return $http.post(area + 'Coupon/Delete', data)
        },
        exportDisExcel: function (data) {
            location.href = (area + 'Coupon/ExportDisExcel' + '?' + $.param(data));
        },
        getSystemTime: function () {
            return $http.post(area + 'Coupon/GetSystemTime')
        },
        excel: function (data) {
            location.href = (area + 'Coupon/Excel' + '?' + $.param(data));
        },
        addCoupon: function (data) {
            return $http.post(area + 'Coupon/AddCoupon', data, {
                modal: true,
                withCredentials: true,
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
        },
        importExcelDataToTemp: function (data) {
            return $http.post(area + 'Coupon/ImportExcelDataToTemp', data, {
                modal: true,
                withCredentials: true,
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
        },
        exportCouQtyTempExcel: function (data) {
            location.href = (area + 'Coupon/ExportCouQtyTempExcel' + '?' + $.param(data));
        }
    };
}]);