/**
* @desc 用來檢核存放多筆資料的變數是否有資料，沒有資料時顯示提示訊息
* @example <div noitem="存放多筆資料的變數"></div>
*/

(function () {
    angular
        .module("directives")
        .directive("noitem", noitemDirective);

    function noitemDirective(message) {
        return {
            restrict: "A",
            scope: {
                noitem: "="
            },
            replace: true,
            template: "<div class='alert alert-warning text-center' ng-if='isEmpty'>" + message.defaults.noitem + "</div>",
            link: function (scope, element, attrs) {
                scope.isEmpty = false;

                scope.$watchCollection("noitem", function (newValue) {
                    if (newValue && angular.isArray(newValue) && newValue.length == 0) {
                        scope.isEmpty = true;
                    } else {
                        scope.isEmpty = false;
                    }
                });
            }
        }
    }

    noitemDirective.$inject = ["message"];
})()