/// <reference path="../typings/angularjs/angular.d.ts" />
var TableModule = angular.module('topPos');
TableModule.controller('MvcReportCtrl', ["$http", "$scope", function ($http, $scope) {
        $scope.storeID = "1";
        $scope.storeNM = "1";
        $scope.changeshow = function () {
            $http
                .post('/MvcReportTest/ReportingServer', { storeID: $scope.storeID, storeNM: $scope.storeNM })
                .success(function (html) {
                angular.element('#divReport').html(html);
            });
        };
    }]);
