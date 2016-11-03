(function () {
    angular.module("topPos")
    .controller("dragDropController", dragDropController);

    function dragDropController($scope) {
        var DEFAULT_LAYER_HOLES = 10;

        $scope.tana = new Tana();

        $scope.dragOpts = {
            revert: "invalid",
            containment: ".tana-blocks",
            helper: "clone",
            cursor: "move",
            cancel: ".reserve, select, input",
            zIndex: 1000,
            scroll: true
        };

        $scope.dropOpts = {
            accept: "li",
            hoverClass: "ui-state-highlight",
            drop: function (event, ui) {
                $scope.$apply(function () {
                    var dragItems = [];

                    if (isDragFromTanaItem(ui.dragItem)) {
                        dragItems.push(ui.dragItem);
                    } else {
                        dragItems = _getSelectedItems($scope.items);

                        if (dragItems.indexOf(ui.dragItem) < 0) {
                            dragItems.push(ui.dragItem);
                        }
                        _removeDragItems(dragItems);
                    }

                    $scope.tana.arrangeDragDropItems(ui.dropItem, dragItems);
                });
            }
        };

        $scope.newLayer = function () {
            var hoels = angular.isDefined($scope.newLayerHoles) ? $scope.newLayerHoles : DEFAULT_LAYER_HOLES;
            $scope.tana.addLayer(
                _newTanaLayer(
                $scope.tana.layers.length + 1,
                $scope.specialDisplay,
                hoels)
                );
        }

        $scope.queryItems = function () {
            $scope.items = newMockItems();
        }

        var _newTanaLayer = function (layerNo, specialDisplay, holes) {
            var layer = new Layer();

            var _newTanaDetails = function (layerNo, holes) {
                var detail = [];

                for (var i = 0; i < holes; i++) {
                    detail.push(new TanaDetail(layerNo, i + 1));
                }

                return detail;
            }
            layer.tanaLayer = new TanaLayer(layerNo, specialDisplay, holes);
            layer.tanaDetail = _newTanaDetails(layerNo, holes);

            return layer;
        }

        var _getSelectedItems = function (items) {
            var selectedItems = [];

            for (var i = 0; i < items.length; i++) {
                if (items[i].selected) {
                    selectedItems.push(items[i]);
                }
            }

            return selectedItems;
        }

        var _removeDragItems = function (items) {
            for (var i = 0; i < items.length; i++) {
                var index = $scope.items.indexOf(items[i]);
                if (index>=0) {
                    $scope.items.splice(index, 1);
                }
            }
        }
    }

    dragDropController.$inject = ["$scope"];

    var isDragFromTanaItem = function (item) {
        return item.TanaLayer ? true : false;
    }

    function newMockItems() {
        var items = [];

        items.push(newMockItem("4710332900324", "(R)散吐秘錠60粒(3盒裝)"))
        items.push(newMockItem("4711989889994", "(R)艾立通腸溶微粒膠囊10公絲(32粒"))
        items.push(newMockItem("4711989890020", "(R)艾立通腸溶微粒膠囊5公絲(32粒)"))
        items.push(newMockItem("4712244440066", "(R)中美便通樂膜衣錠20T"))

        return items;
    }

    function newMockItem(itemCode, itemNM) {
        return { ItemCode: itemCode, ItemNM: itemNM }
    }

    function Tana() {
        var self = this;

        self.layers = [];
        self.maxHoles = 0;
        self.headerHoles = [];

        self.addLayer = function (layer) {
            self.layers.push(layer);
            self.resetMaxHoles();
        }

        self.arrangeDragDropItems = function (dropItem, dragItems) {
            var oriDropItem = angular.copy(dropItem);

            _arrangeBlankItems(oriDropItem, dragItems.length);
            _putItems(oriDropItem, dragItems);
        }

        self.resetMaxHoles = function () {
            self.maxHoles = 0;
            for (var i = 0; i < self.layers.length; i++) {
                var holes = self.layers[i].tanaDetail.length;
                if (holes > self.maxHoles) {
                    self.maxHoles = holes;
                }
            }
            _resetHolesList();
        }

        var _resetHolesList = function () {
            var hoels = [];
            for (var i = 0; i < self.maxHoles; i++) {
                hoels.push(i + 1);
            }
            self.headerHoles = hoels;
        }

        var _arrangeBlankItems = function (dropItem, itemsLength) {
            var layer = self.layers[dropItem.TanaLayer - 1];
            var blankCount = _getContinuousBlankCount(layer, dropItem.TanaDisplayseqno);

            if (blankCount < itemsLength) {
                var blankItems = [];
                blankItems = _newTanaDetails(dropItem.TanaLayer, itemsLength - blankCount)
                layer.insertItems(dropItem.TanaDisplayseqno - 1, blankItems);
                self.resetMaxHoles();
            }
        }

        var _getContinuousBlankCount = function (layer, displaySeqno) {
            var count = 0;

            for (var i = displaySeqno - 1; i < layer.tanaDetail.length; i++) {
                if (layer.tanaDetail[i].TanaNitemcode) {
                    break;
                }
                count++;
            }

            return count;
        }

        var _putItems = function (dropItem, dragItems) {
            var layer = self.layers[dropItem.TanaLayer - 1];

            for (var i = 0; i < dragItems.length; i++) {
                var targetItem = layer.tanaDetail[dropItem.TanaDisplayseqno + i - 1];
                var dragItem = dragItems[i];

                targetItem.TanaNitemcode = dragItem.TanaNitemcode || dragItem.ItemCode;
                targetItem.ItemNM = dragItem.ItemNM;
            }

            _clearOriDragItem(dragItems[0]);
        }

        var _clearOriDragItem = function (dragItem) {
            if (dragItem.TanaNitemcode) {
                dragItem.TanaNitemcode = "";
                dragItem.ItemNM = "";
            }
        }

        var _newTanaDetails = function (layerNo, holes) {
            var detail = [];

            for (var i = 0; i < holes; i++) {
                detail.push(new TanaDetail(layerNo, i + 1));
            }

            return detail;
        }
    }

    function Layer() {
        var self = this;

        self.tanaLayer = null;
        self.tanaDetail = [];

        self.getItemsCount = function () {
            var count = 0;

            angular.forEach(self.tanaDetail, function (item) {
                if (item.TanaNitemcode) {
                    count++;
                }
            });

            return count;
        }

        self.insertItems = function (start, items) {
            for (var i = 0; i < items.length; i++) {
                self.tanaDetail.splice(start, 0, items[i]);
            }
            resetDisplySeqno();
            self.tanaLayer.TanaLayerHoles = self.tanaDetail.length;
        }

        var resetDisplySeqno = function () {
            for (var i = 0; i < self.tanaDetail.length; i++) {
                self.tanaDetail[i].TanaDisplayseqno = i + 1;
            }
        }
    }

    function TanaLayer(layerNo, specialDisplay, layerHoles) {
        var self = this;

        self.Serial = null;
        self.TanaNo = null;
        self.TanaLayer = layerNo;
        self.TanaLayerHoles = layerHoles;
        self.TanaLayerSpecialdisplay = specialDisplay ? specialDisplay : "N";
        self.TanaLayerHookdisplay = "N";
        self.TanaSdate = null;
        self.TanaEdate = null;
        self.DeleteFlag = "N";
    }

    function TanaDetail(layerNo, displaySeqno) {
        var self = this;

        self.Serial = null;
        self.TanaNo = null;
        self.TanaLayer = layerNo;
        self.TanaDisplayseqno = displaySeqno;
        self.TanaOitemcode = "";
        self.TanaNitemcode = "";
        self.TanaOdisplaytype = 0;
        self.TanaNdisplaytype = 0;
        self.TanaItemflag = 0;
        self.TanaSdate = null;
        self.TanaEdate = null;
        self.DeleteFlag = "N";

        self.ItemNM = "";
    }
})()

