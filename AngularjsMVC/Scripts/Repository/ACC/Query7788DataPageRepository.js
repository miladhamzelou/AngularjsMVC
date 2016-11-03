angular.module("bacRepositories")
.factory("Query7788DataPageRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var url = baseUrl + "ACC/Query7788DataPage/";

    return {
        getList: function (data) {
            return $http.post(url + "GetList" , data);
        },
        getDetailList: function(data){
            return $http.post(url + "GetDetailList", data);
        },
        getMasterExcel: function (data) {
            location.href = (url + 'GetMasterExcel' + '?' + $.param(data));
        },
        getDetailExcel: function (data) {
            location.href = (url + 'GetDetailExcel' + '?' + $.param(data));
        }
    };
}]);