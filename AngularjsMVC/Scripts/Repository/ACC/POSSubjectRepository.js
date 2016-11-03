angular.module("bacRepositories")
.factory("POSSubjectRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "ACC/";
    return {
        getListLine: function () {
            return area + 'POSSubject/GetList';
        },
        Add: function (data) {
            return $http.post(area + 'POSSubject/Add', data);
        },
        Update: function (data) {
            return $http.post(area + 'POSSubject/Update', data);
        },
        Delete: function (data) {
            return $http.post(area + 'POSSubject/Delete', data);
        },
        chkUserPermission: function () {
            return $http.post(area + 'POSSubject/ChkUserPermission');
        },
    };
}]);