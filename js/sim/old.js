// Взрослость и старость (этап 5): трудовой стаж и пенсия, работающие пенсионеры, ДМС, раннее выявление (диспансеризация),
// лечение онкологии, взрослые дети и внуки, деменция и уход, расходы на лекарства.
RL.Old = (function () {
  var U = RL.util, S = RL.S, D = RL.DATA;
  var O = function () { return D.old; };
  var AVG = function (s) { return RL.Economy.AVG24() * RL.World.realWageIndex(s, s.date.year, s.date.month); };
  function tx(s, t, v) { return RL.Events.text(s, t, v || {}); }

  function record(s) { var p = s.person; if (!p.work) p.work = {months: 0, wageSum: 0}; return p.work; }
  // северный стаж (15 лет) — пенсия на 5 лет раньше
  function pensionAge(s) { return RL.Economy.pensionAge(s.person.sex, s.date.year) + (RL.Law ? RL.Law.pensionAgeShift(s) : 0); }

  // стаж: работа (белая часть зарплаты), служба в армии, уход за ребёнком до 1,5 лет
  function workMonthly(s, rng) {
    var p = s.person, w = record(s), j = p.job;
    if (j && j.employed && !j.onLeave) {
      w.months++;
      var base = j.base * RL.World.realWageIndex(s, s.date.year, s.date.month) * (j.raise || 1);
      w.wageSum += base * (1 - (j.shadow || 0)) / AVG(s);
      if (j.dms === undefined) {
        var big = ['megapolis', 'million', 'big'].indexOf(RL.Young.loc(s).settlement) >= 0;
        j.dms = big && s.date.year >= 2000 && rng.chance(O().dmsProfs[j.prof] || 0.05);
        if (j.dms) S.log(s, 'Работодатель оформил ДМС: платные клиники без очередей.', 'health');
      }
    } else if (j && j.onLeave) w.months++;
    else if (p.education.stage === 'army') w.months++;
    if (p.biz) { w.months++; w.wageSum += 0.3; } // ИП платит фиксированные взносы — стаж есть, пенсия маленькая
  }
  function pensionAmount(s) {
    var w = record(s), P = O().pension, avgWhite = w.months ? w.wageSum / w.months : 0;
    var ratio = U.interpYear(D.economy.pensionRatio, Math.min(s.date.year, 2024));
    var full = Math.min(1, w.months / 12 / P.fullYears);
    var amt = ratio * AVG(s) * ((1 - P.wageWeight) + P.wageWeight * Math.min(1.8, avgWhite)) * full;
    return Math.max(P.minShare * AVG(s), amt);
  }
  function startPension(s) {
    var p = s.person;
    p.pension = {amount: pensionAmount(s), since: s.date.year, real: true};
    S.log(s, 'Пенсия назначена: ' + RL.World.money(s, p.pension.amount) + ' в месяц (стаж ' + Math.round(record(s).months / 12) + ' ' + RL.Game.years(Math.round(record(s).months / 12)) + ').', 'money');
  }
  function income(s) {
    var p = s.person;
    if (!p.pension) return 0;
    var amt = p.pension.amount;
    // невыплаты 90-х и заморозка индексации работающим пенсионерам (2016–2024) — упрощённо
    return amt;
  }
  function items(s) {
    var p = s.person, acc = RL.Health.access(s), L = RL.Young.loc(s), k = L.region.price * D.settlementTypes[L.settlement].price, med = 0;
    if (S.age(s) < 18) return {};
    p.conditions.forEach(function (c) {
      if (c.cured) return;
      var d = D.conditions[c.id];
      if (d && d.cost) med += d.cost * (1 - (d.freeShare || 0) * acc);
    });
    if (S.age(s) >= 50) med += 600 + (S.age(s) - 50) * 40;
    return med > 1 ? {medicine: med * k} : {};
  }

  function kidsMonthly(s, rng) {
    var p = s.person;
    (p.kids || []).forEach(function (k) {
      if (!k.alive) return;
      if (k.withMe && k.age >= 18 && rng.chance(O().kidLeave)) {
        k.withMe = false; k.grown = true;
        var money = p.stats.money;
        var bst = Math.min(1.5, k.boost || 0);
        var path = rng.chance(U.clamp(0.35 + money / 150 + bst * 0.12, 0.2, 0.92)) ? (rng.chance(0.5 + money / 300 + bst * 0.1) ? 'поступил' + (k.sex === 'f' ? 'а' : '') + ' в вуз на бюджет' : 'учится в вузе платно') : (rng.chance(0.5) ? 'окончил' + (k.sex === 'f' ? 'а' : '') + ' колледж и работает' : 'работает');
        S.log(s, (k.sex === 'm' ? 'Сын ' : 'Дочь ') + k.name + ' ' + path + ' и живёт отдельно.', 'family');
      }
      if (k.age >= 22 && (k.grandkids || 0) < O().grandkidMaxPerChild && rng.chance(U.monthly(O().grandkidPerYear * (k.grandkids ? 0.6 : 1)))) {
        k.grandkids = (k.grandkids || 0) + 1;
        p.grandkids = (p.grandkids || 0) + 1;
        S.log(s, 'У ' + (k.sex === 'm' ? 'сына' : 'дочери') + ' ' + k.name + ' родился ребёнок — ты [дедушка|бабушка]! Внуков: ' + p.grandkids + '.', 'good');
        s.log[s.log.length - 1].text = tx(s, s.log[s.log.length - 1].text);
        S.adj(s, 'happiness', 6);
      }
    });
  }

  function monthly(s, rng) {
    var p = s.person, a = S.age(s);
    if (a < 18) return;
    workMonthly(s, rng);
    // пенсия по возрасту
    if (!p.pension && a >= pensionAge(s)) {
      startPension(s);
      if (p.job && p.job.employed) RL.Events.queue(s, 'retirement', {});
    }
    // работающие пенсионеры: индексация заморожена в 2016–2024 → реальная пенсия тает
    if (p.pension && p.job && p.job.employed && s.date.year >= O().pension.workingFreeze[0] && s.date.year <= O().pension.workingFreeze[1])
      p.pension.amount *= 1 - RL.World.inflation(s, s.date.year) / 1200;
    // старшие работники: дискриминация по возрасту и падение зарплаты
    if (a >= 55 && p.job && p.job.employed && !p.biz) {
      if (rng.chance(0.004 + (a >= 65 ? 0.02 : 0) + (a >= 72 ? 0.04 : 0) + (p.disability ? 0.02 : 0))) { p.job.employed = false; S.log(s, tx(s, 'Тебя «попросили на выход»: «нам нужны молодые».'), 'bad'); }
      if (s.date.month === 0) p.job.raise = (p.job.raise || 1) * 0.985;
    }
    // работающий пенсионер раз в год решает, не хватит ли (здоровье, возраст, накопления) — Росстат: в 60–64 работают ~30%, в 65–69 ~13%, после 70 ~4%
    if (p.pension && p.job && p.job.employed && !p.biz && s.date.month === s.birth.month && p.job.prof !== 'deputy') {
      var wa = RL.Adult.wealth(s) / AVG(s);
      var pr = 0.16 + Math.max(0, a - 60) * 0.02 + (p.stats.health < 50 ? 0.2 : 0) + (wa > 20 ? 0.2 : wa > 6 ? 0.08 : 0) - (p.stats.money < 30 ? 0.1 : 0);
      if (rng.chance(U.clamp(pr, 0.05, 0.9))) { p.job.employed = false; S.log(s, tx(s, 'Ты [ушёл|ушла] на заслуженный отдых. Коллеги подарили часы и торт.'), 'family'); }
    }
    // ранняя диагностика онкологии (диспансеризация с 2013) и выбор лечения
    p.conditions.forEach(function (c) {
      if (c.id === 'cancer_adult' && c.early === undefined) {
        var acc = RL.Health.access(s);
        c.early = rng.chance((s.date.year >= O().checkupFrom ? 0.3 : 0.12) + (p.job && p.job.dms ? 0.15 : 0) + (p.focus === 'health' ? 0.15 : 0) * acc);
        if (c.early) S.log(s, 'Опухоль нашли на ранней стадии' + (s.date.year >= O().checkupFrom ? ' — на диспансеризации.' : '.'), 'health');
        RL.Events.queue(s, 'cancer_treatment', {});
      }
      if (c.id === 'dementia' && !c.cured) { var cap = D.conditions.dementia.mentalCap; if (p.stats.mental > cap) p.stats.mental -= 1; S.adj(s, 'skills', -0.3); }
    });
    if (p.conditions.some(function (c) { return c.id === 'dementia' && !c.cured; }) && !p.spouse && a >= 72 && !s.flags.careOffered) {
      s.flags.careOffered = 1; RL.Events.queue(s, 'nursing_home', {});
    }
    kidsMonthly(s, rng);
  }

  function applyEffects(s, eff, rng) {
    var p = s.person;
    if (eff.retire && p.job) { p.job.employed = false; S.log(s, 'Ты на пенсии. Будильник больше не нужен.', 'family'); }
    if (eff.cancerCare) {
      var c = p.conditions.filter(function (x) { return x.id === 'cancer_adult' && !x.cured; })[0];
      if (c) { c.care = eff.cancerCare; c.early = c.early || eff.cancerCare === 'abroad'; c.careBonus = {oms: 0, paid: 0.08, abroad: 0.15, refuse: -0.3}[eff.cancerCare] || 0; }
    }
    if (eff.nursingHome) { RL.Young.own(s).living = 'nursing_home'; S.log(s, 'Переезд в пансионат для пожилых.', 'family'); }
  }

  function facts(s, f) {
    var p = s.person;
    f.retired = !!p.pension; f.pensioner = !!p.pension; f.grandkids = p.grandkids || 0;
    f.oldAge = S.age(s) >= 60;
    f.hasCancer = p.conditions.some(function (c) { return c.id === 'cancer_adult' && !c.cured; });
    f.workYears = p.work ? Math.floor(p.work.months / 12) : 0;
  }

  return {monthly: monthly, income: income, items: items, applyEffects: applyEffects, facts: facts, pensionAmount: pensionAmount, record: record};
})();
