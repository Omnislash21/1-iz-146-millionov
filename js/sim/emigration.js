// Эмиграция как ветка жизни: дорого, с потерей статуса и риском не прижиться.
// Переезд — эффект emigrate (страна по эпохе и профессии), дальше — адаптация 0…1: язык, работа ниже квалификации,
// тоска; через годы — «прижился» или «вернулся». Пока ты за границей: нет призыва и выборов, российских событий меньше.
RL.Emigration = (function () {
  var U = RL.util, S = RL.S;
  function C(id) { return RL.DATA.abroad.filter(function (c) { return c.id === id; })[0]; }
  function abroad(s) { var p = s.person; return !!(p.loc && p.loc.regionId && /^x_/.test(p.loc.regionId)); }

  function pickCountry(s, rng) {
    var p = s.person, y = s.date.year, eth = RL.DATA.ethnic[p.ethnic] || {}, w = {}, en = eth.m || '';
    RL.DATA.abroad.forEach(function (c) {
      if (y < c.from) return;
      var k = 1;
      if (c.id === 'x_isr') k = /еврей/.test(en) ? 30 : y < 2000 ? 0.5 : 0.15;
      if (c.id === 'x_deu') k = /немец/.test(en) ? 30 : y < 2005 ? 1 : 0.6;
      if (c.id === 'x_usa') k = y < 2022 ? 1 : 0.3;
      if (y >= 2022 && /^x_(geo|arm|kaz|srb|tur)$/.test(c.id)) k = 2;
      w[c.id] = k;
    });
    return rng.weightedKey(w);
  }
  function go(s, rng) {
    var p = s.person, o = RL.Young.own(s), c = C(pickCountry(s, rng));
    p.abroad = {country: c.id, since: s.date.year, adapt: 0.05, home: p.loc ? JSON.parse(JSON.stringify(p.loc)) : null};
    p.loc = {regionId: c.id, settlement: 'big', city: c.name};
    o.living = 'rent_flat';
    if (p.job) p.job.employed = false;
    if (p.biz && RL.Adult) RL.Adult.applyEffects(s, {closeBiz: true}, rng);
    RL.Events.applyEffects(s, {cash: -Math.round(c.price * 150000)}, {}, rng);
    S.log(s, 'Переезд: ' + c.name + '. Чемодан, съёмная квартира, ' + c.lang + ' с нуля. Всё, что было «там», — теперь только в телефоне.', 'family');
    S.adj(s, 'social', -15); S.adj(s, 'mental', -5);
    if (p.spouse && rng.chance(0.3)) RL.OwnFamily.applyEffects(s, {relationship: 'breakup', reason: 'не захотел(а) уезжать'}, rng);
  }
  function back(s, why) {
    var p = s.person, a = p.abroad;
    p.loc = a.home || null;
    if (p.loc === null) RL.Young.own(s).living = 'rent_flat';
    if (p.job) p.job.employed = false;
    S.log(s, 'Возвращение в Россию: ' + why, 'family');
    p.abroadHist = (p.abroadHist || []).concat([{country: a.country, from: a.since, to: s.date.year}]);
    p.abroad = null;
  }

  function monthly(s, rng) {
    var p = s.person, a = p.abroad;
    if (!a || !abroad(s)) return;
    var yrs = s.date.year - a.since;
    // адаптация: язык и местные правила; быстрее у любопытных, молодых, с образованием
    var k = 1 + (p.traits.curiosity || 0) / 100 + (S.age(s) < 30 ? 0.3 : S.age(s) > 45 ? -0.3 : 0) + (RL.Chains && RL.Chains.hasHigher(s) ? 0.2 : 0);
    a.adapt = U.clamp(a.adapt + 0.02 * k, 0, 1);
    if (a.adapt < 0.4) { S.adj(s, 'mental', -0.4); S.adj(s, 'social', -0.2); }
    // раз в год — «прижился» или «назад»
    if (s.date.month === s.birth.month && yrs >= 1 && !s.pending) {
      if (a.adapt >= 0.7 && !a.settled) { a.settled = 1; S.log(s, RL.Events.text(s, 'Ты здесь [прижился|прижилась]: язык, друзья, свои места.' + (yrs >= 5 ? ' Паспорт новой страны — почти твой.' : ''), {}), 'good'); }
      else if (a.adapt < 0.5 && (p.stats.mental < 40 || p.stats.money < 25) && rng.chance(0.35)) back(s, rng.pick(['не прижилось — язык не пошёл, работа только на складе.', 'родителям нужна помощь, а деньги кончились.', 'тоска оказалась сильнее.']));
    }
  }
  // новая работа за границей: первые годы — ниже квалификации
  function wageMul(s) { var a = s.person.abroad; return a && abroad(s) ? 0.45 + 0.55 * a.adapt : 1; }
  function applyEffects(s, eff, rng) {
    if (eff.emigrate) go(s, rng);
    if (eff.emigAdapt && s.person.abroad) s.person.abroad.adapt = U.clamp(s.person.abroad.adapt + eff.emigAdapt, 0, 1);
  }
  function facts(s, f) { f.abroad = abroad(s); f.inPrison = f.inPrison || false; }

  return {monthly: monthly, applyEffects: applyEffects, facts: facts, wageMul: wageMul, abroad: abroad};
})();
