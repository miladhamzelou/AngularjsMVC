/**
* @desc 使用於檔案欄位，用來限定只能輸入圖檔
* @example <input type="file" image-model="scope屬性值" />
*/

(function () {
    angular
        .module("directives")
        .directive("imageModel", imageModelDirective);

    function imageModelDirective($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch("imageUrl", function (newVal) {
                    if (!newVal)
                        element[0].value = "";
                });
                var model = $parse(attrs.imageModel);
                var modelSetter = model.assign;
                element.bind('change', function () {
                    var isImageFile = false;
                    if (element[0].files) {
                        if (element[0].files.length > 0) {
                            if (element[0].files[0].type.indexOf('image') == 0) {
                                isImageFile = true;
                            }
                        }
                    }

                    if (isImageFile) {
                        scope.$apply(function () {
                            modelSetter(scope, element[0].files[0]);
                        });
                    } else {
                        scope.$apply(function () {
                            modelSetter(scope, null);
                        });
                    }

                });
            }
        };
    }

    imageModelDirective.$inject = ["$parse"];
})()