/**
* @desc 提供 Session Timeout 前的倒數計時(使用到jQuery)
*/

(function () {
    angular
        .module("services")
        .service("countdownService", countdownServiceProvider);

    function countdownServiceProvider($timeout, $window, countdownArgs) {
        var self = this;
        var dialogTimer, countDownTimer;
        var scheduleTime = (countdownArgs.sessionTimeout - countdownArgs.timeoutCountdown) * 60000 - 30000;
        var timeoutDialog = angular.element("<div><p>系統即將逾時，您如果要繼續使用，請按下 「確認」按鈕。</p></div>"),
            timerText = angular.element("<h2></h2>").appendTo(timeoutDialog);
        var _scope = {};

        timeoutDialog.dialog({
            title: "逾時提醒",
            autoOpen: false,
            closeOnEscape: false,
            modal: true,

            buttons: [{
                text: "確認",
                click: function () {
                    self.sendKeepAlive();
                }
            }]
        });

        this.scheduleDialog = function () {
            stopTimers();
            dialogTimer = $timeout(showDialog, scheduleTime);
        }

        this.sendKeepAlive = function () {
            timeoutDialog.dialog("close");
            $.get(countdownArgs.keepAliveUrl, function () {
                self.scheduleDialog();
            });
        }

        function TimeLeft(minutes) {
            var self = this;

            this.totalSeconds = parseInt(minutes) * 60;
            this.getMinutes = function () {
                return Math.floor(self.totalSeconds / 60);
            }
            this.getSeconds = function () {
                var seconds = self.totalSeconds % 60;
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }

                return seconds;
            }
        }

        var stopTimers = function () {
            $timeout.cancel(dialogTimer);
            $timeout.cancel(countDownTimer);
        }

        var updateTimerText = function () {
            var html,
                minutes = _scope.timeLeft.getMinutes(),
                seconds = _scope.timeLeft.getSeconds();

            if (minutes > 0 && seconds>0) {
                html = "剩餘時間：<span class='text-info'>" + minutes + "</span> 分 "
                   + "<span class='text-info'>" + seconds + "</span> 秒";
            } else if(minutes>0) {
                html = "剩餘時間：<span class='text-info'>" + minutes + "</span> 分";
            } else if (seconds > 0) {
                html = "剩餘時間：<span class='text-danger'>" + seconds + "</span> 秒";
            } else {
                html = "<span class='text-info'>系統逾時，請重新登入</span>";
            }

            timerText.html(html);
        }

        var updateCountDown = function () {
            updateTimerText();

            if (_scope.timeLeft.totalSeconds > 0) {
                _scope.timeLeft.totalSeconds--;
                countDownTimer = $timeout(updateCountDown, 1000);
            } else {
                logout();
            }
        }

        var logout = function () {
            $window.location = countdownArgs.logoutUrl;
        }

        var showDialog = function () {
            _scope.timeLeft = new TimeLeft(countdownArgs.timeoutCountdown);
            updateCountDown();
            timeoutDialog.dialog("open");
        }
    }

    countdownServiceProvider.$inject = ["$timeout", "$window", "countdownArgs"];
})()