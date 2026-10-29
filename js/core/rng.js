// Детерминированный ГСЧ (mulberry32) + распределения.
// Состояние ГСЧ хранится в сохранении, поэтому жизнь воспроизводима по seed.
var RL = (typeof window !== 'undefined' ? window : globalThis).RL || {};
(typeof window !== 'undefined' ? window : globalThis).RL = RL;

RL.RNG = function (seed) {
  this.s = (seed >>> 0) || 1;
};
RL.RNG.prototype = {
  next: function () {
    var t = (this.s = (this.s + 0x6D2B79F5) >>> 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  },
  chance: function (p) { return this.next() < p; },
  range: function (a, b) { return a + (b - a) * this.next(); },
  int: function (a, b) { return a + Math.floor(this.next() * (b - a + 1)); },
  normal: function (mean, sd) {
    var u = 1 - this.next(), v = this.next();
    return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  },
  // логнормальный множитель со средним ~1
  lognorm: function (sd) { return Math.exp(this.normal(-sd * sd / 2, sd)); },
  pick: function (arr) { return arr[Math.floor(this.next() * arr.length)]; },
  // items: массив; w: функция веса или имя поля
  weighted: function (items, w) {
    var f = typeof w === 'function' ? w : function (x) { return x[w || 'w']; };
    var total = 0, i, ws = [];
    for (i = 0; i < items.length; i++) { ws[i] = Math.max(0, f(items[i]) || 0); total += ws[i]; }
    if (total <= 0) return items[0];
    var r = this.next() * total;
    for (i = 0; i < items.length; i++) { r -= ws[i]; if (r < 0) return items[i]; }
    return items[items.length - 1];
  },
  // объект {ключ: вес} -> ключ
  weightedKey: function (obj) {
    var keys = Object.keys(obj);
    return this.weighted(keys, function (k) { return obj[k]; });
  }
};

var KEYS = typeof WeakMap !== 'undefined' ? new WeakMap() : {get: function () {}, set: function () {}};
RL.util = {
  clamp: function (x, a, b) { return x < a ? a : x > b ? b : x; },
  lerp: function (a, b, t) { return a + (b - a) * t; },
  // годовая вероятность -> месячная
  monthly: function (pYear) { return 1 - Math.pow(1 - Math.min(0.999999, pYear), 1 / 12); },
  round: function (x, n) { var k = Math.pow(10, n || 0); return Math.round(x * k) / k; },
  deepCopy: function (o) { return JSON.parse(JSON.stringify(o)); },
  // интерполяция по таблице {год: значение}
  interpYear: function (table, year) {
    if (table[year] !== undefined) return table[year];
    // отсортированные ключи таблицы кэшируются (функция вызывается сотни тысяч раз за жизнь)
    var ys = KEYS.get(table);
    if (!ys) { ys = Object.keys(table).map(Number).sort(function (a, b) { return a - b; }); KEYS.set(table, ys); }
    if (year <= ys[0]) return table[ys[0]];
    if (year >= ys[ys.length - 1]) return table[ys[ys.length - 1]];
    for (var i = 1; i < ys.length; i++) {
      if (year < ys[i]) {
        var t = (year - ys[i - 1]) / (ys[i] - ys[i - 1]);
        return table[ys[i - 1]] + (table[ys[i]] - table[ys[i - 1]]) * t;
      }
    }
  },
  fmtTpl: function (s, vars) {
    return String(s).replace(/\{(\w+)\}/g, function (m, k) { return vars[k] !== undefined ? vars[k] : m; });
  }
};
