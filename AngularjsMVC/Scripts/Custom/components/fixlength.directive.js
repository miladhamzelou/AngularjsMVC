/**
* @desc 使用於文字欄位，用來檢核需要輸入固定的資料長度
* @example <input type="text" fixlength="6" />
*/

(function () {
    angular
        .module("directives")
        .directive("fixlength", fixlengthDirective);

    function fixlengthDirective(formatChecker) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;
                var fixLength = attrs["fixlength"];

                element.attr("maxlength", fixLength);

                ctrl.$validators.fixlength = function (modelVal) {
                    var valid = true;
                    if (!ctrl.$isEmpty(modelVal)) {
                        valid = formatChecker.validateFixLength(modelVal, fixLength);
                    }
                    return valid;
                };
            }
        };
    }

    fixlengthDirective.$inject = ["formatChecker"];
})()