/**
* @desc 使用於文字欄位，用來提供整數輸入檢核
* @example <input type="text" class="integer" />
* @example <input type="text" integer />
*/

(function () {
    angular
        .module("directives")
        .directive("integer", integerDirective);

    function integerDirective(formatChecker, keyinService) {
        return {
            restrict: "AC",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$validators.integer = function (modelVal) {
                    var valid = true;
                    if (!ctrl.$isEmpty(modelVal)) {
                        valid = formatChecker.validateInteger(modelVal);
                    }
                    return valid;
                };
                keyinService.allowKeyinPattern(element, /([+-]|\d)/);
            }
        };
    }

    integerDirective.$inject = ["formatChecker", "keyinService"];
})()