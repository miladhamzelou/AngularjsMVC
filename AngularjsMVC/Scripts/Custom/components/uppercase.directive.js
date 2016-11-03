/**
* @desc 使用於文字欄位，提供輸入格式化顯示功能，把輸入自動轉為大寫
* @example <input type="text" uppercase /> 
*/

(function () {
    angular
        .module("directives")
        .directive("uppercase", uppercaseDirective);

    function uppercaseDirective() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, model) {
                model.$parsers.push(function (val) {
                    if (!val) { return; }

                    if (val.toUpperCase() !== val) {
                        model.$setViewValue(val.toUpperCase());
                        model.$render();
                    }
                    return val.toUpperCase();
                });
            }
        };
    }
})()