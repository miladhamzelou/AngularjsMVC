var TableModule = angular.module('topPos');
TableModule.controller('TestExportCsvCtrl', ["$http", "$scope", "baseUrl", "$window", "$document", 
function ($http, $scope, baseUrl, $window, $document) {

    $scope.exportCsv = function () {
        var link = "Test/TestExportCsv";
        var where = "";
        $window = encodeURI(link + where)
    }
    //塞假資料
    $scope.testdata = [{ a: 1, b: 5, c: 45 }, { a: 1, b:'' ,c: 4.2 }, { a: 1, b: 5.6, c: '45s' },
    { a: '中文測試', b:'你', c: '我' }, { a: '英文測試', b: 'b', c: 'C' }, { a: '韓文測試', b: '하니', c: '지효' }];
    //送資料給CSV的FUNTCION
    $scope.getArray2 = function () {
        var result = null;
        result = $scope.testdata;
        return result;
    }
    //設定檔名
    $scope.filename = "test";
    //設定擋頭
    $scope.getHeader = function () { return ["欄位A", "欄位B", "欄位C"] };
    //設定CSV的分隔符號 可以用各種符號當分隔 如果不打預設是','
    $scope.separator = ',';
    //設定小數點的符號 可以用各種符號當分隔 如果不打預設是'.'
    $scope.decimalSeparator = '.';
}]);