// Движок событий. События описаны декларативно (RL.DATA.events): условия, вероятность, модификаторы, выборы, исходы.
// Условие when: {факт: значение} — массив из 2 чисел = диапазон; массив строк = «одно из»; {">=":x} и т.п.; tags: ["caucasus"] — любой тег региона.
RL.Events = (function () {
  var U = RL.util, S = RL.S;
  var OPS = {'>': function (a, b) { return a > b; }, '>=': function (a, b) { return a >= b; }, '<': function (a, b) { return a < b; },
    '<=': function (a, b) { return a <= b; }, '==': function (a, b) { return a === b; }, '!=': function (a, b) { return a !== b; }};

  function check(cond, f) {
    if (!cond) return true;
    for (var k in cond) {
      var v = cond[k], fv = f[k];
      if (k === 'tags') { if (!v.some(function (t) { return f.tags.indexOf(t) >= 0; })) return false; continue; }
      if (k === 'notTags') { if (v.some(function (t) { return f.tags.indexOf(t) >= 0; })) return false; continue; }
      if (k === 'any') { if (!v.some(function (c) { return check(c, f); })) return false; continue; }
      if (k === 'not') { if (check(v, f)) return false; continue; }
      if (Array.isArray(v)) {
        if (typeof v[0] === 'number') { if (typeof fv !== 'number' || fv < v[0] || fv > v[1]) return false; }
        else if (v.indexOf(fv) < 0) return false;
      } else if (v && typeof v === 'object') {
        for (var op in v) if (!OPS[op](fv, v[op])) return false;
      } else if (typeof v === 'boolean') { if (!!fv !== v) return false; }
      else if (fv !== v) return false;
    }
    return true;
  }
  function mulMods(mods, f) {
    var m = 1;
    (mods || []).forEach(function (x) { if (check(x.if, f)) m *= x.mul; });
    return m;
  }

  function vars(s, extra) {
    var p = s.person, man = S.manInHome(s), mom = S.mother(s);
    var sib = s.family.members.filter(function (m) { return m.role === 'sibling' && m.alive; })[0];
    var cr = S.carer(s), cap = function (t) { return t.charAt(0).toUpperCase() + t.slice(1); };
    var v = {name: p.firstName, city: p.city, mom: cr.n, carer: cr.n, Carer: cap(cr.n), carerD: cr.d, carerA: cr.a, carerG: cr.g,
      man: p.spouse ? p.spouse.name : man ? S.relName(man) : 'папа',
      manName: man ? man.name : '', sib: sib ? sib.name : '', region: S.region(s).name,
      drug: eraName(RL.DATA.teen && RL.DATA.teen.drugNames, s.date.year), smoke: eraName(RL.DATA.teen && RL.DATA.teen.smokeNames, s.date.year)};
    for (var k in extra || {}) v[k] = extra[k];
    return v;
  }
  function eraName(t, y) {
    if (!t) return '';
    var best = '';
    Object.keys(t).map(Number).sort(function (a, b) { return a - b; }).forEach(function (k) { if (y >= k) best = t[k]; });
    return best || t[Object.keys(t)[0]];
  }
  function text(s, t, v) {
    var sex = s.person.sex;
    t = String(t).replace(/\[([^|\]]*)\|([^\]]*)\]/g, function (m, a, b) { return sex === 'f' ? b : a; });
    // запасной вариант для старой записи «готов(а)», «самому(ой)», «выключил(а)»
    t = t.replace(/([А-Яа-яЁё]+)\((а|ой|ла|ая|на)\)/g, function (m, w, suf) {
      if (sex !== 'f') return w;
      if (suf === 'ой' && /ому$/.test(w)) return w.slice(0, -3) + 'ой';
      if (suf === 'ая' && /ый$|ой$|ий$/.test(w)) return w.slice(0, -2) + 'ая';
      return w + suf;
    });
    // подразделение по делам несовершеннолетних — только для детей; взрослым — обычный протокол
    if (S.age(s) >= 18 && /ПДН/.test(t)) t = t.replace(/Административка, учёт в ПДН/g, 'Административный протокол и штраф').replace(/постановка на учёт в ПДН/g, 'протокол и штраф')
      .replace(/Учёт в ПДН и разговор с опекой/g, 'Протокол в отделе полиции').replace(/учёт в ПДН/g, 'протокол в полиции').replace(/ПДН/g, 'полиция');
    return S.era(U.fmtTpl(t, v), s.date.year);
  }

  function def(id) { return RL.DATA.events.filter(function (e) { return e.id === id; })[0]; }

  function queue(s, id, extra) { s.queue.push({id: id, vars: extra || {}}); }

  function monthly(s, rng, o) {
    if (s.pending) return;
    o = o || {};
    // сначала — события, поставленные системами в очередь
    while (!o.randomOnly && s.queue.length && !s.pending) {
      var q = s.queue.shift();
      if (q.custom) { s.pending = q.custom; return; }
      var d = def(q.id);
      if (d && check(d.when, S.facts(s))) { fire(s, d, q.vars, rng); return; }
    }
    if (o.queueOnly) return;
    var f = S.facts(s);
    var list = RL.DATA.events.filter(function (e) {
      if (e.trigger) return false;
      if (e.once && s.fired[e.id]) return false;
      if (e.cooldown && s.cooldowns[e.id] && S.ageMonths(s) - s.cooldowns[e.id] < e.cooldown) return false;
      return check(e.when, f);
    });
    // перемешиваем, чтобы не было приоритета по порядку в файле
    for (var i = list.length - 1; i > 0; i--) { var j = Math.floor(rng.next() * (i + 1)); var t = list[i]; list[i] = list[j]; list[j] = t; }
    for (var k = 0; k < list.length; k++) {
      var e = list[k];
      if (rng.chance(Math.min(0.9, e.p * mulMods(e.mods, f) * (RL.Character ? RL.Character.eventMul(s, e) : 1) * (f.abroad && !(e.when && e.when.tags) ? 0.35 : 1)))) { fire(s, e, {}, rng); return; }
    }
  }

  function fire(s, e, extra, rng) {
    s.fired[e.id] = (s.fired[e.id] || 0) + 1;
    s.cooldowns[e.id] = S.ageMonths(s);
    var v = vars(s, extra), f = S.facts(s);
    var choices = (e.choices || []).map(function (c, i) { return {c: c, i: i}; }).filter(function (x) { return check(x.c.if, f); });
    // вариант со словом не своей эпохи («Выложить грустные посты» в 1995-м) — убрать, если остаются другие
    var inEra = choices.filter(function (x) { return !S.eraBad(text(s, x.c.text, v), s.date.year); });
    if (inEra.length) choices = inEra;
    if (choices.length && S.age(s) >= 3) {
      s.pending = {kind: 'event', id: e.id, title: text(s, e.title || '', v), text: text(s, e.text, v), vars: v,
        choices: choices.map(function (x) { return {i: x.i, text: text(s, x.c.text, v)}; })};
      return;
    }
    if (choices.length) { resolveChoice(s, e, choices[0].c, v, rng); return; }
    var head = e.text ? text(s, e.text, v) : '';
    if (e.outcomes) { var o = pickOutcome(e.outcomes, f, rng); applyOutcome(s, o, v, rng, head); }
    else { if (head) S.log(s, head, e.type || 'event'); applyEffects(s, e.effects, v, rng); }
  }

  // ct — черты выбранного варианта: у кого они сильны, тому чаще выпадают хорошие исходы (RL.Character)
  function pickOutcome(outs, f, rng, s, ct) {
    return rng.weighted(outs, function (o) { return (o.w === undefined ? 1 : o.w) * mulMods(o.mods, f) * (s && RL.Character ? RL.Character.outcomeMul(s, ct, o) : 1); });
  }
  function applyOutcome(s, o, v, rng, head) {
    var t = (head ? head + ' ' : '') + (o.text ? text(s, o.text, v) : '');
    if (t.trim()) S.log(s, t.trim(), o.type || 'event');
    applyEffects(s, o.effects, v, rng);
  }
  function resolveChoice(s, e, c, v, rng) {
    var f = S.facts(s);
    if (c.traits) Object.keys(c.traits).forEach(function (t) { S.trait(s, t, c.traits[t]); });
    applyEffects(s, c.effects, v, rng);
    if (c.outcomes) applyOutcome(s, pickOutcome(c.outcomes, f, rng, s, c.traits), v, rng, '');
  }

  function resolve(s, idx, rng) {
    var pd = s.pending;
    if (!pd || pd.kind !== 'event') return;
    var e = def(pd.id), c = e.choices[idx];
    s.pending = null;
    S.log(s, pd.title ? pd.title + ': ' + text(s, c.text, pd.vars) : text(s, c.text, pd.vars), 'choice');
    // какое решение сейчас принимается — чтобы отложенные последствия (later) помнили, откуда они
    s.curEv = {title: pd.title || '', choice: text(s, c.text, pd.vars), y: s.date.year};
    resolveChoice(s, e, c, pd.vars, rng);
    s.curEv = null;
  }

  // Эффекты: показатели ребёнка, деньги семьи (cash — руб. 2024), черты, отношения, состояния, флаги, смерть.
  function applyEffects(s, eff, v, rng) {
    if (!eff) return;
    ['health', 'mental', 'social', 'skills', 'happiness', 'money'].forEach(function (k) { if (eff[k]) S.adj(s, k, eff[k]); });
    if (eff.cash) {
      var k = S.region(s).price * S.st(s).price;
      var amt = eff.cash * (eff.cash < 0 ? k : 1);
      // со взрослого — из своего кошелька (сбережения → вклады → кредит); ребёнок тратит деньги семьи
      if (S.age(s) >= 18 && RL.Adult) RL.Adult.cashFlow(s, amt);
      else if (amt < 0 && s.family.savings < -amt) { s.family.debts.push({kind: 'relatives', name: 'занять у знакомых', balance: -amt - Math.max(0, s.family.savings), rate: 0}); s.family.savings = 0; }
      else s.family.savings += amt;
    }
    if (eff.atmosphere) s.family.atmosphere = U.clamp(s.family.atmosphere + eff.atmosphere, 0, 100);
    if (eff.trait) Object.keys(eff.trait).forEach(function (t) { S.trait(s, t, eff.trait[t]); });
    if (eff.relation) Object.keys(eff.relation).forEach(function (who) {
      var d = eff.relation[who];
      s.family.members.forEach(function (m) {
        if (!m.alive) return;
        var hit = who === 'all' ? m.inHome : who === 'man' ? m === S.manInHome(s) : who === 'mother' ? m.role === 'mother' : m.role === who;
        if (hit) m.relation = U.clamp(m.relation + d, 0, 100);
      });
    });
    if (eff.condition) RL.Health.addCondition(s, eff.condition, rng);
    if (eff.flag && !(eff.flag === 'pdnRecord' && S.age(s) >= 18)) s.flags[eff.flag] = 1;
    if (eff.unflag) delete s.flags[eff.unflag];
    if (eff.queue) queue(s, eff.queue, v);
    if (RL.Teen) RL.Teen.applyEffects(s, eff, rng);
    if (RL.Young) RL.Young.applyEffects(s, eff, rng);
    if (RL.Adult) RL.Adult.applyEffects(s, eff, rng);
    if (RL.OwnFamily) RL.OwnFamily.applyEffects(s, eff, rng);
    if (RL.Old) RL.Old.applyEffects(s, eff, rng);
    if (RL.Law) RL.Law.applyEffects(s, eff, rng);
    if (RL.Assets) RL.Assets.applyEffects(s, eff, rng);
    if (RL.Social) RL.Social.applyEffects(s, eff, rng);
    if (RL.Chains) RL.Chains.applyEffects(s, eff, rng);
    if (RL.Hardship) RL.Hardship.applyEffects(s, eff, rng);
    if (RL.Emigration) RL.Emigration.applyEffects(s, eff, rng);
    if (RL.Svo) RL.Svo.applyEffects(s, eff, rng);
    if (RL.Politics) RL.Politics.applyEffects(s, eff, rng);
    if (eff.death && (!eff.deathP || rng.chance(eff.deathP))) s.deathNow = eff.death;
  }

  // Автовыбор: ожидаемая польза исходов + согласованность с уже сложившимся характером + шум.
  // Автопилот — не робот. Взвешивает «как правильно» (utility) и «чего хочется сейчас» (myopic: удовольствие и деньги сразу,
  // расплата потом почти не видна). Доля «слабости» растёт при слабом самоконтроле, плохой психике, бутылке, безденежье [~].
  // Черты тянут к своим вариантам: трус выбирает осторожное, нечестный — «решить вопрос», вспыльчивый — скандал.
  function weakness(s) {
    var p = s.person, h = p.habits || {}, zsc = RL.Character ? RL.Character.z(s, 'selfControl') : 0;
    // калибровка: смертность и судимость автопилота должны оставаться у таблиц (tests/life-check.js) [~]
    return U.clamp(0.06 + Math.max(0, -zsc - 0.5) * 0.08 + (p.stats.mental < 35 ? 0.1 : 0) + ((h.alcohol || 0) >= 2 ? 0.07 : 0) + ((h.drugs || 0) >= 2 ? 0.1 : 0) + (p.stats.money < 25 ? 0.05 : 0) + (S.age(s) < 25 ? 0.03 : 0), 0.03, 0.5);
  }
  function myopic(eff, s) {
    if (!eff) return 0;
    var a = S.age(s), w = a >= 18 && RL.Adult && s.person.own ? Math.max(0, RL.Adult.wealth(s)) : 0, scale = Math.max(3000, w / 40);
    var u = (eff.happiness || 0) * 1.2 + (eff.social || 0) * 0.6 + (eff.cash || 0) / scale * (eff.cash > 0 ? 1.3 : 0.5) + Math.min(0, eff.mental || 0) * 0.5;
    if (eff.habitUp) u += 1.5; // «расслабиться» хочется сейчас
    if (eff.habitDown || eff.habitTry) u -= 1.5; // держаться — тяжело
    if (eff.later) u += 0.5; // последствий не видно
    if (eff.case || eff.crime) u -= 6; // страх есть, но слабее
    if (eff.jobLoss) u -= 2;
    return u;
  }
  function autoChoose(s, rng) {
    var pd = s.pending, e = def(pd.id), f = S.facts(s), best = 0, bestScore = -1e9, W = weakness(s);
    pd.choices.forEach(function (ch) {
      var c = e.choices[ch.i], sc = utility(c.effects, s), my = myopic(c.effects, s);
      if (c.outcomes) {
        var tot = 0, acc = 0, accM = 0;
        c.outcomes.forEach(function (o) { var w = (o.w === undefined ? 1 : o.w) * mulMods(o.mods, f); tot += w; acc += w * utility(o.effects, s); accM += w * myopic(o.effects, s); });
        sc += tot ? acc / tot : 0; my += tot ? accM / tot : 0;
      }
      sc = (1 - W) * sc + W * my * 1.5;
      if (c.traits) Object.keys(c.traits).forEach(function (t) {
        var z = RL.Character ? RL.Character.z(s, t) : (s.person.traits[t] || 0) / 30;
        sc += z * c.traits[t] * 0.45;
      });
      sc += rng.normal(0, 1.5 + W * 2);
      if (sc > bestScore) { bestScore = sc; best = ch.i; }
    });
    return best;
  }
  function utility(eff, s) {
    if (!eff) return 0;
    // цена денег: для ребёнка — бюджет семьи; взрослому та же сумма тем «легче», чем больше накоплено
    var a = s ? S.age(s) : 0, w = s && a >= 18 && RL.Adult && s.person.own ? Math.max(0, RL.Adult.wealth(s)) : 0;
    var scale = Math.max(3000, w / 40), avg = RL.Economy.AVG24();
    var u = (eff.health || 0) * 1.5 + (eff.mental || 0) + (eff.social || 0) * 0.7 + (eff.skills || 0) * 0.8 + (eff.happiness || 0) * 0.6
      + (eff.atmosphere || 0) * 0.3 + (eff.cash || 0) / scale - (eff.spend || 0) * avg / scale;
    if (eff.retire && s) {
      var p = s.person;
      u += 1 + (w / avg > 20 ? 4 : w / avg > 6 ? 1.5 : 0) + Math.max(0, a - 62) * 0.35 + (p.stats.health < 50 ? 3 : 0) - (p.stats.money < 30 ? 4 : 0) - (p.traits.diligence || 0) / 40;
    }
    if (eff.flatUse) u += {rent: 2, sell: 1, live: 0.3, keep: 0}[eff.flatUse] || 0;
    if (eff.repay) u += 1.5;
    if (eff.buyRentFlat) u += 1;
    if (eff.death) u -= 500 * (eff.deathP || 1);
    if (eff.habit) Object.keys(eff.habit).forEach(function (k) { u -= (k === 'drugs' ? 15 : 3) * eff.habit[k]; });
    if (eff.habitUp) Object.keys(eff.habitUp).forEach(function (k) { u -= (k === 'drugs' ? 12 : 5) * eff.habitUp[k]; });
    if (eff.habitDown) u += 4; if (eff.habitTry) u += 2;
    if (eff.jobLoss) u -= 8;
    if (eff.wageMul) u += (eff.wageMul - 1) * 30;
    if (eff.favorRefuse) u -= 1.5;
    if (eff.bankrupt) u -= 2;
    if (eff.emigrate) u -= 1;
    if (eff.crime || eff.case) u -= 40;
    // осторожность автопилота в крупных денежных решениях
    if (eff.startBiz) u -= 4;
    if (eff.buyFlat) u -= 1.5;
    if (eff.invest) u -= 0.8;
    if (eff.acceptOffer) u += 1;
    if (eff.relationship === 'breakup') u -= 3;
    if (eff.relationship === 'marry') u += 2;
    if (eff.wantChild) u += 1.5;
    if (eff.cancerCare === 'refuse') u -= 20;
    if (eff.cancerCare === 'abroad') u += 3;
    if (eff.condition) u -= 8;
    return u;
  }

  // показать событие сейчас (кнопка в интерфейсе — плакат «Служба по контракту»)
  function fireNow(s, id, extra) { var e = def(id); if (!e || s.pending) return; var rng = new RL.RNG(1); rng.s = s.rng; fire(s, e, extra || {}, rng); s.rng = rng.s; }
  return {fireNow: fireNow, weakness: weakness, monthly: monthly, queue: queue, resolve: resolve, autoChoose: autoChoose, check: check, applyEffects: applyEffects, text: text, def: def};
})();
