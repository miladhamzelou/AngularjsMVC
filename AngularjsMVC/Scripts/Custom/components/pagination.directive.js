/**
* @desc 根據scope設定值進行資料分頁處理。
* @example <div pagination="scope設定值"></div>
*/

(function () {
    angular
        .module("directives")
        .directive("pagination", paginationDirective);

    function paginationDirective($http, defaultPageCount) {
        return {
            restrict: "A",
            template: "<div class='pagin-bar pull-right' ng-if='opts.totalPages'>"
                    + "  <div ng-if='opts.totalPages>1' class='pagin-bar-group'>"
                    + "    <div class='pagin-bar-group' ng-class=\"'btn-group-'+opts.size\">"
                    + "      <button type='button' class='btn-pagin' ng-disabled='opts.currentPage == 1' ng-click='movePre()'>&lt;</button>"
                    + "      <button type='button' class='btn-pagin' ng-show='opts.start > 1' ng-click='moveToPage(1)'>1</button>"
                    + "<button type='button' class='btn-pagin' ng-show='opts.preZone != opts.start' ng-click='moveToPage(opts.preZone)'>...</button>"
                    + "<button type='button' ng-repeat='page in opts.pages' class='btn-pagin' "
                    + "  ng-class='(page==opts.currentPage) ? \"btn-active\" : \"\"' "
                    + "  ng-disabled='page==opts.currentPage' "
                    + "  ng-click='moveToPage(page)'>{{ page }}</button>"
                    + "<button type='button' class='btn-pagin' ng-show='opts.nextZone != opts.end' ng-click='moveToPage(opts.nextZone)'>...</button>"
                    + "<button type='button' class='btn-pagin' ng-show='opts.totalPages > opts.end' ng-click='moveToPage(opts.totalPages)'>{{ opts.totalPages }}</button>"
                    + "      <button type='button' class='btn-pagin' ng-disabled='opts.currentPage == opts.totalPages' ng-click='moveNext()'>&gt;</button>"
                    + "    </div>"
                    + "    <div class='pagin-bar-group'>"
                    + "      <input type='text' placeholder='頁碼' ng-model='opts.goPage' size='5' />"
                    + "      <span>"
                    + "        <button class='btn-pagin' type='button' ng-click='go()'>Go</button>"
                    + "      </span>"
                    + "    </div>"
                    + "  </div>"
                    + "  <div class='pagin-bar-group'><p class='text-muted'><span ng-bind='opts.totalItems'></span>筆/共<span ng-bind='opts.totalPages'></span>頁</p></div>"
                    + "</div><div class='clearfix'></div>",
            scope: {
                pagination: "="
            },
            link: function (scope, element, attrs) {
                scope.opts = angular.extend({
                    pageSize: defaultPageCount,
                    position: "both",   // top/bottom/both
                    size: "sm",         // bootstrap size: lg/md/sm/xs
                    length: 5,
                    auto: false,
                    url: "",
                    data: {},
                    callback: null
                }, scope.pagination);

                scope.moveToPage = function (page) {
                    var params = "pageSize=" + scope.opts.pageSize + "&currentPage=" + page;

                    params = (scope.opts.url.indexOf("?") < 0) ? "?" + params : "&" + params;
                    $http.post(scope.opts.url + params, scope.opts.data).success(function (pageInfo) {
                        if (angular.isFunction(scope.opts.callback)) {
                            updatePagingInfo(pageInfo);
                            setPages(pageInfo);
                            scope.opts.callback(pageInfo.Items, pageInfo.ExtraData);
                        }
                    });
                };

                scope.go = function () {
                    page = parseInt(scope.opts.goPage);
                    if (!isNaN(page)) {
                        if (page > scope.opts.totalPages) {
                            page = scope.opts.totalPages;
                        }
                        if (page < 1) {
                            page = 1;
                        }
                        scope.moveToPage(page);
                    }
                };

                scope.movePre = function () {
                    scope.moveToPage(scope.opts.currentPage - 1);
                };

                scope.moveNext = function () {
                    scope.moveToPage(scope.opts.currentPage + 1);
                };

                var updatePagingInfo = function (pagingInfo) {
                    scope.opts.currentPage = pagingInfo.CurrentPage;
                    scope.opts.totalItems = pagingInfo.TotalItems;
                    scope.opts.totalPages = pagingInfo.TotalPages;
                };

                var setPages = function (pagingInfo) {
                    var page = pagingInfo.CurrentPage,
                        totalPages = pagingInfo.TotalPages,
                        pageZone = (page % scope.opts.length == 0) ? (page - 1) / scope.opts.length : page / scope.opts.length,
                        start = Math.floor(pageZone) * scope.opts.length + 1,
                        end = Math.ceil(pageZone) * scope.opts.length;

                    start = start > totalPages ? totalPages : start;
                    end = end > totalPages ? totalPages : end;
                    scope.opts.pages = [];
                    scope.opts.preZone = start > 1 ? start - 1 : start;
                    scope.opts.nextZone = end < totalPages - 1 ? end + 1 : end;
                    scope.opts.start = start;
                    scope.opts.end = end;

                    for (var i = start; i <= end; i++) {
                        scope.opts.pages.push(i);
                    }
                }

                scope.$watch("pagination.data", function (newVal) {
                    if (scope.opts.auto) {
                        if (newVal) {
                            scope.opts.data = newVal;
                            scope.moveToPage(1);
                        } else {
                            //隱藏分頁的element
                            scope.opts.totalPages = 0;
                        }
                    } else {
                        scope.opts.auto = true;
                    }
                });
            }
        }
    }

    paginationDirective.$inject = ["$http", "defaultPageCount"];
})()