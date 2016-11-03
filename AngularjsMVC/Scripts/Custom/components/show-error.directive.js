/**
* @desc 用來顯示欄位檢核錯誤，顯示對應的錯誤訊息
* @example <show-error for="要檢核欄位的name"></show-error>
*/

(function () {
    angular
        .module("directives")
        .directive("showError", showErrorDirective);

    function showErrorDirective(message) {
        return {
            restrict: "E",
            require: "^form",
            template: "<div class='error'>{{getError()}}</div>",
            replace: true,
            scope: true,
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;

                scope.getError = function () {
                    var field = ctrl[attrs["for"]];
                    var errMsg = "";

                    if (field && field.$dirty && field.$error) {
                        errMsg = message.getValidateMsg(field, element).join(";");
                    }

                    return errMsg.replace(/(^;|;$)/g,'');
                };
            }
        };
    }

    showErrorDirective.$inject = ["message"];
})()

