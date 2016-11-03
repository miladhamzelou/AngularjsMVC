/**
* @desc 使用於可訂閱載入完成事件的元素，提供載入完成時的回呼處理
* @example <iframe src="url.." element-onload="回呼函式" />
* @example <img src="url.." element-onload="回呼函式" />
*/

(function () {
    angular
        .module("directives")
        .directive("elementOnload", elementOnloadDirective);

    function elementOnloadDirective() {
        return {
            scope: {
                callBack: '&elementOnload'
            },
            link: function (scope, element, attrs) {
                element.on('load', function () {
                    return scope.callBack();
                })
            }
        }
    }
})()