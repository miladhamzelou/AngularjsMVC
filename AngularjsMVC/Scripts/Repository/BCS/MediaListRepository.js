angular.module("bcsRepositories")
.factory("MediaListRepository", ["$http", "baseUrl", function ($http, baseUrl)
{
    return {
        GetStorgeList: function ()
        {
            return (baseUrl + 'BCS/MediaList/GetStorgeList');
        },
        GetMaintainList: function ()
        {
            return $http.post(baseUrl + 'BCS/MediaList/GetMaintainList');
        },
        DelMaintainList: function (dataobj)
        {
            return $http.post(baseUrl + 'BCS/MediaList/DelMaintainList', dataobj);
        },
        SaveMaintainList: function (dataobj)
        {
            return $http({
                url: baseUrl + 'BCS/MediaList/SaveMaintainList',
                method: "POST",
                data: dataobj,
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            });
        },
        UploadFile : function(dataobj)
        {
            return $http({
                url: baseUrl + 'BCS/MediaList/UploadFileOnChange',
                method: "POST",
                data: dataobj,
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            });
        },
        GetDeleteList: function ()
        {
            return (baseUrl + 'BCS/MediaList/GetDeleteList');
        },
        GetDownloadList: function ()
        {
            return (baseUrl + 'BCS/MediaList/GetDownloadList');
        },
        ExportStorgeList: function (data)
        {
            location.href = (baseUrl + 'BCS/MediaList/MakeStorgeList' + '?' + $.param(data));
        },
        ExportMaintainList: function (data)
        {
            location.href = (baseUrl + 'BCS/MediaList/MakeMaintainList' + '?' + $.param(data));
        },
        ExportDeleteList: function (data)
        {
            location.href = (baseUrl + 'BCS/MediaList/MakeDeleteList' + '?' + $.param(data));
        },
        ExportDownloadList: function (data)
        {
            location.href = (baseUrl + 'BCS/MediaList/MakeDownloadList' + '?' + $.param(data));
        }
    };
}]);