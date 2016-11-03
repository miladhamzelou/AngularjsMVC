/**
* @desc 使用於文字欄位，提供輸入最大整數的限制設定。高於最大值時，會清空輸入值。
* @example <input type="text" max-value="10" />
*/

(function () {
    angular
        .module("directives")
        .directive("maxValue", maxValueDirective);

    function maxValueDirective() {
        return {
            restrict: 'A',
            require: ["ngModel"],
            scope: { ngModel: "=" },
            link: function (scope, element, attrs) {
                scope.value = attrs.maxValue;
                scope.$watch("ngModel", function (newVal) {
                    if (parseInt(scope.value) < parseInt(newVal)) {
                        scope.ngModel = '';
                    }
                });
            }
        }
    }
})()