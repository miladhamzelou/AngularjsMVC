/**
* @desc 用於Client端資料的分頁工具列，由Client端告知資料的總筆數與每頁筆數，僅提供頁數計算與分頁操作
* @example <div local-pagination="scope設定值"></div>
*/

(function () {
    angular
        .module("directives")
        .directive("localPagination", localPaginationDirective);

    function localPaginationDirective(defaultPageCount) {
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
                pagination: "=localPagination"
            },
            link: function (scope, element, attrs) {
                scope.opts = angular.extend({
                    pageSize: defaultPageCount,
                    totalItems: null,
                    length: 5,
                    auto: false,
                    toEndPage: false,
                    callback: null
                }, scope.pagination);

                scope.moveToPage = function (page) {
                    scope.opts.currentPage = page;
                    setPages();
                    scope.opts.callback(page);
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

                var setPages = function () {
                    var page = scope.opts.currentPage,
                        totalPages = scope.opts.totalPages,
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

                scope.$watchGroup(['pagination.totalItems', 'pagination.toEndPage'], function (newValues) {
                    if (scope.opts.auto) {
                        scope.opts.totalItems = newValues[0];
                        scope.opts.toEndPage = newValues[1]
                        scope.setTotalPages();
                        setPages();
                        if (scope.opts.toEndPage) { scope.moveToPage(scope.opts.totalPages) }
                        else { scope.moveToPage(1) };
                    } else {
                        scope.opts.auto = true;
                    }
                });

                scope.setTotalPages = function () {
                    if (scope.opts.totalItems) {
                        scope.opts.totalPages = Math.ceil(scope.opts.totalItems / scope.opts.pageSize);
                    } else {
                        scope.opts.totalPages = null;
                    }
                }

                scope.init = function () {
                    if (scope.opts.auto) {
                        scope.setTotalPages();
                    }
                };

                scope.init();
            }
        }
    }

    localPaginationDirective.$inject = ["defaultPageCount"];
})()