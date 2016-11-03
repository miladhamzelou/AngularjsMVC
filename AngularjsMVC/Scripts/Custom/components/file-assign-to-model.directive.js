/**
* @desc 使用於文字欄位，
* @example <input type="file" fileAssignToModel ng-model="存取檔案的變數"  />
*/

(function () {
    angular
        .module("directives")
        .directive("fileAssignToModel", fileAssignToModelDirective);

    function fileAssignToModelDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                element.on('change', function (e) {
                    var currentElement = e.target;
                    if (currentElement) {
                        ngModel.$setViewValue(currentElement.files);
                    } else {
                        ngModel.$setViewValue(null);
                    }
                    ngModel.$render();
                });
            }
        };
    }
})()