/**
* @desc 提供元素拖拉功能
* @example <div block-drag></div>
*/

(function () {
    angular
        .module("directives")
        .directive("blockDrag", blockDragDirective);

    function blockDragDirective($rootScope, $parse, $document, $window, blockDraggable) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.value = attrs.blockDrag;
                var offset, _centerAnchor = false, _mx, _my, _tx, _ty, _mrx, _mry;
                var _hasTouch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
                var _pressEvents = 'touchstart mousedown';
                var _moveEvents = 'touchmove mousemove';
                var _releaseEvents = 'touchend mouseup';
                var _dragHandle;
                var _myid = scope.$id;
                var _data = null;

                var _dragOffset = null;

                var _dragEnabled = false;

                var _pressTimer = null;

                var onDragStartCallback = $parse(attrs.blockDragStart) || null;
                var onDragStopCallback = $parse(attrs.blockDragStop) || null;
                var onDragSuccessCallback = $parse(attrs.blockDragSuccess) || null;
                var allowTransform = angular.isDefined(attrs.allowTransform) ? scope.$eval(attrs.allowTransform) : true;

                var getDragData = $parse(attrs.blockDragData);
                var _deregisterRootMoveListener = angular.noop;

                var initialize = function () {
                    element.attr('draggable', 'false');
                    if (element[0].querySelectorAll) {
                        var dragHandles = angular.element(element[0].querySelectorAll('[ng-drag-handle]'));
                    } else {
                        var dragHandles = element.find('[block-drag-handle]');
                    }
                    if (dragHandles.length) {
                        _dragHandle = dragHandles;
                    }
                    toggleListeners(true);
                };

                var toggleListeners = function (enable) {
                    if (!enable) return;

                    scope.$on('$destroy', onDestroy);
                    scope.$watch(attrs.blockDrag, onEnableChange);
                    scope.$watch(attrs.elCenterAnchor, onCenterAnchor);
                    if (_dragHandle) {
                        _dragHandle.on(_pressEvents, onpress);
                    } else {
                        element.on(_pressEvents, onpress);
                    }
                    if (!_hasTouch && element[0].nodeName.toLowerCase() == "img") {
                        element.on('mousedown', function () { return false; });
                    }
                };
                var onDestroy = function (enable) {
                    toggleListeners(false);
                };
                var onEnableChange = function (newVal, oldVal) {
                    _dragEnabled = (newVal);
                };
                var onCenterAnchor = function (newVal, oldVal) {
                    if (angular.isDefined(newVal))
                        _centerAnchor = (newVal || 'true');
                };

                var isClickableElement = function (evt) {
                    return (
                        angular.isDefined(angular.element(evt.target).attr("ng-cancel-drag"))
                    );
                };

                var onpress = function (evt) {
                    if (!_dragEnabled) return;

                    if (isClickableElement(evt)) {
                        return;
                    }

                    if (evt.type == "mousedown" && evt.button != 0) {
                        return;
                    }

                    if (_hasTouch) {
                        cancelPress();
                        _pressTimer = setTimeout(function () {
                            cancelPress();
                            onlongpress(evt);
                        }, 100);
                        $document.on(_moveEvents, cancelPress);
                        $document.on(_releaseEvents, cancelPress);
                    } else {
                        onlongpress(evt);
                    }

                };

                var cancelPress = function () {
                    clearTimeout(_pressTimer);
                    $document.off(_moveEvents, cancelPress);
                    $document.off(_releaseEvents, cancelPress);
                };

                var onlongpress = function (evt) {
                    if (!_dragEnabled) return;
                    evt.preventDefault();

                    offset = element[0].getBoundingClientRect();
                    if (allowTransform)
                        _dragOffset = offset;
                    else {
                        _dragOffset = { left: document.body.scrollLeft, top: document.body.scrollTop };
                    }


                    element.centerX = element[0].offsetWidth / 2;
                    element.centerY = element[0].offsetHeight / 2;

                    _mx = blockDraggable.inputEvent(evt).pageX;
                    _my = blockDraggable.inputEvent(evt).pageY;
                    _mrx = _mx - offset.left;
                    _mry = _my - offset.top;
                    if (_centerAnchor) {
                        _tx = _mx - element.centerX - $window.pageXOffset;
                        _ty = _my - element.centerY - $window.pageYOffset;
                    } else {
                        _tx = _mx - _mrx - $window.pageXOffset;
                        _ty = _my - _mry - $window.pageYOffset;
                    }

                    $document.on(_moveEvents, onmove);
                    $document.on(_releaseEvents, onrelease);
                    _deregisterRootMoveListener = $rootScope.$on('draggable:_triggerHandlerMove', function (event, origEvent) {
                        onmove(origEvent);
                    });
                };

                var onmove = function (evt) {
                    if (!_dragEnabled) return;
                    evt.preventDefault();

                    if (!element.hasClass('dragging')) {
                        _data = getDragData(scope);
                        element.addClass('dragging');
                        $rootScope.$broadcast('draggable:start', { x: _mx, y: _my, tx: _tx, ty: _ty, event: evt, element: element, data: _data });

                        if (onDragStartCallback) {
                            scope.$apply(function () {
                                onDragStartCallback(scope, { $data: _data, $event: evt });
                            });
                        }
                    }

                    _mx = blockDraggable.inputEvent(evt).pageX;
                    _my = blockDraggable.inputEvent(evt).pageY;

                    if (_centerAnchor) {
                        _tx = _mx - element.centerX - _dragOffset.left;
                        _ty = _my - element.centerY - _dragOffset.top;
                    } else {
                        _tx = _mx - _mrx - _dragOffset.left;
                        _ty = _my - _mry - _dragOffset.top;
                    }

                    moveElement(_tx, _ty);

                    $rootScope.$broadcast('draggable:move', { x: _mx, y: _my, tx: _tx, ty: _ty, event: evt, element: element, data: _data, uid: _myid, dragOffset: _dragOffset });
                };

                var onrelease = function (evt) {
                    if (!_dragEnabled)
                        return;
                    evt.preventDefault();
                    $rootScope.$broadcast('draggable:end', { x: _mx, y: _my, tx: _tx, ty: _ty, event: evt, element: element, data: _data, callback: onDragComplete, uid: _myid });
                    element.removeClass('dragging');
                    element.parent().find('.drag-enter').removeClass('drag-enter');
                    reset();
                    $document.off(_moveEvents, onmove);
                    $document.off(_releaseEvents, onrelease);

                    if (onDragStopCallback) {
                        scope.$apply(function () {
                            onDragStopCallback(scope, { $data: _data, $event: evt });
                        });
                    }

                    _deregisterRootMoveListener();
                };

                var onDragComplete = function (evt) {


                    if (!onDragSuccessCallback) return;

                    scope.$apply(function () {
                        onDragSuccessCallback(scope, { $data: _data, $event: evt });
                    });
                };

                var reset = function () {
                    if (allowTransform)
                        element.css({ transform: '', 'z-index': '', '-webkit-transform': '', '-ms-transform': '' });
                    else
                        element.css({ 'position': '', top: '', left: '' });
                };

                var moveElement = function (x, y) {
                    if (allowTransform) {
                        element.css({
                            transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + x + ', ' + y + ', 0, 1)',
                            'z-index': 99999,
                            '-webkit-transform': 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + x + ', ' + y + ', 0, 1)',
                            '-ms-transform': 'matrix(1, 0, 0, 1, ' + x + ', ' + y + ')'
                        });
                    } else {
                        element.css({ 'left': x + 'px', 'top': y + 'px', 'position': 'fixed' });
                    }
                };
                initialize();
            }
        };
    }

    blockDragDirective.$inject = ["$rootScope", "$parse", "$document", "$window", "blockDraggable"];
})()