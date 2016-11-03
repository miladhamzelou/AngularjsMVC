(function () {
    angular.module("topPos")
    .run(removeRouteTemplateCache)
    .run(locationChangeIntercepter)
    .run(closeWindowIntercepter);

    function removeRouteTemplateCache($rootScope, $templateCache) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (typeof (current) !== 'undefined') {
                $templateCache.remove(current.templateUrl);
            }
        });
    }

    removeRouteTemplateCache.$inject = ["$rootScope", "$templateCache"];

    function locationChangeIntercepter($rootScope, lockDataService) {
        $rootScope.$on("$locationChangeStart", routeChange);

        function routeChange(event, newUrl, oldUrl) {
            lockDataService.unlock();
        }
    }

    locationChangeIntercepter.$inject = ["$rootScope", "lockDataService"];

    function closeWindowIntercepter($window, lockDataService) {
        $window.onbeforeunload = function () {
            lockDataService.unlock();
        };
    }

    closeWindowIntercepter.$inject = ["$window", "lockDataService"];
})()