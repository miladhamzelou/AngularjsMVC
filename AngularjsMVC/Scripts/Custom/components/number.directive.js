/**
* @desc 使用於文字欄位，提供數值輸入檢核
* @example <input type="text" class="number" />
* @example <input type="text" number />
*/

(function () {
    angular
        .module("directives")
        .directive("number", numberDirective);

    function numberDirective(formatChecker, keyinService) {
        return {
            restrict: "AC",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$validators.number = function (modelVal) {
                    var valid = true;
                    if (!ctrl.$isEmpty(modelVal)) {
                        valid = formatChecker.validateNumber(modelVal);
                    }
                    return valid;
                };
                keyinService.allowKeyinPattern(element, /([+-]|\.|\d)/);
            }
        };
    }

    numberDirective.$inject = ["formatChecker", "keyinService"];
})()