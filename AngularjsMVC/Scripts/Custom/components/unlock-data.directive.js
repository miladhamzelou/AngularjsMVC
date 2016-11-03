/**
* @desc 使用於按鈕或有 click 事件的元素，在 click 時將記錄的上鎖資料進行解鎖
*       解鎖成功或失敗只會在 console 中顯示 log 訊息
* @example <button type="button" ng-click="doSomething(item)" unlock-data />
*/

(function () {
    angular
        .module("directives")
        .directive("unlockData", unlockDataDirective);

    function unlockDataDirective(lockDataService, $window) {
        return {
            priority: 1,
            restrict: 'A',
            scope: {
                ngClick: '&'
            },
            link: function (scope, element, attrs, ctrl) {
                var isNgClickUsed = "ngClick" in attrs;
                var isLink = "href" in attrs;

                element.unbind("click").bind("click", function ($event) {
                    var promise = scope.ngClick();

                    $event.preventDefault();
                    if (promise && angular.isFunction(promise.then)) {
                        // 利用 promise 可以鏈結在一起，前一個 promise 完成時(resolve/reject)，才繼續下一個 promise 處理的特性
                        // 在完成原本按鈕的處理後，才進行資料解鎖 (避免存檔失敗時仍停留在修改畫面，但資料已被解鎖的情況)
                        promise.then(function () {
                            lockDataService.unlock();
                        })
                    } else {
                        lockDataService.unlock().then(function () {
                            if (!isNgClickUsed && isLink) {
                                $window.location = attrs["href"];
                            }
                        });
                    }
                });
            }
        }
    }

    unlockDataDirective.$inject = ["lockDataService", "$window"];
})()