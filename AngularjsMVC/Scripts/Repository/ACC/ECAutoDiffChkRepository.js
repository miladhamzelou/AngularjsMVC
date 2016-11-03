angular.module("bacRepositories")
.factory("ecautoDiffChkRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var url = baseUrl + "ACC/";

    return {
        getList: function () {
            return url + "ECAutoDiffChk/Query";
        },
        saveData: function (data) {
            return $http.post(url + "ECAutoDiffChk/Save",data);
        },
        outputExcel: function (data) {
            var json = "{";
            json += '"StartDate":"' + data.StartDate + '",';
            json += '"EndDate":"' + data.EndDate + '",';
            json += '"StartStoreId":"' + data.StartStoreId + '",';
            json += '"EndStoreId":"' + data.EndStoreId + '"';
            json += "}";
            
            location.href = (url + "ECAutoDiffChk/OutputExcel?jsonStr=" + json);
        }
    };
}]);