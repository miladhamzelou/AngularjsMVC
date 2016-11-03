/**
* @desc 提供訊息對話框、確認對話框服務
*/

(function () {
    angular
        .module("services")
        .service("dialogService", dialogServiceProvider);

    function dialogServiceProvider($rootScope) {
        var self = this;
        var globalOpts = {
            appendTo: "#main-content",
            maxHeight: 700
        };

        var createDialog = function (options) {
            if (options.kind) {
                angular
                    .element("<div></div>")
                    .html("<span class='ui-icon36 ui-icon-" + options.kind + "'></span><div class='ui-icon-indent'>" + options.message + "</div>")
                    .dialog(options);
            } else {
                angular.element("<div></div>").html(options.message).dialog(options);
            }
        }

        this.messageDialog = function (options) {
            var isCallbackExecuted = false;
            var executeCallback = function () {
                if (!isCallbackExecuted) {
                    isCallbackExecuted = true;
                    if (angular.isFunction(options.callback)) {
                        $rootScope.$apply(function () {
                            options.callback();
                        });
                    }
                }
            }

            options = angular.extend({
                kind: "information",
                title: "系統訊息",
                message: "",
                modal: true,
                callback: null,
                close: function () {
                    executeCallback();
                    $(this).dialog("destroy");
                    $(this).remove();
                },
                buttons: {
                    "確定": function () {
                        executeCallback();
                        $(this).dialog("close");
                    }
                }
            }, globalOpts, options);

            createDialog(options);
        }

        this.confirmDialog = function (options) {
            var isCallbackExecuted = false;
            var executeCallback = function (result) {
                if (!isCallbackExecuted) {
                    isCallbackExecuted = true;
                    if (angular.isFunction(options.callback)) {
                        $rootScope.$apply(function () {
                            options.callback(result);
                        });
                    }
                }
            }

            options = angular.extend({
                kind: "warning",
                title: "確認訊息",
                message: "",
                modal: true,
                callback: null,
                close: function () {
                    executeCallback(false);
                    $(this).dialog("destroy");
                    $(this).remove();
                },
                buttons: {
                    "確定": function () {
                        executeCallback(true);
                        $(this).dialog("close");
                    },
                    "取消": function () {
                        executeCallback(false);
                        $(this).dialog("close");
                    }
                }
            }, globalOpts, options);

            createDialog(options);

        }
    }

    dialogServiceProvider.$inject = ["$rootScope"];
})()