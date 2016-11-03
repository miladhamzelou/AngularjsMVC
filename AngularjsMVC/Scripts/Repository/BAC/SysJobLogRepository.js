angular.module("bacRepositories")
.factory("sysJobLogRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "BAC/";
    return {
        getJobList: function () {
            return $http.post(area + "SysJobLog/GetJobList");
        },
        querySysLog: function (data) {
            return $http.post(area + 'SysJobLog/QuerySysLog', data);
        },
        getUrl: function (data) {
            return (area + 'SysJobLog/GetList');
        },
        exportExcel: function (data) {
            location.href = (area + 'SysJobLog/Export?' + $.param(data));
        }
    };
}]);