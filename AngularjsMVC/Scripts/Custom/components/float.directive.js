/**
* @desc 使用於文字欄位，用來提供浮點數輸入檢核，可限制整數位數和小數位數
* @example <input type="text" class="float" />
* @example <input type="text" float="2" />
* @example <input type="text" float="2" float-length="5"/>
*/

(function () {
    angular
        .module("directives")
        .directive("float", floatDirective);

    function floatDirective(formatChecker, keyinService) {
        return {
            restrict: "AC",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;

                var numOfDigits;
                var floatLength;

                if ("float" in attrs) {
                    numOfDigits = isNaN(attrs["float"]) ? undefined : attrs["float"];
                }

                if ("floatLength" in attrs) {
                    floatLength = isNaN(attrs["floatLength"]) ? undefined : attrs["floatLength"];
                }

                ctrl.$validators.float = function (modelVal) {
                    var valid = true;
                    if (!ctrl.$isEmpty(modelVal)) {
                        valid = formatChecker.validateFloat(modelVal, numOfDigits, floatLength);
                    }
                    return valid;
                };
                keyinService.allowKeyinPattern(element, /([+-]|\.|\d)/);
            }
        };
    }

    floatDirective.$inject = ["formatChecker", "keyinService"];
})()