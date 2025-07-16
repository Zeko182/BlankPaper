(function(t, o) {
"use strict";
"function" == typeof define && define.amd ? define(o) : "object" == typeof exports ? module.exports = o() : t.SAT = o();
})(this, function() {
"use strict";
var t = {};
function o(t, o) {
this.x = t || 0;
this.y = o || 0;
}
t.Vector = o;
t.V = o;
o.prototype.copy = o.prototype.copy = function(t) {
this.x = t.x;
this.y = t.y;
return this;
};
o.prototype.clone = o.prototype.clone = function() {
return new o(this.x, this.y);
};
o.prototype.perp = o.prototype.perp = function() {
var t = this.x;
this.x = this.y;
this.y = -t;
return this;
};
o.prototype.rotate = o.prototype.rotate = function(t) {
var o = this.x, e = this.y;
this.x = o * Math.cos(t) - e * Math.sin(t);
this.y = o * Math.sin(t) + e * Math.cos(t);
return this;
};
o.prototype.reverse = o.prototype.reverse = function() {
this.x = -this.x;
this.y = -this.y;
return this;
};
o.prototype.normalize = o.prototype.normalize = function() {
var t = this.len();
if (t > 0) {
this.x = this.x / t;
this.y = this.y / t;
}
return this;
};
o.prototype.add = o.prototype.add = function(t) {
this.x += t.x;
this.y += t.y;
return this;
};
o.prototype.sub = o.prototype.sub = function(t) {
this.x -= t.x;
this.y -= t.y;
return this;
};
o.prototype.scale = o.prototype.scale = function(t, o) {
this.x *= t;
this.y *= "undefined" != typeof o ? o : t;
return this;
};
o.prototype.project = o.prototype.project = function(t) {
var o = this.dot(t) / t.len2();
this.x = o * t.x;
this.y = o * t.y;
return this;
};
o.prototype.projectN = o.prototype.projectN = function(t) {
var o = this.dot(t);
this.x = o * t.x;
this.y = o * t.y;
return this;
};
o.prototype.reflect = o.prototype.reflect = function(t) {
var o = this.x, e = this.y;
this.project(t).scale(2);
this.x -= o;
this.y -= e;
return this;
};
o.prototype.reflectN = o.prototype.reflectN = function(t) {
var o = this.x, e = this.y;
this.projectN(t).scale(2);
this.x -= o;
this.y -= e;
return this;
};
o.prototype.dot = o.prototype.dot = function(t) {
return this.x * t.x + this.y * t.y;
};
o.prototype.len2 = o.prototype.len2 = function() {
return this.dot(this);
};
o.prototype.len = o.prototype.len = function() {
return Math.sqrt(this.len2());
};
function e(t, e) {
this.pos = t || new o();
this.r = e || 0;
this.offset = new o();
}
t.Circle = e;
e.prototype.getAABB = e.prototype.getAABB = function() {
var t = this.r;
return new n(this.pos.clone().add(this.offset).sub(new o(t, t)), 2 * t, 2 * t).toPolygon();
};
e.prototype.setOffset = e.prototype.setOffset = function(t) {
this.offset = t;
return this;
};
function r(t, e) {
this.pos = t || new o();
this.angle = 0;
this.offset = new o();
this.setPoints(e || []);
}
t.Polygon = r;
r.prototype.setPoints = r.prototype.setPoints = function(t) {
if (!this.points || this.points.length !== t.length) {
var e, r = this.calcPoints = [], n = this.edges = [], s = this.normals = [];
for (e = 0; e < t.length; e++) {
var p = t[e], i = e < t.length - 1 ? t[e + 1] : t[0];
if (p === i || p.x !== i.x || p.y !== i.y) {
r.push(new o());
n.push(new o());
s.push(new o());
} else {
t.splice(e, 1);
e -= 1;
}
}
}
this.points = t;
this._recalc();
return this;
};
r.prototype.setAngle = r.prototype.setAngle = function(t) {
this.angle = t;
this._recalc();
return this;
};
r.prototype.setOffset = r.prototype.setOffset = function(t) {
this.offset = t;
this._recalc();
return this;
};
r.prototype.rotate = r.prototype.rotate = function(t) {
for (var o = this.points, e = o.length, r = 0; r < e; r++) o[r].rotate(t);
this._recalc();
return this;
};
r.prototype.translate = r.prototype.translate = function(t, o) {
for (var e = this.points, r = e.length, n = 0; n < r; n++) {
e[n].x += t;
e[n].y += o;
}
this._recalc();
return this;
};
r.prototype._recalc = function() {
var t, o = this.calcPoints, e = this.edges, r = this.normals, n = this.points, s = this.offset, p = this.angle, i = n.length;
for (t = 0; t < i; t++) {
var h = o[t].copy(n[t]);
h.x += s.x;
h.y += s.y;
0 !== p && h.rotate(p);
}
for (t = 0; t < i; t++) {
var a = o[t], u = t < i - 1 ? o[t + 1] : o[0], y = e[t].copy(u).sub(a);
r[t].copy(y).perp().normalize();
}
return this;
};
r.prototype.getAABB = r.prototype.getAABB = function() {
for (var t = this.calcPoints, e = t.length, r = t[0].x, s = t[0].y, p = t[0].x, i = t[0].y, h = 1; h < e; h++) {
var a = t[h];
a.x < r ? r = a.x : a.x > p && (p = a.x);
a.y < s ? s = a.y : a.y > i && (i = a.y);
}
return new n(this.pos.clone().add(new o(r, s)), p - r, i - s).toPolygon();
};
r.prototype.getCentroid = r.prototype.getCentroid = function() {
for (var t = this.calcPoints, e = t.length, r = 0, n = 0, s = 0, p = 0; p < e; p++) {
var i = t[p], h = p === e - 1 ? t[0] : t[p + 1], a = i.x * h.y - h.x * i.y;
r += (i.x + h.x) * a;
n += (i.y + h.y) * a;
s += a;
}
return new o(r /= s *= 3, n /= s);
};
function n(t, e, r) {
this.pos = t || new o();
this.w = e || 0;
this.h = r || 0;
}
t.Box = n;
n.prototype.toPolygon = n.prototype.toPolygon = function() {
var t = this.pos, e = this.w, n = this.h;
return new r(new o(t.x, t.y), [ new o(), new o(e, 0), new o(e, n), new o(0, n) ]);
};
function s() {
this.a = null;
this.b = null;
this.overlapN = new o();
this.overlapV = new o();
this.clear();
}
t.Response = s;
s.prototype.clear = s.prototype.clear = function() {
this.aInB = !0;
this.bInA = !0;
this.overlap = Number.MAX_VALUE;
return this;
};
for (var p = [], i = 0; i < 10; i++) p.push(new o());
var h = [];
for (i = 0; i < 5; i++) h.push([]);
var a = new s(), u = new n(new o(), 1e-6, 1e-6).toPolygon();
function y(t, o, e) {
for (var r = Number.MAX_VALUE, n = -Number.MAX_VALUE, s = t.length, p = 0; p < s; p++) {
var i = t[p].dot(o);
i < r && (r = i);
i > n && (n = i);
}
e[0] = r;
e[1] = n;
}
function c(t, o, e, r, n, s) {
var i = h.pop(), a = h.pop(), u = p.pop().copy(o).sub(t), c = u.dot(n);
y(e, n, i);
y(r, n, a);
a[0] += c;
a[1] += c;
if (i[0] > a[1] || a[0] > i[1]) {
p.push(u);
h.push(i);
h.push(a);
return !0;
}
if (s) {
var l = 0;
if (i[0] < a[0]) {
s.aInB = !1;
if (i[1] < a[1]) {
l = i[1] - a[0];
s.bInA = !1;
} else l = (f = i[1] - a[0]) < (v = a[1] - i[0]) ? f : -v;
} else {
s.bInA = !1;
if (i[1] > a[1]) {
l = i[0] - a[1];
s.aInB = !1;
} else {
var f, v;
l = (f = i[1] - a[0]) < (v = a[1] - i[0]) ? f : -v;
}
}
var x = Math.abs(l);
if (x < s.overlap) {
s.overlap = x;
s.overlapN.copy(n);
l < 0 && s.overlapN.reverse();
}
}
p.push(u);
h.push(i);
h.push(a);
return !1;
}
t.isSeparatingAxis = c;
function l(t, o) {
var e = t.len2(), r = o.dot(t);
return r < 0 ? f : r > e ? x : v;
}
var f = -1, v = 0, x = 1;
t.pointInCircle = function(t, o) {
var e = p.pop().copy(t).sub(o.pos).sub(o.offset), r = o.r * o.r, n = e.len2();
p.push(e);
return n <= r;
};
t.pointInPolygon = function(t, o) {
u.pos.copy(t);
a.clear();
var e = b(u, o, a);
e && (e = a.aInB);
return e;
};
t.testCircleCircle = function(t, o, e) {
var r = p.pop().copy(o.pos).add(o.offset).sub(t.pos).sub(t.offset), n = t.r + o.r, s = n * n, i = r.len2();
if (i > s) {
p.push(r);
return !1;
}
if (e) {
var h = Math.sqrt(i);
e.a = t;
e.b = o;
e.overlap = n - h;
e.overlapN.copy(r.normalize());
e.overlapV.copy(r).scale(e.overlap);
e.aInB = t.r <= o.r && h <= o.r - t.r;
e.bInA = o.r <= t.r && h <= t.r - o.r;
}
p.push(r);
return !0;
};
function g(t, o, e) {
for (var r = p.pop().copy(o.pos).add(o.offset).sub(t.pos), n = o.r, s = n * n, i = t.calcPoints, h = i.length, a = p.pop(), u = p.pop(), y = 0; y < h; y++) {
var c = y === h - 1 ? 0 : y + 1, v = 0 === y ? h - 1 : y - 1, g = 0, b = null;
a.copy(t.edges[y]);
u.copy(r).sub(i[y]);
e && u.len2() > s && (e.aInB = !1);
var d = l(a, u);
if (d === f) {
a.copy(t.edges[v]);
var w = p.pop().copy(r).sub(i[v]);
if ((d = l(a, w)) === x) {
if ((P = u.len()) > n) {
p.push(r);
p.push(a);
p.push(u);
p.push(w);
return !1;
}
if (e) {
e.bInA = !1;
b = u.normalize();
g = n - P;
}
}
p.push(w);
} else if (d === x) {
a.copy(t.edges[c]);
u.copy(r).sub(i[c]);
if ((d = l(a, u)) === f) {
if ((P = u.len()) > n) {
p.push(r);
p.push(a);
p.push(u);
return !1;
}
if (e) {
e.bInA = !1;
b = u.normalize();
g = n - P;
}
}
} else {
var A = a.perp().normalize(), P = u.dot(A), I = Math.abs(P);
if (P > 0 && I > n) {
p.push(r);
p.push(A);
p.push(u);
return !1;
}
if (e) {
b = A;
g = n - P;
(P >= 0 || g < 2 * n) && (e.bInA = !1);
}
}
if (b && e && Math.abs(g) < Math.abs(e.overlap)) {
e.overlap = g;
e.overlapN.copy(b);
}
}
if (e) {
e.a = t;
e.b = o;
e.overlapV.copy(e.overlapN).scale(e.overlap);
}
p.push(r);
p.push(a);
p.push(u);
return !0;
}
t.testPolygonCircle = g;
t.testCirclePolygon = function(t, o, e) {
var r = g(o, t, e);
if (r && e) {
var n = e.a, s = e.aInB;
e.overlapN.reverse();
e.overlapV.reverse();
e.a = e.b;
e.b = n;
e.aInB = e.bInA;
e.bInA = s;
}
return r;
};
function b(t, o, e) {
for (var r = t.calcPoints, n = r.length, s = o.calcPoints, p = s.length, i = 0; i < n; i++) if (c(t.pos, o.pos, r, s, t.normals[i], e)) return !1;
for (i = 0; i < p; i++) if (c(t.pos, o.pos, r, s, o.normals[i], e)) return !1;
if (e) {
e.a = t;
e.b = o;
e.overlapV.copy(e.overlapN).scale(e.overlap);
}
return !0;
}
t.testPolygonPolygon = b;
return t;
});