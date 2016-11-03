angular.module("bacRepositories")
.factory("userRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "BAC/";
    return {
        getRoleList: function () {
            return $http.post(area + "User/GetRoleList");
        },
        getBMList: function () {
            return $http.post(area + "User/GetBMList");
        },
        getPMAList: function () {
            return $http.post(area + "User/GetPMAList");
        },
        addUserM: function (data) {
            return $http.post(area + 'User/AddUserM', data);
        },
        getUserMUrl: function () {
            return (area + 'User/GetUserMList');
        },
        updateUserM: function (data) {
            return $http.post(area + 'User/UpdateUserM', data);
        },
        deleteUserM: function (data) {
            return $http.post(area + 'User/DeleteUserM', data);
        },
        reCoverPwd: function (data) {
            return $http.post(area + 'User/ReCoverPwd', data);
        },
        getUserDUrl: function (empId) {
            return (area + 'User/GetUserDList');
        },
        addUserD: function (data, empId) {
            return $http.post(area + 'User/AddUserD', { userView: data, empId: empId });
        },
        deleteUserD: function (data) {
            return $http.post(area + 'User/DeleteUserD', data);
        }
    };
}]);