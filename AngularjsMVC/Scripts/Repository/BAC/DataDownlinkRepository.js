angular.module("bacRepositories")
.factory("DataDownlinkRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var url = baseUrl + "BAC/";
    return {
        InitMainPage: function () {
            return $http.post(url + "DataDownlink/InitMainPage");
        },
        getList: function () {
            return url + "DataDownlink/GetMasSchedule";
        },
        getScheduleByStore: function () {
            return url + "DataDownlink/GetScheduleByStore";
        },
        getScheduleByMaster: function () {
            return url + "DataDownlink/GetScheduleByMaster";
        },
        getMaster: function () {
            return $http.post(url + "DataDownlink/GetMaster");
        },
        setupMasterDown: function (data) {
            return $http.post(url + "DataDownlink/SetupMasterDown", data);
        },
        urgentSetupMasterDown: function () {
            return $http.post(url + "DataDownlink/UrgentSetupMasterDown");
        },
        CheckTempStatus: function () {
            return $http.post(url + "DataDownlink/CheckTempStatus");
        },
        CheckVNStore: function (data) {
            return $http.post(url + "DataDownlink/CheckVNStore", { storeId: data });
        },
    };
}]);