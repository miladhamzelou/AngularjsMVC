/**
* @desc 使用於文字欄位，用來在Clinet將選擇的圖檔轉成Base64，以進行圖片預覽
* @example <input type="text" imageToBase64 />
*/

(function () {
    angular
        .module("directives")
        .directive("imageToBase64", imageToBase64Directive);

    function imageToBase64Directive($q, dialogService) {
        var slice = Array.prototype.slice;
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) return;
                ngModel.$render = function () { }
                element.bind('change', function (e) {
                    var element = e.target;
                    if (element.files) {
                        if (element.files.length > 0) {
                            if (element.files[0].type.indexOf('image') == -1) {
                                dialogService.messageDialog({
                                    message: "圖片格式不符"
                                });
                                element.value = "";
                                ngModel.$setViewValue(null);

                                return;
                            }
                        }
                    }
                    else {
                        dialogService.messageDialog({
                            message: "請使用IE10以上或Firefox或Chrome等瀏覽器做圖片上傳動作"
                        });
                        return;
                    }

                    $q.all(slice.call(element.files, 0).map(readFile))
                      .then(function (values) {
                          ngModel.$setViewValue(values[0]);
                      });

                    function readFile(file) {
                        var deferred = $q.defer();
                        var reader = new FileReader()
                        reader.onload = function (e) {
                            deferred.resolve(e.target.result);
                        }
                        reader.onerror = function (e) {
                            deferred.reject(e);
                        }
                        reader.readAsDataURL(file);
                        return deferred.promise;
                    }
                });
            }
        };
    }

    imageToBase64Directive.$inject = ["$q", "dialogService"];
})()