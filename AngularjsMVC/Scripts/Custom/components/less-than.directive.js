/**
* @desc 使用於文字欄位，用來檢核欄位值是否小於另一個欄位值
* @example <input type="text" lessThan="要比較的欄位name" />
*/

(function () {
    angular
        .module("directives")
        .directive("lessThan", lessThanDirective);

    function lessThanDirective(formatChecker) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl, ngModel) {
                var validateData = function () {
                    var startValue = ctrl.$modelValue;
                    var endValue = scope.$eval(attrs.lessThan);

                    ctrl.$setValidity("lessThan", formatChecker.validateLessThan(startValue, endValue));
                }

                scope.$watch(attrs["lessThan"], function () {
                    validateData();
                })

                scope.$watch(attrs["ngModel"], function () {
                    validateData();
                })
            }
        };
    }

    lessThanDirective.$inject = ["formatChecker"];
})()