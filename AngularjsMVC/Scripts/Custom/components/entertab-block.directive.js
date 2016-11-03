/**
* @desc 用來設定 enterTab 的作用範圍，並提供號碼機供 enterTab 取號與重置取號
* @example <div entertab-block>...</div>
*/

(function () {
    angular
        .module("directives")
        .directive("entertabBlock", entertabBlockDirective);

    function entertabBlockDirective($timeout) {
        return {
            restrict: "A",
            controller: function ($scope, $element, $attrs) {
                var step = 1;
                var blockObj;

                var setIndexByPosition = function () {
                    var items = $element.find("[entertab]");
                    for (var i = 0; i < items.length; i++) {
                        items.eq(i).attr("entertab-index", i + 1);
                    }
                }

                function BlockObject() {
                    var self = this;
                    self.index = 0;
                    self.currentIndex = 0;
                    self.resetCount = 0;
                    self.reset = function () {
                        $timeout(function () {
                            setIndexByPosition();
                            self.index = 0;
                            self.resetCount++;
                        });
                    }
                }

                blockObj = new BlockObject();
                $scope[$attrs["entertabBlock"]] = blockObj;

                this.currentIndex = function (index) {
                    if (index == undefined) {
                        return blockObj.currentIndex;
                    } else {
                        blockObj.currentIndex = index;
                    }
                }

                this.forward = function () {
                    step = 1;
                    this.move();
                }

                this.backward = function () {
                    step = -1;
                    this.move();
                }

                this.move = function () {
                    blockObj.currentIndex += step;
                    if (blockObj.currentIndex < 1) {
                        blockObj.currentIndex = 1;
                    } else if (blockObj.currentIndex > blockObj.index) {
                        blockObj.currentIndex = blockObj.index;
                    }
                }

                this.newIndex = function () {
                    blockObj.index++;
                    return blockObj.index;
                }

                this.modelName = function () {
                    return $attrs["entertabBlock"];
                }
            }
        };
    }

    entertabBlockDirective.$inject = ["$timeout"];
})()