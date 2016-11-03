/**
* @desc 使用於元素，提供元素在拖拉時，自動對容器進行scroll的功能
* @example <div blockDragScrollDirective></div>
*/

(function () {
    angular
        .module("directives")
        .directive("blockDragScroll", blockDragScrollDirective);

    function blockDragScrollDirective($window, $interval, $timeout, $document, $rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var intervalPromise = null;
                var lastMouseEvent = null;

                var config = {
                    verticalScroll: attrs.verticalScroll || true,
                    horizontalScroll: attrs.horizontalScroll || true,
                    activationDistance: attrs.activationDistance || 75,
                    scrollDistance: attrs.scrollDistance || 15
                };


                var reqAnimFrame = (function () {
                    return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                    function (callback, element) {
                        window.setTimeout(callback, 1000 / 60);
                    };
                })();

                var animationIsOn = false;
                var createInterval = function () {
                    animationIsOn = true;

                    function nextFrame(callback) {
                        var args = Array.prototype.slice.call(arguments);
                        if (animationIsOn) {
                            reqAnimFrame(function () {
                                $rootScope.$apply(function () {
                                    callback.apply(null, args);
                                    nextFrame(callback);
                                });
                            })
                        }
                    }

                    nextFrame(function () {
                        if (!lastMouseEvent) return;

                        var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                        var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

                        var scrollX = 0;
                        var scrollY = 0;

                        if (config.horizontalScroll) {
                            if (lastMouseEvent.clientX < config.activationDistance) {
                                scrollX = -config.scrollDistance;
                            }
                            else if (lastMouseEvent.clientX > viewportWidth - config.activationDistance) {
                                scrollX = config.scrollDistance;
                            }
                        }

                        if (config.verticalScroll) {
                            if (lastMouseEvent.clientY < config.activationDistance) {
                                scrollY = -config.scrollDistance;
                            }
                            else if (lastMouseEvent.clientY > viewportHeight - config.activationDistance) {
                                scrollY = config.scrollDistance;
                            }
                        }



                        if (scrollX !== 0 || scrollY !== 0) {
                            var currentScrollLeft = ($window.pageXOffset || $document[0].documentElement.scrollLeft);
                            var currentScrollTop = ($window.pageYOffset || $document[0].documentElement.scrollTop);
                            var elementTransform = element.css('transform');
                            element.css('transform', 'initial');

                            $window.scrollBy(scrollX, scrollY);

                            var horizontalScrollAmount = ($window.pageXOffset || $document[0].documentElement.scrollLeft) - currentScrollLeft;
                            var verticalScrollAmount = ($window.pageYOffset || $document[0].documentElement.scrollTop) - currentScrollTop;

                            element.css('transform', elementTransform);

                            lastMouseEvent.pageX += horizontalScrollAmount;
                            lastMouseEvent.pageY += verticalScrollAmount;

                            $rootScope.$emit('draggable:_triggerHandlerMove', lastMouseEvent);
                        }

                    });
                };

                var clearInterval = function () {
                    animationIsOn = false;
                };

                scope.$on('draggable:start', function (event, obj) {
                    if (obj.element[0] !== element[0]) return;
                    if (!animationIsOn) createInterval();
                });

                scope.$on('draggable:end', function (event, obj) {
                    if (obj.element[0] !== element[0]) return;
                    if (animationIsOn) clearInterval();
                });

                scope.$on('draggable:move', function (event, obj) {
                    if (obj.element[0] !== element[0]) return;
                    lastMouseEvent = obj.event;
                });
            }
        };
    }

    blockDragScrollDirective.$inject = ["$window", "$interval", "$timeout", "$document", "$rootScope"];
})()