/**
* @desc 使用於文字欄位，提供輸入格式化顯示功能，把輸入自動轉為小寫
* @example <input type="text" lowercase /> 
*/

(function () {
    angular
        .module("directives")
        .directive("lowercase", lowercaseDirective);

    function lowercaseDirective() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, model) {
                model.$parsers.push(function (val) {
                    if (!val) { return; }

                    if (val.toLowerCase() !== val) {
                        model.$setViewValue(val.toLowerCase());
                        model.$render();
                    }
                    return val.toLowerCase();
                });
            }
        };
    }
})()