/**
* @desc 使用於文字欄位，限制可以輸入的字元
* @example <input type="text" allow-pattern="\\d+" />
*/

(function () {
    angular
        .module("directives")
        .directive("allowPattern", allowPatternDirective);

    function allowPatternDirective(keyinService) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                keyinService.allowKeyinPattern(element, attrs["allowPattern"]);
            }
        };
    }

    allowPatternDirective.$inject = ["keyinService"];
})()