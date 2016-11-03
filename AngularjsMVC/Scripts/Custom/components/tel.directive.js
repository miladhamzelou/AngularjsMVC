/**
* @desc 使用於文字欄位，提供電話輸入
* @example <input type="text" class="tel" />
* @example <input type="text" tel />
*/

(function () {
    angular
        .module("directives")
        .directive("tel", telDirective);

    function telDirective($compile) {
        return {
            restrict: "C",
            require: "ngModel",
            scope: { ngModel: "=", isDisabled: "=ngDisabled" },
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;

                var content =
                    "<div>"
                    + "<input type='text' class='digit' ng-model='tel[0]' ng-blur='updateModelValue()' ng-disabled='isDisabled' auto-tab size='8' maxlength='8' /> "
                    + "<input type='text' class='digit' ng-model='tel[1]' ng-blur='updateModelValue()' ng-disabled='isDisabled' size='20' maxlength='20' />"
                    + "</div>";

                var inputElem = angular.element(content);
                var compileFn = $compile(inputElem);
                var loadData = function (data) {
                    scope.tel = ["", ""];
                    if (data) {
                        scope.tel = data.split("-");
                        data = (data == "-") ? "" : data;
                        scope.ngModel = data;
                    }
                };

                scope.$watchCollection("ngModel", function () {
                    loadData(scope.ngModel);
                });

                scope.updateModelValue = function () {
                    var data = scope.tel.join("-");
                    data = (data == "-") ? "" : data;
                    ctrl.$setViewValue(data);
                };

                loadData(scope.ngModel);
                compileFn(scope);
                element.hide().after(inputElem);
            }
        }
    }

    telDirective.$inject = ["$compile"];
})()