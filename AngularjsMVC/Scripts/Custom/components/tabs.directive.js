/**
* @desc 用於存放頁籤的容器，記錄要顯示的 tab 名稱
* @example <div tabs="tab名稱記錄變數"></div>
*/

(function () {
    angular
        .module("directives")
        .directive("tabs", tabsDirective);

    function tabsDirective() {
        return {
            restrict: "A",
            controller: function ($scope, $element, $attrs) {
                function TabsObject() {
                    this.tab = "";
                }

                $element.addClass("tabs");

                this.getModelName = function () {
                    return $attrs["tabs"];
                };               
            }
        };
    }
})()