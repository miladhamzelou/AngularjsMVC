angular.module("accRepositories")
.factory("ScrappedRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var AreaBaseURL = baseUrl + "ACC/Scrapped/";
    return {
        queryMasterList: function () {
            return AreaBaseURL + "GetList";
        },
        getExcel: function (data) {
            location.href = (AreaBaseURL + "GetExcel" + '?' + $.param(data));
        },
        queryDetail: function (data) {
            return $http.post(AreaBaseURL + 'GetDetail', data);
        },
        addScarpped: function (data) {
            return $http.post(AreaBaseURL + 'AddScarpped', data, { modal: true });
        },
        deleteScarpped: function (data) {
            return $http.post(AreaBaseURL + 'DeleteScarpped', data, { modal: true });
        },
        updateScarpped: function (data) {
            return $http.post(AreaBaseURL + 'UpdateScarpped', data, { modal: true });
        },
        getItemDetailByBarcode: function (data) {
            return $http.post(AreaBaseURL + 'GetItemDetailByBarcode', data);
        },
        Import: function (data) {
            return $http.post(AreaBaseURL + 'Import', data, {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                modal: true
            });
        },
    };
}]);