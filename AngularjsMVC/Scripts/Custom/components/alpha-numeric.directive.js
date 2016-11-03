/**
* @desc 使用於文字欄位，提供文數字輸入檢核
* @example <input type="text" class="alphaNumeric" />
* @example <input type="text" alphaNumeric />
*/

(function () {
    angular
        .module("directives")
        .directive("alphaNumeric", alphaNumericDirective);

    function alphaNumericDirective(formatChecker, keyinService) {
        return {
            restrict: "AC",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$validators.alphaNumeric = function (modelVal) {
                    var valid = true;
                    if (!ctrl.$isEmpty(modelVal)) {
                        valid = formatChecker.validateAlphaNumeric(modelVal);
                    }
                    return valid;
                }
                keyinService.allowKeyinPattern(element, /([a-z]|\d)/);
            }
        }
    }

    alphaNumericDirective.$inject = ["formatChecker", "keyinService"];
})()