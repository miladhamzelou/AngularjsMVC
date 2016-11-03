angular.module("strRepositories")
.factory("QueryStoreStockRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'STR/QueryStoreStock/';
    return {
        getDeliverStatus: function () {
            return $http.post(areaUrl + 'GetDeliverStatus');
        },
        getSaleStatus: function () {
            return $http.post(areaUrl + 'GetSaleStatus');
        },
        getProductGroups: function () {
            return $http.post(areaUrl + 'GetProductGroups');
        },
        getItemCodeByBarcode: function (data) {
            return $http.post(areaUrl + 'GetItemCodeAndName', data);
        },
        loadSummaryPage: function (data) {
            return $http.post(areaUrl + 'Summary', data);
        },
        loadDetailPage: function (data) {
            return $http.post(areaUrl + 'Detail', data);
        },

        // Query Summary ==================================================================
        //Query Summary Report Master Table By Date/Date Range
        PSTRQuerySSDaySM: function () {
            return areaUrl + 'PSTRQuerySSDaySM';
        },

        //Query Summary Report Master Table By Month
        PSTRQuerySSMonthSM: function () {
            return areaUrl + "PSTRQuerySSMonthSM";
        },

        //Query Summary Report Detail Table By Month or Date/Date Range
        PSTRQuerySSMonthSDOrDaySD: function () {
            return areaUrl + "PSTRQuerySSMonthSDOrDaySD";
        },

        //Export Summary Report Master Table By Date/Date Range
        ExportPSTRQuerySSDaySM: function (data) {
            location.href = (areaUrl + "ExportPSTRQuerySSDaySM" + '?' + data);
        },
        //Export Summary Report Master Table By Month
        ExportPSTRQuerySSMonthSM: function (data) {
            location.href = (areaUrl + "ExportPSTRQuerySSMonthSM" + '?' + data);
        },
        //Export Summary Report Detail Table By Month
        ExportPSTRQuerySSMonthSD: function (data) {
            location.href = (areaUrl + "ExportPSTRQuerySSMonthSD" + '?' + data);
        },
        //Export Summary Report Detail Table By Date/Date Range
        ExportPSTRQuerySSDaySD: function (data) {
            location.href = (areaUrl + "ExportPSTRQuerySSDaySD" + '?' + data);
        },

        //Detail Report =================================================

        //Query Detail Report Master Table By Date/Date Range
        PSTRQuerySSDayDM: function () {
            return areaUrl + "PSTRQuerySSDayDM";
        },

        //Query Detail Report Master Table By Month
        PSTRQuerySSMonthDM: function (data) {
            return areaUrl + "PSTRQuerySSMonthDM";
        },

        //Query Detail Report Detail Table By Month or Date/Date Range
        PSTRQuerySSDayDDOrMonthDD: function () {
            return areaUrl + "PSTRQuerySSDayDDOrMonthDD";
        },

        ExportPSTRQuerySSMonthDM: function (data) {
            location.href = (areaUrl + "ExportPSTRQuerySSMonthDM" + '?' + data);
        },
        ExportPSTRQuerySSDayDM: function (data) {
            location.href = (areaUrl + "ExportPSTRQuerySSDayDM" + '?' + data);
        },

        ExportPSTRQuerySSMonthDD: function (data) {
            location.href = (areaUrl + "ExportPSTRQuerySSMonthDD" + '?' + data);
        },

        ExportPSTRQuerySSDayDD: function (data) {
            location.href = (areaUrl + "ExportPSTRQuerySSDayDD" + '?' + data);
        },
    };
}]);