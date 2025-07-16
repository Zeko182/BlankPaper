window.__require = function t(e, o, n) {
function r(a, s) {
if (!o[a]) {
if (!e[a]) {
var c = a.split("/");
c = c[c.length - 1];
if (!e[c]) {
var l = "function" == typeof __require && __require;
if (!s && l) return l(c, !0);
if (i) return i(c, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = c;
}
var u = o[a] = {
exports: {}
};
e[a][0].call(u.exports, function(t) {
return r(e[a][1][t] || t);
}, u, u.exports, t, e, o, n);
}
return o[a].exports;
}
for (var i = "function" == typeof __require && __require, a = 0; a < n.length; a++) r(n[a]);
return r;
}({
CanvasResizer: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "2a33dcxF+NBW6IzkrkZ/0RB", "CanvasResizer");
var n, r = this && this.__extends || (n = function(t, e) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
n(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), i = this && this.__decorate || function(t, e, o, n) {
var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (r = t[s]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
return i > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = cc._decorator, s = a.ccclass, c = a.property, l = a.requireComponent, u = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.designResolution = new cc.Size(1398, 786);
e.lastWitdh = 0;
e.lastHeight = 0;
return e;
}
e.prototype.onLoad = function() {
this.canvas = this.node.getComponent(cc.Canvas);
this.updateCanvas();
};
e.prototype.update = function() {
this.updateCanvas();
};
e.prototype.updateCanvas = function() {
var t = cc.view.getFrameSize();
if (this.lastWitdh !== t.width || this.lastHeight !== t.height) {
this.lastWitdh = t.width;
this.lastHeight = t.height;
if (this.designResolution.width / this.designResolution.height > t.width / t.height) {
var e = cc.size(this.designResolution.width, this.designResolution.width * (t.height / t.width));
this.canvas.designResolution = e;
cc.log("update canvas size: " + e);
} else {
e = cc.size(this.designResolution.height * (t.width / t.height), this.designResolution.height);
this.canvas.designResolution = e;
cc.log("update canvas size: " + e);
}
cc.Tool.getInstance().setItem("@heightDesign", this.canvas.designResolution.height);
}
};
i([ c ], e.prototype, "designResolution", void 0);
return i([ s, l(cc.Canvas) ], e);
}(cc.Component);
o.default = u;
cc._RF.pop();
}, {} ],
HotUpdate: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "17e91xO0i1N6Ie30cn93e2d", "HotUpdate");
var n, r = this && this.__extends || (n = function(t, e) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
n(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), i = this && this.__decorate || function(t, e, o, n) {
var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (r = t[s]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
return i > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = cc._decorator, s = a.ccclass, c = a.property, l = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.manifestUrl = null;
e.loadingBar = null;
e.lb_Info = null;
e._updating = !1;
e._failCount = 0;
e._canRetry = !1;
e._storagePath = "";
e._updateListener = null;
e._am = null;
e._checkListener = null;
e.versionCompareHandle = null;
e.gameSceneName = "main";
return e;
}
e.prototype.onLoad = function() {
cc.sys.isNative && (cc.Device ? cc.Device.setKeepScreenOn(!0) : jsb.Device && jsb.Device.setKeepScreenOn(!0));
cc.sys.isNative ? this.initHotUpdate() : this.loadGame();
};
e.prototype.initHotUpdate = function() {
this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "mini39-remote-asset";
cc.log("Storage path for remote asset : " + this._storagePath);
this.versionCompareHandle = function(t, e) {
cc.log("JS Custom Version Compare: version A is " + t + ", version B is " + e);
for (var o = t.split("."), n = e.split("."), r = 0; r < o.length; ++r) {
var i = parseInt(o[r]), a = parseInt(n[r] || 0);
if (i !== a) return i - a;
}
return n.length > o.length ? -1 : 0;
};
this._am = new jsb.AssetsManager("", this._storagePath, this.versionCompareHandle);
this._am.setVerifyCallback(function(t, e) {
e.compressed;
return !0;
});
cc.sys.os === cc.sys.OS_ANDROID && this._am.setMaxConcurrentTask(2);
this.hotUpdate();
};
e.prototype.loadGame = function() {
var t = this, e = 0;
t.loadingBar.fillRange = 0;
t.lb_Info.string = "Đang tải: 0%";
console.log("lobby");
cc.director.preloadScene("lobby", function(o, n) {
var r = 100 * o / n;
r > e && (e = r);
t.loadingBar.fillRange = e / 100;
t.lb_Info.string = "Đang tải: " + Math.round(e) + "%";
}, function() {
cc.director.loadScene("lobby", function() {});
});
};
e.prototype.updateCb = function(t) {
var e = !1, o = !1;
cc.log("---eventCode:" + t.getEventCode());
switch (t.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
o = !0;
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
var n = t.getMessage();
n && cc.log("Progress" + t.getPercent() / 100 + "% : " + n);
this.lb_Info.string = "Đang tải: " + Math.floor(100 * t.getPercent()) + "%";
this.loadingBar.fillRange = t.getPercent();
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
o = !0;
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
o = !0;
this.loadGame();
break;

case jsb.EventAssetsManager.UPDATE_FINISHED:
e = !0;
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
this._updating = !1;
this._canRetry = !0;
break;

case jsb.EventAssetsManager.ERROR_UPDATING:
case jsb.EventAssetsManager.ERROR_DECOMPRESS:
}
cc.log("---needStar" + e);
if (o) {
this._am.setEventCallback(null);
this._updateListener = null;
this._updating = !1;
}
if (e) {
this._am.setEventCallback(null);
this._updateListener = null;
var r = jsb.fileUtils.getSearchPaths(), i = this._am.getLocalManifest().getSearchPaths();
cc.log(JSON.stringify(i));
Array.prototype.unshift.apply(r, i);
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(r));
jsb.fileUtils.setSearchPaths(r);
cc.audioEngine.stopAll();
cc.game.restart();
}
};
e.prototype.hotUpdate = function() {
if (this._am && !this._updating) {
this._am.setEventCallback(this.updateCb.bind(this));
if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
var t = this.manifestUrl.nativeUrl;
cc.loader.md5Pipe && (t = cc.loader.md5Pipe.transformURL(t));
this._am.loadLocalManifest(t);
}
this._failCount = 0;
this._am.update();
this._updating = !0;
}
};
e.prototype.onDestroy = function() {
if (this._updateListener) {
this._am.setEventCallback(null);
this._updateListener = null;
}
};
i([ c({
type: cc.Asset
}) ], e.prototype, "manifestUrl", void 0);
i([ c(cc.Sprite) ], e.prototype, "loadingBar", void 0);
i([ c(cc.Label) ], e.prototype, "lb_Info", void 0);
return i([ s ], e);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {} ],
Tool: [ function(t, e) {
"use strict";
cc._RF.push(e, "e93d3TF3X9AyLiWBqoHuZzO", "Tool");
(function() {
var t;
t = function() {
var t;
function e() {}
t = void 0;
e.getInstance = function() {
void 0 === t && (t = this);
return t.prototype;
};
e.prototype.formatMoneyToKMB = function(t, e) {
void 0 === e && (e = !0);
var o = "", n = Math.abs(t);
if (n >= 1e9) {
n /= 1e9;
o = "B";
} else if (n >= 1e6) {
n /= 1e6;
o = "M";
} else {
if (!(n >= 1e3 && e)) return this.formatNumber(t);
n /= 1e3;
o = "K";
}
var r = Math.abs(t).toString(), i = Math.floor(n).toString(), a = r[i.length] + r[i.length + 1];
return "00" === a ? (t < 0 ? "-" : "") + Math.floor(n) + o : "0" === a[1] ? (t < 0 ? "-" : "") + Math.floor(n) + "." + a[0] + o : (t < 0 ? "-" : "") + Math.floor(n) + "." + a + o;
};
e.prototype.copyToClipboard = function(t) {
if (cc.sys.isNative) jsb ? jsb.copyTextToClipboard(t) : cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "CopyToClipboard", "(Ljava/lang/String;)V", t) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("AppController", "CopyToClipboard:", t); else {
document.addEventListener("copy", function(e) {
e.clipboardData.setData("text/plain", t);
e.preventDefault();
});
document.execCommand("copy");
}
return !0;
};
e.prototype.formatNumber = function(t) {
return t || "0" === t || 0 === t ? parseInt(t).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") : "";
};
e.prototype.formatNumberM = function(t) {
return t > 999999 || t < -999999 ? Math.floor(t / 1e6).toLocaleString("es-ES") + "M" : t.toLocaleString("es-ES");
};
e.prototype.formatNumberK = function(t) {
return t > 999999 || t < -999999 ? Math.floor(t / 1e6).toLocaleString("es-ES") + "M" : t > 999 || t < -999 ? Math.floor(t / 1e3).toLocaleString("es-ES") + "K" : t.toLocaleString("es-ES");
};
e.prototype.formatNumberKTX = function(t) {
return t > 999999999 || t < -999999999 ? Math.floor(t / 1e6).toLocaleString("es-ES") + "M" : t > 999999 || t < -999999 ? Math.floor(t / 1e3).toLocaleString("es-ES") + "K" : t.toLocaleString("es-ES");
};
e.prototype.removeDot = function(t) {
return parseInt(t.split(".").join("").split("+").join(""));
};
e.prototype.formatRichTextGray = function(t, e) {
return this.formatRichText(t, e, "#AEC4D5");
};
e.prototype.formatRichTextYellow = function(t, e) {
return this.formatRichText(t, e, "#FFCA23");
};
e.prototype.formatRichTextBlue = function(t, e) {
return this.formatRichText(t, e, "#03BEEC");
};
e.prototype.formatRichTextRed = function(t, e) {
return this.formatRichText(t, e, "#EE3148");
};
e.prototype.formatRichText = function(t, e, o) {
return "<color=#ffffff>" + t + " </c><color=" + o + ">" + e + "</color>";
};
e.prototype.toTimeString = function(t) {
return new Date(1e3 * t).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
};
e.prototype.toTimeString4 = function(t) {
return new Date(1e3 * t).toUTCString().match(/(\d\d:\d\d)/)[0];
};
e.prototype.getTimestamp = function() {
var t = new Date();
return t.getUTCFullYear() + "-" + (t.getUTCMonth() + 1) + "-" + t.getUTCDate() + " " + t.getUTCHours() + ":" + t.getUTCMinutes() + ":" + t.getUTCSeconds() + "." + t.getUTCMilliseconds();
};
e.prototype.getDateNow = function() {
var t = new Date();
return t.getUTCFullYear() + "-" + (t.getUTCMonth() + 1 < 10 ? "0" + (t.getUTCMonth() + 1) : t.getUTCMonth() + 1) + "-" + t.getUTCDate();
};
e.prototype.getLocalMonth = function() {
return new Date().getMonth() + 1;
};
e.prototype.getLocalDateNow = function(t) {
var e = new Date();
void 0 !== t && e.setDate(e.getDate() - t);
return e.getFullYear() + "-" + (e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + "-" + (e.getDate() < 10 ? "0" + e.getDate() : e.getDate());
};
e.prototype.getLocalDateNow2 = function(t) {
var e = new Date();
void 0 !== t && e.setDate(e.getDate() - t);
return (e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + "/" + (e.getDate() < 10 ? "0" + e.getDate() : e.getDate()) + "/" + e.getFullYear();
};
e.prototype.formatDate = function(t) {
var e = t.getDate(), o = t.getMonth() + 1;
return (e = e < 10 ? "0" + e : e) + "/" + (o = o < 10 ? "0" + o : o) + "/" + t.getFullYear();
};
e.prototype.getLocalDateNow3 = function(t) {
var e = new Date();
void 0 !== t && e.setHours(e.getHours() - t);
return (e.getHours() < 10 ? "0" + e.getHours() : e.getHours()) + ":" + (e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes()) + " " + (e.getDate() < 10 ? "0" + e.getDate() : e.getDate()) + "/" + (e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + "/" + e.getFullYear();
};
e.prototype.generateUUID = function() {
var t = new Date().getTime();
return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
var o = (t + 16 * Math.random()) % 16 | 0;
t = Math.floor(t / 16);
return ("x" == e ? o : 3 & o | 8).toString(16);
});
};
e.prototype.getParameterByName = function(t, e) {
e || (e = window.location.href);
t = t.replace(/[\[\]]/g, "\\$&");
var o = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)").exec(e);
return o ? o[2] ? decodeURIComponent(o[2].replace(/\+/g, " ")) : "" : null;
};
e.prototype.getHref = function() {
if (!cc.sys.isNative) return window.location.href;
};
e.prototype.getHostName = function() {
if (!cc.sys.isNative) return window.location.hostname;
};
e.prototype.shuffle = function(t) {
var e, o, n;
for (n = t.length; n; n--) {
e = Math.floor(Math.random() * n);
o = t[n - 1];
t[n - 1] = t[e];
t[e] = o;
}
return t;
};
e.prototype.convertStringArrayToIntArray = function(t) {
return t.split(",").map(function(t) {
return parseInt(t, 10);
});
};
e.prototype.listToMatrix = function(t, e) {
var o, n, r = [];
for (o = 0, n = -1; o < t.length; o++) {
o % e == 0 && (r[++n] = []);
r[n].push(t[o]);
}
return r;
};
e.prototype.convertSecondToTimeWithDay = function(t) {
t < 0 && (t = 0);
var e = Math.floor(t / 3600 / 24), o = Math.floor(t / 3600 % 24), n = Math.floor(t % 3600 / 60), r = Math.floor(t % 3600 % 60);
return e < 1 ? o < 10 ? ("0" + o).slice(-2) + ":" + ("0" + n).slice(-2) + ":" + ("0" + r).slice(-2) : o + ":" + ("0" + n).slice(-2) + ":" + ("0" + r).slice(-2) : o < 10 ? e + "N " + ("0" + o).slice(-2) + ":" + ("0" + n).slice(-2) + ":" + ("0" + r).slice(-2) : e + "N " + o + ":" + ("0" + n).slice(-2) + ":" + ("0" + r).slice(-2);
};
e.prototype.convertSecondToTime = function(t) {
t < 0 && (t = 0);
var e = Math.floor(t / 3600), o = Math.floor(t % 3600 / 60), n = Math.floor(t % 3600 % 60);
return e < 10 ? ("0" + e).slice(-2) + ":" + ("0" + o).slice(-2) + ":" + ("0" + n).slice(-2) : e + ":" + ("0" + o).slice(-2) + ":" + ("0" + n).slice(-2);
};
e.prototype.convertSecondToTime2 = function(t) {
t < 0 && (t = 0);
var e = Math.floor(t % 3600 / 60), o = Math.floor(t % 3600 % 60);
return ("0" + e).slice(-2) + ":" + ("0" + o).slice(-2);
};
e.prototype.convertTime = function(t) {
var e = new Date(t);
function o(t) {
return t < 10 ? "0" + t : t;
}
return [ o(e.getDate()), o(e.getMonth() + 1), e.getFullYear() ].join("-") + " " + [ o(e.getHours()), o(e.getMinutes()) ].join(":");
};
e.prototype.convertUTCTime = function(t) {
var e = new Date(t + "Z");
function o(t) {
return t < 10 ? "0" + t : t;
}
return [ o(e.getUTCDate()), o(e.getUTCMonth() + 1), e.getUTCFullYear() ].join("-") + " " + [ o(e.getUTCHours()), o(e.getUTCMinutes()) ].join(":");
};
e.prototype.convertUTCTime3 = function(t) {
var e = new Date(t + "Z");
function o(t) {
return t < 10 ? "0" + t : t;
}
return [ o(e.getUTCDate()), o(e.getUTCMonth() + 1), e.getUTCFullYear() ].join("-") + " " + [ o(e.getUTCHours()), o(e.getUTCMinutes()) ].join(":");
};
e.prototype.convertUTCTime2 = function(t) {
var e = new Date(t + "Z");
function o(t) {
return t < 10 ? "0" + t : t;
}
return [ o(e.getUTCHours()), o(e.getUTCMinutes()), o(e.getUTCSeconds()) ].join(":");
};
e.prototype.convertUTCDate = function(t) {
var e = new Date(t + "Z");
function o(t) {
return t < 10 ? "0" + t : t;
}
return [ o(e.getUTCDate()), o(e.getUTCMonth() + 1), e.getUTCFullYear() ].join("-");
};
e.prototype.convertGMT0Time = function(t) {
var e = new Date(t).getTime() - 252e5;
return new Date(e);
};
e.prototype.rtrim = function(t, e) {
for (var o = t.length - 1; o >= 0; o--) if (e !== t.charAt(o)) {
t = t.substring(0, o + 1);
break;
}
return t;
};
e.prototype.removeStr = function(t, e) {
return t.replace("/" + e + "/g", "");
};
e.prototype.setItem = function(t, e) {
return cc.sys.localStorage.setItem(t, e);
};
e.prototype.getItem = function(t) {
return cc.sys.localStorage.getItem(t);
};
e.prototype.removeItem = function(t) {
return cc.sys.localStorage.removeItem(t);
};
e.prototype.openOnce = function(t, e) {
var o = window.open("", e, "", !0);
"about:blank" === o.location.href && (o.location.href = t);
return o;
};
e.prototype.deleteAllCookies = function() {
for (var t = document.cookie.split(";"), e = 0; e < t.length; e++) {
var o = t[e], n = o.indexOf("="), r = n > -1 ? o.substr(0, n) : o;
document.cookie = r + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
};
e.prototype.mergeJSON = function(t, e) {
var o = Object.create(e);
for (var n in t) o.hasOwnProperty(n) ? null != t[n] && t[n].constructor == Object && (o[n] = mergeJSON(t[n], o[n])) : o[n] = t[n];
return o;
};
e.prototype.getRandomFromTo = function(t, e) {
return Math.floor(Math.random() * (e - t) + t);
};
e.prototype.arrUnique = function(t) {
return t.filter(function(t, e, o) {
return o.indexOf(t) === e;
});
};
e.prototype.pushZero = function(t) {
return (t = parseInt(t)) < 10 ? "0" + t : t;
};
return e;
}();
cc.Tool = t;
}).call(void 0);
cc._RF.pop();
}, {} ]
}, {}, [ "CanvasResizer", "HotUpdate", "Tool" ]);