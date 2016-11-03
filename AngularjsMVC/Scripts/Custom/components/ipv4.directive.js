/**
* @desc 使用於文字欄位，提供IPv4 IP位置輸入與檢核
* @example <input type="text" class="ipv4" />
* @example <input type="text" ipv4 />
*/

(function () {
    angular
        .module("directives")
        .directive("ipv4", ipv4Directive);

    function ipv4Directive($compile, formatChecker) {
        return {
            restrict: "AC",
            require: "ngModel",
            scope: { ngModel: "=", isDisabled: "=ngDisabled" },
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;

                var content =
                    "<div>"
                    + "<input type='text' ng-model='ip[0]' ng-blur='updateModelValue()' ng-disabled='isDisabled' size='3' auto-tab maxlength='3' allow-pattern='\\d' /> . "
                    + "<input type='text' ng-model='ip[1]' ng-blur='updateModelValue()' ng-disabled='isDisabled' size='3' auto-tab maxlength='3' allow-pattern='\\d' /> . "
                    + "<input type='text' ng-model='ip[2]' ng-blur='updateModelValue()' ng-disabled='isDisabled' size='3' auto-tab maxlength='3' allow-pattern='\\d' /> . "
                    + "<input type='text' ng-model='ip[3]' ng-blur='updateModelValue()' ng-disabled='isDisabled' size='3' maxlength='3' allow-pattern='\\d' /> "
                    + "</div>";
                var inputElem = angular.element(content);
                var compileFn = $compile(inputElem);
                var loadData = function (data) {
                    scope.ip = ["", "", "", ""];
                    if (data) { scope.ip = data.split("."); }
                };

                scope.updateModelValue = function () {
                    var data = scope.ip.join(".");
                    data = (data == "...") ? "" : data;
                    if (!(ctrl.$isEmpty(scope.ip[0])
                        || ctrl.$isEmpty(scope.ip[1])
                        || ctrl.$isEmpty(scope.ip[2])
                        || ctrl.$isEmpty(scope.ip[3])) || data == "") {
                        ctrl.$setViewValue(data);
                    }
                };

                scope.$watchCollection("ngModel", function () {
                    loadData(scope.ngModel);
                });

                ctrl.$validators.ipv4 = function (modelVal, viewVal) {
                    var valid = true;
                    if (!ctrl.$isEmpty(modelVal)) {
                        valid = formatChecker.validateIpv4(viewVal);
                    }
                    return valid;
                };

                loadData(scope.ngModel);
                compileFn(scope);
                element.hide().after(inputElem);
            }
        };
    }

    ipv4Directive.$inject = ["$compile", "formatChecker"];
})()