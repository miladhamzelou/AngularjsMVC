function isNullOrWhiteSpace(value) {
    return !(value && value.toString().replace(/\s/g, "").length >= 0);
}

if (!Date.prototype.dateDiff) {
    /*
     * 日期時間差
     */
    Date.prototype.dateDiff = function (interval, objDate) {
        var dtEnd = new Date(objDate);
        if (isNaN(dtEnd)) {
            return undefined;
        }
        switch (interval) {
            case "s":
                return parseInt((this - dtEnd) / 1000, 10);
            case "n":
                return parseInt((this - dtEnd) / 60000, 10);
            case "h":
                return parseInt((this - dtEnd) / 3600000, 10);
            case "d":
                return parseInt((this - dtEnd) / 86400000, 10);
            case "w":
                return parseInt((this - dtEnd) / (86400000 * 7), 10);
            case "m":
                return (this.getMonth() + 1) - (dtEnd.getMonth() + 1) + ((this.getFullYear() - dtEnd.getFullYear()) * 12);
            case "y":
                return this.getFullYear() - dtEnd.getFullYear();
        }
    }
}

if (!Date.prototype.AddDays) {
    //將 Date 加 n 天
    Date.prototype.AddDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
}

if (!Date.prototype.AddMonths) {
    //將 Date 加 n 個月 
    Date.prototype.AddMonths = function (months) {
        var date = new Date(this.valueOf());
        date.setMonth(date.getMonth() + months);
        return date;
    }
}

if (!Date.prototype.yyyyMMdd) {
    //將 Date 轉成 yyyy/MM/dd 使用 splitChar 取代分隔字元
    Date.prototype.yyyyMMdd = function (splitChar) {

        splitChar = splitChar == undefined ? "/" : splitChar;
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString();
        var dd = this.getDate().toString();

        var result = undefined;

        if ((yyyy != "NaN") && (mm != "NaN") && (dd != "NaN")) {
            result = yyyy + splitChar + (mm[1] ? mm : "0" + mm[0]) + splitChar + (dd[1] ? dd : "0" + dd[0]);
        }
        return result;
    };
}

if (!Date.prototype.yyyyMM) {
    //將 Date 轉成 yyyy/MM 使用 splitChar 取代分隔字元
    Date.prototype.yyyyMM = function (splitChar) {

        splitChar = splitChar == undefined ? "/" : splitChar;

        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString();

        var result = undefined;

        if ((yyyy != "NaN") && (mm != "NaN")) {
            result = yyyy + splitChar + (mm[1] ? mm : "0" + mm[0]);
        }
        return result;
    };
}

if (!Number.prototype.round) {
    Number.prototype.round = function (decimals) {
        if (!decimals) {
            decimals = 0;
        }

        var multiplier = Math.pow(10, decimals);
        return Math.round(this * multiplier) / multiplier;
    }
}

if (!Number.prototype.multiply) {
    Number.prototype.multiply = function (num) {
        var m = 0, s1 = this.toString(), s2 = num.toString();
        try { m += s1.split(".")[1].length } catch (e) { }
        try { m += s2.split(".")[1].length } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    }
}

if (!Number.prototype.divide) {
    Number.prototype.divide = function (num) {
        var t1 = 0, t2 = 0, r1, r2;
        try { t1 = this.toString().split(".")[1].length } catch (e) { }
        try { t2 = num.toString().split(".")[1].length } catch (e) { }
        r1 = Number(this.toString().replace(".", ""))
        r2 = Number(num.toString().replace(".", ""))
        return (r1 / r2) * Math.pow(10, t2 - t1);
    }
}

if (!Number.prototype.add) {
    Number.prototype.add = function (num) {
        var r1, r2, m;
        try { r1 = this.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = num.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2));
        return (this.multiply(m) + num.multiply(m)) / m;
    }
}

if (!Number.prototype.minus) {
    Number.prototype.minus = function (num) {
        var r1, r2, m, n;
        try { r1 = this.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = num.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return ((this.multiply(m) - num.multiply(m)) / m).round(n);
    }
}

if (!Number.prototype.compareTo) {
    Number.prototype.compareTo = function (num) {
        var result;
        var value1 = this;

        if (isNaN(num)) {
            throw new Error("num is not a number.")
        }

        var value2 = new Number(num);

        if (value1 > value2) { result = 1; }
        if (value1 == value2) { result = 0; }
        if (value1 < value2) { result = -1; }

        return result;
    }
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (prefix) {
        return (this.substr(0, prefix.length) === prefix);
    }
}

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (suffix) {
        return (this.substr(this.length - suffix.length) === suffix);
    }
}

if (!String.prototype.contains) {
    String.prototype.contains = function (txt) {
        return (this.indexOf(txt) >= 0);
    }
}