/**
* @desc 使用於文字欄位，提供輸入最小整數的限制設定。低於最小值時，會清空輸入值。
* @example <input type="text" min-value="10" />
*/

(function () {
    angular
        .module("directives")
        .directive("minValue", minValueDirective);

    function minValueDirective() {
        return {
            restrict: 'A',
            require: ["ngModel"],
            scope: { ngModel: "=" },
            link: function (scope, element, attrs) {
                scope.value = attrs.minValue;
                scope.$watch("ngModel", function (newVal) {
                    if (parseInt(scope.value) > parseInt(newVal)) {
                        scope.ngModel = '';
                    }
                });
            }
        }
    }
})()
