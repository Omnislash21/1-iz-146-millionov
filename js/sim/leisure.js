// Свободное время и календарь по дням: раз в неделю — несколько свободных вечеров, игрок тратит их на занятия
// (бар, рыбалка, театр, звонок родителям…), у каждого — цена, польза и риск. Ставки на футбол с риском зависимости, лотерея.
// Если игрок за месяц ничего не выбрал сам (или играет автопилот), досуг подбирается по долям реальных людей (RL.DATA.leisure share).
RL.Leisure = (function () {
  var U = RL.util, S = RL.S, D = RL.DATA;
  var L = function () { return D.leisure; };
  var AVG = function (s) { return RL.Economy.AVG24() * RL.World.realWageIndex(s, s.date.year, s.date.month); };
  function tx(s, t) { return RL.Events.text(s, t, {}); }
  function band(a) { return a < 25 ? 0 : a < 45 ? 1 : a < 65 ? 2 : 3; }
  function def(id) { return L().actions.filter(function (x) { return x.id === id; })[0]; }
  function priceK(s) { var Lc = RL.Young.loc(s); return Lc.region.price * D.settlementTypes[Lc.settlement].price; }
  function name(s, x) {
    var n = x.nameBySex && x.nameBySex[s.person.sex] || x.name;
    if (x.nameByEra) Object.keys(x.nameByEra).map(Number).sort(function (a, b) { return a - b; }).forEach(function (y) { if (s.date.year >= y) n = x.nameByEra[y]; });
    if (x.nameByReligion && x.nameByReligion[s.person.religionTradition]) n = x.nameByReligion[s.person.religionTradition];
    return S.era(n, s.date.year);
  }
  function share(s, x) { return x.share ? (x.share[s.person.sex] || x.share.m)[band(S.age(s))] : null; }

  // свободных вечеров на неделю
  function weekly(s) {
    var p = s.person, W = L().weekly, a = S.age(s), v = W.base;
    if (p.job && p.job.employed && !p.job.onLeave) v += W.employed;
    if ((p.kids || []).some(function (k) { return k.alive && k.withMe && k.age < 7; })) v += W.smallKids;
    if (p.pension && !(p.job && p.job.employed)) v += W.pensioner;
    else if (a >= 18 && !(p.job && p.job.employed) && p.education.stage === 'work') v += W.unemployed;
    if (p.focus === 'career' || p.focus === 'sidejob') v -= 1;
    if (['army', 'colony'].indexOf(p.education.stage) >= 0) v = 0;
    return U.clamp(v, 0, W.max);
  }
  function money(s) { return S.age(s) >= 18 && s.person.own ? RL.Adult.wealth(s) : s.family.savings; }
  function list(s) {
    var p = s.person, a = S.age(s), f = S.facts(s), k = priceK(s), free = p.free === undefined ? weekly(s) : p.free;
    return L().actions.filter(function (x) { return a >= x.age[0] && a <= x.age[1] && (!x.when || RL.Events.check(x.when, f)); }).map(function (x) {
      var c = x.cost * k, o = {id: x.id, name: name(s, x), desc: S.era(x.descBySex && x.descBySex[s.person.sex] || x.desc, s.date.year), cost: c, time: x.time, share: share(s, x), ok: true, why: ''};
      if (x.time > free) { o.ok = false; o.why = 'на этой неделе свободных вечеров не осталось'; }
      else if (x.time === 0 && (p.weekUsed || {})[x.id]) { o.ok = false; o.why = 'уже было на этой неделе'; }
      else if (monthCount(s, x.id) >= 5) { o.ok = false; o.why = 'в этом месяце уже пять раз'; }
      else if (c > 0 && money(s) < c) { o.ok = false; o.why = 'нет денег'; }
      if (['army', 'colony'].indexOf(p.education.stage) >= 0) { o.ok = false; o.why = 'не до этого'; }
      return o;
    });
  }

  // сколько раз занятие выбрано в этом месяце (сам игрок): польза каждого следующего раза меньше — 1; 0,7; 0,5; 0,35; 0,25
  function monthCount(s, id) { var c = s.person.leisMonth2; return c && c.k === s.date.year * 12 + s.date.month ? c.n[id] || 0 : 0; }
  function bumpMonth(s, id) {
    var p = s.person, k = s.date.year * 12 + s.date.month;
    if (!p.leisMonth2 || p.leisMonth2.k !== k) p.leisMonth2 = {k: k, n: {}};
    p.leisMonth2.n[id] = (p.leisMonth2.n[id] || 0) + 1;
  }
  var DIM = [1, 0.7, 0.5, 0.35, 0.25];

  // ---------- последствия ----------
  function pay(s, c) {
    if (c <= 0) return;
    if (S.age(s) >= 18 && s.person.own) RL.Adult.cashFlow(s, -c); else s.family.savings = Math.max(0, s.family.savings - c);
  }
  function apply(s, x, rng, quiet, mul) {
    var p = s.person, e = x.effects || {}, m = mul || 1;
    p.leisCount = p.leisCount || {}; p.leisCount[x.id] = (p.leisCount[x.id] || 0) + 1;
    Object.keys(e).forEach(function (k) { S.adj(s, k, e[k] * m); });
    if (x.looks) p.appearance = U.clamp((p.appearance || 50) + x.looks * m, 0, 92);
    if (x.fy) { p.fy = p.fy || {}; p.fy[x.fy] = (p.fy[x.fy] || 0) + 0.06 * m; }
    if (x.trait) Object.keys(x.trait).forEach(function (t) { S.trait(s, t, x.trait[t] * m); });
    if (x.faith) s.flags.faith = (s.flags.faith || 0) + 1;
    if (x.parents) S.parentsAlive(s).forEach(function (pm) { pm.relation = U.clamp(pm.relation + x.parents * m, 0, 100); if (x.parentsHealth) pm.health = U.clamp(pm.health + x.parentsHealth * m, 0, 100); });
    if (x.spouse && p.spouse) p.spouse.relation = U.clamp(p.spouse.relation + x.spouse * m, 0, 100);
    if (x.kids) (p.kids || []).forEach(function (kd) { if (kd.alive && kd.withMe) kd.boost = (kd.boost || 0) + x.kids * m; });
    var r = x.risk || {}, hb = p.habits || {};
    // досуг может втянуть в выпивку, но не до зависимости (её ведёт RL.Teen); у «тихого» досуга автопилота риск ниже
    if (r.alcohol && rng.chance(r.alcohol * (hb.alcohol >= 1 ? 1 : 0.4) * (quiet ? 0.25 : 1) * (p.religionTradition === 'muslim' ? 0.2 : 1))) {
      var lv = hb.alcohol || 0;
      if (lv < 2) { RL.Teen.setHabit(s, 'alcohol', lv + 1, quiet); if (!quiet && lv >= 1) S.log(s, 'Посиделки всё чаще заканчиваются «продолжением». Пьёшь больше, чем раньше.', 'bad'); }
    }
    if (r.drugs && rng.chance(r.drugs) && !(hb.drugs >= 1)) { RL.Teen.setHabit(s, 'drugs', 1, true); if (!quiet) S.log(s, tx(s, 'В клубе предложили «таблетку для настроения» — ты [согласился|согласилась].'), 'bad'); }
    if (r.gaming && rng.chance(r.gaming) && (hb.gaming || 0) < 3) RL.Teen.setHabit(s, 'gaming', (hb.gaming || 0) + 1, quiet);
    if (r.hangover && hb.alcohol >= 1 && rng.chance(r.hangover)) S.adj(s, 'health', -0.6);
    if (r.fight && p.sex === 'm' && rng.chance(r.fight * (hb.alcohol >= 2 ? 2 : 1))) {
      if (S.age(s) < 50 && RL.Events.def('street_fight_adult')) RL.Events.queue(s, 'street_fight_adult', {});
      else { S.adj(s, 'health', -4); if (!quiet) S.log(s, 'У бара привязались пьяные — разбитая губа.', 'bad'); }
    }
    if (r.injury && rng.chance(r.injury)) { S.adj(s, 'health', -6); S.log(s, tx(s, 'Неудачно [упал|упала] — растяжение, неделя на больничном.'), 'health'); }
    if (r.drown && rng.chance(r.drown)) s.deathNow = 'Утопление';
    if (r.meet && !p.spouse && S.age(s) >= 18 && !s.pending && rng.chance(r.meet) && RL.OwnFamily.offerMeet) RL.OwnFamily.offerMeet(s, rng);
  }

  // ---------- ставки ----------
  function clubs(s) {
    var Sp = D.sport, y = s.date.year, src = Sp.clubsModern && y >= Sp.modernFrom ? Sp.clubsModern.football : Sp.clubs.football;
    var l = src.filter(function (c) { return c[3] === 1 && (!c[4] || y >= c[4]) && (!c[5] || y <= c[5]); });
    return l.length >= 2 ? l : Sp.clubs.football.filter(function (c) { return c[3] === 1; });
  }
  function offerBet(s, rng) {
    var cl = clubs(s), h = rng.pick(cl), aw = rng.pick(cl.filter(function (c) { return c !== h; }));
    var ph = U.clamp(rng.normal(0.45, 0.12), 0.2, 0.75), pd = 0.26, pa = 1 - ph - pd;
    var mg = L().bet.margin, odds = [mg / ph, mg / pd, mg / pa].map(function (x) { return Math.round(x * 100) / 100; });
    // ставки — круглые суммы в рублях того года (до деноминации 1998 — тысячи)
    var st = L().bet.stakes.map(function (x) { return RL.Economy.realOf(s, x * (s.date.year < 1998 ? 1000 : 1), s.date.year, s.date.month); });
    var lg = RL.Careers.league ? RL.Careers.league('football', 1, s.date.year) : 'РПЛ';
    var m = {home: h[0], away: aw[0], p: [ph, pd, pa], odds: odds, lg: lg};
    var opts = [
      {kind: 'bet', pick: 0, stake: st[1], text: 'На победу «' + h[0] + '», ' + RL.World.money(s, st[1]) + ' (кф ' + odds[0] + ')'},
      {kind: 'bet', pick: 1, stake: st[1], text: 'На ничью, ' + RL.World.money(s, st[1]) + ' (кф ' + odds[1] + ')'},
      {kind: 'bet', pick: 2, stake: st[1], text: 'На победу «' + aw[0] + '», ' + RL.World.money(s, st[1]) + ' (кф ' + odds[2] + ')'},
      {kind: 'bet', pick: ph >= pa ? 0 : 2, stake: st[2], text: 'Крупно на фаворита: ' + RL.World.money(s, st[2]) + ' (кф ' + odds[ph >= pa ? 0 : 2] + ')'},
      {kind: 'bet', pick: ph >= pa ? 2 : 0, stake: st[0], text: 'По мелочи на андердога: ' + RL.World.money(s, st[0]) + ' (кф ' + odds[ph >= pa ? 2 : 0] + ')'},
      {kind: 'watch', text: 'Не ставить — просто посмотреть матч'}];
    var where = s.date.year >= L().bet.legalFrom ? 'в приложении букмекера' : s.date.year >= 1998 ? 'в букмекерской конторе у метро' : 'у знакомого «букмекера» во дворе';
    var pdn = {kind: 'custom', handler: 'leisure', id: 'bet', title: lg + ': ' + h[0] + ' — ' + aw[0], text: 'Матч в субботу. Ставку можно сделать ' + where + '.', opts: opts, match: m,
      choices: opts.map(function (o, i) { return {i: i, text: o.text}; })};
    if (s.pending) s.queue.unshift({custom: pdn}); else s.pending = pdn;
  }
  function score(rng, res) {
    var g = function (l) { var k = 0, t = Math.exp(-l), p = 1; do { k++; p *= rng.next(); } while (p > t && k < 9); return k - 1; };
    for (var i = 0; i < 40; i++) { var a = g(1.4), b = g(1.1); if ((res === 0 && a > b) || (res === 1 && a === b) || (res === 2 && a < b)) return a + ':' + b; }
    return res === 0 ? '1:0' : res === 1 ? '1:1' : '0:1';
  }
  function resolveBet(s, pd, o, rng) {
    var p = s.person, m = pd.match, r = rng.next(), res = r < m.p[0] ? 0 : r < m.p[0] + m.p[1] ? 1 : 2, sc = score(rng, res);
    var line = m.lg + ': ' + m.home + ' — ' + m.away + ' ' + sc + '.';
    S.adj(s, 'happiness', 1.5); S.adj(s, 'social', 0.5);
    if (o.kind !== 'bet') { S.log(s, line + ' Посмотрел' + (p.sex === 'f' ? 'а' : '') + ' без ставки.', 'info'); return; }
    var g = p.gamble = p.gamble || {lvl: 0, n: 0, net: 0};
    pay(s, o.stake); g.n++;
    if (res === o.pick) { var win = o.stake * m.odds[o.pick]; if (S.age(s) >= 18) RL.Adult.cashFlow(s, win); g.net += win - o.stake; S.log(s, line + ' Ставка сыграла: +' + RL.World.money(s, win - o.stake) + '.', 'good'); S.adj(s, 'happiness', 3); }
    else { g.net -= o.stake; S.log(s, line + ' Ставка не зашла: −' + RL.World.money(s, o.stake) + '.', 'bad'); S.adj(s, 'mental', -1); }
    addiction(s, rng, o.stake);
  }
  function addiction(s, rng, stake) {
    var p = s.person, g = p.gamble, P = L().bet.addictP;
    var big = stake > 0.1 * AVG(s) ? 1.6 : 1;
    if (g.lvl < 3 && rng.chance(P[g.lvl] * big * (p.traits.selfControl < -20 ? 1.8 : 1))) {
      g.lvl++;
      if (g.lvl === 2) S.log(s, 'Ставки затягивают: проверяешь коэффициенты по утрам, хочется отыграться.', 'bad');
      if (g.lvl === 3) S.log(s, 'Лудомания: ставишь уже на всё подряд, в долг, тайком от близких.', 'bad');
    }
  }
  // зависимый игрок ставит и без участия игрока; шанс бросить — небольшой
  function gambleMonthly(s, rng) {
    var p = s.person, g = p.gamble;
    if (!g || g.lvl < 2 || S.age(s) < 18) return;
    var lose = AVG(s) * (g.lvl === 3 ? rng.range(0.3, 1.2) : rng.range(0.05, 0.3));
    pay(s, lose); g.net -= lose; S.adj(s, 'mental', g.lvl === 3 ? -2 : -0.5);
    if (p.spouse && g.lvl === 3) p.spouse.relation = U.clamp(p.spouse.relation - 2, 0, 100);
    if (g.lvl === 3 && rng.chance(0.08)) S.log(s, 'Опять проигрыш — в этом месяце ушло ' + RL.World.money(s, lose) + '.', 'bad');
    var quit = 0.015 * (p.focus === 'health' || p.focus === 'faith' || s.flags.faith > 5 ? 2.5 : 1) * (p.spouse ? 1.4 : 1);
    if (rng.chance(quit)) { g.lvl = Math.max(0, g.lvl - 2); S.log(s, tx(s, 'Ты [удалил|удалила] приложения букмекеров и [заблокировал|заблокировала] себя через ЦУПИС. Держишься.'), 'good'); }
  }
  function lottery(s, rng) {
    var T = L().lottery, r = rng.next(), win = 0;
    if (r < T.jackpot[0]) win = T.jackpot[1]; else if (r < T.big[0]) win = T.big[1]; else if (r < T.small[0]) win = T.small[1]; else if (r < T.tiny[0]) win = T.tiny[1];
    if (win) { if (win >= 1e6) s.person.flags.lotteryBig = 1; if (S.age(s) >= 18) RL.Adult.cashFlow(s, win); S.log(s, (win >= 1e6 ? 'Невероятно! ' : '') + 'Лотерейный билет выиграл ' + RL.World.money(s, win) + '.', win >= 1e5 ? 'good' : 'money'); S.adj(s, 'happiness', win >= 1e6 ? 20 : 1); }
    else if (rng.chance(0.3)) S.log(s, 'Лотерейный билет — мимо.', 'info');
  }

  // ---------- действие игрока ----------
  function act(s, id, rng) {
    var p = s.person, x = def(id), o = list(s).filter(function (z) { return z.id === id; })[0];
    if (!x || !o || !o.ok) return false;
    p.free = (p.free === undefined ? weekly(s) : p.free) - x.time;
    p.weekUsed = p.weekUsed || {}; p.weekUsed[id] = 1;
    p.leisMonth = s.date.year * 12 + s.date.month;
    pay(s, o.cost);
    if (x.special === 'bet') { offerBet(s, rng); return true; }
    if (x.special === 'lottery') { lottery(s, rng); return true; }
    var n = monthCount(s, id); bumpMonth(s, id);
    apply(s, x, rng, false, DIM[Math.min(4, n)]);
    S.log(s, o.name + '.', 'leisure');
    return true;
  }
  function resolve(s, idx, rng) {
    var pd = s.pending, o = pd.opts[idx];
    s.pending = null;
    if (pd.id === 'bet') resolveBet(s, pd, o, rng);
  }
  function autoChoose(s, rng) {
    var pd = s.pending, g = s.person.gamble, w = {};
    pd.opts.forEach(function (o, i) { w[i] = o.kind === 'watch' ? (g && g.lvl >= 2 ? 0.2 : 1.5) : o.stake > 5000 ? 0.3 : 1; });
    return +rng.weightedKey(w);
  }
  // автопилот и «тихий» досуг: если сам игрок за месяц ничего не выбрал — 2–3 занятия по долям реальных людей
  function monthly(s, rng) {
    var p = s.person, a = S.age(s);
    if (a < 6) return;
    if (p.free === undefined || s.date.month !== p.freeM) { p.free = weekly(s); p.freeM = s.date.month; if (!s.settings || !s.settings.daily) p.weekUsed = {}; }
    if (p.leisMonth !== s.date.year * 12 + s.date.month) {
      var opts = list(s).filter(function (o) { return o.ok && !def(o.id).special && o.share; });
      var n = Math.min(opts.length, 2 + (weekly(s) >= 4 ? 1 : 0));
      for (var i = 0; i < n; i++) {
        var w = {}; opts.forEach(function (o) { w[o.id] = Math.max(0.5, o.share) * (o.cost > 0.1 * AVG(s) ? 0.3 : 1); });
        if (!Object.keys(w).length) break;
        var id = rng.weightedKey(w), x = def(id);
        pay(s, x.cost * priceK(s) * 0.5); apply(s, x, rng, true, 0.5);
        opts = opts.filter(function (o) { return o.id !== id; });
      }
      // ставят на спорт по-настоящему ~2–4% взрослых мужчин, ~0,5% женщин
      var bs = (def('bet').share || {})[p.sex];
      if (a >= 18 && s.date.year >= 1995 && bs && rng.chance(bs[band(a)] / 100 * 0.25)) { var g = p.gamble = p.gamble || {lvl: 0, n: 0, net: 0}; g.n++; addiction(s, rng, 0); }
    }
    gambleMonthly(s, rng);
  }
  // один день: праздники, новая неделя по понедельникам
  function dayTick(s, rng) {
    var d = s.date, wd = new Date(d.year, d.month, d.day).getDay(), p = s.person;
    if (wd === 1) { p.free = weekly(s); p.weekUsed = {}; }
    (D.holidays || []).forEach(function (h) {
      if (h.d !== d.day || h.m !== d.month || (h.from && d.year < h.from) || (h.to && d.year > h.to)) return;
      if (h.rel && p.religionTradition !== h.rel) return;
      if (h.quiet) return;
      if (h.m === 8 && !(p.education.stage === 'school' || (p.kids || []).some(function (k) { return k.alive && k.withMe && k.age >= 6.5 && k.age < 18; }))) return;
      S.log(s, h.text, 'holiday'); S.adj(s, 'happiness', 0.8);
    });
  }
  function facts(s, f) { var g = s.person.gamble; f.gambler = !!(g && g.lvl >= 2); f.freeEvenings = s.person.free || 0; }
  return {list: list, act: act, resolve: resolve, autoChoose: autoChoose, monthly: monthly, dayTick: dayTick, weekly: weekly, facts: facts};
})();
