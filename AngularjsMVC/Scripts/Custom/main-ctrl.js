(function () {
    angular.module("topPos")
    .controller("mainCtrl",mainController);

    function mainController($scope, $window, $document, countdownService) {
        var blocks = $("#main-blocks"),
            header = blocks.find("#main-header"),
            banner = blocks.find("#main-banner"),
            body = blocks.find("#main-body"),
            menu = body.find("#main-menu"),
            content = body.find("#main-content");

        $scope.block = {
            mainBanner: true,
            mainMenu: true
        };

        $scope.toggleBanner = function () {
            $scope.block.mainBanner = !$scope.block.mainBanner;
            if ($scope.block.mainBanner) {
                banner.show();
            } else {
                banner.hide();
            }
            doAdjust();
        };

        $scope.toggleMenu = function () {
            $scope.block.mainMenu = !$scope.block.mainMenu;
        };

        $scope.mainContentWidth = function () {
            return $scope.block.mainMenu ? "" : "full-width";
        };

        $scope.adjustBodyHeight = function () {
            doAdjust();
            $($window).resize(function () {
                doAdjust();
            });
        };

        var doAdjust = function () {
            var content_height = blocks.height() - header.height();

            body.height(content_height);
            menu.height(content_height);
            content.height(content_height);
        }

        var setupTooltip = function () {
            if ($document.tooltip) {
                $document.tooltip({
                    items: "[tooltip], [title]",
                    position: { my: "left top", at: "right bottom", collision: "flipfit" },
                    content: function () {
                        var element = $(this);
                        var text = "";

                        if (element.is("[tooltip]")) {
                            text = element.val();
                        } else if (element.is("[title]")) {
                            text = element.attr("title");
                        }

                        return text;
                    }
                });
            }
        }

        $scope.adjustBodyHeight();
        countdownService.scheduleDialog();
        setupTooltip();
    }

    mainController.$inject = ["$scope", "$window", "$document", "countdownService"];

    angular.module("topPos")
    .controller("mainMenu", mainMenuController);

    function mainMenuController() {
        $("#main-menu div.menu li.node").click(function (e) {
            var node = $(this);
            if (e.target == node.find("h2")[0]) {
                if (node.children("ul").is(":hidden")) {
                    node.siblings().find("ul").hide(200);
                    node.children("ul").show(200);
                }
                else {
                    node.children("ul").hide(200);
                }
            }
        });
        $("#main-menu div.menu li.node").children("ul").show();
    }
})()
