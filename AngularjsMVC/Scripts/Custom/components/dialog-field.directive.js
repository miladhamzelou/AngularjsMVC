/**
* @desc 使用於文字欄位，用來提供自動完成輸入功能與資料查詢輸入對話框功能
* @example <input type="text" dialog-field="account" />
*/

(function () {
    angular
        .module("directives")
        .directive("dialogField", dialogFieldDirective);

    function dialogFieldDirective($compile, baseUrl, $http, autoCompleteCount, $timeout) {
        return {
            restrict: "A",
            require: "ngModel",
            scope: { ngModel: "=", nameValue: "=", isDisabled: "=ngDisabled", dialogData: "=", callback: "=", blurfill: "=" },
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;
                var kind = attrs["dialogField"],
                    kindOpt = kinds[kind],
                    div = angular.element("<div class='dialog-field' >"),
                    name = angular.element("<input type='text' ng-model='nameValue' disabled />"),
                    btn = "<button type='button' class='btn-dialog' tool-dialog='dialogOpts' extra-data='dialogData' ng-disabled='isDisabled' >...</button>";

                scope.dialogOpts = {
                    kind: kind,
                    data: scope.dialogData,
                    autoClose: true,
                    callback: function (data) {
                        scope.data = data;
                        loadData(data.Id, data.Name);
                    }
                };

                scope.$watch("ngModel", function (newValue, oldValue) {
                    if (newValue != oldValue && (!newValue || newValue == "")) {
                        scope.nameValue = "";
                    }
                });

                var loadData = function (Id, Name) {
                    scope.data.Id = Id;
                    scope.data.Name = Name;
                    scope.ngModel = Id;
                    scope.nameValue = Name;
                    if (angular.isFunction(scope.callback)) {
                        scope.callback(scope.data);
                    }
                }

                element.autocomplete({
                    source: function (request, response) {
                        if (kindOpt && kindOpt.url) {
                            $http.post(baseUrl + kindOpt.url, {
                                model: scope.dialogData,
                                term: request.term,
                                count: autoCompleteCount
                            }).success(function (list) {
                                response(list);
                            });
                        }
                    },
                    select: function (event, ui) {
                        scope.$apply(function () {
                            scope.data = ui.item;
                            loadData(ui.item.value, ui.item.name);
                        });
                    },
                    change: function (event, ui) {
                        if (!ui.item) {
                            $timeout(function () {
                                scope.$apply(function () {
                                    scope.data = {};
                                    loadData("", "");
                                });
                            });
                        }
                    },
                });

                if (kindOpt) {
                    if (!attrs["size"]) {
                        element.attr("size", kindOpt["size"] || 8);
                    }
                    name.attr("size", kindOpt["nameSize"] || 20);
                } else {
                    if (!attrs["size"]) {
                        element.attr("size", 8);
                    }
                    name.attr("size", 20);
                }

                if (scope.blurfill) {
                    element.autocomplete({
                        disabled: true
                    })
                    element.bind('blur', function () {
                        if (scope.ngModel) {
                            if (scope.ngModel.length < scope.blurfill) {
                                var dist = scope.blurfill - scope.ngModel.length;
                                for (var i = 0; i < dist; i++) {
                                    scope.ngModel = "0" + scope.ngModel;
                                }
                            }

                            if (kindOpt && kindOpt.url) {
                                $http.post(baseUrl + kindOpt.url, {
                                    model: scope.dialogData,
                                    term: scope.ngModel,
                                    count: 1
                                }).success(function (list) {
                                    var id = scope.ngModel;
                                    var name = "查無此資料";
                                    var getData = {
                                        "Id": id,
                                        "Name": name
                                    };
                                    if (list.length > 0 && list[0].value == scope.ngModel) {
                                        name = list[0].name;
                                        getData = list[0];
                                    }
                                    scope.data = getData;
                                    loadData(id, name);
                                });
                            }
                        } else {
                            scope.data = {};
                            loadData("", "");
                        }
                    });
                }

                scope.$watch("nameValue", function (value) {
                    ctrl.$setValidity("DataNotFound", value != "查無此資料");
                });

                element.after(div);
                div.append(' ').append(name).append(btn);
                $compile(div)(scope);
                div.prepend(element);
            }
        };
    }

    dialogFieldDirective.$inject = ["$compile", "baseUrl", "$http", "autoCompleteCount", "$timeout"];

    var kinds = {};
    kinds["account"] = {
        url: "AutoComplete/GetAccount",
        size: 6
    };
    kinds["adjustReason"] = {
        url: "AutoComplete/GetAdjustReason",
        size: 8
    };
    kinds["area"] = {
        url: "AutoComplete/GetArea",
        size: 5
    };
    kinds["area2"] = {
        url: "AutoComplete/GetArea2",
        size: 5
    };
    kinds["area3"] = {
        url: "AutoComplete/GetArea3",
        size: 5
    };
    kinds["bank"] = {
        url: "AutoComplete/GetBank",
        size: 3
    };
    kinds["brand"] = {
        url: "AutoComplete/GetBrand",
        size: 3,
        nameSize: 8
    };
    kinds["category"] = {
        url: "AutoComplete/GetCategory",
        size: 6
    };
    kinds["category2"] = {
        url: "AutoComplete/GetCategory2",
        size: 6
    };
    kinds["category3"] = {
        url: "AutoComplete/GetCategory3",
        size: 6
    };
    kinds["coupon"] = {
        url: "AutoComplete/GetCoupon",
        size: 14,
        nameSize: 30
    };
    kinds["dailyCashStore"] = {
        url: "AutoComplete/GetDailyCashStore",
        size: 8
    };
    kinds["diffReason"] = {
        url: "AutoComplete/GetDiffReason",
        size: 4,
        nameSize: 30
    };
    kinds["horderTanaGroup"] = {
        url: "AutoComplete/GetHorderTanaGroup",
        size: 8
    };
    kinds["itemUnit"] = {
        url: "AutoComplete/GetItemUnit",
        size: 2,
        nameSize: 4
    };
    kinds["masterDown"] = {
        url: "AutoComplete/GetMasterDown",
        size: 20
    };
    kinds["POSSubject"] = {
        url: "AutoComplete/GetPosSubject",
        size: 8
    };
    kinds["product"] = {
        url: "AutoComplete/GetProduct",
        size: 6,
        nameSize: 30
    };
    kinds["ProMMAll"] = {
        url: "AutoComplete/GetProMMAll",
        size: 12,
        nameSize: 30
    };
    kinds["ProStairAll"] = {
        url: "AutoComplete/GetProStairAll",
        size: 12,
        nameSize: 30
    };
    kinds["vnProduct"] = {
        url: "AutoComplete/GetVNProduct",
        size: 6,
        nameSize: 30
    };
    kinds["realSubVendor"] = {
        url: "AutoComplete/GetRealSubVendor",
        size: 10,
        nameSize: 30
    };
    kinds["storeByUserBM"] = {
        url: "AutoComplete/GetStoreByUserBM",
        size: 8
    };
    kinds["subVendor"] = {
        url: "AutoComplete/GetSubVendor",
        size: 10,
        nameSize: 30
    };
    kinds["subVendor_Date"] = {
        size: 10,
        nameSize: 30
    };
    kinds["team"] = {
        url: "AutoComplete/GetTeam",
        size: 8
    };
    kinds["user"] = {
        url: "AutoComplete/GetUser",
        size: 8
    };
    kinds["vendor"] = {
        url: "AutoComplete/GetVendor",
        size: 8,
        nameSize: 30
    };
    kinds["vnStore"] = {
        url: "AutoComplete/GetVNStore",
        size: 8
    };
    kinds["canTranStore"] = {
        url: "AutoComplete/GetCanTranStore",
        size: 8
    };
    kinds["voucher"] = {
        url: "AutoComplete/GetVoucher",
        size: 4
    };
    kinds["proPeriod"] = {
        url: "AutoComplete/GetProPeriod",
        size: 4
    };
    kinds["DC"] = {
        url: "AutoComplete/GetSubVendorInDC",
        size: 10
    };
    kinds["vnfSubVendor"] = {
        url: "AutoComplete/GetVNFSubVendor",
        size: 10
    };
    //TODO: 以下已列管，如需更改請洽昇峰
    kinds["store"] = {
        url: "AutoComplete/GetStore",
        size: 8
    };
    kinds["CharacterAll"] = {
        url: "AutoComplete/GetCharacterAll",
        size: 5
    };
    kinds["tana"] = {
        url: "AutoComplete/GetTanaM",
        size: 6
    };
    kinds["tanaClass"] = {
        url: "AutoComplete/GetTanaClassM",
        size: 8
    };
    kinds["StoreCalStore"] = {
        url: "AutoComplete/GetStoreCalStore",
        size: 8
    };
})()