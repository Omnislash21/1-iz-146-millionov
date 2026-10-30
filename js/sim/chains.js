// Цепочки последствий: решение сейчас аукается через годы.
// 1) Отложенные события: эффект later {id, years:[a,b], p} ставит событие в очередь через a–b лет (с шансом p).
// 2) Биография, которая работает сама: зарплата «в конверте» — не стаж (пенсия меньше), уклонение от призыва — 10 лет без госслужбы
//    (ст. 23 53-ФЗ: «не прошёл службу без законных оснований»), судимость — закрытые профессии, без высшего — потолок карьеры,
//    как растил детей — так они и помогают в старости.
// Источники: 400-ФЗ о страховых пенсиях (стаж — только с уплаченными взносами); 79-ФЗ о госслужбе, ст. 16 (ограничения);
// Росстат «Комплексное наблюдение условий жизни» — помощь взрослых детей родителям [~].
RL.Chains = (function () {
  var U = RL.util, S = RL.S;

  function applyEffects(s, eff, rng) {
    if (eff.kidWarmth) (s.person.kids || []).forEach(function (k) { if (k.alive && k.age < 18) k.warmth = U.clamp((k.warmth || 0) + eff.kidWarmth, -100, 100); });
    if (!eff.later) return;
    [].concat(eff.later).forEach(function (l) {
      if (l.p !== undefined && !rng.chance(l.p)) return;
      var y = l.years || [1, 3];
      var from = s.curEv ? {t: s.curEv.title, c: s.curEv.choice, y: s.curEv.y} : null;
      (s.later = s.later || []).push({at: S.ageMonths(s) + Math.round(rng.range(y[0], y[1]) * 12), id: l.id, from: from});
    });
  }

  function monthly(s, rng) {
    var p = s.person, a = S.age(s), am = S.ageMonths(s);
    // личный доход к медиане зарплаты того же года (медиана ≈ 0,72 средней, Росстат) — для итогового разбора
    if (a >= 20 && a < 65 && p.own && p.own.living !== 'prison' && p.own.living !== 'army') {
      var avg = RL.Economy.AVG24() * RL.World.realWageIndex(s, s.date.year, s.date.month);
      var inc = (RL.Young.netWage(s) || 0) + (RL.Adult ? RL.Adult.income(s) : 0) + (RL.Old ? RL.Old.income(s) : 0) + (RL.Assets ? RL.Assets.income(s) : 0);
      var bio = p.bio = p.bio || {incSum: 0, incN: 0};
      bio.incSum += Math.min(8, inc / (avg * 0.72 * 0.87)); bio.incN++;
    }
    // квинтиль семьи в 16 лет — «стартовый капитал»: от него зависит, на какую зарплату берут (RL.Young.makeJob)
    if (a >= 16 && !p.flags.originQ && s.family.quintile) p.flags.originQ = s.family.quintile;
    // отложенные события
    if (s.later && s.later.length) {
      var due = s.later.filter(function (l) { return am >= l.at; });
      if (due.length) {
        s.later = s.later.filter(function (l) { return am < l.at; });
        due.forEach(function (l) {
          var e = RL.Events.def(l.id); if (!e) return;
          var b = p.bio = p.bio || {incSum: 0, incN: 0};
          b.chainsFired = (b.chainsFired || 0) + 1;
          // игрок должен видеть связь: «это аукнулось после того выбора»
          if (l.from && l.from.y && s.date.year - l.from.y >= 1) {
            var yrs = s.date.year - l.from.y;
            S.log(s, 'Аукнулось через ' + yrs + ' ' + RL.Game.years(yrs) + ': «' + (l.from.t ? l.from.t + ' — ' : '') + l.from.c + '» (' + l.from.y + ').', 'chain');
            (b.chainList = b.chainList || []).push({y0: l.from.y, t: l.from.t, c: l.from.c, y: s.date.year, to: e.title || ''});
            if (b.chainList.length > 12) b.chainList.shift();
          }
          RL.Events.queue(s, l.id, {});
        });
      }
    }
    // как растил детей: тепло копится, пока ребёнок дома и младше 18
    (p.kids || []).forEach(function (k) {
      if (!k.alive || !k.withMe || k.age >= 18) return;
      var d = 0, hb = p.habits || {};
      if (p.focus === 'kids' || p.focus === 'family') d += 1.5;
      if ((hb.alcohol || 0) >= 2) d -= 1.5;
      if ((hb.drugs || 0) >= 2) d -= 2;
      if (p.own && p.own.living === 'prison') d -= 2;
      if (p.focus === 'career' || p.focus === 'business' || p.focus === 'sidejob') d -= 0.3;
      if (p.spouse && p.spouse.violent) d -= 0.5;
      k.warmth = U.clamp((k.warmth || 0) + d, -100, 100);
    });
    // в старости дети — опора или чужие люди
    if (a >= 62 && s.date.month % 3 === 0) {
      (p.kids || []).filter(function (k) { return k.alive && !k.withMe && k.age >= 25; }).forEach(function (k) {
        var w = k.warmth || 0, nm = (k.sex === 'm' ? 'Сын ' : 'Дочь ') + k.name;
        if (w > 40 && rng.chance(0.08)) { RL.Events.applyEffects(s, {cash: rng.int(5, 20) * 1000, happiness: 2}, {}, rng); if (rng.chance(0.3)) S.log(s, nm + ' привёз' + (k.sex === 'f' ? 'ла' : '') + ' продукты и лекарства и оставил' + (k.sex === 'f' ? 'а' : '') + ' денег: «Не спорь».', 'family'); }
        else if (w < -30 && rng.chance(0.05)) { S.adj(s, 'mental', -3); S.adj(s, 'happiness', -2); if (rng.chance(0.4)) S.log(s, nm + ' не звонит. Ты знаешь почему — и от этого не легче.', 'family'); }
      });
    }
    // без высшего — потолок: начальником ставят молодого с дипломом (один раз объясняем почему)
    if (a >= 38 && a < 50 && !p.flags.ceilingNoted && p.job && p.job.employed && ['manager', 'official', 'engineer', 'bank', 'it'].indexOf(p.job.prof) >= 0 && !hasHigher(s) && rng.chance(0.01)) {
      p.flags.ceilingNoted = 1; S.log(s, 'Место начальника отдела отдали молодому с дипломом. Без «вышки» дальше не двигают.', 'bad'); S.adj(s, 'mental', -3);
    }
  }
  function hasHigher(s) { return (s.person.diplomas || []).some(function (d) { return d.level !== 'СПО'; }); }
  function promoMul(s) { var p = s.person; return S.age(s) >= 35 && !hasHigher(s) ? 0.5 : 1; }

  // госслужба и силовые структуры закрыты 10 лет тем, кто уклонился от призыва
  var STATE = ['official', 'police', 'military', 'prosecutor', 'judge', 'firefighter', 'customs', 'fssp'];
  function banned(s, id) {
    var p = s.person;
    if (STATE.indexOf(id) >= 0 && p.flags.evaderEver && !p.flags.served && S.age(s) < 37) return 'уклонение от призыва';
    return null;
  }
  // стаж: «в конверте» взносы не платят — эти месяцы в стаж не идут
  function grayStazh(s) { var w = s.person.work; return w ? Math.round((w.grayMonths || 0) / 12) : 0; }

  // факты для цепочек: дети выросли в тепле; сколько отложенных последствий уже сработало
  function facts(s, f) {
    var k = (s.person.kids || []).filter(function (x) { return x.alive; });
    f.kidsWarm = k.length > 0 && k.reduce(function (t, x) { return t + (x.warmth || 0); }, 0) / k.length > 20;
  }
  return {facts: facts, monthly: monthly, applyEffects: applyEffects, promoMul: promoMul, banned: banned, grayStazh: grayStazh, hasHigher: hasHigher};
})();
