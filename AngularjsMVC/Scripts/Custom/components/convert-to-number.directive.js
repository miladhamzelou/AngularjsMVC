/**
* @desc 使用於Select 當select 的ng-model 值為數值格式 對應不到option 的 value值
* @example <select ng-model="model.id" convert-to-number>
*/

(function () {
    angular
        .module("directives")
        .directive("convertToNumber", convertToNumberDirective);

    function convertToNumberDirective() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (val) {
                    return parseInt(val, 10);
                });
                ngModel.$formatters.push(function (val) {
                    return '' + val;
                });
            }
        }
    }
})()