/**
* @desc 看不懂
* @example <div block-cancel-drag>...</div>
*/

(function () {
    angular
        .module("directives")
        .directive("blockCancelDrag", blockCancelDragDirective);

    function blockCancelDragDirective() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.find('*').attr('block-cancel-drag', 'block-cancel-drag');
            }
        };
    }
})()