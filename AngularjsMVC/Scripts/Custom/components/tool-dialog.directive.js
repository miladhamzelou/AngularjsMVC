/**
* @desc 使用於有click事件的元素，用來開啟公用的資料請選擇對話框
* @example <button type="button" tool-dialog="account"  />
* @example <input type="text" tool-dialog="account"  />
*/

(function () {
    angular
        .module("directives")
        .directive("toolDialog", toolDialogDirective);

    function toolDialogDirective($compile, $http, baseUrl) {
        return {
            scope: {
                toolDialog: "=",
                extraData: "="
            },
            link: function (scope, element, attrs) {
                var kind = kinds[scope.toolDialog.kind],
                    contentElem;

                scope.toolDialogData = null;

                // 供 sub controller 設定回傳資料
                scope.setToolDialogData = function (data) {
                    scope.toolDialogData = data;
                }

                // 供 sub controller 設定回傳資料並關閉對話框
                scope.setToolDataAndClose = function (data) {
                    scope.setToolDialogData(data);
                    scope.toolDialogCallback();
                    contentElem.dialog("close");
                }

                scope.toolDialogCallback = function () {
                    if (angular.isFunction(scope.toolDialog.callback)) {
                        scope.toolDialog.callback(scope.toolDialogData, scope.extraData);
                    }
                }

                var createDialog = function () {
                    var buttons = [];

                    if (!scope.toolDialog.autoClose) {
                        buttons.push({
                            text: "確定",
                            click: function () {
                                scope.$apply(function () {
                                    scope.toolDialogCallback();
                                });
                                $(this).dialog("close");
                            }
                        });
                    }

                    buttons.push({
                        text: "離開",
                        click: function () {
                            $(this).dialog("close");
                        }
                    });

                    var dialogOptions = {
                        title: kind.title,
                        appendTo: "#main-content-view",
                        autoOpen: false,
                        width: kind.width || 500,
                        height: kind.height || 620,
                        maxHeight: kind.maxHeight || 620,
                        modal: true,
                        buttons: buttons
                    };

                    if (attrs["destroyDialog"] == "true") {
                        dialogOptions["close"] = function () {
                            contentElem = null;
                            $(this).dialog("destroy");
                            $(this).remove();
                        };
                    }

                    $http.get(baseUrl + kind.url).success(function (html) {
                        contentElem = angular.element("<div class='ui-tool-dialog'>" + html + "</div>");
                        var compileFn = $compile(contentElem);

                        compileFn(scope);
                        contentElem.dialog(dialogOptions);

                        contentElem.dialog("open");
                    });
                }

                element.bind("click", function () {
                    if (!contentElem) {
                        createDialog();
                    } else {
                        contentElem.dialog("open");
                    }
                });
            }
        }
    }

    toolDialogDirective.$inject = ["$compile", "$http", "baseUrl"];

    var kinds = {};
    kinds["account"] = {
        "url": "Dialog/AccountDialog",
        "title": "請選擇會計科目"
    };
    kinds["accountList"] = {
        "url": "Dialog/AccountListDialog",
        "title": "請選擇會計科目"
    };
    kinds["adjustReason"] = {
        "url": "Dialog/AdjustReasonDialog",
        "title": "請選擇庫調原因"
    };
    kinds["adjustReasonList"] = {
        "url": "Dialog/AdjustReasonListDialog",
        "title": "請選擇庫調原因"
    };
    kinds["area"] = {
        "url": "Dialog/AreaDialog",
        "title": "請選擇群組"
    };
    kinds["area2"] = {
        "url": "Dialog/Area2Dialog",
        "title": "請選擇Team別"
    };
    kinds["area2List"] = {
        "url": "Dialog/Area2ListDialog",
        "title": "請選擇Team別"
    };
    kinds["area3"] = {
        "url": "Dialog/Area3Dialog",
        "title": "請選擇區組"
    };
    kinds["area3List"] = {
        "url": "Dialog/Area3ListDialog",
        "title": "請選擇區組"
    };
    kinds["areaList"] = {
        "url": "Dialog/AreaListDialog",
        "title": "請選擇群組"
    };
    kinds["bank"] = {
        "url": "Dialog/BankDialog",
        "title": "請選擇銀行別"
    };
    kinds["brand"] = {
        "url": "Dialog/BrandDialog",
        "title": "請選擇品牌"
    };
    kinds["category"] = {
        "url": "Dialog/CategoryDialog",
        "title": "請選擇大分類"
    };
    kinds["category2"] = {
        "url": "Dialog/Category2Dialog",
        "title": "請選擇中分類"
    };
    kinds["Category2Barcode"] = {
        "url": "Dialog/Category2BarcodeDialog",
        "title": "商品條碼/中分類"
    };
    kinds["category2List"] = {
        "url": "Dialog/Category2ListDialog",
        "title": "請選擇中分類"
    };
    kinds["category3"] = {
        "url": "Dialog/Category3Dialog",
        "title": "請選擇小分類"
    };
    kinds["category3List"] = {
        "url": "Dialog/Category3ListDialog",
        "title": "請選擇小分類"
    };
    kinds["categoryAllList"] = {
        "url": "Dialog/CategoryAllListDialog",
        "title": "請選擇分類"
    };
    kinds["categoryList"] = {
        "url": "Dialog/CategoryListDialog",
        "title": "請選擇大分類",
        "width": 800
    };
    kinds["categoryLv1"] = {
        "url": "Dialog/CategoryLv1Dialog",
        "title": "勾選大分類"
    };
    kinds["categoryLv1AndLv2"] = {
        "url": "Dialog/CategoryLv1AndLv2Dialog",
        "title": "勾選大/中分類"
    };
    kinds["coupon"] = {
        "url": "Dialog/CouponDialog",
        "title": "請選擇Coupon"
    };
    kinds["couponHis"] = {
        "url": "Dialog/CouponHisDialog",
        "title": "Coupon履歷查詢"
    };
    kinds["couponList"] = {
        "url": "Dialog/CouponListDialog",
        "title": "請選擇Coupon"
    };
    kinds["dailyCashStore"] = {
        "url": "Dialog/DailyCashStoreDialog",
        "title": "請選擇門市"
    };
    kinds["diffReason"] = {
        "url": "Dialog/DiffReasonDialog",
        "title": "請選擇差異原因"
    };
    kinds["ecFee"] = {
        "url": "Dialog/ECFeeDialog",
        "title": "請選擇清算日期"
    };
    kinds["horderTanaGroup"] = {
        "url": "Dialog/HorderTanaGroupDialog",
        "title": "請選擇主配檯帳群組"
    };
    kinds["horderTanaGroupList"] = {
        "url": "Dialog/HorderTanaGroupListDialog",
        "title": "請選擇主配檯帳群組"
    };
    kinds["HorderTypeWithDate"] = {
        "url": "Dialog/HorderTypeWithDateDialog",
        "title": "主配類型選取"
    };
    kinds["icfa"] = {
        "url": "Dialog/IcfaDialog",
        "title": "請選擇清算日期"
    };
    kinds["icfc"] = {
        "url": "Dialog/IcfcDialog",
        "title": "請選擇清算日期"
    };
    kinds["itemUnit"] = {
        "url": "Dialog/ItemUnitDialog",
        "title": "請選擇販售單位"
    };
    kinds["masterDown"] = {
        "url": "Dialog/MasterDownDialog",
        "title": "請選擇主檔代號"
    };
    kinds["POSSubject"] = {
        "url": "Dialog/POSSubjectDialog",
        "title": "POS下載入出金項目檔"
    };
    kinds["product"] = {
        "url": "Dialog/ProductDialog",
        "title": "請選擇品號"
    };
    kinds["vnProduct"] = {
        "url": "Dialog/VNProductDialog",
        "title": "請選擇品號"
    };
    kinds["productList"] = {
        "url": "Dialog/ProductListDialog",
        "title": "請選擇品號",
        "width": 800
    };
    kinds["proPeriod"] = {
        "url": "Dialog/ProPeriodDialog",
        "title": "請選擇檔期"
    };
    kinds["realSubVendor"] = {
        "url": "Dialog/RealSubVendorDialog",
        "title": "請選擇實際供應商"
    };
    kinds["DC"] = {
        "url": "Dialog/DCDialog",
        "title": "請選擇配送商"
    };
    kinds["storeByUserBM"] = {
        "url": "Dialog/StoreByUserBMDialog",
        "title": "請選擇門市"
    };
    kinds["storeList"] = {
        "url": "Dialog/StoreListDialog",
        "title": "請選擇門市"
    };
    kinds["subVendor"] = {
        "url": "Dialog/SubVendorDialog",
        "title": "請選擇供應商"
    };
    kinds["subVendor_Date"] = {
        "url": "Dialog/SubVendorDateDialog",
        "title": "請選擇供應商"
    };
    kinds["vnfSubVendor"] = {
        "url": "Dialog/VNFSubVendorDialog",
        "title": "請選擇配送商"
    };
    kinds["subVendorList"] = {
        "url": "Dialog/SubVendorListDialog",
        "title": "請選擇供應商"
    };
    kinds["tana"] = {
        "url": "Dialog/TanaDialog",
        "title": "請選擇檯帳編號"
    };
    kinds["tanaGroup"] = {
        "url": "Dialog/TanaGroupDialog",
        "title": "請選擇第一檯編號"
    };
    kinds["tanaGroupList"] = {
        "url": "Dialog/TanaGroupListDialog",
        "title": "第一檯編號選單"
    };
    kinds["tanaList"] = {
        "url": "Dialog/TanaListDialog",
        "title": "請選擇檯帳編號"
    };
    kinds["tanaStoreForStoreList"] = {
        "url": "Dialog/TanaStoreForStoreListDialog",
        "title": "門市店號選取"
    };
    kinds["tanaStoreWithDateForDate"] = {
        "url": "Dialog/TanaStoreWithDateForSDateDialog",
        "title": "門市檯帳適用日選取"
    };
    kinds["tanaStoreWithDateForStore"] = {
        "url": "Dialog/StoreWithDateDialog",
        "title": "複製門市選取"
    };
    kinds["tanaStoreWithDateForTana"] = {
        "url": "Dialog/TanaStoreCopyDialog",
        "title": "複製檯帳選取"
    };
    kinds["tanaTmp"] = {
        "url": "Dialog/TanaTmpDialog",
        "title": "取出暫存選取"
    };
    kinds["tanaWithDate"] = {
        "url": "Dialog/TanaWithDateDialog",
        "title": "複製檯帳選取"
    };
    kinds["team"] = {
        "url": "Dialog/TeamDialog",
        "title": "請選擇Team"
    };
    kinds["user"] = {
        "url": "Dialog/UserDialog",
        "title": "請選擇員工"
    };
    kinds["userList"] = {
        "url": "Dialog/UserListDialog",
        "title": "請選擇員工"
    };
    kinds["vendor"] = {
        "url": "Dialog/VendorDialog",
        "title": "請選擇供應商"
    };
    kinds["vnStore"] = {
        "url": "Dialog/VNStoreDialog",
        "title": "請選擇門市"
    };
    kinds["voucher"] = {
        "url": "Dialog/VoucherDialog",
        "title": "請選擇傳票區分"
    };
    kinds["voucherList"] = {
        "url": "Dialog/VoucherListDialog",
        "title": "請選擇傳票區分"
    };
    kinds["zipcode"] = {
        "url": "Dialog/ZipcodeDialog",
        "title": "請選擇郵遞區號"
    };
    kinds["storeTree"] = {
        "url": "Dialog/StoreTreeDialog",
        "title": "門市選單"
    };
    kinds["barcodeList"] = {
        "url": "Dialog/BarcodeListDialog",
        "title": "請選擇商品條碼"
    };
    kinds["categoryLv2AndLv3"] = {
        "url": "Dialog/CategoryLv2AndLv3Dialog",
        "title":"中、小分類 選單"
    };
    kinds["BarcodeItemcode"] = {
        "url": "Dialog/BarcodeItemcodeDialog",
        "title": "請選擇品號/條碼"
    };
    kinds["ProMMAll"] = {
        "url": "Dialog/ProMMAllDialog",
        "title": "請選擇組合促銷"
    };
    kinds["ProStairAll"] = {
        "url": "Dialog/ProStairAllDialog",
        "title": "請選擇階梯促銷"
    };
    kinds["CopyProDetails"] = {
        "url": "Dialog/CopyProDetailsDialog",
        "title": "複製其它活動明細"
    };
    kinds["ViewProMHistory"] = {
        "url": "Dialog/ViewProMHistoryDialog",
        "title": "共通主檔-異動記錄查詢"
    };
    kinds["ViewProMasterHistory"] = {
        "url": "Dialog/ViewProMasterHistoryDialog",
        "title": "活動設定-異動記錄查詢"
    };
    kinds["EcfaDate"] = {
        "url": "Dialog/EcfaDateDialog",
        "title": "請選擇清算日期"
    };
    kinds["canTranStore"] = {
        "url": "Dialog/CanTranStoreDialog",
        "title": "請選擇門市"
    };
    kinds["subVendorHistory"] = {
        "url": "Dialog/SubVendorHistoryDialog",
        "title": "供應商主檔異動資料明細",
        "width": 800
    };
    //TODO: 以下已列管，如需更改請洽昇峰
    kinds["store"] = {
        "url": "Dialog/StoreDialog",
        "title": "請選擇門市"
    };
    kinds["CharacterAll"] = {
        "url": "Dialog/CharacterAllDialog",
        "title": "請選擇區分"
    };
    kinds["tanaClass"] = {
        "url": "Dialog/TanaClassDialog",
        "title": "請選擇檯帳型態"
    };
    kinds["StoreCalStore"] = {
        "url": "Dialog/StoreCalStoreDialog",
        "title": "請選擇門市"
    };
})()