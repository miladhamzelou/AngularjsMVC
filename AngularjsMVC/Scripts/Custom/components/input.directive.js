/**
* @desc 自動作用於文字欄位，不允許輸入半型逗號(使用任何方式輸入資料，系統都會去除其中的半型逗號)
*/

(function () {
    angular
        .module("directives")
        .directive("input", nocommaDirective)
        .directive("textarea", nocommaDirective);

    function nocommaDirective() {
        return {
            restrict: "E",
            require: "?ngModel",
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) { return; }

                if (attrs["imageModel"]) { return; }

                scope.$watchCollection(attrs["ngModel"], function (newValue, oldValue) {
                    if (newValue && angular.isString(newValue) && newValue.indexOf(",") >= 0) {
                        var value = newValue.replace(",", "");
                        ctrl.$setViewValue(value);
                        ctrl.$render();
                    }
                });

                denyKeyinPattern(element, ",");
            }
        };
    }

    function denyKeyinPattern(element, pattern) {
        element.bind("keypress", function (e) {
            var keyCode = e.which || e.keyCode;
            var keyCodeChar = String.fromCharCode(keyCode);

            if (keyCodeChar.match(new RegExp(pattern, "i"))) {
                e.preventDefault();
                return false;
            }
        });
    }
})()