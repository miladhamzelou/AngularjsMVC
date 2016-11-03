/**
* @desc 使用於清單項目，提供頁籤樣式與功能
* @example <li tab="tab名稱">...</li>
*/

(function () {
    angular
        .module("directives")
        .directive("tab", tabDirective);

    function tabDirective() {
        return {
            require: "^tabs",
            restrict: "A",
            link: function (scope, element, attrs, ctrl) {
                var activeClass = "active";
                var disableClass = "disabled";
                var modelName = ctrl.getModelName();

                element.on("click", function () {
                    if (!element.hasClass(disableClass)) {
                        activateTab();
                        if (modelName) {
                            scope.$apply(function () {
                                scope[modelName] = attrs["tab"];
                            });
                        }
                    }
                });

                var activateTab = function () {
                    if (!element.hasClass(activeClass)) {
                        element.parent().children().removeClass(activeClass);
                        element.addClass(activeClass);
                    }
                };

                if (modelName) {
                    scope.$watch(modelName, function (newValue) {
                        if (newValue == attrs["tab"] && !element.hasClass(disableClass)) {
                            activateTab();
                        }
                    });
                }
            }
        };
    }
})()