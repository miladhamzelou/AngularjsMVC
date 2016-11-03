/**
* @desc 使用於按鈕或有 click 事件的元素，在 click 時會進行資料上鎖
*       資料上鎖成功後，繼續進行原處理，
*       資料上鎖失敗(資料已被其他人上鎖)，則不進行原 click 處理
* @example <button type="button" ng-click="doSomething(item)" lock-data="item.keyvalue" />
*/

(function () {
    angular
        .module("directives")
        .directive("lockData", lockDataDirective);

    function lockDataDirective(lockDataService, $log, $location) {
        return {
            priority: 1,
            restrict: "A",
            scope: {
                ngClick: "&",
                itemKey: "=lockData"
            },
            link: function (scope, element, attrs, ctrl) {
                element.unbind("click").bind("click", function ($event) {
                    $event.preventDefault();

                    if (!scope.itemKey && scope.itemKey != 0) {
                        $log.error("[lockData] 未指定 lock-data 屬性的資料。")
                        return;
                    }

                    var postData = {
                        itemKey: scope.itemKey,
                        routePath: $location.path()
                    };

                    lockDataService.lock(postData).then(function (response) {
                        scope.ngClick();
                    });
                });
            }
        }
    }

    lockDataDirective.$inject = ["lockDataService", "$log", "$location"];
})()