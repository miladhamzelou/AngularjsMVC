/**
* @desc 提供資料上鎖與解鎖服務
*/

(function () {
    angular
        .module("services")
        .service("lockDataService", lockDataServiceProvider);

    function lockDataServiceProvider($q, $log, $http, baseUrl, message, dialogService) {
        var keyData = null;

        this.lock = function (postData) {
            var deferred = $q.defer();

            this.unlock().then(
                function (response) {
                    _sendLockRequest(postData).then(function (response) {
                        if (response.data.Success) {
                            $log.info("[lockDataService] 資料上鎖成功")
                            keyData = response.data.Item;
                            deferred.resolve();
                        } else {
                            _showDataLockedMsg(response.data.Item.UserNm);
                            deferred.reject();
                        };
                    });
                },
                function () {
                    deferred.reject();
                }
            );

            return deferred.promise;
        }

        this.unlock = function () {
            var deferred = $q.defer();

            if (keyData)
            {
                _sendUnlockRequest().then(function (response) {
                    if (response.data.Success) {
                        keyData = null;
                        $log.info("[lockDataService] 資料解鎖成功")
                        deferred.resolve();
                    } else {
                        $log.error("[lockDataService] 資料解鎖失敗")
                        deferred.reject();
                    }
                });
            }
            else
            {
                deferred.resolve();
            }

            return deferred.promise;
        }

        this.check = function (postData) {
            var deferred = $q.defer();

            _sendCheckRequest(postData).then(
                function (response) {
                    if (response.data.length == 0) {
                        deferred.resolve();
                    } else {
                        var userNames = [];

                        angular.forEach(response.data, function (item) {
                            if (userNames.indexOf(item.UserNm) < 0) {
                                userNames.push(item.UserNm);
                            }
                        });

                        _showDataLockedMsg(userNames.join(", "));
                        deferred.reject();
                    }
                },
                function () {
                    deferred.reject();
                });

            return deferred.promise;
        }

        var _sendLockRequest = function (postData) {
            return $http.post(baseUrl + "DataHandle/LockData", postData);
        }

        var _sendUnlockRequest = function () {
            return $http.post(baseUrl + "DataHandle/UnlockData", keyData);
        }

        var _sendCheckRequest = function (postData) {
            return $http.post(baseUrl + "DataHandle/Check", postData);
        }

        var _showDataLockedMsg = function (names) {
            dialogService.messageDialog({
                kind: "warnning",
                width: 340,
                message: message.defaults.dataLocked([names])
            });
        }
    }

    lockDataServiceProvider.$inject = ["$q", "$log", "$http", "baseUrl", "message", "dialogService"];
})()