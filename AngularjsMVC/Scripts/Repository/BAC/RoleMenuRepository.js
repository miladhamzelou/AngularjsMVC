angular.module("bacRepositories")
.factory("roleMenuRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "BAC/";
    return {
        getRoleList: function (data) {
            return $http.post(area + 'RoleMenu/GetRoleList', data);
        },
        addRole: function (data) {
            return $http.post(area + 'RoleMenu/AddRole', data);
        },
        addRoleObj: function (data) {
            return $http.post(area + 'RoleMenu/AddRoleObj', data);
        },
        updateRole: function (data) {
            return $http.post(area + 'RoleMenu/UpdateRole', data);
        },
        deleteRole: function (data) {
            return $http.post(area + 'RoleMenu/DeleteRole', data);
        },
        deleteRoleObj: function (data) {
            return $http.post(area + 'RoleMenu/DeleteRoleObj', data);
        },
        getMenuList: function (parentNo) {
            return $http.post(area + 'RoleMenu/GetMenuList', { parentNo: parentNo });
        },
        getRoleMenuList: function (roleNo, medParent) {
            return $http.post(area + 'RoleMenu/GetRoleMenuList', { roleNo: roleNo, medParentNo: medParent });
        },
        getRoleObjList: function (data) {
            return $http.post(area + 'RoleMenu/GetRoleObjList', data);
        },
        updateRoleMenu: function (data) {
            return $http.post(area + 'RoleMenu/UpdateRoleMenu', data);
        },
        updateRoleMenuAllPerm: function (data, perm, isPerm) {
            return $http.post(area + 'RoleMenu/UpdateRoleMenuAllPerm', { list: data, perm: perm, isPerm: isPerm });
        }
    };
}]);