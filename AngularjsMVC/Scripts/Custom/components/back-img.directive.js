/**
* @desc 
* @example <?? backImage ng-model="背景圖url" />
*/

(function () {
    angular
        .module("directives")
        .directive("backImage", backImageDirective);

    function backImageDirective() {
        return {
            restrict: 'A',
            require: ["ngModel"],
            scope: { ngModel: "=" },
            link: function (scope, element, attrs, ctrl) {
                scope.$watch("ngModel", function (newVal) {
                    element.css({
                        'background-image': 'url(' + (newVal || '') + ')',
                        'background-size': 'cover',
                        'width': '250px',
                        'height': '250px',
                        'color': '#DDDDDD',
                        'text-align': 'center',
                        'font-size': '18px'
                    });
                });

            }
        };
    }
})()