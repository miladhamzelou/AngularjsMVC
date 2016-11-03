/**
* @desc 使用於存放頁籤內容的容器，提供頁籤選擇時，自動顯示對應內容
* @example <div tab-content="tab名稱">...</div>
*/

(function () {
    angular
        .module("directives")
        .directive("tabContent", tabContentDirective);

    function tabContentDirective() {
        return {
            require: "^tabs",
            restrict: "A",
            link: function (scope, element, attrs, ctrl) {
                var modelName = ctrl.getModelName();

                element.css("display", "none");

                if (modelName) {
                    scope.$watch(modelName, function (newValue) {
                        if (newValue == attrs["tabContent"]) {
                            if (!element.hasClass("disabled")) {
                                element.css("display", "");
                            }
                        } else {
                            element.css("display", "none");
                        }
                    });
                }
            }
        }
    }
})()