angular.module("bcsRepositories")
.factory("BroadcastRepository", ["$http", "baseUrl", function ($http, baseUrl)
{
    return {        
        GetItemAll: function ()
        {
            return (baseUrl + 'BCS/Broadcast/GetItemAll');
        },
        GetItemDetail: function ()
        {
            return (baseUrl + 'BCS/Broadcast/GetItemDetail');
        },
        GetDept: function ()
        {
            return $http.post(baseUrl + 'BCS/Broadcast/GetDept');
        },
        GetUnitTypes: function ()
        {
            return $http.post(baseUrl + 'BCS/Broadcast/GetUnitTypes');
        }
        ,
        ExportExcel: function (data) {
            location.href = (baseUrl + 'BCS/Broadcast/MakeExcel' + '?' + $.param(data));
        }
    };
}]);