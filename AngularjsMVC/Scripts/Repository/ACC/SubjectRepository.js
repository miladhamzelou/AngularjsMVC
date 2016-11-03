angular.module("accRepositories")
.factory("subjectRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "ACC/";
    return {
        GetList: function (data)    {
            return area + 'Subject/GetList';
        },

        Add: function (data)    {
            return $http.post(area + 'Subject/Add', data);
        },
        Update: function (data) {
            return $http.post(area + 'Subject/Update', data);
        },
        Delete: function (data) {
            return $http.post(area + 'Subject/Delete', data);
        },
        GetAccountsAndPosSubject: function (data) {
            return $http.get(area + 'Subject/GetAccountsAndPosSubject');
        },
        GetPosSubject: function (data)  {
            return $http.get(area + 'Subject/GetPosSubject');
        },
        Download: function (data)   {
            return $http.get(area + 'Subject/Download?', data);
        },
        chkUserPermission: function () {
            return $http.post(area + 'Subject/ChkUserPermission');
        },
    };
}]);