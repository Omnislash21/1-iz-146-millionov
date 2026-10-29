// Правовая система для взрослых: уголовные дела и суд (развилка с выбором защиты), приговор и колония,
// приставы при больших долгах, особенности регионов (северная пенсия, дальневосточная ипотека, полярная ночь).
RL.Law = (function () {
  var U = RL.util, S = RL.S, D = RL.DATA;
  var L = function () { return D.law; };
  var AVG = function (s) { return RL.Economy.AVG24() * RL.World.realWageIndex(s, s.date.year, s.date.month); };

  function openCase(s, art, rng) {
    if (S.age(s) < 18) { RL.Teen.convict(s, art === 'drugs228' ? 'drugs' : 'minor', rng); return; }
    var A = L().articles[art];
    var opts = [{kind: 'deal'}, {kind: 'lawyer'}, {kind: 'self'}];
    var choices = [{i: 0, text: 'Признать вину — особый порядок (срок на треть меньше)'}, {i: 1, text: 'Нанять адвоката (~' + RL.World.money(s, L().lawyerCost * AVG(s)) + ')'},
      {i: 2, text: 'Защищаться самому, не признавать вину'}];
    if (S.region(s).corruption > 0.55 || s.date.year < 2010) { opts.push({kind: 'bribe'}); choices.push({i: 3, text: '«Решить вопрос» со следствием'}); }
    var p = {kind: 'custom', handler: 'law', id: 'court', title: 'Суд', text: 'Уголовное дело: ' + A.name + '. Оправдательных приговоров в России меньше 1%.', art: art, opts: opts, choices: choices};
    if (s.pending) s.queue.unshift({custom: p}); else s.pending = p;
  }
  function resolve(s, idx, rng) {
    var pd = s.pending, o = pd.opts[idx], A = L().articles[pd.art], p = s.person;
    s.pending = null;
    S.log(s, 'Суд: ' + pd.choices[idx].text, 'choice');
    var colonyP = A.colony, yearsMul = 1;
    if (o.kind === 'deal') yearsMul = 1 - L().dealDiscount;
    if (o.kind === 'lawyer') { pay(s, L().lawyerCost * AVG(s)); colonyP *= L().lawyerColonyMul; }
    if (o.kind === 'bribe') {
      pay(s, 6 * AVG(s));
      if (rng.chance(0.25 + S.region(s).corruption * 0.4)) { S.log(s, 'Дело «развалилось» после передачи денег.', 'money'); return; }
      S.log(s, 'Деньги взяли, но дело дошло до суда. Плюс эпизод о даче взятки.', 'bad'); colonyP = Math.min(0.9, colonyP + 0.15);
    }
    if (o.kind === 'self' && rng.chance(L().acquittal * 10)) { S.log(s, 'Редчайший случай — оправдательный приговор!', 'good'); return; }
    p.flags.criminalRecord = 1; p.flags.adultCase = (p.flags.adultCase || 0) + 1;
    if (p.flags.adultCase > 1) colonyP = Math.min(0.95, colonyP + 0.3);
    if (rng.chance(colonyP)) {
      var months = Math.round(rng.range(A.years[0], A.years[1]) * 12 * yearsMul);
      p.education.stage = 'colony'; p.education.school = {type: 'colony', name: 'исправительная колония общего режима', q: 20};
      p.flags.sentenceMonths = months; p.flags.adultPrison = 1;
      RL.Young.own(s).living = 'prison';
      if (p.job) p.job.employed = false;
      if (p.biz) { p.bizHistory = (p.bizHistory || []).concat([{name: p.biz.name, months: p.biz.months, total: p.biz.total || 0, year: s.date.year}]); p.biz = null; }
      S.log(s, 'Приговор: ' + (Math.round(months / 12 * 10) / 10) + ' г. колонии общего режима.', 'bad');
      S.adj(s, 'mental', -25); S.adj(s, 'social', -15); S.adj(s, 'happiness', -25);
      if (p.spouse && rng.chance(p.spouse.status === 'married' ? 0.35 : 0.7)) RL.OwnFamily.applyEffects(s, {relationship: 'breakup', reason: 'не дождался(ась) из колонии'}, rng);
    } else {
      var fine = A.fine * AVG(s);
      pay(s, fine * 0.5);
      S.log(s, 'Приговор: условный срок' + (fine ? ' и штраф ' + RL.World.money(s, fine * 0.5) : '') + '. Судимость.', 'bad');
      S.adj(s, 'mental', -10);
    }
  }
  function pay(s, amt) {
    var o = RL.Young.own(s), pf = RL.Adult.portfolio(s);
    ['savings', 'deposit', 'usd', 'stocks'].forEach(function (k) { if (amt <= 0) return; var src = k === 'savings' ? o : pf, x = Math.min(src[k], amt); src[k] -= x; amt -= x; });
    if (amt > 0) o.debts.push({kind: 'relatives', name: 'долг за адвоката/штраф', balance: amt, principal: amt, rate: 0});
  }
  function autoChoose(s, rng) {
    var pd = s.pending, rich = RL.Adult.wealth(s) > L().lawyerCost * AVG(s) * 1.5;
    return rich ? 1 : rng.chance(0.7) ? 0 : 2;
  }

  // приставы: большие просроченные долги → списание половины зарплаты
  function fssp(s, rng) {
    var o = RL.Young.own(s), w = RL.Young.netWage(s);
    var debt = o.debts.filter(function (d) { return d.kind !== 'mortgage' && d.kind !== 'edu'; }).reduce(function (t, d) { return t + d.balance; }, 0);
    if (!o.fssp && debt > Math.max(10 * AVG(s) * 0.1, (w || AVG(s) * 0.3) * L().fsspDebtIncomeMul) && s.date.year >= 2008 && rng.chance(0.05)) {
      o.fssp = true;
      S.log(s, 'Суд взыскал долги: приставы арестовали карту, теперь списывают половину зарплаты. Выезд за границу закрыт.', 'bad');
    }
    if (o.fssp) {
      var take = w * L().fsspShare, big = o.debts.filter(function (d) { return d.kind !== 'mortgage' && d.balance > 0; })[0];
      if (big && take > 0) big.balance = Math.max(0, big.balance - take);
      if (!o.debts.some(function (d) { return d.kind !== 'mortgage' && d.kind !== 'edu' && d.balance > 0; })) { o.fssp = false; S.log(s, 'Исполнительное производство закрыто: долги погашены.', 'good'); }
    }
  }
  function fsspItem(s) { var o = (s.person.own || {}); return o.fssp ? RL.Young.netWage(s) * L().fsspShare : 0; }

  // ---------- особенности регионов ----------
  function inNorth(s) { var t = RL.Young.loc(s).region.tags; return t.indexOf('north') >= 0 || t.indexOf('arctic') >= 0; }
  function regionMonthly(s, rng) {
    var p = s.person, w = RL.Old.record(s);
    if (p.job && p.job.employed && inNorth(s)) w.northMonths = (w.northMonths || 0) + 1;
    if (RL.Young.loc(s).region.tags.indexOf('arctic') >= 0 && (s.date.month === 11 || s.date.month === 0)) S.adj(s, 'mental', L().arcticWinterMental);
  }
  function pensionAgeShift(s) { var w = s.person.work; return w && (w.northMonths || 0) >= L().northPensionMonths ? -L().northPensionYears : 0; }
  function mortgageRate(s, nom) {
    var F = L().fareastMortgage, t = RL.Young.loc(s).region.tags;
    if (t.indexOf('fareast') >= 0 && s.date.year >= F.from && S.age(s) <= F.maxAge) return Math.min(nom, F.rate);
    return nom;
  }

  function applyEffects(s, eff, rng) {
    if (eff.case) openCase(s, eff.case, rng);
  }
  function monthly(s, rng) {
    if (S.age(s) < 18) return;
    regionMonthly(s, rng);
    fssp(s, rng);
  }
  function facts(s, f) { f.corruption = S.region(s).corruption || 0.5; f.inPrison = !!(s.person.own && s.person.own.living === 'prison'); }

  return {monthly: monthly, resolve: resolve, autoChoose: autoChoose, applyEffects: applyEffects, facts: facts, openCase: openCase,
    pensionAgeShift: pensionAgeShift, mortgageRate: mortgageRate, fsspItem: fsspItem};
})();
