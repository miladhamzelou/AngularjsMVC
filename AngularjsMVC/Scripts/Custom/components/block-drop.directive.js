/**
* @desc 提供元素置放拖拉元素的功能
* @example <div block-drop>...</div>
*/

(function () {
    angular
        .module("directives")
        .directive("blockDrop", blockDropDirective);

    function blockDropDirective($parse, $timeout, $window, $document, blockDraggable) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.value = attrs.blockDrop;
                scope.isTouching = false;

                var _lastDropTouch = null;

                var _myid = scope.$id;

                var _dropEnabled = false;

                var onDropCallback = $parse(attrs.blockDropSuccess);
                var onDragStartCallback = $parse(attrs.blockDragStart);
                var onDragStopCallback = $parse(attrs.blockDragStop);
                var onDragMoveCallback = $parse(attrs.blockDragMove);

                var initialize = function () {
                    toggleListeners(true);
                };

                var toggleListeners = function (enable) {

                    if (!enable) return;
                    scope.$watch(attrs.blockDrop, onEnableChange);
                    scope.$on('$destroy', onDestroy);
                    scope.$on('draggable:start', onDragStart);
                    scope.$on('draggable:move', onDragMove);
                    scope.$on('draggable:end', onDragEnd);
                };

                var onDestroy = function (enable) {
                    toggleListeners(false);
                };
                var onEnableChange = function (newVal, oldVal) {
                    _dropEnabled = newVal;
                };
                var onDragStart = function (evt, obj) {
                    if (!_dropEnabled) return;
                    isTouching(obj.x, obj.y, obj.element);

                    if (attrs.blockDragStart) {
                        $timeout(function () {
                            onDragStartCallback(scope, { $data: obj.data, $event: obj });
                        });
                    }
                };
                var onDragMove = function (evt, obj) {
                    if (!_dropEnabled) return;
                    isTouching(obj.x, obj.y, obj.element);

                    if (attrs.blockDragMove) {
                        $timeout(function () {
                            onDragMoveCallback(scope, { $data: obj.data, $event: obj });
                        });
                    }
                };

                var onDragEnd = function (evt, obj) {

                    if (!_dropEnabled || _myid === obj.uid) {
                        updateDragStyles(false, obj.element);
                        return;
                    }
                    if (isTouching(obj.x, obj.y, obj.element)) {
                        if (obj.callback) {
                            obj.callback(obj);
                        }

                        if (attrs.blockDropSuccess) {
                            $timeout(function () {
                                onDropCallback(scope, { $data: obj.data, $event: obj, $target: scope.$eval(scope.value) });
                            });
                        }
                    }

                    if (attrs.blockDragStop) {
                        $timeout(function () {
                            onDragStopCallback(scope, { $data: obj.data, $event: obj });
                        });
                    }

                    updateDragStyles(false, obj.element);
                };

                var isTouching = function (mouseX, mouseY, dragElement) {
                    var touching = hitTest(mouseX, mouseY);
                    scope.isTouching = touching;
                    if (touching) {
                        _lastDropTouch = element;
                    }
                    updateDragStyles(touching, dragElement);
                    return touching;
                };

                var updateDragStyles = function (touching, dragElement) {
                    if (touching) {
                        element.addClass('drag-enter');
                        dragElement.addClass('drag-over');
                    } else if (_lastDropTouch == element) {
                        _lastDropTouch = null;
                        element.removeClass('drag-enter');
                        dragElement.removeClass('drag-over');
                    }
                };

                var hitTest = function (x, y) {
                    var bounds = element[0].getBoundingClientRect();
                    x -= $document[0].body.scrollLeft + $document[0].documentElement.scrollLeft;
                    y -= $document[0].body.scrollTop + $document[0].documentElement.scrollTop;
                    return x >= bounds.left
                        && x <= bounds.right
                        && y <= bounds.bottom
                        && y >= bounds.top;
                };

                initialize();
            }
        };
    }

    blockDropDirective.$inject = ["$parse", "$timeout", "$window", "$document", "blockDraggable"];
})()