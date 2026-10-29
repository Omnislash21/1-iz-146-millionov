// Мир: цены, зарплаты, безработица, исторические флаги по годам + сценарий будущего.
// Деньги в игре — «рубли 2024 г.» (реальные). Номинал = реал × P(y,m) / P(2024, июнь).
RL.World = (function () {
  var E = function () { return RL.DATA.economy; };
  var H = function () { return RL.DATA.history; };
  var U = RL.util;
  var LAST_HIST = 2025;

  // Сценарий будущего генерируется один раз на жизнь (из seed) и хранится в state.world.
  function buildFuture(seed) {
    var rng = new RL.RNG((seed ^ 0x5EED) >>> 0);
    var F = H().future, out = {}, svoActive = true;
    for (var y = LAST_HIST + 1; y <= 2160; y++) {
      var crisis = rng.chance(F.crisisChance);
      var infl = Math.max(1, rng.normal(F.inflationMean, F.inflationSd) + (crisis ? F.crisisInflationAdd : 0));
      var realGrowth = rng.normal(F.realWageGrowthMean, F.realWageGrowthSd) + (crisis ? F.crisisWageHit : 0);
      var unemp = Math.max(1.5, rng.normal(F.unemploymentMean, F.unemploymentSd) + (crisis ? 2.5 : 0));
      if (svoActive && rng.chance(F.svoEndChancePerYear)) svoActive = false;
      var flags = {};
      if (crisis) flags.jobLoss = F.crisisJobLoss;
      if (crisis) flags.alcohol = 1.1;
      if (rng.chance(F.pandemicChance)) flags.epidemic = 'pandemic';
      if (svoActive) flags.svo = 1;
      var mob = svoActive && rng.chance(F.mobilizationChancePerYear) ? {month: rng.int(0, 11), months: 3} : null;
      out[y] = {inflation: infl, realGrowth: realGrowth, unemployment: unemp, crisis: crisis, flags: flags, mobilization: mob,
        leShift: rng.normal(F.leTrendPerYear, F.leSd)};
    }
    return out;
  }

  // сценарий из старых сохранений был только до 2120 — достраиваем тем же seed (ранние годы совпадают)
  function fut(state, y) {
    var f = state.world.future;
    if (!f[y] && y > LAST_HIST) { state.world.future = f = buildFuture(state.seed); }
    return f[y] || f[2160];
  }
  var cache = {};
  function key(state) { return state ? state.seed : 0; }

  // Уровень цен на конец года y (P(2024)=1).
  function priceEnd(state, y) {
    var c = cache[key(state)] = cache[key(state)] || {p: {}, w: {}};
    if (c.p[y] !== undefined) return c.p[y];
    var v;
    if (y === 2024) v = 1;
    else if (y > 2024) v = priceEnd(state, y - 1) * (1 + inflation(state, y) / 100);
    else v = priceEnd(state, y + 1) / (1 + inflation(state, y + 1) / 100);
    c.p[y] = v;
    return v;
  }
  function inflation(state, y) {
    var t = E().inflation;
    if (t[y] !== undefined) return t[y];
    if (y < 1985) return 1;
    return fut(state, y).inflation;
  }
  function price(state, y, m) {
    return priceEnd(state, y - 1) * Math.pow(1 + inflation(state, y) / 100, ((m || 0) + 1) / 12);
  }
  // Номинальная средняя зарплата (деноминированные руб.) — табличная до 2025, дальше по сценарию.
  function avgWageYear(state, y) {
    var t = E().avgWage;
    if (t[y] !== undefined) return t[y];
    var c = cache[key(state)] = cache[key(state)] || {p: {}, w: {}};
    if (c.w[y] !== undefined) return c.w[y];
    var f = fut(state, y);
    var v = avgWageYear(state, y - 1) * (1 + f.inflation / 100) * (1 + f.realGrowth / 100);
    c.w[y] = v;
    return v;
  }
  var REF = null;
  // Индекс реальной зарплаты к 2024 (=1).
  function realWageIndex(state, y, m) {
    if (REF === null) REF = E().avgWage[2024] / price(state, 2024, 6);
    var w0 = avgWageYear(state, y), w1 = avgWageYear(state, y + 1 <= 2120 ? y + 1 : y);
    var nominal = w0 * Math.pow(w1 / w0, ((m || 0) - 6) / 12);
    return (nominal / price(state, y, m)) / REF;
  }
  function yearData(state, y) {
    var h = H().years[y];
    if (h) return {flags: h.flags || {}, news: h.news || [], mobilization: h.mobilization || null};
    var f = fut(state, y);
    return {flags: f ? f.flags : {}, news: [], mobilization: f ? f.mobilization : null, crisis: f && f.crisis};
  }
  function flag(state, y, name, def) {
    var v = yearData(state, y).flags[name];
    return v === undefined ? (def === undefined ? 1 : def) : v;
  }
  function unemployment(state, y) {
    var t = E().unemployment;
    if (y <= LAST_HIST) return U.interpYear(t, y);
    return fut(state, y).unemployment;
  }
  function tableOrLast(t, y) { return U.interpYear(t, Math.min(y, 2025)); }

  function ctx(state) {
    var y = state.date.year, m = state.date.month;
    return {
      year: y, month: m,
      price: price(state, y, m),
      wageIndex: realWageIndex(state, y, m),
      unemployment: unemployment(state, y) / 100,
      arrears: y <= 2012 ? U.interpYear(E().wageArrears, y) : 0,
      pensionRatio: tableOrLast(E().pensionRatio, y),
      shadow: tableOrLast(E().shadowLevel, y),
      subsistence: tableOrLast(E().subsistenceRatio, y),
      deficit: y <= 1991 ? U.interpYear(E().deficitEfficiency, y) : 1,
      flags: yearData(state, y).flags
    };
  }

  // Форматирование суммы (реальные руб. 2024) в номинал года.
  function money(state, real, y, m) {
    y = y === undefined ? state.date.year : y;
    m = m === undefined ? state.date.month : m;
    var nominal = real * price(state, y, m) / price(state, 2024, 6);
    var unit = '₽';
    if (y < 1992) { nominal *= 1000; unit = 'сов. руб.'; }
    else if (y < 1998) { nominal *= 1000; unit = '₽ (неденом.)'; }
    var abs = Math.abs(nominal), s;
    if (abs >= 1e9) s = (nominal / 1e9).toFixed(1) + ' млрд';
    else if (abs >= 1e6) s = (nominal / 1e6).toFixed(abs >= 1e7 ? 0 : 1) + ' млн';
    else if (abs >= 1e4) s = Math.round(nominal / 100) * 100 + '';
    else if (abs >= 100 || y < 1998) s = Math.round(nominal) + '';
    else s = Math.round(nominal) + '';
    s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return s + ' ' + unit;
  }

  return {buildFuture: buildFuture, price: price, realWageIndex: realWageIndex, unemployment: unemployment,
    yearData: yearData, flag: flag, ctx: ctx, money: money, inflation: inflation, avgWageYear: avgWageYear,
    resetCache: function () { cache = {}; REF = null; }};
})();
