(function () {
    angular.module("topPos")
    .config(appConfig);

    function appConfig($httpProvider) {
        $httpProvider.interceptors.push(loadingMsgInterceptor);
        $httpProvider.interceptors.push(responseErrorInterceptor);
        $httpProvider.interceptors.push(resetTimeoutInterceptor);
    }

    appConfig.$inject = ["$httpProvider"];

    // $http error公用處理
    var responseErrorInterceptor = function ($q, $window, baseUrl, dialogService) {
        return {
            responseError: function (rejection) {
                var msg = "<div>" + rejection.data + "</div>";
                var callback = null;
                var width = msg.length > 200 ? 600 : 300;

                switch (rejection.status) {
                    case 400:   //Bad Request
                        if (angular.isArray(rejection.data) && rejection.data.length > 1) {
                            msg = "<div style='padding:0 20px;'><ol><li>" + rejection.data.join("</li><li>") + "</li></ol></div>";
                        }
                        width = 600;
                        break;
                    case 401:   //Unauthorized
                        var data = angular.fromJson(rejection.data);
                        msg = "<div>" + data[0] + "</div>";
                        callback = function () {
                            $window.location = baseUrl;
                        }
                        width = msg.length > 200 ? 600 : 300;
                        break;
                    case 403:   //Forbidden
                        var data = angular.fromJson(rejection.data);
                        msg = "<div>" + data[0] + "</div>";
                        width = msg.length > 200 ? 600 : 300;
                        break;
                }

                dialogService.messageDialog({
                    kind: "error",
                    width: width,
                    title: "錯誤訊息",
                    message: msg,
                    modal: true,
                    callback: callback
                });
                return $q.reject(rejection);
            }
        }
    }

    responseErrorInterceptor.$inject = ["$q", "$window", "baseUrl", "dialogService"];

    // ajax處理中訊息
    var loadingMsgInterceptor = function ($q, message, contentUrl, loadingService) {

        var getModalSetting = function (config) {
            var modal = false;
            if (config.modal) {
                modal = true;
            }
            return modal;
        }

        return {
            request: function (config) {
                if (!(angular.isDefined(config.disableLoading) && config.disableLoading)) {
                    loadingService.show(getModalSetting(config));
                }

                return config;
            },
            requestError: function (rejection) {
                loadingService.hide();
                return $q.reject(rejection);
            },
            response: function (response) {
                loadingService.hide();
                return response;
            },
            responseError: function (rejection) {
                loadingService.hide();
                return $q.reject(rejection);
            }
        };
    }

    loadingMsgInterceptor.$inject = ["$q", "message", "contentUrl", "loadingService"];

    // 重置 session timeout 倒數計時
    var resetTimeoutInterceptor = function (countdownService) {
        return {
            response: function (response) {
                countdownService.scheduleDialog();
                return response;
            }
        }
    }

    resetTimeoutInterceptor.$inject = ["countdownService"];
})()