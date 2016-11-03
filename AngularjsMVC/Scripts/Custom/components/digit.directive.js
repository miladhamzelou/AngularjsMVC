/**
* @desc 使用於文字欄位，提供數字輸入檢核
* @example <input type="text" class="digit" />
* @example <input type="text" digit />
*/

(function () {
    angular
        .module("directives")
        .directive("digit", digitDirective);

    function digitDirective(formatChecker, keyinService) {
        return {
            restrict: "AC",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$validators.digit = function (modelVal) {
                    var valid = true;
                    if (!ctrl.$isEmpty(modelVal)) {
                        valid = formatChecker.validateDigit(modelVal);
                    }
                    return valid;
                };
                keyinService.allowKeyinPattern(element, /\d/);
            }
        };
    }

    digitDirective.$inject = ["formatChecker", "keyinService"];
})()