/**
* @desc 使用於表單欄位，提供按下 Enter鍵時，回 Server 查詢Ｂ
* @example <input type="text" enter-query />
* @require entertabBlock
*/

(function () {
    angular
        .module("directives")
        .directive("enterQuery", enterQueryDirective);

    function enterQueryDirective() {
        return {
            restrict: 'A',
            scope: {
                enterQuery: "&"
            },
            link: function (scope, element, attrs, ctrl) {

                let KEY_DOWN = 40;
                let KEY_ENTER = 13;

                element.on("keydown", function (e) {
                    console.log(scope.enterQuery);
                    if (e.keyCode == KEY_ENTER) {
                        scope.enterQuery();
                    }
                });
            }
        }
    }
})()