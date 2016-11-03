/**
* @desc 使用於文字欄位，
*/

(function () {
    angular
        .module("services")
        .service("keyinService", keyinServiceProvider)

    function keyinServiceProvider() {
        var self = this;

        self.allowKeyinPattern = function (element, pattern) {
            element.bind("keypress", function (e) {
                var keyCode = e.which || e.keyCode;
                var keyCodeChar = String.fromCharCode(keyCode);

                if (!keyCodeChar.match(new RegExp(pattern, "i"))) {
                    e.preventDefault();
                    return false;
                }
            });
        }
    }
})()