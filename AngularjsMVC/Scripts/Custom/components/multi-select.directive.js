/**
* @desc 使用於 div 元素，提供多選的功能操作
* @example <div multi-select="{ label:func, compare:func, update:func[, max:int][, pagination:option] }">...</div>
*/

(function () {
    angular
        .module("directives")
        .directive("multiSelect", multiSelectDirective);

    function multiSelectDirective($compile, $timeout) {
        return {
            restrict: "A",
            priority: 1,
            scope: {
                multiSelect: "=",
                items: "="
            },
            template: "<div>"
                + "<div class='multi-select-selected-func'>"
                + "  <span>已選擇 <span class='text-info'>{{ selectedItems.length || 0 }}</span> 筆</span>"
                + "  <button type='button' class='btn pull-right' ng-click='clear()'><span class='btn-icon btn-icon-clear'></span>全部清除</button>"
                + "</div>"
                + "<div class='multi-select-container'>"
                + "  <div class='multi-select-items'></div>"
                + "  <div class='multi-select-selected'>"
                + "    <div class='multi-select-selected-items'>"
                + "      <div class='multi-select-selected-item' ng-repeat='item in selectedItems' ng-click='remove(item)' title='{{ multiSelect.label(item) }}'>{{ multiSelect.label(item) }}</div>"
                + "    </div>"
                + "  </div>"
                + "</div>"
                + "</div>",
            replace: true,
            transclude: true,
            link: function (scope, element, attrs, ctrl, transclude) {
                if (!angular.isFunction(scope.multiSelect.label)) {
                    throw new Error("請設定label函式");
                }

                if (!angular.isFunction(scope.multiSelect.compare)) {
                    throw new Error("請設定compare函式");
                }

                var newSelectedItems = function () {
                    scope.selectedItems = [];
                    scope.multiSelect.update(scope.selectedItems);
                }

                var findDivByClass = function (className) {
                    var divs = element.find("div");
                    var div;

                    for (var i = 0; i < divs.length; i++) {
                        if (divs.eq(i).hasClass(className)) {
                            div = divs.eq(i);
                            break;
                        }
                    }

                    return div;
                }

                var getPagination = function () {
                    var html = "<div pagination='multiSelect.pagination'></div>";
                    var compileFn = $compile(html);

                    return compileFn(scope);
                }

                var selectedDiv = findDivByClass("multi-select-selected-items");
                var itemsDiv = findDivByClass("multi-select-items");

                newSelectedItems();
                scope.toggleItem = function (item) {
                    if (isMaxItemCount()) {
                        item.isSelected = false;
                        unselectItem(item);
                    } else {
                        item.isSelected = !item.isSelected;

                        if (item.isSelected) {
                            selectItem(item);
                        } else {
                            unselectItem(item);
                        }
                    }
                }

                scope.remove = function (selectedItem) {
                    uncheckItem(selectedItem);
                }

                scope.clear = function () {
                    newSelectedItems();
                    if (scope.items) {
                        for (var i = 0; i < scope.items.length; i++) {
                            delete scope.items[i].isSelected;
                        }
                    }
                }

                transclude(scope, function (clone, scope) {
                    itemsDiv.append(clone);
                });

                if (scope.multiSelect.pagination) {
                    scope.multiSelect.pagination.callback = function (data) {
                        scope.items = data;
                    }
                    element.append(getPagination(scope));
                }

                // 有分頁或無分頁，都是利用 data driven 進行勾選項目同步，調整此處時請注意
                scope.$watch("items", function () {
                    scrollToTop(itemsDiv);
                    syncItemsBySelectedItems();
                });

                var isMaxItemCount = function () {
                    return scope.multiSelect.max && scope.multiSelect.max == scope.selectedItems.length;
                }

                var selectItem = function (item) {
                    var index = findIndexOf(scope.selectedItems, item);

                    if (index < 0) {
                        scope.selectedItems.push(item);
                        scrollToEnd(selectedDiv);
                        scope.multiSelect.update(scope.selectedItems);
                    }
                }

                var scrollToEnd = function (container) {
                    $timeout(function () {
                        container.get(0).scrollTop = container.get(0).scrollHeight;
                    });
                }

                var scrollToTop = function (container) {
                    $timeout(function () {
                        container.get(0).scrollTop = 0;
                    });
                }

                var uncheckItem = function (selectedItem) {
                    var index = findIndexOf(scope.items, selectedItem);

                    if (index >= 0) {
                        scope.items[index].isSelected = false;
                        unselectItem(scope.items[index]);
                    } else {
                        unselectItem(selectedItem);
                    }
                }

                var unselectItem = function (item) {
                    var index = findIndexOf(scope.selectedItems, item);

                    if (index >= 0) {
                        scope.selectedItems.splice(index, 1);
                        scope.multiSelect.update(scope.selectedItems);
                    }
                }

                var findIndexOf = function (items, item) {
                    var index = -1;

                    for (var i = 0; i < items.length; i++) {
                        if (scope.multiSelect.compare(item, items[i])) {
                            index = i;
                            break;
                        }
                    }

                    return index;
                }

                var syncItemsBySelectedItems = function () {
                    if (scope.items) {
                        for (var i = 0; i < scope.items.length; i++) {
                            if (findIndexOf(scope.selectedItems, scope.items[i]) >= 0) {
                                scope.items[i].isSelected = true;
                            }
                        }
                    }
                }
            }
        }
    }

    multiSelectDirective.$inject = ["$compile", "$timeout"];
})()