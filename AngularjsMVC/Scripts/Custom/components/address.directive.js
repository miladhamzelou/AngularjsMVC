/**
* @desc 使用於文字欄位，讓欄位提供地址輸入
* @example <input type="text" class="address" />
* @example <input type="text" address />
*/

(function () {
    angular
        .module("directives")
        .directive("address", addressDirective);

    function addressDirective($compile) {
        return {
            restrict: "AC",
            require: "ngModel",
            scope: { ngModel: "=", isDisabled: "=ngDisabled" },
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;

                var content =
                    "<div>"
                    + "<input type='text' ng-model='address[0]' ng-keyup='updateModelValue()' size='6' auto-tab maxlength='5' ng-disabled='isDisabled' placeholder='郵遞區號' /> "
                    + "<input type='text' ng-model='address[1]' disabled />"
                    + "<button type='button' class='btn-dialog' tool-dialog='dialogOpts' ng-disabled='isDisabled'>...</button> "
                    + "<input type='text' ng-model='address[2]' ng-keyup='updateModelValue()' size='40' ng-disabled='isDisabled' />"
                    + "</div>";
                var inputElem = angular.element(content);
                var compileFn = $compile(inputElem);
                var loadData = function (data) {
                    scope.address = ["", "", ""];
                    if (data) { scope.address = data.split("|"); }
                };

                scope.dialogOpts = {
                    kind: "store",
                    autoClose: true,
                    callback: function (data) {
                        scope.address[0] = data.Id;
                        scope.address[1] = data.Name;
                        scope.updateModelValue();
                    }
                };

                scope.updateModelValue = function () {
                    var data = scope.address.join("|");
                    data = (data == "||") ? "" : data;
                    ctrl.$setViewValue(data);
                };

                loadData(scope.ngModel);
                compileFn(scope);
                element.hide().after(inputElem);
            }
        };
    }

    addressDirective.$inject = ["$compile"];
})()
