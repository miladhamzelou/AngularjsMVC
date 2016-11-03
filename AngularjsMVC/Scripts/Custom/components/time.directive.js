/**
* @desc 使用於文字欄位，提供時間格式化與時間檢核
* @example <input type="text" class="time" />
* @example <input type="text" time />
*/

(function () {
    angular
        .module("directives")
        .directive("time", timeDirective);

    function timeDirective(formatChecker, $timeout, keyinService) {
        return {
            restrict: "AC",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;

                var formatData = function (value) {
                    var result = "";
                    if (value && value.length == 4 && !isNaN(value)) {
                        result = value.substr(0, 2) + ":" + value.substr(2, 2);
                    }
                    return result;
                }

                var parseData = function (text) {
                    var value = text.replace(/:/g, "");
                    if ($.trim(value) == "") {
                        value = "";
                    }
                    return value;
                }

                ctrl.$formatters.push(function (value) {
                    return formatData(value);
                });

                ctrl.$parsers.push(function (text) {
                    return parseData(text);
                });

                ctrl.$validators.time = function (modelVal, viewVal) {
                    var valid = true;
                    if (!ctrl.$isEmpty(modelVal)) {
                        valid = formatChecker.validateTime(viewVal);
                    }
                    return valid;
                };

                element.attr("size", 5);
                element.attr("maxlength", 5);
                element.bind("blur", function () {
                    $timeout(function () {
                        scope.$apply(function () {
                            ctrl.$setViewValue(formatData(parseData(element.val())));
                            ctrl.$render();
                        });
                    });
                });
                keyinService.allowKeyinPattern(element, /(\d|\:)/);
            }
        };
    }

    timeDirective.$inject = ["formatChecker", "$timeout", "keyinService"];
})()