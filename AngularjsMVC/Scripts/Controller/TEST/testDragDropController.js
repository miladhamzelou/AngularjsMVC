angular.module('topPos')
.controller('testDragDropCtrl', ["$http", "$scope", "dialogService", "blockDraggable",
function ($http, $scope, dialogService, blockDraggable) {
    $scope.options = [{ option: '正面直放', id: 0 }, { option: '正面橫放', id: 1 }, { option: '側面直放', id: 2 },
    { option: '側面橫放', id: 3 }, { option: '上面直放', id: 4 }, { option: '上面橫放', id: 5 },
{ option: '前1', id: 6 }, { option: '前2', id: 7 }, { option: '前3', id: 8 },
{ option: '前4', id: 9 }, { option: '前5', id: 10 }, { option: '前6', id: 11 },
{ option: '前7', id: 12 }, { option: '前8', id: 13 }, { option: '前9', id: 14 },
{ option: '前10', id: 15 },
    ];
    var query = '[]';
    var MaxLongItemtemp = '[{"0":""},{"1":""},{"2":""},{"3":""},{"4":""},{"5":""},{"6":""},{"7":""},{"8":""},{"9":""}]';
    $scope.queryItems = angular.fromJson(query);
    $scope.MaxLongItem = angular.fromJson(MaxLongItemtemp);
    $scope.draggableObjects =  [{ itemCode: '1234567891234', itemNm: '紅茶' },
    { itemCode: '1234567891235', itemNm: '綠茶' },
    { itemCode: '1234567891236', itemNm: '烏龍茶' },
    { itemCode: '1234567891237', itemNm: '鐵觀音' },
    { itemCode: '1234567891238', itemNm: '東方美人' },
    { itemCode: '1234567891239', itemNm: '四季春' },
    { itemCode: '1234567891230', itemNm: '海神' },
    { itemCode: '1234567891231', itemNm: '葡萄仙柚' },
    { itemCode: '1234567891232', itemNm: '特品烏龍' },
    { itemCode: '1234567891233', itemNm: '龍鋒' }];
    $scope.blockCtrl = true;
   //清除重來的按鈕
    $scope.resetDetail = function () {
        $scope.MaxLongItem = angular.fromJson(MaxLongItemtemp);
        $scope.queryItems = angular.fromJson(query);
        $scope.fillArray = angular.copy($scope.queryItems);

    }
    //這邊沒有用 但是在檯帳那有用到
    $scope.getRealHoles = function () {
        var result = $scope.totalHole;
        if ($scope.checkSpecialRow == true) {
            result = result - $scope.holes
        }
        for (var a in $scope.queryItems) {
            if ($scope.queryItems[a].holes != undefined) {
                result = result - $scope.queryItems[a].holes;
            }
        }
        return result;
    }

    // 以上是其他控制 以下是拖拖拉拉區域
    
    //上
    $scope.goUP = function (data) {
        if ((data - 1) != -1) {
            var temp = angular.copy($scope.queryItems[data - 1]);
            $scope.queryItems[data - 1] = $scope.queryItems[data];
            $scope.queryItems[data] = temp;
            var filltemp = angular.copy($scope.fillArray[data - 1]);
            $scope.fillArray[data - 1] = $scope.fillArray[data];
            $scope.fillArray[data] = filltemp;
        }
    }
    //下
    $scope.goDown = function (data) {
        if ((data + 1) < $scope.queryItems.length) {
            var temp = angular.copy($scope.queryItems[data + 1]);
            $scope.queryItems[data + 1] = $scope.queryItems[data];
            $scope.queryItems[data] = temp;
            var filltemp = angular.copy($scope.fillArray[data + 1]);
            $scope.fillArray[data + 1] = $scope.fillArray[data];
            $scope.fillArray[data] = filltemp;
        }
    }

    //加列
    $scope.addRow = function () {
        /* $scope.queryItems.push([{ tanaNdisplaytype: "0" }, {}, {}, {}, {}, {}, {}, {}, {}, {}]);*/
        $scope.queryItems.push(
            {
                itemArray: [{ tanaNdisplaytype: 0, deleteMark: false }, { tanaNdisplaytype: 0, deleteMark: false },
                { tanaNdisplaytype: 0, deleteMark: false }, { tanaNdisplaytype: 0, deleteMark: false },
                { tanaNdisplaytype: 0, deleteMark: false }, { tanaNdisplaytype: 0, deleteMark: false },
                { tanaNdisplaytype: 0, deleteMark: false }, { tanaNdisplaytype: 0, deleteMark: false },
                { tanaNdisplaytype: 0, deleteMark: false }, { tanaNdisplaytype: 0, deleteMark: false }]
            });
        $scope.checkColumn();
    }
    //隱藏小板塊
    $scope.changeBlockstatus = function () {
        $scope.blockCtrl = !$scope.blockCtrl;

    }

    //這兩個是用來交換做儲存XY座標的
    $scope.tempcolumn = "nothing";
    $scope.tempRow;
    //拿起
    $scope.onDragSuccess = function (data, evt, row, column) {
        $scope.tempcolumn = column;
        $scope.tempRow = row;
        $scope.checkColumn();
    }
    //放下
    $scope.onDropComplete = function (data, evt, row, column) {
        if (data != undefined) {
            if (data.itemCode != undefined) {
                if ($scope.tempcolumn != "nothing") {
                    data.tanaNdisplaytype = $scope.queryItems[row].itemArray[column].tanaNdisplaytype;
                    data.deleteMark = $scope.queryItems[row].itemArray[column].deleteMark;
                    //如果放在最後面 直接塞值
                    if (column == $scope.queryItems[row].itemArray.length - 1) {
                        $scope.queryItems[row].itemArray.push({ tanaNdisplaytype: 0, deleteMark: false });
                    }
                    var temp = angular.copy($scope.queryItems[$scope.tempRow].itemArray[$scope.tempcolumn]);
                    $scope.queryItems[$scope.tempRow].itemArray[$scope.tempcolumn] = $scope.queryItems[row].itemArray[column];
                    $scope.queryItems[row].itemArray[column] = temp;
                }
                else {
                    data.tanaNdisplaytype = $scope.queryItems[row].itemArray[column].tanaNdisplaytype;
                    data.deleteMark = $scope.queryItems[row].itemArray[column].deleteMark;
                    //如果放在最後面 直接塞值
                    if (column == $scope.queryItems[row].itemArray.length - 1) {
                        $scope.queryItems[row].itemArray.splice(column, 1, data);
                        $scope.queryItems[row].itemArray.push({ tanaNdisplaytype: 0, deleteMark: false });

                    }
                    else {
                        if ($scope.queryItems[row].itemArray[column] != undefined) {
                            if ($scope.queryItems[row].itemArray[column].itemCode != undefined) {
                                if ($scope.queryItems[row].itemArray[column].itemCode.length > 0) {
                                    $scope.queryItems[row].itemArray.splice(column, 1, data);
                                } else {
                                    $scope.queryItems[row].itemArray.push(data);
                                }
                            }
                            else {
                                $scope.queryItems[row].itemArray.splice(column, 1, data);
                            }
                        }
                        else {
                            $scope.queryItems[row].itemArray.splice(column, 1, data);
                        }
                    }
                }
            }
        }
        $scope.tempcolumn = "nothing";

        $scope.checkColumn();

    }
   //變更長度
    $scope.checkColumn = function () {
        var longtemp = new Array;// = angular.copy($scope.queryItems);
        $scope.fillArray = angular.copy($scope.queryItems);

        for (var row in $scope.queryItems) {
            if (longtemp.length < $scope.queryItems[row].itemArray.length) {
                longtemp = $scope.queryItems[row].itemArray;
            }

        }
        if (longtemp.length > $scope.MaxLongItem.length) {
            $scope.MaxLongItem = longtemp;
        }
        for (i = 0; i < $scope.queryItems.length; i++) {
            $scope.fillArray[i] = new Array(($scope.MaxLongItem.length - $scope.queryItems[i].itemArray.length));
        }

    }
    //陳列數
    $scope.getItems = function (data) {
        var result = 0;
        for (var a in $scope.queryItems[data].itemArray) {
            if (a != undefined) {
                if ($scope.queryItems[data].itemArray[a].itemCode != undefined) {
                    result = parseInt(a) + 1;
                }
            }
        }
        return result;
    }
    //刪除
    $scope.deleteOne = function (row) {
        if ($scope.queryItems[row].allDelete == true) {
            for (var a in $scope.queryItems[row].itemArray) {
                if ($scope.queryItems[row].itemArray[a].deleteMark != undefined) {
                    $scope.queryItems[row].itemArray.splice(a, 1, { tanaNdisplaytype: 0, deleteMark: false });
                }
            }
            $scope.queryItems[row].allDelete = false;
        }
        else {
            for (var a in $scope.queryItems[row].itemArray) {
                if ($scope.queryItems[row].itemArray[a].deleteMark != undefined) {
                    if ($scope.queryItems[row].itemArray[a].deleteMark == true) {
                        $scope.queryItems[row].itemArray.splice(a, 1, { tanaNdisplaytype: 0, deleteMark: false });
                    }
                }
            }
        }
    }
}]);