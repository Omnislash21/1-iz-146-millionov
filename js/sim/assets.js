// Имущество и деньги взрослого: вторая квартира (жить / сдавать / продать / оставить детям), досрочное погашение долгов,
// крупные траты (отпуск, машина, дача, ремонт, помощь детям) — чтобы накопления были не просто числом.
// Эффекты событий: flatUse (live | rent | sell | keep), buyRentFlat, repay (small | mortgage | all), spend (доля ср. ЗП), flagSet.
RL.Assets = (function () {
  var U = RL.util, S = RL.S, D = RL.DATA;
  var AVG = function (s) { return RL.Economy.AVG24() * RL.World.realWageIndex(s, s.date.year, s.date.month); };
  function tx(s, t) { return RL.Events.text(s, t, {}); }
  function own(s) { return RL.Young.own(s); }
  function props(s) { var o = own(s); if (!o.props) o.props = []; return o.props; }
  function M(s, x) { return RL.World.money(s, x); }

  // аренда квартиры такой площади там, где она стоит (1-комн. до 40 м², дальше — 2-комн.)
  function rentFor(s, f) {
    var R = D.economy.costs.rent[f.settlement || RL.Young.loc(s).settlement] || D.economy.costs.rent.big;
    var k = f.regionPrice || RL.Young.loc(s).region.price;
    return (f.area > 42 ? R[1] : R[0]) * Math.pow(k, 0.5);
  }
  function utilities(s, f) { return f.area * D.economy.costs.utilitiesPerM2 * (f.regionPrice || RL.Young.loc(s).region.price); }

  // Новая квартира в собственности (наследство, льгота сироты, покупка). Если уже живёшь в своей — спрашиваем, что делать.
  function addFlat(s, f, how) {
    var o = own(s), L = RL.Young.loc(s);
    f.settlement = f.settlement || L.settlement; f.regionPrice = f.regionPrice || L.region.price; f.city = f.city || L.city;
    var here = !f.city || f.city === L.city;
    if (here && o.living !== 'own_flat' && o.living !== 'army' && o.living !== 'prison' && o.living !== 'nursing_home') {
      o.living = 'own_flat'; o.flat = f;
      return 'live';
    }
    if (here && !o.flat && o.living !== 'own_flat') { o.flat = f; return 'live'; }
    f.use = 'empty'; f.id = 'fl' + S.ageMonths(s) + '_' + props(s).length;
    props(s).push(f);
    RL.Events.queue(s, 'extra_flat', {what: how || 'ещё одна квартира'});
    return 'extra';
  }
  function lastEmpty(s) { return props(s).filter(function (f) { return f.use === 'empty'; }).slice(-1)[0] || props(s).slice(-1)[0]; }
  function setUse(s, use, rng) {
    var f = lastEmpty(s), o = own(s);
    if (!f) return;
    if (use === 'rent') { f.use = 'rent'; S.log(s, 'Квартиру (' + Math.round(f.area) + ' м²) сдаёшь: ' + M(s, rentFor(s, f)) + ' в месяц минус налог 13%.', 'money'); }
    else if (use === 'sell') {
      var price = RL.Adult.flatPrice(s, f.area) * rng.range(0.85, 1.0);
      o.savings += price; removeProp(s, f);
      S.log(s, 'Квартира продана за ' + M(s, price) + '. Деньги — на счёт.', 'money');
    } else if (use === 'live') {
      var old = o.flat; removeProp(s, f);
      o.flat = f; o.living = 'own_flat';
      if (old) { old.use = 'empty'; props(s).push(old); RL.Events.queue(s, 'extra_flat', {what: 'прежняя квартира пустует'}); }
      S.log(s, 'Переезд в другую квартиру (' + Math.round(f.area) + ' м²).', 'family');
    } else { f.use = 'keep'; S.log(s, 'Квартира стоит пустая — «пусть будет детям».', 'money'); }
  }
  function removeProp(s, f) { var a = props(s), i = a.indexOf(f); if (i >= 0) a.splice(i, 1); }

  // Доход и расходы по имуществу (в личный бюджет)
  function income(s) {
    return props(s).reduce(function (t, f) { return t + (f.use === 'rent' ? rentFor(s, f) * 0.87 : 0); }, 0);
  }
  function items(s) {
    var u = props(s).reduce(function (t, f) { return t + (f.use === 'rent' ? 0 : utilities(s, f)); }, 0);
    return u > 1 ? {propUtilities: u} : {};
  }

  // ---------- долги ----------
  function debts(s) { return own(s).debts.filter(function (d) { return d.balance > 0 && !d.deferred; }); }
  function repay(s, kind) {
    var o = own(s), paid = 0, names = [];
    debts(s).forEach(function (d) {
      if (kind === 'small' && d.kind === 'mortgage') return;
      if (kind === 'mortgage' && d.kind !== 'mortgage') return;
      var w = RL.Adult.wealth(s) - 2 * AVG(s);
      if (w <= 0) return;
      var x = Math.min(d.balance, w);
      RL.Adult.takeFromWealth(s, x); d.balance -= x; paid += x;
      if (d.balance <= 50) names.push(d.name);
    });
    o.debts = o.debts.filter(function (d) { return d.balance > 50 || d.deferred; });
    if (paid > 0) S.log(s, tx(s, names.length ? 'Ты [закрыл|закрыла] разом: ' + names.join(', ') + ' (' + M(s, paid) + ').' : 'Досрочно внесено ' + M(s, paid) + ' в счёт долга.'), 'money');
    return paid;
  }
  function canRepay(s) {
    var w = RL.Adult.wealth(s) - 2 * AVG(s);
    return debts(s).length && w > 0;
  }

  // ---------- эффекты ----------
  function applyEffects(s, eff, rng) {
    if (eff.flatUse) setUse(s, eff.flatUse, rng);
    if (eff.repay) repay(s, eff.repay);
    if (eff.spend) RL.Adult.cashFlow(s, -eff.spend * AVG(s));
    if (eff.buyRentFlat) {
      var area = 36, price = RL.Adult.flatPrice(s, area);
      if (RL.Adult.wealth(s) >= price) { RL.Adult.takeFromWealth(s, price); var f = {area: area, price: price, year: s.date.year, bought: true, use: 'rent'}; var L = RL.Young.loc(s);
        f.settlement = L.settlement; f.regionPrice = L.region.price; f.city = L.city; f.id = 'fl' + S.ageMonths(s); props(s).push(f);
        S.log(s, 'Куплена квартира под сдачу за ' + M(s, price) + '. Аренда — ' + M(s, rentFor(s, f)) + ' в месяц.', 'money'); }
    }
    if (eff.flagSet) s.flags[eff.flagSet] = 1;
    var p = s.person;
    if (eff.kidBoost) (p.kids || []).forEach(function (k) { if (k.alive && k.withMe) k.boost = (k.boost || 0) + eff.kidBoost; });
    if (eff.fakeDiploma) {
      p.diplomas = (p.diplomas || []).concat([{level: 'бакалавр', field: eff.fakeDiploma, inst: '«купленный» диплом', q: 40, year: s.date.year, fake: true}]);
      s.flags.fakeDiploma = 1; S.log(s, 'Теперь в резюме — высшее экономическое. В реестре его нет.', 'info');
    }
    if (eff.diplomaCheck) {
      p.diplomas = (p.diplomas || []).filter(function (d) { return !d.fake; }); delete s.flags.fakeDiploma;
      if (p.job && p.job.employed && RL.Careers && !RL.Careers.eligible(s, p.job.prof)) p.job.employed = false;
    }
    if (eff.smallBank) {
      var amt = Math.max(0, RL.Adult.wealth(s)) * eff.smallBank;
      RL.Adult.takeFromWealth(s, amt); own(s).smallBank = amt; s.flags.smallBank = 1;
      S.log(s, 'Вклад в небольшом банке: ' + M(s, amt) + '.', 'money');
    }
    if (eff.bankRefund) {
      var a2 = own(s).smallBank || 0, cap = RL.Economy.realOf(s, s.date.year >= 2014 ? 1400000 : 700000, s.date.year, s.date.month), back = Math.min(a2, cap);
      own(s).savings += back; delete own(s).smallBank; delete s.flags.smallBank;
      S.log(s, 'АСВ вернуло ' + M(s, back) + (a2 > back ? '. Остальные ' + M(s, a2 - back) + ' пропали.' : ' — всё до копейки.'), a2 > back ? 'bad' : 'money');
    }
    if (eff.promoteMove && p.job) {
      var r = S.regionById(eff.promoteMove);
      p.loc = {regionId: r.id, settlement: 'megapolis', city: 'Москва'}; p.job.base = Math.round(p.job.base * 1.5 * Math.pow(r.wage / RL.Young.loc(s).region.wage, 0.3));
      if (own(s).living === 'parents') own(s).living = 'rent_flat';
      S.log(s, 'Переезд в Москву на новую должность.', 'family');
    }
    if (eff.licenseC) { s.flags.licenseC = 1; if (p.job && p.job.prof === 'driver') p.job.raise = (p.job.raise || 1) * 1.15; S.log(s, 'Получена категория C: можно водить грузовики.', 'good'); }
  }

  function monthly(s, rng) {
    var p = s.person, a = S.age(s), o = p.own;
    if (a < 18 || !o) return;
    // мелкие долги при больших накоплениях люди закрывают сразу — а не платят по сотне в месяц
    var small = debts(s).filter(function (d) { return d.kind !== 'mortgage'; });
    if (small.length) {
      var tot = small.reduce(function (t, d) { return t + d.balance; }, 0);
      if (RL.Adult.wealth(s) - 3 * AVG(s) > tot * 1.5) repay(s, 'small');
    }
    // ипотеку при накоплениях больше остатка — раз в год предлагаем закрыть
    var mg = debts(s).filter(function (d) { return d.kind === 'mortgage'; })[0];
    if (mg && s.date.month === s.birth.month && RL.Adult.wealth(s) > mg.balance + 4 * AVG(s)) RL.Events.queue(s, 'mortgage_prepay', {});
    // сдаваемая квартира иногда простаивает
    props(s).forEach(function (f) { if (f.use === 'rent' && rng.chance(0.01)) S.log(s, 'Арендаторы съехали — месяц квартира пустует.', 'money'); });
  }

  function facts(s, f) {
    var o = s.person.own || {};
    f.extraFlats = (o.props || []).length;
    f.rentingOut = (o.props || []).some(function (x) { return x.use === 'rent'; });
    f.hasMortgage = !!(o.debts || []).some(function (d) { return d.kind === 'mortgage' && d.balance > 0; });
    f.dachaOwn = !!s.flags.dacha;
    var ks = (s.person.kids || []).filter(function (k) { return k.alive && k.withMe; });
    f.teenKid = ks.some(function (k) { return k.age >= 12 && k.age < 18; });
  }

  function housingName(s) {
    var o = own(s), L = RL.Young.loc(s);
    var n = {parents: 'с родителями', dorm: 'общежитие', rent_room: 'съёмная комната', rent_flat: 'съёмная квартира', army: 'казарма', prison: 'колония',
      nursing_home: 'пансионат для пожилых', own_flat: 'своя квартира'}[o.living] || o.living;
    if (o.living === 'own_flat' && o.flat) n += ' (' + Math.round(o.flat.area) + ' м²' + (o.flat.inherited ? ', по наследству' : o.flat.social ? ', от государства по льготе сироты' : '') +
      ((o.debts || []).some(function (d) { return d.kind === 'mortgage' && d.balance > 0; }) ? ', в ипотеке' : '') + ')';
    var pr = props(s);
    if (pr.length) n += ' · ещё ' + pr.length + ' кв. (' + pr.map(function (f) { return {rent: 'сдаёшь', empty: 'пустует', keep: 'пустует'}[f.use] || f.use; }).join(', ') + ')';
    if (s.flags.dacha) n += ' · дача';
    if (s.flags.ownCar) n += ' · машина';
    return n;
  }

  return {monthly: monthly, applyEffects: applyEffects, facts: facts, income: income, items: items, addFlat: addFlat, repay: repay, canRepay: canRepay,
    housingName: housingName, props: props, rentFor: rentFor};
})();
