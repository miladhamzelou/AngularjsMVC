angular.module("accRepositories")
.factory("IcashDiffChkRepository", ["$http", "baseUrl", function ($http, baseUrl)
{
    return {       
        GetListUrl: function ()
        {
            return (baseUrl + 'ACC/IcashDiffChk/GetList');
        },        
        Update: function (dataobj) {
            return $http.post(baseUrl + 'ACC/IcashDiffChk/Update', dataobj);
        },
        ExportExcel: function (data) {
            location.href = (baseUrl + 'ACC/IcashDiffChk/MakeExcel' + '?' + $.param(data));
        }
    };
}]);