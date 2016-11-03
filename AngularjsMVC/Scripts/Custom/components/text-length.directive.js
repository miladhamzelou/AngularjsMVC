/**
* @desc 用來顯示文字欄位輸入的字數提示訊息
* @example <text-length for="文字欄位的name"></text-length>
*/

(function () {
    angular
        .module("directives")
        .directive("textLength", textLengthDirective);

    function textLengthDirective(message) {
        return {
            restrict: "E",
            require: "^form",
            template: "<div class='error'>{{getTextLength()}}</div>",
            replace: true,
            scope: true,
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;

                scope.getTextLength = function () {
                    var field = ctrl[attrs["for"]];
                    if (field && field.$viewValue) {
                        return message.getTextLength(field.$viewValue.length);
                    }
                };
            }
        };
    }

    textLengthDirective.$inject = ["message"];
})()