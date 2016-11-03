InterestApp123.controller('InterestCtrl', function ($http, $scope, $filter, myService) {
    $scope.List = [];
    $scope.Form = {};
    $scope.selected = [];
    $scope.queryForm = {};

    $scope.GetList = function (data) {
        myService.getList(data).success(function (response) {
            $scope.List = response;
        });
    }
    $scope.GetList();

    $scope.AddData = function (data) {
        myService.add(data).success(function (response) {
            $scope.List.push(response);
            alert("OK");
            $scope.Form = {};
        }).error(function () {
            alert("ERROR");
        });
    }

    $scope.getTemplateList = function (List) {
        if (List.Id === $scope.selected.Id) return 'edit';
        else return 'display';
    }

    $scope.Delete = function (data,rowIndex) {
        myService.delete(data).success(function (msg) {
            $scope.List.splice(rowIndex, 1);
            alert(msg);
        }).error(function (msg) {
            alert(msg);
        });
    }

    $scope.update = function (data,rowIndex) {
        myService.update(data).success(function (msg) {
            $scope.selected = {};
            $scope.List[rowIndex] = data;
            alert(msg);
        }).error(function (msg) {
            alert(msg);
        });;
    }

    $scope.Edit = function (data) {
        $scope.selected = angular.copy(data);
    }

    $scope.reset = function () {
        $scope.selected = {};
    }

})