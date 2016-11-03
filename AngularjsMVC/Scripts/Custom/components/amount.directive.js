/**
* @desc 使用於文字欄位，提供金額輸入格式化顯示功能
* @example <input type="text" class="amount" />
* @example <input type="text" amount />
*/

(function () {
    angular
        .module("directives")
        .directive("amount", amountDirective);

    function amountDirective(keyinService) {
        return {
            restrict: "AC",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                //顯示千分位字元
                var addCommas = function (value) {
                    if (value) {
                        var result = "";
                        var decimals = value.indexOf('.') == -1 ? '' : value.replace(/^[-]?\d+(?=\.)/, '');
                        var integerNumbers = value.replace(/\.\d*/, '');
                        var commas = integerNumbers.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                        if (attrs["amountFloat"] && decimals) {
                            decimals = decimals.substring(0, (parseInt(attrs["amountFloat"]) + 1));
                        }
                        value = result + commas + decimals;
                    }
                    return value;
                };

                //固定顯示指定的小數點數位
                var fixFloat = function (value) {
                    if (value) {
                        var float = parseInt(attrs["amountFloat"], 10);
                        var decimals = value.split(".");
                        var decimal = "";
                        var paddingString = "";
                        if (attrs["amountFixFloat"] === "true") {
                            if (float > 0) {
                                if (decimals.length > 1) {
                                    paddingString = decimals[1].substring(0, float);
                                }
                                while (paddingString.length < float) {
                                    paddingString = paddingString + "0";
                                }
                                decimal = "." + paddingString;
                            }
                            value = decimals[0] + decimal;
                        } else {
                            if (decimals.length > 1 && decimals[1].length === 0) {
                                value = decimals[0];
                            }
                        }
                    }
                    return value;
                };

                //固定長度
                var limitLength = function (value) {
                    if (value) {
                        var maxlength = parseInt(attrs["amountMaxLength"], 10);
                        if (maxlength) {
                            value = value.substring(0, maxlength);
                        }
                    }
                    return value;
                };

                //只取得數字的字元
                var keepNumbers = function (text) {
                    var value = text;
                    if (text) {
                        value = text.replace(/(^\.)|([a-z])|([A-Z])|(,)|(\.$)/gi, "");
                        if ($.trim(value) == "") {
                            value = "";
                        }
                    }
                    return value;
                };

                //當畫面顯示或離開輸入框(lost focus)時，要再檢查小數點數位是否符合指定
                var fixFormatter = function (value) {
                    return fixFloat(formatter(value));
                };

                var formatter = function (value) {
                    return addCommas(limitLength(keepNumbers(value)));
                };

                ctrl.$formatters.unshift(fixFormatter);
                ctrl.$parsers.push(keepNumbers);

                element.addClass("text-right");
                if (!attrs["size"]) {
                    element.attr("size", 18);
                }

                element.on("blur", function () {
                    ctrl.$setViewValue(fixFormatter(element.val()));
                    ctrl.$render();
                });

                element.on("keypress", function (e) {
                    var value = this.value.replace(/\,/g, "");
                    if (e.keyCode == 46) {
                        var float = parseInt(attrs["amountFloat"], 10);
                        if (float <= 0) {
                            return false;
                        } else if (value.indexOf(".", 0) >= 0) {
                            return false;
                        }
                    }
                });

                scope.$watch(attrs["ngModel"], function (newValue, oldValue) {
                    var newAmount = parseFloat(newValue);
                    var oldAmount = parseFloat(oldValue);
                    if (newAmount != oldAmount) {
                        ctrl.$setViewValue(formatter(element.val()));
                        ctrl.$render();
                    }
                });

                if (attrs["noOperator"]) {
                    keyinService.allowKeyinPattern(element, /(\.|\d)/);
                } else {
                    keyinService.allowKeyinPattern(element, /([+-]|\.|\d)/);
                }
            }
        };
    }

    amountDirective.$inject = ["keyinService"];
})()