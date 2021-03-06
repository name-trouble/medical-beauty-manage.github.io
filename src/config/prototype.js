///集合取交集
Array.prototype.intersect = function () {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            var str = arguments[i][j];
            if (!obj[str]) {
                obj[str] = 1;
            } else {
                obj[str]++;
                if (obj[str] == arguments.length) {
                    result.push(str);
                }
            } //end else
        } //end for j
    } //end for i
    return result;
}

//集合去掉重复
Array.prototype.uniquelize = function () {

    var tmp = {},
        ret = [];
    for (var i = 0; i < this.length; i++) {
        if (!tmp[this[i]]) {
            tmp[this[i]] = 1;
            ret.push(this[i]);
        }
    }
    return ret;
}

//并集
Array.prototype.union = function () {
    var arr = new Array();
    var obj = {};
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            var str = arguments[i][j];
            if (!obj[str]) {
                obj[str] = 1;
                arr.push(str);
            }
        } //end for j
    } //end for i
    return arr;
}

//2个集合的差集 在arr不存在
Array.prototype.minus = function (arr) {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = 1;
    }
    for (var j = 0; j < this.length; j++) {
        if (!obj[this[j]]) {
            obj[this[j]] = 1;
            result.push(this[j]);
        }
    }
    return result;
};

Array.prototype.formatDates = function (split = ' ~ ') {
    if (this.length !== 2) return;
    return (this[0]||new Date()).formatDate('yyyy-MM-dd')+split+(this[1]||new Date()).formatDate('yyyy-MM-dd')
};


//时间类型 格式化 yyyy-MM-dd hh:mm:ss
Date.prototype.formatDate = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};


//小数算法精度问题解决方法
//小数乘法
Number.prototype.mul = function (arg) {
    return accMul(arg, this);
    //7*0.8 ，则改成 7.mul(8)
};
//小数除法
Number.prototype.div = function (arg) {
    return accDiv(this, arg);
};
//小数加法
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
}
//小数减法
Number.prototype.red = function (arg) {
    return Subtr(arg, this);
};
//数字千分位(包含小数解决方案)
Number.prototype.toQFW = function () {
    var str = "" + this;
    if (str.indexOf(".") < 0) {
        var re = /(?=(?!(\b))(\d{3})+$)/g;
        str = str.replace(re, ",");
        return str;
    } else {
        n = 2;
        s = parseFloat((this + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    }
    //用法a.toQFW()
}

// 去除首尾空格
String.prototype.removeSP = function () {
    var str = this
    str = str.replace(/(^\s*)|(\s*$)/g, "")
    return str
}

function accMul(arg1, arg2) {
    var m = 0,
        s1 = arg1?arg1.toString():'0',
        s2 = arg2?arg2.toString():'0';
    try {
        m += s1.split(".")[1].length
    } catch (e) {}
    try {
        m += s2.split(".")[1].length
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

function accDiv(arg1, arg2) {
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {}
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {}
    r1 = Number(arg1.toString().replace(".", ""))
    r2 = Number(arg2.toString().replace(".", ""))
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}

function Subtr(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

Array.prototype.pushFullMonth = function () {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    return [firstDay.formatDate('yyyy-MM-dd'), lastDay.formatDate('yyyy-MM-dd')]
}
