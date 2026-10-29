// Экономика семьи: ежемесячный бюджет, работа родителей, пособия, долги, квинтиль и бедность.
RL.Economy = (function () {
  var U = RL.util, S = RL.S;
  var E = function () { return RL.DATA.economy; };
  var AVG24 = function () { return RL.DATA.economy.avgWage[2024]; };

  function pensionAge(sex, y) {
    var base = sex === 'f' ? 55 : 60;
    if (y >= 2019) base += Math.min(5, (y - 2018) * 0.5 + 0.5);
    return base;
  }
  // перевод номинала года в рубли 2024
  function realOf(s, nominal, y, m) { return nominal * RL.World.price(s, 2024, 6) / RL.World.price(s, y, m); }

  function youngestChildMonths(s) {
    var mm = S.ageMonths(s);
    s.family.members.forEach(function (m) {
      if (m.role === 'sibling' && m.alive && m.inHome && m.age * 12 < mm) mm = Math.round(m.age * 12);
    });
    return mm;
  }

  function careLeaveIncome(s, m, ctx, AVG) {
    var ym = youngestChildMonths(s);
    var wage = m.job.base * ctx.wageIndex * (m.job.raise || 1);
    if (ym < 2.5) return wage; // пособие по беременности и родам (70 дней после родов)
    if (ym >= 18) return 0;
    var rule = E().careLeave.filter(function (r) { return ctx.year >= r.from && ctx.year <= r.to; })[0];
    if (!rule) return 0;
    if (rule.fixed) return rule.fixed * AVG;
    return U.clamp(wage * rule.share, rule.min * AVG, rule.max * AVG);
  }

  // Доход взрослого за месяц (чистыми). Возвращает {net, white, note}
  function personIncome(s, m, ctx, AVG, rng) {
    var y = ctx.year;
    if (!m.alive) return {net: 0, white: 0};
    // денежное довольствие участника СВО ~195 тыс. руб. (2022) ≈ 2,4 средней зарплаты 2024 в реальном выражении [~]
    if (m.job.deployed) return {net: 2.4 * AVG24(), white: 2.4 * AVG24()};
    if (m.job.pension || (m.role.indexOf('grand') === 0 && m.age >= pensionAge(m.sex, y))) {
      m.job.pension = true;
      var pen = ctx.pensionRatio * AVG * (m.disabled ? 0.8 : 1);
      if (ctx.arrears > 0.1 && rng.chance(ctx.arrears * 0.4)) return {net: 0, white: 0, note: 'задержка пенсии'};
      return {net: pen, white: pen};
    }
    if (m.job.onLeave) { var b = careLeaveIncome(s, m, ctx, AVG); return {net: b, white: b}; }
    if (!m.job.employed) {
      var inc = 0;
      if (m.job.monthsUnemployed <= 6 && m.job.registered) inc += 0.12 * AVG;
      if (m.alcohol < 3 && rng.chance(0.45)) inc += 0.25 * AVG * rng.range(0.4, 1.2); // халтура
      return {net: inc, white: 0};
    }
    var pr = S.prof(m) || {};
    var wage = m.job.base * ctx.wageIndex * (m.job.raise || 1);
    if (pr.volatile) wage *= rng.lognorm(0.45);
    // задержки зарплат 90-х
    if (ctx.arrears > 0 && rng.chance(ctx.arrears * (pr.arrears || 0.5))) {
      m.job.arrearsOwed = (m.job.arrearsOwed || 0) + wage;
      return {net: 0, white: 0, note: 'задержка зарплаты'};
    }
    var extra = 0;
    if (m.job.arrearsOwed > 0) {
      m.job.arrearsOwed /= 1 + RL.World.inflation(s, y) / 1200; // долг по зарплате съедает инфляция
      if (rng.chance(0.2)) { extra = m.job.arrearsOwed * rng.range(0.3, 1); m.job.arrearsOwed -= extra; }
    }
    var white = wage * (1 - m.job.shadow);
    var corrupt = pr.corrupt && rng.chance(pr.corrupt) ? wage * rng.range(0.1, 0.6) : 0;
    return {net: white * 0.87 + wage * m.job.shadow + extra + corrupt, white: white};
  }

  function jobDynamics(s, m, ctx, rng) {
    if (!m.alive || m.job.pension || !m.job.prof || m.job.deployed) return;
    var r = S.region(s), pr = S.prof(m) || {};
    if (m.job.onLeave) {
      var ym = youngestChildMonths(s), single = !S.manInHome(s);
      var kgOk = s.person.education.stage === 'kindergarten' || S.home(s).some(function (x) { return x.role.indexOf('grandmother') === 0 && !x.job.employed; });
      var p = 0;
      if (ym >= 12 && single) p = 0.25;
      if (ym >= 18) p = kgOk ? 0.3 : 0.06;
      if (ym >= 36) p = 0.25;
      if (s.family.poverty) p *= 1.5;
      if (r.tags.indexOf('caucasus') >= 0) p *= 0.4;
      if (rng.chance(p)) {
        m.job.onLeave = false;
        S.log(s, S.relName(m) + ' вышла из декрета на работу (' + S.profName(m) + ').', 'family');
      }
      return;
    }
    var u = U.clamp(ctx.unemployment * r.unemployment, 0.005, 0.5);
    if (m.job.employed) {
      var h = u / (1 - u) / 7 * (pr.unempl || 1) * (ctx.flags.jobLoss || 1);
      if (m.alcohol >= 2) h *= 2.5;
      if (m.alcohol === 3) h *= 2;
      if (rng.chance(h)) {
        m.job.employed = false; m.job.monthsUnemployed = 0; m.job.registered = rng.chance(0.5);
        if (m.inHome) s.family.atmosphere = U.clamp(s.family.atmosphere - 6, 0, 100);
        if (m.inHome) S.log(s, S.relName(m) + ' потерял' + (m.sex === 'f' ? 'а' : '') + ' работу' + (m.alcohol >= 2 ? ' (запои)' : ctx.flags.jobLoss > 1.2 ? ' — сокращение' : '') + '.', 'bad');
        s.flags.recentJobLoss = 6;
      }
    } else {
      m.job.monthsUnemployed++;
      // домохозяйка с маленьким ребёнком ищет работу не сразу
      if (m.sex === 'f' && m.role === 'mother' && youngestChildMonths(s) < 36 && !s.family.poverty) return;
      var f = 1 / 7 * (m.edu === 2 ? 1.3 : m.edu === 0 ? 0.8 : 1) / Math.sqrt(r.unemployment);
      if (m.alcohol >= 2) f *= 0.35;
      if (m.alcohol === 3) f *= 0.4;
      if (m.age > 50) f *= 0.6;
      if (rng.chance(f)) {
        m.job.employed = true;
        if (rng.chance(0.35)) {
          var np = RL.Birth.pickProfession(rng, m.edu, m.sex, s.person.settlement, ctx.year);
          var ratio = np.wage / ((S.prof(m) || np).wage || np.wage);
          m.job.prof = np.id; m.job.base = Math.round(m.job.base * ratio * rng.lognorm(0.15));
          m.job.shadow = rng.chance(np.shadow * ctx.shadow / 0.15 * 0.6) ? rng.range(0.3, 1) : 0;
        } else m.job.base = Math.round(m.job.base * rng.range(0.85, 1.05));
        if (m.inHome) S.log(s, S.relName(m) + (m.sex === 'f' ? ' нашла' : ' нашёл') + ' работу: ' + S.profName(m) + '.', 'family');
      }
    }
    if (ctx.month === 0 && m.job.employed) {
      m.job.raise = (m.job.raise || 1) * (m.age < 45 ? rng.normal(1.012, 0.03) : rng.normal(1.0, 0.025));
    }
  }

  function costBreakdown(s, ctx, income) {
    var C = E().costs, r = S.region(s), st = S.st(s), y = ctx.year, fam = s.family, p = s.person;
    var k = r.price * st.price;
    var hm = S.home(s);
    var adults = 0, kids = 0, infants = 0, workers = 0, smokers = 0, alc = 0;
    hm.forEach(function (m) {
      if (m.role === 'sibling' && m.age < 18) { if (m.age < 2) infants++; else kids++; }
      else { adults++; if (m.job && m.job.employed) workers++; if (m.smokes) smokers++; if (m.alcohol) alc += m.alcohol === 1 ? 0.5 : m.alcohol; }
    });
    var away = RL.Young && RL.Young.apart(s);
    if (!away) { if (S.age(s) < 2) infants++; else if (S.age(s) >= 18) adults++; else kids++; }
    // подростки едят как взрослые
    var teens = (S.age(s) >= 12 && S.age(s) < 18 && !away ? 1 : 0) + hm.filter(function (m) { return m.role === 'sibling' && m.age >= 12 && m.age < 18; }).length;
    var b = {};
    if (fam.type === 'orphanage') return {total: 0, items: {}, flexible: 0};
    b.food = (adults * C.foodAdult + kids * C.foodChild + infants * C.foodInfant + teens * (C.foodAdult - C.foodChild)) * k;
    var h = fam.housing;
    b.utilities = (h.type === 'private_house' ? C.utilitiesHouse : h.type === 'dorm_room' ? C.utilitiesDorm : Math.max(25, h.area) * C.utilitiesPerM2) * k * (y < 1992 ? 0.3 : y < 2000 ? 0.55 : y < 2010 ? 0.8 : 1);
    if (h.type === 'rent') b.rent = (C.rent[p.settlement] || C.rent.big)[h.rentKey || 0] * (y < 2000 ? 0.6 : 1);
    if (h.mortgage && h.mortgage.balance > 0) b.mortgage = h.mortgage.payment;
    b.transport = workers * C.transportWorker * k * (p.settlement === 'village' ? 0.6 : 1);
    if (fam.car) b.car = C.carUpkeep * k * (y < 2000 ? 0.6 : 1);
    b.clothes = (adults + kids + infants) * C.clothesPerson * k;
    b.communications = C.communications * (y < 2000 ? 0.3 : y < 2010 ? 0.6 : 1);
    var acc = RL.Health.access(s);
    var med = (adults + kids + infants) * C.medicineBase;
    p.conditions.forEach(function (c) {
      if (c.cured) return;
      var d = RL.DATA.conditions[c.id];
      if (d && d.cost) med += d.cost * (1 - (d.freeShare || 0) * acc);
    });
    b.medicine = med * k;
    if (alc) b.alcohol = alc * C.alcoholPerLevel * (y < 1992 ? 0.6 : 1);
    if (smokers) b.tobacco = smokers * C.smoker * (y < 2010 ? 0.4 : y < 2016 ? 0.7 : 1);
    if (p.education.stage === 'kindergarten') b.kindergarten = (p.education.kg && p.education.kg.private ? C.kindergartenPrivate : C.kindergartenState) * k * (y < 1992 ? 0.3 : 1);
    if (p.education.stage === 'school') b.school = C.schoolMonthly * k + (ctx.month === 8 ? C.schoolSeptember * k : 0);
    if (p.education.stage === 'college') b.school = C.schoolMonthly * k + (p.education.dorm ? 3000 * k + 2500 : 0);
    var foc = RL.DATA.focuses.filter(function (f) { return f.id === p.focus; })[0];
    if (foc && foc.cost && !away) b.focus = foc.cost * k;
    if (fam.childSupport) b.childSupport = fam.childSupport;
    if (fam.tuitionMonthly) b.tuition = fam.tuitionMonthly;
    b.childMisc = (kids + infants) * C.childMisc * k;
    // платежи по долгам; суммарно не больше доли дохода — остальное становится просрочкой
    var pays = 0;
    (fam.debts || []).forEach(function (d) {
      if (d.balance <= 0) return;
      var interest = d.balance * d.rate / 12;
      d.payment = Math.max(interest * 1.05, d.balance * (d.kind === 'mfo' ? 0.15 : d.kind === 'relatives' ? 0.03 : 0.04));
      pays += d.payment;
    });
    var maxPay = Math.max(0, income || 0) * E().debtServiceMaxShare;
    var k2 = pays > maxPay ? maxPay / pays : 1;
    if (k2 < 1) fam.flags.badCredit = true;
    (fam.debts || []).forEach(function (d) {
      if (d.balance <= 0) return;
      d.payment *= k2;
      b['debt_' + d.kind] = (b['debt_' + d.kind] || 0) + d.payment;
    });
    var flexible = (b.clothes || 0) * 0.6 + (b.childMisc || 0) * 0.6 + (b.focus || 0) + (b.communications || 0) * 0.3 + (b.food || 0) * 0.2;
    var total = 0;
    Object.keys(b).forEach(function (key) { total += b[key]; });
    return {total: total, items: b, flexible: flexible};
  }

  function benefits(s, ctx, AVG, perCapitaIncome, PM, rng) {
    var y = ctx.year, out = 0, notes = [];
    var kids = S.childrenHome(s);
    var low = perCapitaIncome < PM;
    E().childBenefitLowIncome.forEach(function (rule) {
      if (y < rule.from || y > rule.to) return;
      if (rule.cond === 'lowIncome_first' && !(low && S.age(s) < 1.5)) return;
      if ((rule.cond === 'lowIncome' || rule.cond === 'unified') && !low) return;
      out += rule.perChild * AVG * kids;
    });
    // ковидные выплаты 2020–2021 (номинал -> реал)
    var a = S.age(s);
    if (y === 2020 && ctx.month >= 3 && ctx.month <= 5 && a < 3) out += realOf(s, 5000, y, ctx.month);
    if (y === 2020 && (ctx.month === 5 || ctx.month === 6) && a >= 3 && a < 16) out += realOf(s, 10000, y, ctx.month);
    if (y === 2021 && ctx.month === 7 && a >= 6 && a < 18) out += realOf(s, 10000, y, ctx.month);
    // алименты
    var al = s.family.alimony, f = S.father(s);
    if (al && f && f.alive && !f.inHome && S.age(s) < 18) {
      var pay = al.mode === 'regular' ? 1 : al.mode === 'irregular' ? (rng.chance(0.4) ? 1 : 0) : 0;
      if (f.job.employed || f.job.deployed) {
        var fw = f.job.deployed ? 2.4 * AVG24() : f.job.base * ctx.wageIndex * (f.job.raise || 1) * (1 - f.job.shadow);
        out += pay * fw * 0.87 * al.share;
      }
    }
    // помощь бабушек/дедушек, живущих отдельно
    s.family.members.forEach(function (m) {
      if (m.alive && !m.inHome && m.role.indexOf('grand') === 0 && m.relation > 50 && (low || rng.chance(0.15))) {
        out += ctx.pensionRatio * AVG * 0.12;
      }
    });
    return out;
  }

  function monthly(s, rng) {
    var ctx = RL.World.ctx(s), fam = s.family, r = S.region(s), st = S.st(s);
    var AVG = AVG24() * ctx.wageIndex;
    if (fam.type === 'orphanage') {
      fam.quintile = 1; fam.poverty = true; s.person.stats.money = U.lerp(s.person.stats.money, 15, 0.2);
      fam.lastBudget = {income: 0, expense: 0, items: {}, note: 'Содержание за счёт государства'};
      return;
    }
    S.adultsHome(s).forEach(function (m) { jobDynamics(s, m, ctx, rng); });
    // отец вне дома тоже работает/теряет работу (важно для алиментов)
    var f = S.father(s);
    if (f && f.alive && !f.inHome && !f.unknown) jobDynamics(s, f, ctx, rng);

    var income = 0, white = 0, notes = [];
    S.adultsHome(s).forEach(function (m) {
      var inc = personIncome(s, m, ctx, AVG, rng);
      income += inc.net; white += inc.white;
      if (inc.note && notes.indexOf(inc.note) < 0) notes.push(inc.note);
    });
    // заработок подростка (подработка / работа после 9 класса) — в общий котёл
    if (s.person.earnings) income += s.person.earnings;
    var persons = S.home(s).length + (RL.Young && RL.Young.apart(s) ? 0 : 1);
    // родительского домохозяйства больше нет (все умерли / разъехались) — считать нечего
    if (persons === 0) { fam.lastBudget = {income: 0, benefits: 0, expense: 0, need: 0, items: {}, perCapita: 0, pm: 0, median: 1, debt: 0, notes: [], cut: 0}; fam.poverty = false; return; }
    var PM = ctx.subsistence * AVG * r.price * st.price;
    var benefit = benefits(s, ctx, AVG, income / persons, PM, rng);
    income += benefit;

    var cost = costBreakdown(s, ctx, income);
    var need = cost.total;
    var balance = income - need;
    var cut = 0;
    fam.deprivation = Math.max(0, (fam.deprivation || 0) - 0.25);
    if (balance >= 0) {
      // сначала досрочно гасим самые дорогие долги, остальное — сбережения и «комфорт»
      var extraPay = balance * 0.3;
      fam.debts.sort(function (a, b) { return b.rate - a.rate; }).forEach(function (d) {
        var x = Math.min(d.balance, extraPay); d.balance -= x; extraPay -= x; balance -= x;
      });
      fam.savings += balance * E().savingsShareOfSurplus;
      fam.comfort = balance * (1 - E().savingsShareOfSurplus);
    } else {
      fam.comfort = 0;
      var deficit = -balance;
      cut = Math.min(deficit, cost.flexible);
      deficit -= cut;
      if (cut > 0) fam.deprivation = Math.min(3, fam.deprivation + cut / Math.max(1, cost.flexible) * 0.5);
      if (deficit > 0 && fam.savings > 0) { var take = Math.min(fam.savings, deficit); fam.savings -= take; deficit -= take; }
      if (deficit > 0) borrow(s, deficit, ctx, income, rng);
    }
    // проценты по долгам и погашение
    var mfoCap = U.interpYear(E().mfoCap, Math.min(ctx.year, 2024));
    (fam.debts || []).forEach(function (d) {
      if (d.balance <= 0) return;
      d.balance += d.balance * d.rate / 12;
      if (d.kind === 'mfo') d.balance = Math.min(d.balance, (d.principal || d.balance) * (1 + mfoCap));
      d.balance -= Math.min(d.balance, d.payment || 0);
      if (d.principal) d.principal = Math.min(d.principal, d.balance);
      if (d.balance < 100) d.balance = 0;
    });
    fam.debts = (fam.debts || []).filter(function (d) { return d.balance > 0; });
    // банкротство физлиц (с 2015): долги списываются, но кредитная история испорчена
    var dt = fam.debts.reduce(function (t, d) { return t + d.balance; }, 0);
    if (ctx.year >= E().bankruptcyFrom && dt > Math.max(500000, income * 15) && rng.chance(0.03)) {
      S.log(s, 'Суд признал ' + (S.home(s).filter(function (m) { return m.role !== 'sibling'; }).length > 1 ? 'родителей' : S.carer(s).a) + ' банкротом: долги (' + RL.World.money(s, dt) + ') списаны, имущество продано с торгов.', 'money');
      fam.debts = []; fam.flags.badCredit = true; fam.car = false; fam.savings = 0;
    }
    if (fam.housing.mortgage && fam.housing.mortgage.balance > 0) {
      var mg = fam.housing.mortgage;
      mg.balance = mg.balance * (1 + mg.rate / 12) - mg.payment;
      mg.monthsLeft--;
      if (mg.balance <= 0 || mg.monthsLeft <= 0) { mg.balance = 0; S.log(s, 'Ипотека выплачена полностью.', 'good'); fam.housing.mortgage = null; }
    }
    // инфляция «съедает» сбережения в кризисные годы
    var loss = ctx.flags.savingsLoss;
    if (loss && !s.flags['savingsLoss' + ctx.year] && ((ctx.year === 1992 && ctx.month === 0) || (ctx.year === 1998 && ctx.month === 7))) {
      s.flags['savingsLoss' + ctx.year] = 1;
      if (fam.savings > 1000) S.log(s, 'Семейные сбережения обесценились: было ' + RL.World.money(s, fam.savings) + ', осталось ' + RL.World.money(s, fam.savings * (1 - loss)) + '.', 'bad');
      fam.savings *= 1 - loss;
    }
    // реальная доходность сбережений ~0, но в 90-е — сильно отрицательная
    if (ctx.year >= 1991 && ctx.year <= 1999) fam.savings *= 1 - Math.max(0, RL.World.inflation(s, ctx.year) / 100 - 0.1) / 12 * 0.5;

    var debtTotal = fam.debts.reduce(function (t, d) { return t + d.balance; }, 0);
    var pc = income / persons;
    var median = E().medianPerCapitaK * AVG * r.wage * st.wage;
    var ratio = pc / Math.max(1, median);
    var cuts = E().quintileCuts, q = 1;
    cuts.forEach(function (c) { if (ratio >= c) q++; });
    fam.quintile = q;
    fam.poverty = pc < PM;
    fam.lastBudget = {income: income, benefits: benefit, expense: need - cut, need: need, items: cost.items, perCapita: pc, pm: PM, median: median,
      debt: debtTotal, notes: notes, cut: cut};
    var target = 50 + 22 * Math.log(Math.max(0.05, ratio)) / Math.LN2 + Math.min(15, fam.savings / Math.max(1, need) * 2)
      - Math.min(25, debtTotal / Math.max(1, income) * 2.5) - fam.deprivation * 8;
    if (ctx.deficit < 1) target -= (1 - ctx.deficit) * 20;
    s.person.stats.money = U.clamp(U.lerp(s.person.stats.money, U.clamp(target, 0, 100), 0.25), 0, 100);
  }

  function borrow(s, amount, ctx, income, rng) {
    var fam = s.family, y = ctx.year, ec = E();
    var employed = S.adultsHome(s).some(function (m) { return m.job && m.job.employed; });
    var bankDebt = fam.debts.filter(function (d) { return d.kind === 'bank'; }).reduce(function (t, d) { return t + d.balance; }, 0);
    var kind, rate, name;
    var mfoDebt = fam.debts.filter(function (d) { return d.kind === 'mfo'; }).reduce(function (t, d) { return t + d.balance; }, 0);
    var relDebt = fam.debts.filter(function (d) { return d.kind === 'relatives'; }).reduce(function (t, d) { return t + d.balance; }, 0);
    if (y >= ec.bankCardFrom && employed && bankDebt < income * 6 && !fam.flags.badCredit) {
      kind = 'bank'; rate = U.interpYear(ec.creditRate, Math.min(y, 2024)); name = 'кредитка / потребкредит';
    } else if (y >= ec.mfoFrom && mfoDebt < Math.max(15000, income * 1.5)) {
      kind = 'mfo'; rate = ec.mfoRateYear; name = 'микрозаём';
    } else if (relDebt < income * 2 && fam.members.some(function (m) { return m.alive && !m.inHome && m.role.indexOf('grand') === 0; })) {
      kind = 'relatives'; rate = 0; name = 'долг родственникам';
    } else {
      kind = 'arrears'; rate = 0.01; name = 'долг за ЖКУ / «до получки» у соседей';
      fam.deprivation = Math.min(3, fam.deprivation + 0.6);
    }
    var d = fam.debts.filter(function (x) { return x.kind === kind; })[0];
    if (!d) { d = {kind: kind, name: name, balance: 0, principal: 0, rate: rate}; fam.debts.push(d); if (kind === 'mfo') S.log(s, 'Семья взяла микрозаём, чтобы дотянуть до зарплаты.', 'bad'); }
    d.balance += amount; d.principal = (d.principal || 0) + amount;
    // долги перед ЖКХ и соседями не растут бесконечно: часть «прощается», часть оборачивается лишениями
    if (kind === 'arrears' && d.balance > income * 3) { d.balance = income * 3; d.principal = d.balance; }
  }

  function matCapital(s, forSecond) {
    var y = s.date.year, t = E().matCapital;
    if (y < 2007) return 0;
    var keys = Object.keys(t).map(Number).filter(function (k) { return k <= y; });
    var k = keys[keys.length - 1];
    var nominal = forSecond ? t[k][1] : t[k][0];
    if (!nominal) return 0;
    return realOf(s, nominal, y, s.date.month);
  }

  return {monthly: monthly, pensionAge: pensionAge, realOf: realOf, matCapital: matCapital, costBreakdown: costBreakdown,
    personIncome: personIncome, AVG24: AVG24};
})();
