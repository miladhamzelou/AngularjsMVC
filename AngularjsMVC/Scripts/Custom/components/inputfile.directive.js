/**
* @desc 使用於檔案欄位，用來顯示檔案操作的提示訊息
* @example <input type="file" class="inputfile" />
*/

(function () {
    angular
        .module("directives")
        .directive("inputfile", inputfileDirective);

    function inputfileDirective($compile) {
        return {
            restrict: "C",
            require: "ngModel",
            scope: { ngModel: "=" },
            link: function (scope, element, attrs, ctrl) {
                var eId = element[0].id;
                var showDefaultLabel = false;
                var $content = angular.element("<label class='btn' for='" + eId + "'>選擇檔案</label>"
                            + "<label class='text-info'>{{fileName}}</label>");
                $content.insertAfter(element);
                $compile($content)(scope);
                
                element.on("change", function (e) {
                    var currentElement = e.target;
                    if (currentElement) {
                        ctrl.$setViewValue(currentElement.files);
                    } else {
                        ctrl.$setViewValue(null);
                    }
                    ctrl.$render();
                });

                scope.$watch("ngModel", function (newValue, oldValue) {
                    if (newValue != oldValue && newValue) {
                        if (newValue.length > 0) {
                            showDefaultLabel = true;
                        } else {
                            showDefaultLabel = false;
                        }
                    } else {
                        showDefaultLabel = false;
                    }

                    if (showDefaultLabel) {
                        scope.fileName = newValue[0].name;
                    } else {
                        scope.fileName = "未選擇任何檔案";
                        angular.element("#" + eId).val("");
                    }
                });
            }
        };
    }

    inputfileDirective.$inject = ["$compile"];
})()