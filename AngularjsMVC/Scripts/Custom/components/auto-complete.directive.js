/**
* @desc 使用於文字欄位，依據設定值提供資料自動完成功能
* @example <input type="text" autoComplete="scope設定值" />
* @require jQuery UI autocomplete
*/

(function () {
    angular
        .module("directives")
        .directive("autoComplete", autoCompleteDirective);

    function autoCompleteDirective($http, autoCompleteCount) {
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                autoComplete: "=",
                extraData: "="
            },
            link: function (scope, element, ctrl) {
                if (!ctrl) return;

                scope.opts = angular.extend({
                    source: "",
                    count: autoCompleteCount
                }, scope.autoComplete);

                element.autocomplete({
                    minLength: scope.opts.minLength,
                    source: function (request, response) {
                        $http.post(scope.opts.source, {
                            term: request.term,
                            count: scope.opts.count
                        }).success(function (list) {
                            response(list);
                        })
                    },
                    focus: function (event, ui) {
                        if (typeof scope.opts.focus == "function") {
                            scope.opts.focus(event, ui, scope);
                        }
                    },
                    select: function (event, ui) {
                        if (typeof scope.opts.select == "function") {
                            scope.opts.select(event, ui, scope);
                        }
                    },
                    change: function (event, ui) {
                        if (typeof scope.opts.change == "function") {
                            scope.opts.change(event, ui, scope);
                        }
                    }
                });
            }
        }
    }

    autoCompleteDirective.$inject = ["$http", "autoCompleteCount"];
})()