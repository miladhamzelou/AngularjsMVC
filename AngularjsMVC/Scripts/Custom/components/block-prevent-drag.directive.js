/**
* @desc 將元素設定成不能被拖拉
* @example <div block-prevent-drag>...</div>
*/

(function () {
    angular
        .module("directives")
        .directive("blockPreventDrag", blockPreventDragDirective);

    function blockPreventDragDirective($parse, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var initialize = function () {
                    element.attr('draggable', 'false');
                    toggleListeners(true);
                };
                var toggleListeners = function (enable) {
                    if (!enable) return;
                    element.on('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
                };
                var absorbEvent_ = function (event) {
                    var e = event.originalEvent;
                    e.preventDefault && e.preventDefault();
                    e.stopPropagation && e.stopPropagation();
                    e.cancelBubble = true;
                    e.returnValue = false;
                    return false;
                };

                initialize();
            }
        };
    }

    blockPreventDragDirective.$inject = ["$parse", "$timeout"];
})()