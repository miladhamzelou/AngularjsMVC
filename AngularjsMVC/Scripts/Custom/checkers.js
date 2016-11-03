function InvalidError(message) {
    this.name = "InvalidError";
    this.message = message;
}
InvalidError.prototype = new Error();

function FormatChecker() {
    this.validateDate = function (value) {
        var R_DATE_STR = /^(\d{4})-(\d\d)-(\d\d)$/;
        var valid = false;

        if (value.length == 8) {
            value = value.substr(0, 4) + "-" + value.substr(4, 2) + "-" + value.substr(6, 2);
        } else {
            //截取出年月日(分隔符號可以是"/", "-", ".") 年月日缺一不可
            value = value
                .replace(new RegExp("\\/", "g"), "-")
                .replace(new RegExp("\\.", "g"), "-");
        }

        var match;
        if (match = value.match(R_DATE_STR)) {
            if (match.length != 4) { return false; }
            var year = parseInt(match[1], 10);
            var month = parseInt(match[2], 10) - 1;  //javascript的月份為0-11
            var day = parseInt(match[3], 10);
            //日期不合理時, javascript會自動猜測可能的日期，所以藉由日期是否被合理化而與原本不同來判斷日期是否正確
            var dteDate = new Date(year, month, day);
            valid = ((day == dteDate.getDate()) && (month == dteDate.getMonth()) && (year == dteDate.getFullYear()));
        }

        return valid;
    }

    this.validateDateM = function (value) {
        var R_DATE_M_STR = /^(\d{4})-(\d\d)$/;
        var valid = false;

        //截取出年月(分隔符號可以是"/", "-", ".") 年月缺一不可
        value = value
            .replace(new RegExp("\\/", "g"), "-")
            .replace(new RegExp("\\.", "g"), "-");

        var match;
        if (match = value.match(R_DATE_M_STR)) {
            if (match.length != 3) { return false; }
            var year = parseInt(match[1], 10);
            var month = parseInt(match[2], 10) - 1;  //javascript的月份為0-11
            //日期不合理時, javascript會自動猜測可能的日期，所以藉由日期是否被合理化而與原本不同來判斷日期是否正確
            var dteDate = new Date(year, month, 1);
            valid = ((month == dteDate.getMonth()) && (year == dteDate.getFullYear()));
        }

        return valid;
    }

    this.validateTime = function (value) {
        var R_TIME_STR = /^(\d{2}):?(\d{2})$/;
        var valid = false;
        var match;

        if (value.length == 4) {
            value = value.substr(0, 2) + ":" + value.substr(2, 2);
        }

        if (match = value.match(R_TIME_STR)) {
            valid = (parseInt(match[1], 10) < 24 && parseInt(match[2], 10) < 60);
        }

        return valid;
    }

    this.validateDateTime = function (value) {
        var valid = false;

        if (value && value.length == 16) {
            valid = this.validateDate(value.substr(0, 10)) && this.validateTime(value.substr(11, 5));
        } else if (value && value.length == 12) {
            valid = this.validateDate(value.substr(0, 8)) && this.validateTime(value.substr(8, 4));
        }

        return valid;
    }

    this.validateIpv4 = function (value) {
        var R_IPV4_STR = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
        var valid = false;
        var match;

        var validateRange = function (data) {
            data = parseInt(data, 10);
            return (0 <= data && data <= 255);
        };

        if (match = value.match(R_IPV4_STR)) {
            valid = (validateRange(match[1])
                && validateRange(match[2])
                && validateRange(match[3])
                && validateRange(match[4]));
        }

        return valid;
    }

    this.validateNumber = function (value) {
        var valid = false;

        valid = !isNaN(value);

        return valid;
    }

    this.validateDigit = function (value) {
        var R_DIGIT_STR = /^\d+$/;
        var valid = false;

        valid = R_DIGIT_STR.test(value);

        return valid;
    }

    this.validateInteger = function (value) {
        var valid = false;
        if (!isNaN(value) && value.toString().indexOf('.') == -1)
            valid = true;
        return valid;
    }

    this.validateFloat = function (value, numOfDigits, floatLength) {
        var R_FLOAT_STR;
        var valid = false;

        if (numOfDigits == undefined || isNaN(numOfDigits)) {
            R_FLOAT_STR = new RegExp("^[+-]?\\d+(\\.\\d+)?$");
        } else {
            var intLength = floatLength ? "{1," + (parseInt(floatLength) - parseInt(numOfDigits)) + "}" : "+";

            R_FLOAT_STR = new RegExp("^[+-]?\\d" + intLength + "(\\.\\d{1," + numOfDigits + "})?$");
        }

        valid = R_FLOAT_STR.test(value);

        return valid;
    }

    this.validateAlphaNumeric = function (value) {
        var R_ALPHANUMERIC_STR = /[^a-z\d]/i;
        var valid = false;

        valid = !R_ALPHANUMERIC_STR.test(value);

        return valid;
    }

    this.validateLessThan = function (startValue, endValue) {
        var valid = true;

        if (startValue && endValue) {
            if (isNaN(startValue) || isNaN(endValue)) {
                valid = startValue.toString().localeCompare(endValue.toString()) <= 0;
            } else {
                valid = Number(startValue) <= Number(endValue);
            }
        }
        return valid;
    }

    this.validateFixLength = function (value, length) {
        return value.length == length;
    }
}

function DataChecker() {
    var self = this;
    var _errors = [];
    var _throwError = false;
    var _l10nList = null;

    this.setL10nList = function (value) {
        _l10nList = value;
    }

    this.thorwError = function (value) {
        _throwError = value;
    }

    this.addError = function (message) {
        if (_throwError) {
            throw new InvalidError(message);
        } else {
            if (_errors.indexOf(message) < 0) {
                _errors.push(message);
            }
        }
    }

    this.getErrors = function () {
        var result;

        if (_l10nList) {
            result = _translateFroml10n();
        } else {
            result = _errors;
        }

        return result;
    }

    this.getErrorsAsUl = function () {
        var ul = "";
        var items = this.getErrors();

        if (items.length > 1) {
            ul = "<ul class='error-list'><li>" + items.join("</li><li>") + "</li></ul>";
        } else if (items.length == 1) {
            ul = items[0];
        }

        return ul;
    }

    this.getErrorMessage = function (error) {
        return _translateError(error);
    }

    this.isPassed = function () {
        return _errors.length == 0;
    }
    
    this.clearErrors = function () {
        _errors = [];
    }

    var _translateFroml10n = function () {
        var result = [];

        for (var i = 0; i < _errors.length; i++) {
            result.push(_translateError(_errors[i]));
        }

        return result;
    }

    var _translateError = function (error) {
        var result;

        if (_l10nList instanceof Array) {
            for (var i = 0; i < _l10nList.length; i++) {
                result = _translate(error, _l10nList[i]);
                if (result) {
                    break;
                }
            }
        } else {
            result = _translate(error, _l10nList);
        }

        if (!result) {
            result = error;
        }

        return result;
    }

    var _translate = function (error, l10n) {
        var result = l10n[error] || "";
        return result
    }
}
DataChecker.prototype = new FormatChecker();

angular.module("checkers", [])
.factory("formatChecker", function () {
    return new FormatChecker();
});