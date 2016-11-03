/**
* @desc 提供元素拖拉功能，拖拉時會產生元素的複製來進行拖拉
* @example <div block-drag-clone>...</div>
*/

(function () {
    angular
        .module("directives")
        .directive("blockDragClone", blockDragCloneDirective);

    function blockDragCloneDirective($parse, $timeout, blockDraggable) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var img, _allowClone = true;
                var _dragOffset = null;
                scope.clonedData = {};
                var initialize = function () {

                    img = element.find('img');
                    element.attr('draggable', 'false');
                    img.attr('draggable', 'false');
                    reset();
                    toggleListeners(true);
                };


                var toggleListeners = function (enable) {

                    if (!enable) return;
                    scope.$on('draggable:start', onDragStart);
                    scope.$on('draggable:move', onDragMove);
                    scope.$on('draggable:end', onDragEnd);
                    preventContextMenu();

                };
                var preventContextMenu = function () {
                    img.off('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
                    img.on('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
                };
                var onDragStart = function (evt, obj, elm) {
                    _allowClone = true;
                    if (angular.isDefined(obj.data.allowClone)) {
                        _allowClone = obj.data.allowClone;
                    }
                    if (_allowClone) {
                        scope.$apply(function () {
                            scope.clonedData = obj.data;
                        });
                        element.css('width', obj.element[0].offsetWidth);
                        element.css('height', obj.element[0].offsetHeight);

                        moveElement(obj.tx, obj.ty);
                    }

                };
                var onDragMove = function (evt, obj) {
                    if (_allowClone) {

                        _tx = obj.tx + obj.dragOffset.left;
                        _ty = obj.ty + obj.dragOffset.top;

                        moveElement(_tx, _ty);
                    }
                };
                var onDragEnd = function (evt, obj) {
                    if (_allowClone) {
                        reset();
                    }
                };

                var reset = function () {
                    element.css({ left: 0, top: 0, position: 'fixed', 'z-index': -1, visibility: 'hidden' });
                };
                var moveElement = function (x, y) {
                    element.css({
                        transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + x + ', ' + y + ', 0, 1)', 'z-index': 99999, 'visibility': 'visible',
                        '-webkit-transform': 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + x + ', ' + y + ', 0, 1)',
                        '-ms-transform': 'matrix(1, 0, 0, 1, ' + x + ', ' + y + ')'
                    });
                };

                var absorbEvent_ = function (event) {
                    var e = event;
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

    blockDragCloneDirective.$inject = ["$parse", "$timeout", "blockDraggable"];
})()