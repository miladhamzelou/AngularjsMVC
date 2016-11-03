var TableModule = angular.module('topPos');
TableModule.controller('TestImpExcelCtrl', ["$http", "$scope", "baseUrl", "$window", "$document", function ($http, $scope, baseUrl, $window, $document) {
    $scope.getCount = '10';
    $scope.iframeLoadedCallBack = function () {
        $scope.$apply(function () {
            //angular.element('iframeUpdate').contentDocument.document.getElementsByTagName("pre")[0].innerHTML
            if (document.getElementById('iframeUpdate').contentDocument.body.outerText  != "") {
              var temp =   angular.fromJson(document.getElementById('iframeUpdate').contentDocument.body.outerText);
              $scope.Dataitems = temp;
            $scope.changeTotalItems();}
        });
    }
    $scope.exportDemoExcel = function () {
        $window.open(baseUrl + "Content/Download/Test/Demo.xlsx");
    }

    $scope.pagingOptsExcel = {
        pageSize: 10,
        totalItems: 0,
        //auto: true,
        callback: function (page) {
            $scope.skipCount = (page - 1) * $scope.getCount;
        }
    };
    $scope.changeTotalItems = function () {
        $scope.pagingOptsExcel.totalItems = $scope.Dataitems.length;

    }

}]);