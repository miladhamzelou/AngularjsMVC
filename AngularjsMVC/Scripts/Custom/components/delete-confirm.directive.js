/**
* @desc 使用於刪除功能，提供刪除操作前的確認對話框，確認後才會繼續處理
* @example <button type="button" delete-confirm>刪除</button>
*/

(function () {
    angular
        .module("directives")
        .directive("deleteConfirm", deleteConfirmDirective);

    function deleteConfirmDirective(dialogService, message) {
        return {
            priority: 1,
            restrict: 'A',
            scope: {
                ngClick: '&'
            },
            link: function (scope, element, attrs) {
                element.unbind("click").bind("click", function ($event) {
                    $event.preventDefault();

                    dialogService.confirmDialog({
                        message: message.defaults.deleteConfirm,
                        callback: function (confirmed) {
                            if (confirmed) {
                                scope.ngClick();
                            }
                        }
                    });
                });

                element.addClass("btn-danger");
            }
        }
    }

    deleteConfirmDirective.$inject = ["dialogService", "message"];
})()