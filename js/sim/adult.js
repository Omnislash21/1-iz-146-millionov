// Взрослая экономика 18–35 (этап 3): карьерная лестница и предложения работы, своё дело, вклады/акции/доллары, покупка жилья и ипотека.
RL.Adult = (function () {
  var U = RL.util, S = RL.S, D = RL.DATA;
  var A = function () { return D.adult; };
  var AVG = function (s) { return RL.Economy.AVG24() * RL.World.realWageIndex(s, s.date.year, s.date.month); };
  function tx(s, t) { return RL.Events.text(s, t, {}); }
  function val(t, y) { return U.interpYear(t, Math.min(y, 2025)); }

  // ---------- реальные доходности ----------
  // Годовая реальная доходность: (1 + номинал) / (1 + инфляция) − 1. Будущее — из seed жизни.
  function future(s, y, key, mean, sd) {
    var f = s.person.own.futureReturns = s.person.own.futureReturns || {};
    var k = key + y;
    if (f[k] === undefined) { var r = new RL.RNG((s.seed ^ (y * 7919) ^ key.length * 104729) >>> 0); f[k] = r.normal(mean, sd); }
    return f[k];
  }
  function realReturn(s, kind, y) {
    var infl = RL.World.inflation(s, y) / 100, nom;
    if (kind === 'deposit') nom = (y <= 2025 ? val(A().depositRate, y) : RL.World.inflation(s, y) + future(s, y, 'dep', 1.5, 1.5)) / 100;
    else if (kind === 'stocks') nom = (y <= 2025 && y >= 2003 ? A().stocksReturn[y] : future(s, y, 'stk', A().futureStocksMean, A().futureStocksSd)) / 100;
    else if (kind === 'usd') {
      if (y > 2025) return future(s, y, 'usd', 0, 12) / 100;
      var u0 = val(A().usd, y - 1), u1 = val(A().usd, y);
      return (u1 / u0) / (1 + infl) - 1;
    }
    return (1 + nom) / (1 + infl) - 1;
  }
  function portfolio(s) {
    var o = RL.Young.own(s);
    if (!o.portfolio) o.portfolio = {deposit: 0, stocks: 0, usd: 0};
    return o.portfolio;
  }
  function wealth(s) { var o = RL.Young.own(s), pf = portfolio(s); return o.savings + pf.deposit + pf.stocks + pf.usd; }

  // ---------- жильё ----------
  function flatPrice(s, area) {
    var L = RL.Young.loc(s), y = s.date.year;
    var sqm = RL.Economy.realOf(s, val(A().sqmPrice, y), y, s.date.month);
    var rm = A().sqmRegionMul[L.region.id] || Math.pow(L.region.wage, 0.7);
    return area * sqm * rm * (A().sqmSettlementMul[L.settlement] || 0.8);
  }
  function mortgageRate(s, isNew) {
    var y = s.date.year + s.date.month / 12, nom = val(A().mortgageRate, Math.floor(y));
    A().preferential.forEach(function (p) { if (isNew && y >= p.from && y <= p.to) nom = Math.min(nom, p.rate); });
    return RL.Law ? RL.Law.mortgageRate(s, nom) : nom; // дальневосточная ипотека 2%
  }
  function buyFlat(s, kind, rng) {
    var o = RL.Young.own(s), area = kind === 'new' ? 40 : 36, price = flatPrice(s, area) * (kind === 'new' ? 1.1 : 1);
    var down = price * A().downPayment, w = wealth(s);
    if (w < down) { S.log(s, 'На первый взнос не хватило денег.', 'bad'); return; }
    takeFromWealth(s, down);
    var nom = mortgageRate(s, kind === 'new');
    var real = Math.max(0.005, (nom - RL.World.inflation(s, s.date.year)) / 100);
    var bal = price - down, n = A().mortgageYears * 12, r = real / 12;
    var pay = bal * r / (1 - Math.pow(1 + r, -n));
    o.debts.push({kind: 'mortgage', name: 'ипотека', balance: bal, principal: bal, rate: real, fixedPayment: pay, nominalRate: nom});
    o.living = 'own_flat'; o.flat = {area: area, price: price, kind: kind, year: s.date.year};
    S.log(s, tx(s, 'Ты [купил|купила] ' + (kind === 'new' ? 'однушку в новостройке' : 'квартиру на вторичке') + ' за ' + RL.World.money(s, price) + ' — ипотека под ' + nom + '% на 20 лет, платёж ' + RL.World.money(s, pay) + '/мес.'), 'money');
    S.adj(s, 'happiness', 8); S.adj(s, 'mental', 4);
  }
  function takeFromWealth(s, amt) {
    var o = RL.Young.own(s), pf = portfolio(s);
    ['savings', 'deposit', 'usd', 'stocks'].forEach(function (k) {
      if (amt <= 0) return;
      var src = k === 'savings' ? o : pf, x = Math.min(src[k], amt);
      src[k] -= x; amt -= x;
    });
    return amt <= 0;
  }

  // Деньги из событий у взрослого: плюс — в сбережения, минус — из сбережений и вкладов, остаток — у родителей (если живёшь с ними) или в долг.
  function cashFlow(s, amt) {
    var o = RL.Young.own(s);
    if (amt >= 0) { o.savings += amt; return; }
    var need = -amt, w = Math.max(0, wealth(s));
    takeFromWealth(s, Math.min(need, w)); need -= Math.min(need, w);
    if (need > 0 && !RL.Young.apart(s) && s.family.savings > 0) { var f = Math.min(need, s.family.savings); s.family.savings -= f; need -= f; }
    if (need > 0) {
      var bank = s.date.year >= D.economy.bankCardFrom && !o.badCredit && RL.Young.netWage(s) > 0;
      o.debts.push({kind: bank ? 'bank' : 'relatives', name: bank ? 'потребкредит' : 'занял у знакомых', balance: need, principal: need,
        rate: bank ? U.interpYear(D.economy.creditRate, Math.min(s.date.year, 2024)) : 0});
    }
  }

  // ---------- карьера ----------
  function career(s, rng) {
    var p = s.person, j = p.job, a = S.age(s);
    if (!j || !j.employed || j.prof === 'athlete' || j.prof === 'deputy') return;
    if (j.level === undefined) j.level = 0;
    var L = A().levels;
    if (j.level >= L.length - 1) return;
    var dip = (p.diplomas || []).some(function (d) { return d.level !== 'СПО'; });
    var rg = RL.Young.loc(s).region, rgk = rg.tags.indexOf('capital') >= 0 ? 1.3 : rg.unemployment > 1.8 ? 0.7 : 1; // столица — лифты быстрее, безработные регионы — медленнее [~]
    if (RL.Social && RL.Social.clan(s) > 1.5) rgk *= RL.Social.best(s, ['official', 'business', 'police']) ? 1.5 : 0.6; // на Кавказе без «своих» не двигают
    var h = rgk * (RL.Character ? RL.Character.mul(s, 'promo') : 1) * (RL.Chains ? RL.Chains.promoMul(s) : 1) * A().promoBase * (RL.Careers ? RL.Careers.focusPromo(s) : p.focus === 'career' ? 2.5 : 1) * Math.pow(Math.max(20, p.stats.skills) / 55, 2) * Math.exp((p.traits.diligence || 0) / 60)
      * (dip ? 1.3 : 0.8) * Math.pow(0.75, j.level) * (((p.habits || {}).alcohol || 0) >= 2 ? 0.4 : 1);
    if ((S.ageMonths(s) - (j.since || 0)) < 12) h *= 0.3;
    if (a >= 65) h = 0; else if (a >= 58) h *= 0.3;
    if (rng.chance(h)) {
      j.level++;
      j.base = Math.round(j.base * L[j.level].mul / L[j.level - 1].mul);
      S.log(s, 'Повышение: ' + L[j.level].name + '. Зарплата теперь ' + RL.World.money(s, RL.Young.netWage(s)) + '.', 'good');
      S.adj(s, 'mental', 3);
    }
    if (a < 62 && rng.chance(A().jobOfferMonthly * (p.stats.social / 50) * (p.focus === 'career' || p.focus === 'jobhunt' ? 1.6 : 1))) RL.Events.queue(s, 'job_offer', {});
  }
  function acceptOffer(s, rng) {
    var j = s.person.job;
    if (!j) return;
    var k = rng.range(1.12, 1.4);
    j.base = Math.round(j.base * k); j.since = S.ageMonths(s); j.employed = true;
    var pr = D.economy.professions.filter(function (x) { return x.id === j.prof; })[0];
    j.shadow = rng.chance(pr.shadow * 0.5) ? rng.range(0.3, 1) : 0;
    S.log(s, 'Новая работа с зарплатой на ' + Math.round((k - 1) * 100) + '% выше: ' + RL.World.money(s, RL.Young.netWage(s)) + '.', 'money');
  }

  // ---------- своё дело ----------
  function bizDef(id) { return A().businesses.filter(function (b) { return b.id === id; })[0]; }
  function startBiz(s, id, rng) {
    var p = s.person, b = bizDef(id), cap = b.capital * 12 * AVG(s) * RL.Young.loc(s).region.price;
    if (!takeFromWealth(s, cap)) {
      // недостающее — кредит на бизнес
      RL.Young.own(s).debts.push({kind: 'bank', name: 'кредит на бизнес', balance: cap * 0.6, principal: cap * 0.6, rate: U.interpYear(D.economy.creditRate, Math.min(s.date.year, 2024))});
    }
    p.biz = {id: id, name: b.name, months: 0, capital: cap, scale: rng.lognorm(b.sd), regime: s.date.year >= 2019 && id === 'freelance' ? 'самозанятость' : 'ИП на УСН'};
    if (id !== 'freelance' && p.job) p.job.employed = false;
    S.log(s, 'Своё дело: ' + b.name + ' (' + p.biz.regime + '). Вложено ' + RL.World.money(s, cap) + '.', 'money');
  }
  function bizMonthly(s, rng) {
    var p = s.person, z = p.biz;
    if (!z) return;
    var b = bizDef(z.id), L = RL.Young.loc(s), ctx = RL.World.ctx(s);
    z.months++;
    var crisis = (ctx.flags.jobLoss || 1) >= 1.3 ? A().bizCrisisMul : 1;
    var skill = Math.max(0.4, p.stats.skills / 55) * (p.focus === 'business' ? 1.3 : 1) * Math.exp((p.traits.diligence || 0) / 80);
    if (b.needsSkills && p.stats.skills < b.needsSkills) skill *= 0.5;
    var ramp = Math.min(1, z.months / 6);
    var gross = b.profit * AVG(s) * Math.pow(L.region.wage, 0.8) * D.settlementTypes[L.settlement].wage * z.scale * skill * ramp / crisis * rng.lognorm(0.3);
    z.profit = gross * (1 - b.tax);
    z.total = (z.total || 0) + z.profit;
    if (rng.chance(b.inspect)) RL.Events.queue(s, 'biz_inspection', {});
    var fail = b.fail * crisis * (p.focus === 'business' ? 0.7 : 1) * (skill < 0.8 ? 1.5 : 1) * (RL.Character ? RL.Character.mul(s, 'bizFail') : 1);
    if (rng.chance(fail)) closeBiz(s, 'Бизнес закрылся: ' + rng.pick(['выручка упала, аренда съела всё', 'конкуренты демпингуют', 'поставщик подвёл, клиенты ушли', 'арендодатель поднял цену вдвое']) + '.');
  }
  function closeBiz(s, why) {
    var p = s.person;
    if (!p.biz) return;
    S.log(s, tx(s, why + ' Дело продержалось ' + p.biz.months + ' мес., ты [заработал|заработала] за всё время ' + RL.World.money(s, Math.max(0, p.biz.total || 0)) + '.'), 'bad');
    p.bizHistory = (p.bizHistory || []).concat([{name: p.biz.name, months: p.biz.months, total: p.biz.total || 0, year: s.date.year}]);
    p.biz = null;
    S.adj(s, 'mental', -6);
  }
  function income(s) { var z = s.person.biz; return z && z.profit ? z.profit : 0; }
  function items(s) {
    var o = RL.Young.own(s), out = {};
    if (o.living === 'own_flat' && o.flat) {
      var L = RL.Young.loc(s);
      out.utilities = o.flat.area * D.economy.costs.utilitiesPerM2 * L.region.price * D.settlementTypes[L.settlement].price;
    }
    return out;
  }

  // ---------- инвестиции ----------
  function invest(s, plan) {
    var o = RL.Young.own(s), pf = portfolio(s), free = Math.max(0, o.savings - 2 * AVG(s));
    Object.keys(plan).forEach(function (k) {
      if (k === 'withdraw') { o.savings += pf.deposit + pf.stocks + pf.usd; pf.deposit = pf.stocks = pf.usd = 0; return; }
      var x = free * plan[k]; pf[k] += x; o.savings -= x;
    });
  }
  function returnsMonthly(s) {
    var pf = portfolio(s), y = s.date.year;
    ['deposit', 'stocks', 'usd'].forEach(function (k) {
      if (pf[k] <= 0) return;
      if (k === 'stocks' && y < A().stocksFrom) return;
      pf[k] *= Math.pow(1 + realReturn(s, k, y), 1 / 12);
    });
  }

  // ---------- эффекты событий ----------
  function applyEffects(s, eff, rng) {
    if (eff.buyFlat) buyFlat(s, eff.buyFlat, rng);
    if (eff.startBiz) startBiz(s, eff.startBiz, rng);
    if (eff.closeBiz) closeBiz(s, 'Ты [закрыл|закрыла] своё дело.'.replace(/\[([^|\]]*)\|([^\]]*)\]/g, function (m, a, b) { return s.person.sex === 'f' ? b : a; }));
    if (eff.invest) invest(s, eff.invest);
    if (eff.acceptOffer) acceptOffer(s, rng);
    if (eff.wealthLoss) { var pf = portfolio(s), o = RL.Young.own(s), k = eff.wealthLoss; o.savings *= 1 - k; pf.deposit *= 1 - k; pf.stocks *= 1 - k; pf.usd *= 1 - k; }
    if (eff.bizFine && s.person.biz) takeFromWealth(s, eff.bizFine * AVG(s)) || RL.Young.own(s).debts.push({kind: 'relatives', name: 'штраф по бизнесу', balance: eff.bizFine * AVG(s), principal: eff.bizFine * AVG(s), rate: 0});
  }

  function monthly(s, rng) {
    if (S.age(s) < 18) return;
    portfolio(s);
    returnsMonthly(s);
    career(s, rng);
    bizMonthly(s, rng);
  }

  function facts(s, f) {
    var p = s.person, o = p.own || {}, a = S.age(s);
    f.hasBiz = !!p.biz;
    f.ownsFlat = o.living === 'own_flat';
    if (a < 18 || !p.own) { f.wealthAvg = 0; f.canBuyFlat = false; f.jobLevel = 0; return; }
    var w = wealth(s), avg = AVG(s);
    f.wealthAvg = w / avg;
    // банк одобрит, если платёж ≤ 45% дохода
    var price = flatPrice(s, 36), nom = mortgageRate(s, false), real = Math.max(0.005, (nom - RL.World.inflation(s, s.date.year)) / 100) / 12, n = A().mortgageYears * 12;
    var pay = price * (1 - A().downPayment) * real / (1 - Math.pow(1 + real, -n));
    f.canBuyFlat = !f.ownsFlat && s.date.year >= 2006 && f.employed && w >= price * A().downPayment && pay <= 0.45 * (RL.Young.netWage(s) + income(s));
    f.jobLevel = p.job && p.job.level || 0;
    f.invested = (portfolio(s).deposit + portfolio(s).stocks + portfolio(s).usd) > 0;
  }

  return {monthly: monthly, income: income, items: items, applyEffects: applyEffects, facts: facts, wealth: wealth, portfolio: portfolio,
    flatPrice: flatPrice, realReturn: realReturn, cashFlow: cashFlow, takeFromWealth: takeFromWealth};
})();
