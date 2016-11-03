angular.module("accRepositories")
.factory("RemittanceRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var areaUrl = baseUrl + 'ACC/Remittance/';
    return {
        getList: function (data) {
            return $http.post(areaUrl + 'GetList', data);
        },
        Download: function (data) {
            location.href = (areaUrl + 'Download' + '?' + $.param(data));
        },
        Update: function (data) {
            return $http.post(areaUrl + 'Update', data, {modal : true});
        },
        Delete: function (data) {
            return $http.post(areaUrl + 'Delete', data);
        },
        Import: function (data) {
            return $http.post(areaUrl + 'Import', data, {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                
            });
        }
    };
}]);