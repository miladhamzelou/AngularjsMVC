/**
* @desc 提供「處理中」訊息顯示。(有使用到jQuery UI)
*/

(function () {
    angular
        .module("services")
        .service("loadingService", loadingServiceProvider);

    function loadingServiceProvider(message, contentUrl) {
        var loadingMsg;
        var loadingBlocker;

        this.show = function (modal) {
            loadingMsg.show().position({ my: "center", at: "center", of: "body" });
            if (modal) {
                loadingBlocker.show();
            }
        }

        this.hide = function () {
            loadingMsg.hide();
            loadingBlocker.hide();
        }


        var createLoadingMsg = function () {
            var template = "<div class='loading-msg'>"
                + "<div><img src='" + contentUrl + "Base/images/loader.gif' class='loading-img' /></div>"
                + "<div class='loading-text'>" + message.defaults.loadingMsg + "</div></div>";
            var el = angular.element(template);
            angular.element("body").append(el);
            return el;
        }
        var createBlocker = function () {
            var template = "<div class='blocker ui-widget-overlay'></div>";
            var el = angular.element(template);
            angular.element("body").append(el);
            return el;
        }

        loadingMsg = createLoadingMsg();
        loadingBlocker = createBlocker();
    }

    loadingServiceProvider.$inject = ["message", "contentUrl"];

})()