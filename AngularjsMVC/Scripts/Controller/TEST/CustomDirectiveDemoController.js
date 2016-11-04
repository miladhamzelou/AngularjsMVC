angular.module("topPos")
.controller("customDirectiveCtrl", ["$scope", "$http", "baseUrl", "dialogService", function ($scope, $http, baseUrl, dialogService) {
    $scope.fieldDisabled = false;

    //Coupon的directive callback
    $scope.showCouponInfo = function (data) {
        var item = angular.extend({ Id: "", Name: "", amount: "" }, data);
        $scope.couponId = item.Id;
        $scope.couponNM = item.Name;
        $scope.couponPrice = item.amount;
    };

    $scope.togglefieldDisabled = function () {
        $scope.fieldDisabled = !$scope.fieldDisabled;
    }

    $scope.doSubmit = function (newEntity) {
        alert(angular.toJson(newEntity));
    }

    $scope.reset = function () {
        $scope.newEntity = {};
        $scope.dateOpts = {};
    }

    $scope.showData = function (data) {
        alert(angular.toJson(data));
    }

    $scope.autoCompleteOpt = {
        source: baseUrl + "AutoComplete/GetCategory",
        count: 6
    };

    $scope.sendImageFileAndModel = function () {
        var entityModel = {
            Column1: 'test'
        }

        var fd = new FormData();
        fd.append('imgFile', $scope.imgFile);
        fd.append('model', angular.toJson(entityModel));

        $http.post(baseUrl + "Test/SendImageFileAndModel", fd, {
            withCredentials: true,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).success(function (response) {
            dialogService.messageDialog({ message: "ok" });
        });
    };

    $scope.resetData = function () {
        $scope.imgFile = null;
    };
}])
.controller("customServiceCtrl", ["$scope", "dialogService", function ($scope, dialogService) {
    $scope.store = null;

    $scope.openMsgDialog = function () {
        dialogService.messageDialog({
            message: "this is a messagedialog。",
            callback: function () {
                alert("run callback");
            }
        });
    }

    $scope.openHtmlMsgDialog = function () {
        dialogService.messageDialog({ message: "<h3>HTML content</h3><p>this is a messagedialog。</p>" });
    }

    $scope.openConfirmDialog = function () {
        dialogService.confirmDialog({
            message: "confirm delete?", callback: function (result) {
                var text = result ? "press confirm " : " press cancel or  top right[x]， or press ESC ";
                dialogService.messageDialog({ message: text });
            }
        })
    }

    $scope.dialogOpts = {
        kind: "storeList",
        callback: function (data) {
            $scope.item = data;
        }
    };
}])
.controller("paginCtrl", ["$scope", "baseUrl", function ($scope, baseUrl) {
    $scope.pagingOpts = {
        pageSize: 3,
        url: baseUrl + "Dialog/QueryStore",
        callback: function (items) {
            $scope.items = items;
        }
    };

    $scope.queryStore = function (store) {
        $scope.pagingOpts.data = angular.copy(store) || {};
    }
}])
.controller("paginCtrl2", ["$scope", function ($scope) {
    $scope.getCount = 10;
    $scope.items = [{ Id: '1', Name: 'Taipei' }, { Id: '2', Name: 'Tainan' }
    , { Id: '3', Name: 'Keelung' }, { Id: '4', Name: 'Hsinchu' }
    , { Id: '5', Name: 'Taichung' }, { Id: '6', Name: 'Kaohsiung' }];
    $scope.pagingOpts = {
        pageSize: 3,
        totalItems: 0,
        callback: function (page) {
            $scope.skipCount = (page - 1) * $scope.getCount;
        }
    };

    $scope.changeTotalItems = function () {
        $scope.getCount = 3;
        $scope.pagingOpts.totalItems = $scope.items.length;
    }
}])
.controller("entertabCtrl", ["$scope", "dialogService", function ($scope, dialogService) {
    $scope.remove = function (index) {
        $scope.items.splice(index, 1);
    }

    $scope.remove2 = function (index) {
        $scope.items2.splice(index, 1);
        $scope.myBlock2.reset();
    }

    $scope.items = [{}, {}, {}]
    $scope.items2 = [{}, {}, {}]
}])
.controller("deleteConfirmCtrl", ["$scope", "dialogService", function ($scope, dialogService) {
    var items = [
        { id: 1, name: "AAA" },
        { id: 2, name: "BBB" },
        { id: 3, name: "CCC" }
    ];

    $scope.deleteData = function () {
        dialogService.messageDialog({ message: " old delete" });
    }

    $scope.deleteOneItem = function (item) {
        var index = $scope.items.indexOf(item);
        $scope.items.splice(index, 1);
    }

    $scope.resetItems = function () {
        $scope.items = angular.copy(items);
    }

    $scope.resetItems();
}])
.controller("noitemCtrl", ["$scope", function ($scope) {
    var items = [
        { id: 1, name: "AAA" },
        { id: 2, name: "BBB" },
        { id: 3, name: "CCC" }
    ];

    $scope.items = null;

    $scope.queryHasData = function () {
        $scope.items = angular.copy(items);
    }

    $scope.queryNoData = function () {
        $scope.items = [];
    }
}])
.controller("fileUploadCtrl", ["$scope", function ($scope) {
    var paramsModel = function () {
        return {
            isDisable: true,
            isRequired: true,
            isShow: {
                fileName: true,
                Img: true
            },
            Img: {
                src: null,
                hasBackImg: true,
                isBase64Img: true,
                style: {
                    width: 250,
                    maxWidth: null,
                    height: 250,
                    maxHeight: null
                }
            },
            clearCallback: function () { alert("I am clear callback"); }
        }
    };

    $scope.SimpleModelList = [];
    var fileModel = function () {
        return {
            fileList: null,
            Name: "",
            MIMEType: "",
            size: 0,
            fileLength: 0,
            params: new paramsModel()
        }
    };
    $scope.addOne = function () {
        var fm = new fileModel();
        $scope.SimpleModelList.push(fm);
    };

    $scope.assignValue = function (fm) {
        fm.fileLength = fm.fileList.length;
        fm.Name = fm.fileList[0].name;
        fm.MIMEType = fm.fileList[0].type;
        fm.size = fm.fileList[0].size;
    };


}])
.controller("storeTreeCtrl", ["$scope", function ($scope) {
    $scope.dialog = {
        kind: "storeTree",
        callback: function (data) {
            console.log(data);
            alert("StoreTree");
        }
    }
}]);