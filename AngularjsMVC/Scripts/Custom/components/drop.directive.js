/**
* @desc 使用於元素，讓元素具備置入拖拉元素的功能
* @example <div drop="scope選項值">...</div>
*/

(function () {
    angular
        .module("directives")
        .directive("drop", dropDirective);

    function dropDirective() {
        return {
            restrict: "A",
            link: function (scope, element, attrs, ctrl) {
                var options = scope[attrs["drop"]];
                var dropItem = scope[attrs["eventItem"]];

                options = options || {};
                element.data("dropItem", dropItem);
                options.drop = wrapDropFunction(options.drop);
                element.droppable(options);
            }
        }
    }

    function wrapDropFunction(fn) {
        return function (event, ui) {
            if (angular.isFunction(fn)) {
                ui.dragItem = ui.draggable.data("dragItem");
                ui.dropItem = $(this).data("dropItem");
                fn.call(this, event, ui);
            }
        }
    }
})()