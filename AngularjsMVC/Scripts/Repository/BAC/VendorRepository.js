angular.module("bacRepositories")
.factory("VendorRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var vendorUrl = baseUrl + 'BAC/Vendor/';
    return {
        getSystemDate: function () {
            return $http.post(vendorUrl + 'GetSystemDate')
        },
        getList: function () {
            return (vendorUrl + 'GetList');
        },
        getSubVendorTypeList: function () {
            return $http.post(vendorUrl + 'GetSubVendorTypeList');
        },
        getSubVendorTypeDList: function (data) {
            return $http.post(vendorUrl + 'GetSubVendorTypeDList', data);
        },
        getOrderTypeList: function () {
            return $http.post(vendorUrl + 'GetOrderTypeList');
        },
        getAccountingTypeList: function () {
            return $http.post(vendorUrl + 'GetAccountingTypeList');
        },
        getPaymentTypeList: function () {
            return $http.post(vendorUrl + 'GetPaymentTypeList');
        },
        getPaymentAreaList: function () {
            return $http.post(vendorUrl + 'GetPaymentAreaList');
        },
        getReturnTypeList: function () {
            return $http.post(vendorUrl + 'GetReturnTypeList');
        },
        getInvoiceTypeList: function () {
            return $http.post(vendorUrl + 'GetInvoiceTypeList');
        },
        getVendorCATList: function () {
            return $http.post(vendorUrl + 'GetVendorCATList');
        },
        add: function (data) {
            return $http.post(vendorUrl + 'Add', data, { modal: true });
        },
        addSubVendor: function (data) {
            return $http.post(vendorUrl + 'AddSubVendor', data, { modal: true });
        },
        delete: function (data) {
            return $http.post(vendorUrl + 'Delete', data, { modal: true });
        },
        getDetailData: function (data) {
            return $http.post(vendorUrl + 'GetDetailData', data, { modal: true });
        },
        updateVendor: function (data) {
            return $http.post(vendorUrl + 'UpdateVendor', data, { modal: true });
        },
        updateSubVendor: function (data) {
            return $http.post(vendorUrl + 'UpdateSubVendor', data, { modal: true });
        },
        exportExcel: function (data) {
            if (data == undefined) {
                data = {};
            }
            location.href = (vendorUrl + 'ExportExcel' + '?' + $.param(data));
        },
        checkItemHasNoStopSale: function (data) {
            return $http.post(vendorUrl + 'CheckItemHasNoStopSale', data);
        }
    };
}]);