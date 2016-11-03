/**
* @desc 使用於文字欄位，讓欄位提供小月曆輸入與日期格式檢核
* @example <input type="text" class="date" />
* @example <input type="text" date />
*/

(function () {
    angular
        .module("directives")
        .directive("date", dateDirective);

    function dateDirective(contentUrl, formatChecker, $timeout, dialogService) {
        return {
            restrict: "AC",
            require: "ngModel",
            scope: { minDate: "=", maxDate: "=", dateFormat: "=", ngDisabled: "=", showMaxDate: "=" },
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;

                var DEFAULT_MAX_DATE = "9999/12/31";

                var validateData = function (value) {
                    if (validateFormat(value)) {
                        validateRange(value);
                    } else {
                        ctrl.$setValidity("dateRange", true);
                    }

                    return value;
                };

                var validateFormat = function (value) {
                    var valid = true;

                    if (!ctrl.$isEmpty(value)) {
                        if (scope.dateFormat == "yy/mm/dd") {
                            valid = formatChecker.validateDate(value)
                        }

                        if (scope.dateFormat == "yy/mm") {
                            valid = formatChecker.validateDateM(value)
                        }
                    }

                    ctrl.$setValidity("date", valid);

                    return valid;
                }

                var validateRange = function (value) {
                    var valid = true;

                    if (!ctrl.$isEmpty(value)) {
                        if (valid && !ctrl.$isEmpty(scope.minDate)) {
                            valid = formatChecker.validateLessThan(scope.minDate, value)
                        }

                        if (valid && !ctrl.$isEmpty(scope.maxDate)) {
                            valid = formatChecker.validateLessThan(value, scope.maxDate)
                        }
                    }

                    ctrl.$setValidity("dateRange", valid);

                    return valid;
                }

                function setCumtomButton() {
                    var element = $(this);
                    $timeout(function () {
                        var buttonPane = element.datepicker("widget").find(".ui-datepicker-buttonpane");
                        var btn = $('<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all js_forever_date">最大日期</button>');
                        btn.off("click")
                            .on("click", function () {
                                scope.$apply(function () {
                                    ctrl.$setViewValue(DEFAULT_MAX_DATE);
                                    ctrl.$render();
                                    //不進行檢核DEFAULT_MAX_DATE，因為此值不一定在設定的日期區間內(minDate~maxDate)
                                });
                                element.datepicker("hide");
                            });
                        btn.appendTo(buttonPane);
                    }, 1);
                }

                if (!scope.dateFormat) {
                    scope.dateFormat = "yy/mm/dd";
                }

                var options = {
                    showOn: "button",
                    dateFormat: scope.dateFormat,
                    showButtonPanel: true,
                    buttonImage: contentUrl + "base/images/date.gif",
                    buttonImageOnly: true,
                    disabled: scope.ngDisabled ? scope.ngDisabled : false,
                    changeYear: true,
                    changeMonth: true,
                    onSelect: function (value) {
                        $timeout(function () {
                            scope.$apply(function () {
                                ctrl.$setViewValue(value);
                                validateData(value);
                            });
                        });
                    }
                };

                if (scope.dateFormat == "yy/mm/dd") {
                    options.minDate = scope.minDate;
                    options.maxDate = scope.maxDate;
                }

                element.datepicker(options).attr("size", scope.dateFormat ? scope.dateFormat.length + 4 : 12);

                element.on("blur", function () {
                    var value = element.val();

                    if (value.length == 8 && !isNaN(value) && scope.dateFormat == "yy/mm/dd") {
                        value = value.substr(0, 4) + "/" + value.substr(4, 2) + "/" + value.substr(6, 2);
                    }

                    if (value.length == 6 && !isNaN(value) && scope.dateFormat == "yy/mm") {
                        value = value.substr(0, 4) + "/" + value.substr(4, 2);
                    }

                    element.val(value);
                    $timeout(function () {
                        scope.$apply(function () {
                            ctrl.$setViewValue(value);
                            validateData(value);
                        });
                    });
                });

                scope.$watch("ngDisabled", function (newValue) {
                    element.datepicker("option", "disabled", newValue);
                });

                if (scope.dateFormat == "yy/mm/dd") {
                    scope.$watch("minDate", function (newValue) {
                        element.datepicker("option", "minDate", newValue);
                    });

                    scope.$watch("maxDate", function (newValue) {
                        element.datepicker("option", "maxDate", newValue);
                    });
                    //"促銷各活動明細"會動態變更showMaxDate屬性值
                    scope.$watch("showMaxDate", function (newValue) {
                        if (newValue === true || newValue === "true") {
                            element.datepicker("option", "showButtonPanel", true);
                            if (!scope.maxDate) {
                                //請不要直接設定scope.maxDate，因為此directive會將DEFAULT_MAX_DATE值直接帶入model裡，
                                //此行為會影響"促銷共通主檔"是否有變更的檢核
                                element.datepicker("option", "maxDate", DEFAULT_MAX_DATE);
                            }
                            element.datepicker("option", "beforeShow", setCumtomButton);
                            element.datepicker("option", "onChangeMonthYear", setCumtomButton);
                        } else {
                            element.datepicker("option", "beforeShow", null);
                            element.datepicker("option", "onChangeMonthYear", null);
                        }
                    });
                }
            }
        };
    }

    dateDirective.$inject = ["contentUrl", "formatChecker", "$timeout", "dialogService"];
})()
