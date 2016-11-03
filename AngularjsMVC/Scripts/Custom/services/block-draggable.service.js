/**
* @desc 提供元素拖拉服務
*/

(function () {
    angular
        .module("services")
        .service("blockDraggable", blockDraggableProvider);

    function blockDraggableProvider() {
        this.inputEvent = function (event) {
            if (angular.isDefined(event.touches)) {
                return event.touches[0];
            }
            else if (angular.isDefined(event.originalEvent)
                && angular.isDefined(event.originalEvent.touches)) {
                return event.originalEvent.touches[0];
            }
            return event;
        };
    }
})()