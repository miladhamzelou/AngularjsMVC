angular.module("bacRepositories").factory("DeliveryRangeRepository", [
    "$http",
    "baseUrl"
, function (
    $http,
    baseUrl
) {
    var deliveryRangeUrl = baseUrl + "BAC/DeliveryRange/";
    return {
        getSystemDate: function () {
            return $http.post(deliveryRangeUrl + "GetSystemDate");
        },
        getSubVendorList: function () {
            return $http.post(deliveryRangeUrl + "GetSubVendorList");
        },
        getDeliveryRangeListURL: function () {
            return (deliveryRangeUrl + "GetDeliveryRangeList");
        },
        getSubVendorListByStoreID: function (data) {
            return $http.post(deliveryRangeUrl + "GetDeliveryRangeList", data);
        },
        getSubVendorsWithSameArea: function (data) {
            return $http.post(deliveryRangeUrl + "GetSubVendorsWithSameArea", data);
        },
        setDeliveryVendors: function (data) {
            return $http.post(deliveryRangeUrl + "SetDeliveryVendors", data);
        },
        importDeliveryVendors: function (data) {
            return $http.post(deliveryRangeUrl + 'ImportDeliveryVendors', data, {
                withCredentials: true,
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity
            });
        },
        exportFile: function (data) {
            location.href = (deliveryRangeUrl + 'ExportFile' + '?' + $.param(data));
        }
    };
}]);