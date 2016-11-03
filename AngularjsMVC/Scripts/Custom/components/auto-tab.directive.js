/**
* @desc 使用於文字欄位，當輸入資料長度達到最大長度時，自動移至下一個輸入欄位
* @example <input type="text" auto-tab />
*/

(function () {
    angular
        .module("directives")
        .directive("autoTab", autoTabDirective);

    function autoTabDirective() {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var maxlength = attrs["maxlength"];
                var getNextElem = function (el) {
                    var nextElem = el.next();
                    if (!isInputAndEnabled(nextElem)) {
                        nextElem = getNextElem(nextElem);
                    }
                    return nextElem;
                };

                var isInputAndEnabled = function (el) {
                    //此部分使用jQuery處理
                    return (el && (el.is("input") || el.is("textarea")) && !el.prop("disabled"));
                }

                element.on("keyup", function (e) {
                    if (maxlength && e.keyCode != 9 && element.val().length == parseInt(maxlength)) {
                        var nextElem = getNextElem(element);
                        if (nextElem) {
                            nextElem.focus().select();
                        }
                    }
                });
            }
        };
    }
})()