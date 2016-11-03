/**
* @desc 使用於表單欄位，提供按下 Enter鍵時，移至下一個可以輸入的欄位
* @example <input type="text" entertab />
* @example <input type="radio" entertab />
* @example <input type="checkbox" entertab />
* @example <select entertab>...</select>
* @example <textarea entertab></textarea>
* @require entertabBlock
*/

(function () {
    angular
        .module("directives")
        .directive("entertab", entertabDirective);

    function entertabDirective($timeout) {
        return {
            restrict: 'A',
            require: "^entertabBlock",
            link: function (scope, element, attrs, ctrl) {
                var index;
                var modelName = ctrl.modelName();
                var KEY_ENTER = 13;
                var KEY_LEFT = 37;
                var KEY_UP = 38;
                var KEY_RIGHT = 39;
                var KEY_DOWN = 40;

                var getIndex = function () {
                    var newIndex;
                    var entertabIndex = element.attr("entertab-index");

                    if (entertabIndex) {
                        ctrl.newIndex();	//照樣取號，讓 entertabBlock 知道有多少元素
                        newIndex = parseInt(entertabIndex);
                    } else {
                        newIndex = ctrl.newIndex();
                        element.attr("entertab-index", newIndex);
                    }

                    return newIndex;
                }

                index = getIndex();

                scope.$watch(modelName + ".resetCount", function (newValue, oldValue) {
                    if (newValue != oldValue) {
                        index = getIndex();
                    }
                });

                scope.$watch(modelName + ".currentIndex", function (newValue) {
                    if (index == newValue) {
                        if (element.is(":hidden") || element.is(":disabled")) {
                            ctrl.move();
                        }
                        else {
                            element.addClass("entertab-focus");
                            element.focus();
                        }
                    } else {
                        element.removeClass("entertab-focus");
                    }
                });

                element.on("focus", function () {
                    if (ctrl.currentIndex() != index) {
                        scope.$apply(function () {
                            ctrl.currentIndex(index);
                        });
                    }
                });

                element.on("keydown", function (e) {
                    if (e.keyCode == KEY_ENTER) {
                        if (isTextArea()) {
                            return;
                        }

                        $timeout(function () {
                            scope.$apply(function () {
                                ctrl.forward();
                            });
                        });
                    } else if (e.keyCode == KEY_LEFT || (e.keyCode == KEY_UP && !isSelectField())) {
                        if (isTextBegin()) {
                            $timeout(function () {
                                scope.$apply(function () {
                                    ctrl.backward();
                                });
                            });
                            e.preventDefault();
                        } else if (e.keyCode == KEY_UP) {
                            try {
                                element.prop("selectionStart", 0)
                            } catch (e) {

                            }
                        }
                    } else if (e.keyCode == KEY_RIGHT || (e.keyCode == KEY_DOWN && !isSelectField())) {
                        if (isTextEnd()) {
                            $timeout(function () {
                                scope.$apply(function () {
                                    ctrl.forward();
                                });
                            });
                            e.preventDefault();
                        } else if (e.keyCode == KEY_DOWN) {
                            try {
                                element.prop("selectionStart", element.val().length)
                            } catch (e) {

                            }
                        }
                    }
                });

                var isTextBegin = function () {
                    var result;

                    if (isChectbox() || isRadio() || (!element.prop("selectionStart") && element.prop("selectionStart") != 0)) {
                        result = true;
                    } else {
                        result = element.prop("selectionStart") == 0;
                    }

                    return result;
                }

                var isTextEnd = function () {
                    var result;

                    if (isChectbox() || isRadio() || (!element.prop("selectionEnd") && element.prop("selectionEnd") != 0)) {
                        result = true;
                    } else {
                        result = element.prop("selectionEnd") == element.val().length;
                    }

                    return result;
                }

                var isChectbox = function () {
                    return element.prop("tagName").toLowerCase() == "input" && element.attr("type") && element.attr("type").toLowerCase() == "checkbox";
                }

                var isRadio = function () {
                    return element.prop("tagName").toLowerCase() == "input" && element.attr("type") && element.attr("type").toLowerCase() == "radio";
                }

                var isSelectField = function () {
                    return element.prop("tagName").toLowerCase() == "select" || (element.hasClass("ui-autocomplete-input") && angular.element(element.autocomplete("widget")).is(":visible"));
                }

                var isTextArea = function () {
                    return element.prop("tagName").toLowerCase() == "textarea";
                }
            }
        }
    }

    entertabDirective.$inject = ["$timeout"];
})()