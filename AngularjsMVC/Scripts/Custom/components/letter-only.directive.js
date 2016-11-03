/**
* @desc 使用於文字欄位，提供輸入格式化顯示功能，限制只能是『英文』
* @example <input type="text" letter-only />
*/

(function () {
    angular
        .module("directives")
        .directive("letterOnly", letterDirective);

    function letterDirective() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, model) {
                var regex = new RegExp(/[^a-zA-Z]/);
                var replace_with = '';

                model.$parsers.push(function (val) {
                    if (!val) { return; }
                    var replaced = val.replace(regex, replace_with);

                    if (replaced !== val) {
                        model.$setViewValue(replaced);
                        model.$render();
                    }
                    return replaced;
                });
            }
        };
    }
})()