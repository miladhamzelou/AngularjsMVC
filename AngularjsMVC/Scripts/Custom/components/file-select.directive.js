/**
* @desc 為容器加上選擇檔案欄位與功能，並將選擇的欄位存入指定的scope值
* @example <div file-select="存放選擇檔案的scope值">
*/

(function () {
    angular
        .module("directives")
        .directive("fileSelect", fileSelectDirective);

    function fileSelectDirective() {
        var template = '<input type="file" name="files"/>';

        return function (scope, elem, attrs) {
            var fileSelector = angular.element(template);

            elem.append(fileSelector);
            fileSelector.on('change', function (event) {
                scope.$apply(function () {
                    scope[attrs.fileSelect] = event.originalEvent.target.files;
                });
            });
        };
    }
})()