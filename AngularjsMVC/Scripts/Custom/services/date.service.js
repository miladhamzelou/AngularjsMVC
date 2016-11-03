/**
* @desc 提供日期處理相關服務(日期計算與日期格式化)
*/

(function () {
    angular
        .module("services")
        .service("dateService", dateServiceProvider);

    function dateServiceProvider($filter) {
        this.addDays = function (date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        this.addMonths = function (date, months) {
            var result = new Date(date);
            result.setMonth(result.getMonth() + months);
            return result;
        }

        this.addYears = function (date, years) {
            var result = new Date(date);
            result.setFullYear(result.getFullYear() + years);
            return result;
        }

        this.format = function (date, formatStr) {
            var result = "";
            if (date instanceof Date) {
                result = $filter("date")(date, formatStr);
            }
            return result;
        }
    }

    dateServiceProvider.$inject = ["$filter"];
})()