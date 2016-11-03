/**
* @desc wordings translation
*/

(function () {
    angular
        .module("services")
        .service("translationService", translationServiceProvider);

    function translationServiceProvider($resource) {
        /**
         * 採用同步(Synchronous)機制取得檔案內文
         **/
        var getText = function (url) {
            var req = new XMLHttpRequest();
            try {
                req.open("GET", url, false);
                req.send(null);
            } catch (x) {
                console.warn("Ignoring exception during translationService.getText: " + x);
            }
            if (req.status == 0 || req.status == 200) {
                return req.responseText;
            } else {
                return "";
            }
        };
        /**
         * 採用同步(Synchronous)機制取得l10n_Common.json裡的wordings
         **/
        this.getCommonTranslation = function ($scope) {
            var fileName = "l10n_Common";
            this.getTranslation($scope, fileName, true);
        };
        /**
         * 取得指定某個json檔和l10n_Common.json裡的wordings
         **/
        this.getTranslationWithCommon = function ($scope, fileName, sync) {
            this.getCommonTranslation($scope);
            this.getTranslation($scope, fileName, sync);
        };
        /**
         * 取得指定某個json檔裡的wordings
         **/
        this.getTranslation = function ($scope, fileName, sync) {
            //目前只支援中文
            var language = "zh_TW";
            var path = "Content/Translations/" + language + "/" + fileName + ".json";
            var ssid = "translation_" + language + "_" + fileName;
            $scope[fileName] = {};
            if (sessionStorage) {
                // Local cache
                if (sessionStorage.getItem(ssid)) {
                    $scope[fileName] = JSON.parse(sessionStorage.getItem(ssid));
                } else {
                    if (sync) {
                        $scope[fileName] = JSON.parse(getText(path));
                        sessionStorage.setItem(ssid, JSON.stringify($scope[fileName]));
                    } else {
                        $resource(path).get(function (data) {
                            $scope[fileName] = data;
                            sessionStorage.setItem(ssid, JSON.stringify($scope[fileName]));
                        });
                    }
                }
            } else {
                if (sync) {
                    $scope[fileName] = JSON.parse(getText(path));
                } else {
                    $resource(path).get(function (data) {
                        $scope[fileName] = data;
                    });
                }
            }
        };
    }

    translationServiceProvider.$inject = ["$resource"];

})()