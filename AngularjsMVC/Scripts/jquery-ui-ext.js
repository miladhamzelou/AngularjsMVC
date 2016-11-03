$.widget("custom.confirmDialog", $.ui.dialog, {
    options: {
        autoOpen: false,
        title: '確認',
        buttons: [
            { text: '確認' },
            { text: '取消' }
        ]
    },
    open: function () {
        return this._super();
    }
});

$.widget("custom.messageDialog", $.ui.dialog, {
    options: {
        autoOpen: false,
        title: '訊息',
        buttons: [
            { text: '確認' }
        ]
    },
    open: function () {
        return this._super();
    }
});