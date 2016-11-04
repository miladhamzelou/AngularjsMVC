/**
* @desc 自訂tag，用來選擇與上傳圖檔
* @example <image-upload ...></image-upload>
*/

(function () {
    angular
        .module("directives")
        .directive("imageUpload", imageUploadDirective);

    function imageUploadDirective($compile) {
        return {
            restrict: 'E',
            require: ["ngModel"],
            scope: {
                ngModel: "=",
                maxSize: "=",
                imgFile: "=",
                isDisabled: "=ngDisabled",
                isRequired: "=ngRequired"
            },
            link: function (scope, element, attrs, ctrl) {
                var defaultLabel = 'No File Chosen';
                var water = attrs["water"];
                var content =
                "<label class='btn' ng-disabled='isDisabled'>Choose File"
                + "<input type='file' style='display:none;' ng-change='changeFile()' ng-model='imageUrl' accept='image/*' image-model='imgFile' image-to-base64 ng-disabled='isDisabled' ng-required='isRequired'/></label>"
                + "<label class='text-info'>{{fileTextName}}</label>"
                + "<button class='btn' ng-disabled='!imageUrl || isDisabled' ng-click='clearFile()' ><span class='btn-icon btn-icon-delete'></span>clear</button><br/>"

                if (water != null) {
                    content += " <div back-img ng-model='imageUrl'>backimg</div>";
                }
                else {
                    content += "<img src='{{imageUrl}}' />";
                }

                inputElem = angular.element(content);
                if (scope.maxSize) {
                    inputElem.css({
                        'max-width': scope.maxSize + 'px',
                        'max-height': scope.maxSize + 'px'
                    });
                }              

                compileFn = $compile(inputElem);

                scope.fileTextName = "No File Chosen";
                scope.clearFile = function () {
                    scope.ngModel = null;
                    scope.imageUrl = null;
                    scope.imgFile = null;
                    scope.fileTextName = defaultLabel;
                };

                scope.changeFile = function () {
                    if (scope.imgFile) {
                        scope.fileTextName = scope.imgFile.name;
                    }
                    else {
                        scope.clearFile();
                    }
                };

                scope.$watch("ngModel", function (newVal) {
                    scope.imageUrl = newVal;
                });

                scope.$watch("imageUrl", function (newVal) {
                    scope.ngModel = newVal;
                    if (newVal) {
                        if (!scope.imgFile) {
                            scope.fileTextName = newVal.replace(/(^.*[\\\/])|(\?.*$)/g, '');
                        }
                    } else {
                        scope.fileTextName = defaultLabel;
                    }
                });

                compileFn(scope);
                element.hide().after(inputElem);
            }
        };
    }

    imageUploadDirective.$inject = ["$compile"];
})()