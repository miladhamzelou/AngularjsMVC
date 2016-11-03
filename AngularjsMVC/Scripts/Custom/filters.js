angular.module("filters", [])
.filter("skip", function () {
    return function (data, count) {
        if (angular.isArray(data) && angular.isNumber(count)) {
            if (count > data.length || count < 1) {
                return data;
            } else {
                return data.slice(count);
            }
        } else {
            return data;
        }
    }
})
.filter("take", function ($filter) {
    return function (data, skipCount, takeCount) {
        var skippedData = $filter("skip")(data, skipCount);
        return $filter("limitTo")(skippedData, takeCount);
    }
})
.filter("dateString", function () {
    return function (data) {
        var R_DATE_STR = /^(\d{4})(\d\d)(\d\d)$/;
        var match;
        var result = "";

        if (match = data.match(R_DATE_STR)) {
            result = match.slice(1).join("/");
        } else {
            result = data;
        }

        return result;
    }
})
.filter("datetimeString", function () {
    return function (data) {
        var R_DATETIME_STR = /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)$/;
        var match;
        var result = "";

        if (match = data.match(R_DATETIME_STR)) {
            result = match.slice(1, 4).join("/") + " " + match.slice(4).join(":");
        } else {
            result = data;
        }

        return result;
    }
});