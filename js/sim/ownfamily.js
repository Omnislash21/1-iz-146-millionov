// Своя семья (этап 4): знакомства, отношения, сожительство и брак, дети игрока, декрет, развод и алименты,
// уход за стареющими родителями, наследство.
RL.OwnFamily = (function () {
  var U = RL.util, S = RL.S, D = RL.DATA;
  var F = function () { return D.ownFamily; };
  var AVG = function (s) { return RL.Economy.AVG24() * RL.World.realWageIndex(s, s.date.year, s.date.month); };
  function tx(s, t, v) { return RL.Events.text(s, t, v || {}); }
  function sp(s) { return s.person.spouse; }
  function kids(s) { return (s.person.kids || []).filter(function (k) { return k.alive && k.withMe; }); }
  function female(s) { return s.person.sex === 'f'; }

  // ---------- знакомства ----------
  function candidate(s, rng) {
    var p = s.person, L = RL.Young.loc(s), y = s.date.year, a = S.age(s);
    var sex = p.sex === 'm' ? 'f' : 'm';
    var age = Math.round(U.clamp(a + rng.normal(p.sex === 'm' ? -2 : 2.5, 3), 18, 60));
    var eth = rng.chance(0.85) ? p.ethnic : rng.weightedKey(L.region.ethnic);
    var c = RL.Birth.makeAdult(rng, {role: 'spouse', sex: sex, age: age, ethnic: eth, region: L.region, settlement: L.settlement, year: y, state: s,
      edu: rng.chance(0.55) ? RL.Young.eduLevel(s) : undefined});
    c.id = 'sp' + S.ageMonths(s) + '_' + rng.int(1000, 9999); // id из ГСЧ жизни — сохранение/загрузка воспроизводимы
    c.appearance = Math.round(U.clamp(rng.normal(50, 15), 5, 99));
    c.where = rng.pick(F().where.filter(function (w) { return w !== 'в приложении знакомств' || y >= F().appsFrom; }).filter(function (w) { return w !== 'в вузе' || p.education.stage === 'vuz'; }));
    // совместимость: образование, привычки, характер (скрыто от игрока)
    var compat = 50 - Math.abs((c.edu || 0) - RL.Young.eduLevel(s)) * 8 + rng.normal(0, 12) + ((p.traits.empathy || 0) + (p.traits.sociability || 0)) / 10
      - (c.alcohol >= 2 ? 10 : 0);
    c.compat = Math.round(U.clamp(compat, 5, 95));
    c.relation = Math.round(U.clamp(rng.normal(55 + (c.compat - 50) * 0.3, 8), 20, 90));
    return c;
  }
  function describe(s, c) {
    var pr = S.prof(c);
    var bits = [c.name + ', ' + c.age + ' ' + RL.Game.years(c.age), c.job.employed ? (pr ? pr[c.sex] : 'работает') : 'без работы',
      ['без высшего', 'со средним профессиональным', 'с высшим'][c.edu || 0]];
    if (c.alcohol >= 2) bits.push('любит выпить');
    if (c.smokes) bits.push('курит');
    if (c.appearance > 70) bits.push('очень [хорош собой|хороша собой]'.replace(/\[([^|\]]*)\|([^\]]*)\]/g, function (m, a, b) { return c.sex === 'f' ? b : a; }));
    return bits.join(', ');
  }
  function offerMeet(s, rng) {
    var c = candidate(s, rng);
    s.person.candidate = c;
    var p = {kind: 'custom', handler: 'family', id: 'meet_partner', title: 'Знакомство', text: 'Познакомились ' + c.where + ': ' + describe(s, c) + '.',
      opts: [{kind: 'date'}, {kind: 'skip'}], choices: [{i: 0, text: 'Начать встречаться'}, {i: 1, text: 'Не моё'}]};
    if (s.pending) s.queue.unshift({custom: p}); else s.pending = p;
  }
  function resolve(s, idx, rng) {
    var pd = s.pending, o = pd.opts[idx], p = s.person;
    s.pending = null;
    S.log(s, pd.title + ': ' + pd.choices[idx].text, 'choice');
    if (pd.id === 'meet_partner') {
      if (o.kind === 'date') {
        var c = p.candidate; c.status = 'dating'; c.since = S.ageMonths(s); c.metM = S.ageMonths(s); c.inHome = false;
        p.spouse = c; s.flags.partner = 1;
        S.log(s, tx(s, 'Теперь вы пара: {n}.', {n: c.name}), 'family');
        S.adj(s, 'happiness', 6); S.adj(s, 'mental', 3);
      }
      p.candidate = null;
    }
  }
  function autoChoose(s, rng) {
    var c = s.person.candidate;
    if (!c) return 1;
    var v = 0.55 + (c.compat - 50) / 100 + (c.appearance - 50) / 200 - (c.alcohol >= 2 ? 0.25 : 0);
    return rng.chance(U.clamp(v, 0.1, 0.9)) ? 0 : 1;
  }

  // ---------- отношения ----------
  function ensureHome(s) {
    var o = RL.Young.own(s);
    if (o.living === 'parents' || o.living === 'dorm' || o.living === 'rent_room') {
      o.living = 'rent_flat';
      S.log(s, 'Сняли квартиру на двоих.', 'family');
    }
  }
  function setStatus(s, st, rng) {
    var c = sp(s); if (!c) return;
    var old = c.status; c.status = st; c.since = S.ageMonths(s);
    if (st === 'cohab') { ensureHome(s); S.log(s, tx(s, 'Ты и {n} съехались.', {n: c.name}), 'family'); }
    if (st === 'married') {
      ensureHome(s); c.marriedM = S.ageMonths(s);
      var cost = F().wedding.cost * AVG(s) * (S.region(s).tags.indexOf('caucasus') >= 0 ? 2.5 : 1);
      payFromWealth(s, cost * 0.6);
      S.log(s, tx(s, 'Свадьба! {n} — теперь [твоя жена|твой муж]. ' + (S.region(s).tags.indexOf('caucasus') >= 0 ? 'Пятьсот гостей, три дня.' : 'ЗАГС, ресторан, родня с обеих сторон.') + ' Ушло ' + RL.World.money(s, cost * 0.6) + ' (остальное подарили).', {n: c.name}), 'good');
      S.adj(s, 'happiness', 10); s.person.flags.married = (s.person.flags.married || 0) + 1;
    }
  }
  function payFromWealth(s, amt) {
    var o = RL.Young.own(s), pf = RL.Adult.portfolio(s);
    ['savings', 'deposit', 'usd', 'stocks'].forEach(function (k) { if (amt <= 0) return; var src = k === 'savings' ? o : pf, x = Math.min(src[k], amt); src[k] -= x; amt -= x; });
    if (amt > 0) o.debts.push({kind: 'bank', name: 'кредит на свадьбу', balance: amt, principal: amt, rate: U.interpYear(D.economy.creditRate, Math.min(s.date.year, 2024))});
  }
  function breakup(s, rng, reason) {
    var p = s.person, c = sp(s), married = c.status === 'married';
    var ks = kids(s);
    var ex = {name: c.name, status: c.status, months: S.ageMonths(s) - (c.since || 0), year: s.date.year, kids: ks.length, reason: reason};
    if (ks.length && married || ks.length && c.status === 'cohab') {
      var keep = female(s) ? rng.chance(0.9) : rng.chance(0.1);
      if (!keep) ks.forEach(function (k) { k.withMe = false; k.withEx = {name: c.name, sex: c.sex}; });
      ex.alimony = {payer: keep ? 'them' : 'me', mode: rng.weightedKey(F().alimonyPay), share: F().alimonyShare[Math.min(3, ks.length)], ex: c};
      p.alimony = ex.alimony;
    }
    p.exes = (p.exes || []).concat([ex]);
    p.spouse = null; delete s.flags.partner;
    var txt = married ? 'Развод (бывший супруг — {n})' : 'Расставание ({n})';
    S.log(s, tx(s, txt + (reason ? ': ' + reason : '') + '.' + (ex.alimony ? (ex.alimony.payer === 'me' ? ' Дети остаются ' + (c.sex === 'f' ? 'с мамой' : 'с папой') + ', ты платишь алименты и видишься по выходным.' : ' Дети с тобой; алименты — как получится.') : ''), {n: c.name}), 'family');
    S.adj(s, 'mental', married ? -15 : -8); S.adj(s, 'happiness', married ? -12 : -6);
    if (married) p.flags.divorced = (p.flags.divorced || 0) + 1;
  }

  function relationMonthly(s, rng) {
    var p = s.person, c = sp(s), Fd = F(), r = S.region(s);
    if (!c) return;
    c.age += 1 / 12;
    var target = 58 + (c.compat - 50) * 0.5 - (c.alcohol >= 2 ? 15 : 0) - (c.violent ? 20 : 0) - (((p.habits || {}).alcohol || 0) >= 2 ? 12 : 0)
      - (p.stats.money < 30 ? 8 : 0) + (p.focus === 'family' || p.focus === 'love' ? 10 : 0) - (p.focus === 'career' ? 4 : 0)
      - (kids(s).some(function (k) { return k.age < 2; }) ? 4 : 0);
    c.relation = U.clamp(c.relation + (target - c.relation) * 0.05 + rng.normal(0, 1.5), 0, 100);
    // переходы
    var k = c.relation / 60;
    if (c.status === 'dating' && S.ageMonths(s) - c.since > 4 && rng.chance(Fd.toCohab * k * (r.tags.indexOf('caucasus') >= 0 ? 0.3 : 1))) setStatus(s, 'cohab', rng);
    else if (c.status === 'dating' && S.ageMonths(s) - c.since > 6 && rng.chance(Fd.marryFromDating * k * (r.tags.indexOf('caucasus') >= 0 ? 4 : 1))) RL.Events.queue(s, 'proposal', {n: c.name});
    else if (c.status === 'cohab' && S.ageMonths(s) - c.since > 6 && rng.chance(Fd.toMarry * k * (kids(s).length ? 1.8 : 1))) RL.Events.queue(s, 'proposal', {n: c.name});
    // распад
    var M = Fd.breakupMods, h = Fd.breakup[c.status];
    if (c.alcohol >= 2 || ((p.habits || {}).alcohol || 0) >= 2) h *= M.alcohol;
    if (c.violent) h *= M.violent;
    if (p.stats.money < 25) h *= M.poor;
    if (c.relation < 35) h *= M.lowRelation; else if (c.relation > 75) h *= 0.4;
    if (r.tags.indexOf('caucasus') >= 0) h *= M.caucasus;
    if (kids(s).some(function (x) { return x.age < 3; })) h *= M.kidsSmall;
    if (rng.chance(h)) RL.Events.queue(s, 'breakup_adult', {n: c.name});
    // работа партнёра
    if (c.job.employed && !c.job.onLeave && rng.chance(0.006)) c.job.employed = false;
    else if (!c.job.employed && !c.job.onLeave && rng.chance(0.15)) c.job.employed = true;
    if (s.date.month === 0 && c.job.employed) c.job.raise = (c.job.raise || 1) * rng.normal(1.02, 0.03);
    // пьянство и смертность партнёра
    if (c.alcohol < 3 && rng.chance((c.sex === 'm' ? 0.002 : 0.0005) * (p.stats.money < 30 ? 1.5 : 1))) c.alcohol++;
    var q = RL.Mortality.qx(s, s.date.year, c.sex, c.age) * [1, 1.2, 2.2, 4][c.alcohol || 0];
    if (rng.chance(U.monthly(q))) {
      S.log(s, tx(s, 'Умер' + (c.sex === 'f' ? 'ла' : '') + ' {n}, ' + Math.floor(c.age) + ' ' + RL.Game.years(Math.floor(c.age)) + '. Причина: ' + RL.Mortality.sampleCause(rng, c.age, c.sex).toLowerCase() + '.', {n: c.name}), 'death');
      p.exes = (p.exes || []).concat([{name: c.name, status: c.status, year: s.date.year, widowed: true}]);
      p.spouse = null; delete s.flags.partner;
      S.adj(s, 'mental', -25); S.adj(s, 'happiness', -20);
    }
  }

  // ---------- дети ----------
  function mother(s) { var c = sp(s); return female(s) ? {age: S.age(s), self: true} : c && c.sex === 'f' ? {age: c.age, self: false} : null; }
  function birthMonthly(s, rng) {
    var p = s.person, c = sp(s);
    if (!c || (c.status !== 'cohab' && c.status !== 'married')) return;
    var mo = mother(s); if (!mo) return;
    var B = F().birthMods, a = mo.age;
    if (a < F().birthAge[0] || a > F().birthAge[1]) return;
    var n = (p.kids || []).filter(function (k) { return k.alive; }).length;
    var last = (p.kids || []).slice(-1)[0];
    if (last && S.ageMonths(s) - last.bornM < 15) return;
    var h = F().birthByParity[Math.min(3, n)] * (c.status === 'married' ? B.married : 1);
    if (S.region(s).tags.indexOf('caucasus') >= 0) h *= B.caucasus;
    if (p.stats.money < 30) h *= B.poor;
    if (s.date.year >= 2007 && n === 1) h *= B.matcap;
    if (s.flags.wantChild && S.ageMonths(s) < s.flags.wantChild) h *= B.wantChild;
    if (s.flags.notNow && S.ageMonths(s) < s.flags.notNow) h *= B.notNow;
    if (a >= 35) h *= B.age35; if (a >= 40) h *= B.age40;
    if (mo.self && p.education.stage === 'vuz') h *= B.vuz;
    if (!rng.chance(U.monthly(h))) return;
    var sex = rng.chance(0.513) ? 'm' : 'f';
    var kid = {name: RL.Birth.freshName(rng, p.ethnic, sex, [p.firstName].concat((p.kids || []).map(function (k) { return k.name; }))), sex: sex, age: 0, bornM: S.ageMonths(s), year: s.date.year, alive: true, withMe: true};
    p.kids = (p.kids || []).concat([kid]);
    S.log(s, (sex === 'm' ? 'Родился сын' : 'Родилась дочь') + ' — ' + kid.name + '!', 'good');
    S.adj(s, 'happiness', 10); S.adj(s, 'mental', 4);
    delete s.flags.wantChild;
    // декрет у матери
    var job = mo.self ? p.job : c.job;
    if (job && job.employed) { job.onLeave = true; job.leaveFrom = S.ageMonths(s); }
    // материнский капитал
    if (s.date.year >= 2007 && !p.flags.matcap && (n >= 1 || s.date.year >= 2020)) {
      p.flags.matcap = 1;
      var mc = RL.Economy.matCapital(s, n >= 1), o = RL.Young.own(s);
      var mg = o.debts.filter(function (d) { return d.kind === 'mortgage'; })[0];
      if (mc > 0 && mg) { mg.balance = Math.max(0, mg.balance - mc); S.log(s, 'Материнский капитал (' + RL.World.money(s, mc) + ') — в погашение ипотеки.', 'money'); }
      else if (mc > 0) { p.flags.matcapAmount = mc; S.log(s, 'Получен сертификат на материнский капитал: ' + RL.World.money(s, mc) + '.', 'money'); }
    }
  }
  function kidsMonthly(s, rng) {
    var p = s.person;
    (p.kids || []).forEach(function (k) {
      if (!k.alive) return;
      k.age += 1 / 12;
      var q = RL.Mortality.qx(s, s.date.year, k.sex, k.age);
      if (rng.chance(U.monthly(q * 0.9))) {
        k.alive = false;
        S.log(s, (k.sex === 'm' ? 'Умер сын ' : 'Умерла дочь ') + k.name + '. ' + RL.Mortality.sampleCause(rng, k.age, k.sex) + '.', 'death');
        S.adj(s, 'mental', -40); S.adj(s, 'happiness', -35);
      }
    });
    // выход из декрета: после 18 месяцев, чаще — к 3 годам
    [p.job, sp(s) && sp(s).job].forEach(function (j) {
      if (!j || !j.onLeave) return;
      var m = S.ageMonths(s) - (j.leaveFrom || 0);
      if ((m >= 18 && rng.chance(0.12)) || m >= 36) { j.onLeave = false; if (j === p.job) S.log(s, 'Декрет окончен — снова на работу.', 'family'); }
    });
  }
  function leaveBenefit(s, j) {
    if (!j || !j.onLeave) return 0;
    var m = S.ageMonths(s) - (j.leaveFrom || 0), y = s.date.year, avg = AVG(s);
    var wage = j.base * RL.World.realWageIndex(s, y, s.date.month) * (j.raise || 1);
    if (m < 2.5) return wage * 0.87;
    if (m >= 18) return 0;
    var rule = D.economy.careLeave.filter(function (r) { return y >= r.from && y <= r.to; })[0];
    if (!rule) return 0;
    return rule.fixed ? rule.fixed * avg : U.clamp(wage * rule.share, rule.min * avg, rule.max * avg);
  }

  // ---------- деньги пары ----------
  function spouseNet(s) {
    var c = sp(s);
    if (!c || (c.status !== 'cohab' && c.status !== 'married')) return 0;
    if (c.job.onLeave) return leaveBenefit(s, c.job);
    if (!c.job.employed) return 0;
    var w = c.job.base * RL.World.realWageIndex(s, s.date.year, s.date.month) * (c.job.raise || 1);
    return w * (1 - c.job.shadow) * 0.87 + w * c.job.shadow;
  }
  function income(s) {
    var p = s.person, inc = spouseNet(s) + leaveBenefit(s, p.job);
    var al = p.alimony;
    if (al && al.payer === 'them' && al.mode !== 'none' && (al.mode === 'regular' || (s.date.month + s.date.year) % 5 < 2)) {
      var e = al.ex, w = e.job && e.job.employed ? e.job.base * RL.World.realWageIndex(s, s.date.year, s.date.month) * (1 - e.job.shadow) : 0;
      inc += w * 0.87 * al.share;
    }
    return inc;
  }
  function items(s) {
    var p = s.person, out = {}, L = RL.Young.loc(s), k = L.region.price * D.settlementTypes[L.settlement].price, KC = F().kidCost;
    var c = sp(s);
    if (c && (c.status === 'cohab' || c.status === 'married')) out.spouse = (D.young.foodAdult + D.young.clothes + D.young.transport * (c.job.employed ? 1 : 0)) * k;
    var kc = 0, kg = 0;
    kids(s).forEach(function (x) { kc += (x.age < 2 ? KC.infant : x.age < 12 ? KC.child : KC.teen) * k; if (x.age >= 2 && x.age < 7) kg += F().kgFee * k; });
    if (kc) out.kids = kc; if (kg) out.kindergarten = kg;
    var o = RL.Young.own(s);
    if (o.living === 'rent_flat' && kids(s).length) {
      var R = D.economy.costs.rent[L.settlement] || D.economy.costs.rent.big;
      out.rentExtra = R[1] - R[0];
    }
    var al = p.alimony;
    if (al && al.payer === 'me') {
      var w = RL.Young.netWage(s);
      if (w > 0 && al.mode !== 'none' && (al.mode === 'regular' || (s.date.month + s.date.year) % 5 < 2)) out.alimony = w * al.share;
    }
    return out;
  }
  function scale(s) { var c = sp(s); return 1 + (c && (c.status === 'cohab' || c.status === 'married') ? 0.7 : 0) + kids(s).length * 0.5; }

  // ---------- родители: уход и наследство ----------
  function parentsMonthly(s, rng) {
    var p = s.person, fam = s.family;
    if (S.age(s) < 18) return;
    var par = fam.members.filter(function (m) { return ['mother', 'father', 'stepfather', 'adoptive_mother', 'adoptive_father'].indexOf(m.role) >= 0 && !m.unknown; });
    par.forEach(function (m) {
      if (m.alive && m.age >= 68 && m.health < 40 && !m.careDone && rng.chance(0.03)) { m.careDone = 1; RL.Events.queue(s, 'parent_care', {who: S.relName(m), n: m.name}); }
    });
    var aliveHome = par.filter(function (m) { return m.alive && (m.inHome || m.role === 'mother' || m.role === 'father'); });
    if (!p.flags.inherited && fam.housing && fam.housing.owned && ['flat', 'private_house', 'new_mortgage'].indexOf(fam.housing.type) >= 0 &&
        par.length && par.every(function (m) { return !m.alive || !m.inHome; }) && par.some(function (m) { return !m.alive && m.inHomeBefore !== false; })) {
      p.flags.inherited = 1;
      var heirs = 1 + fam.members.filter(function (m) { return m.role === 'sibling' && m.alive; }).length;
      var o = RL.Young.own(s), area = fam.housing.area || 46;
      var price = RL.Adult.flatPrice(s, area) * (fam.housing.type === 'private_house' ? 0.6 : 1);
      if (heirs === 1) {
        var where = RL.Assets.addFlat(s, {area: area, price: price, inherited: true, year: s.date.year, house: fam.housing.type === 'private_house', city: p.city}, 'наследство родителей');
        S.log(s, 'Наследство: ' + (fam.housing.type === 'private_house' ? 'родительский дом теперь твой' : 'родительская квартира теперь твоя') + (where === 'live' ? ' — переезжаешь туда.' : '.'), 'money');
      } else {
        o.savings += price / heirs * 0.9;
        S.log(s, 'Наследство: доля в родительском жилье (1/' + heirs + ') — после продажи получено ' + RL.World.money(s, price / heirs * 0.9) + '.', 'money');
      }
    }
  }

  // ---------- эффекты событий ----------
  function applyEffects(s, eff, rng) {
    if (eff.relationship === 'marry') setStatus(s, 'married', rng);
    if (eff.relationship === 'cohab') setStatus(s, 'cohab', rng);
    if (eff.relationship === 'breakup' && sp(s)) breakup(s, rng, eff.reason || '');
    if (eff.relationship === 'mend' && sp(s)) sp(s).relation = U.clamp(sp(s).relation + 15, 0, 100);
    if (eff.wantChild) s.flags.wantChild = S.ageMonths(s) + 12;
    if (eff.notNow) s.flags.notNow = S.ageMonths(s) + 24;
    if (eff.parentCare) {
      var m = s.family.members.filter(function (x) { return x.alive && x.careDone && !x.careKind; })[0];
      if (m) { m.careKind = eff.parentCare; if (eff.parentCare === 'take') { m.health = Math.min(100, m.health + 10); } if (eff.parentCare === 'home') m.health -= 10; }
    }
    if (eff.spouseRelation && sp(s)) sp(s).relation = U.clamp(sp(s).relation + eff.spouseRelation, 0, 100);
  }

  function monthly(s, rng) {
    var p = s.person, a = S.age(s);
    if (a < 16) return;
    var c = sp(s);
    if (!c && a >= 18 && !s.pending) {
      var st = p.education.stage;
      if (st !== 'army' && st !== 'colony') {
        var h = U.interpYear(F().meetByAge, a) * Math.sqrt(Math.max(10, p.stats.social) / 50) * Math.pow((p.appearance || 50) / 50, 0.5);
        var M = F().meetMods; if (M['focus_' + p.focus]) h *= M['focus_' + p.focus]; if (st === 'vuz') h *= M.vuz;
        if ((p.exes || []).length && S.ageMonths(s) - 0 < 0) h *= 1;
        if (rng.chance(h)) offerMeet(s, rng);
      }
    }
    relationMonthly(s, rng);
    birthMonthly(s, rng);
    kidsMonthly(s, rng);
    parentsMonthly(s, rng);
  }

  function facts(s, f) {
    var c = sp(s), ks = kids(s);
    f.hasPartner = !!c; f.partnerStatus = c ? c.status : null; f.married = !!(c && c.status === 'married'); f.cohab = !!(c && c.status === 'cohab');
    f.kidsN = ks.length; f.babyAtHome = ks.some(function (k) { return k.age < 3; });
    f.partnerRelation = c ? c.relation : 0; f.partnerAlcohol = c ? c.alcohol : 0; f.partnerViolent = !!(c && c.violent);
    f.wantChildFlag = !!s.flags.wantChild;
    f.marriedYears = c && c.status === 'married' ? (S.ageMonths(s) - (c.marriedM !== undefined ? c.marriedM : c.since || 0)) / 12 : 0;
    f.togetherYears = c ? (S.ageMonths(s) - (c.metM !== undefined ? c.metM : c.since || 0)) / 12 : 0;
    var all = (s.person.kids || []).filter(function (k) { return k.alive; });
    f.kidsAlive = all.length; f.adultKids = all.filter(function (k) { return k.age >= 18; }).length;
    f.kidsAway = all.filter(function (k) { return !k.withMe; }).length;
    // родители партнёра: точных данных нет — живы, пока партнёру меньше ~60
    f.spouseParents = !!(c && c.age < 60);
    f.kidsGrandma = f.momAlive || f.spouseParents;
  }

  return {monthly: monthly, resolve: resolve, autoChoose: autoChoose, applyEffects: applyEffects, facts: facts, income: income, items: items, scale: scale, offerMeet: offerMeet,
    kids: kids, spouseNet: spouseNet, leaveBenefit: leaveBenefit};
})();
