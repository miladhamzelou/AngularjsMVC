/**
* @desc 使用於元素，讓元素具備拖拉功能
* @example <div drag="scope選項值">...</div>
*/

(function () {
    angular
        .module("directives")
        .directive("drag", dragDirective);

    function dragDirective($parse) {
        return {
            restrict: "A",
            link: function (scope, element, attrs, ctrl) {
                var options = scope[attrs["drag"]];
                var dragItem = scope[attrs["eventItem"]];
                var expressionFn = attrs["ngDisabled"] ? $parse(attrs["ngDisabled"]) : null;

                options = options || {};
                element.data("dragItem", dragItem);
                element.css("cursor", "pointer");
                element.draggable(options);

                if (expressionFn) {
                    scope.$watch(expressionFn,
                    function (newValue) {
                        element.draggable("option", "disabled", newValue);
                    });
                }
            }
        }
    }

    dragDirective.$inject = ["$parse"];
})()