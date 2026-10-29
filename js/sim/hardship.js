// Жёсткая взрослая жизнь 30–60: то, что ломает медленно. Кредитная кабала (платежи > половины дохода), коллекторы,
// просрочка ипотеки → реструктуризация, продажа или торги, долгая безработица → депрессия и бутылка,
// инвалидность → «работодатель не стал ждать». Сами развилки — события в js/data/events_hard.js.
// Реалии: 127-ФЗ — банкротство физлиц с 2015 г. (единственное жильё не забирают, кроме ипотечного); 230-ФЗ о коллекторах (2017);
// ипотечные каникулы — 76-ФЗ (2019); торги по ипотечным квартирам — обычно 70–80% рыночной цены [~ ЦБ РФ, Росреестр].
RL.Hardship = (function () {
  var U = RL.util, S = RL.S;
  var AVG = function (s) { return RL.Economy.AVG24() * RL.World.realWageIndex(s, s.date.year, s.date.month); };
  function own(s) { return RL.Young.own(s); }
  function tx(s, t) { return t.replace(/\[([^|\]]*)\|([^\]]*)\]/g, function (m, a, b) { return s.person.sex === 'f' ? b : a; }); }

  function monthly(s, rng) {
    var p = s.person, a = S.age(s), o = p.own;
    if (a < 20 || !o || o.living === 'prison' || o.living === 'army') return;
    var b = o.lastBudget, h = p.hard = p.hard || {load: 0, mlate: 0, unemp: 0};
    // кредитная нагрузка: платежи по необеспеченным долгам к доходу
    if (b && b.income > 0) {
      var pay = Object.keys(b.items).filter(function (k) { return /^debt_/.test(k) && k !== 'debt_mortgage'; }).reduce(function (t, k) { return t + b.items[k]; }, 0);
      var unsec = o.debts.filter(function (d) { return d.kind !== 'mortgage' && d.kind !== 'edu'; }).reduce(function (t, d) { return t + d.balance; }, 0);
      h.load = pay / b.income > 0.6 && unsec > b.income * 6 ? h.load + 1 : Math.max(0, h.load - 1);
      if (h.load >= 8 && !s.pending && (!h.trapAt || S.ageMonths(s) - h.trapAt > 120)) { h.trapAt = S.ageMonths(s); h.load = 0; RL.Events.queue(s, 'credit_trap', {}); }
    }
    // дефолт: кредиторы идут в суд — приставы (RL.Law) или, с 2015, банкротство по заявлению банка
    var unsec2 = o.debts.filter(function (d) { return d.kind === 'bank' || d.kind === 'mfo'; }).reduce(function (t, d) { return t + d.balance; }, 0);
    if (o.defaulted && s.date.year >= 2015 && !p.flags.bankrupt && unsec2 > 500000 && rng.chance(0.004)) {
      applyEffects(s, {bankrupt: true}, rng);
      S.log(s, 'Банк подал на твоё банкротство. Суд списал долги, имущество — на торги, пять лет без кредитов.', 'bad');
      S.adj(s, 'mental', -6);
    }
    o.defaulted = false;
    // коллекторы: микрозаймы и просроченные кредитки
    var mfo = o.debts.filter(function (d) { return d.kind === 'mfo' && d.balance > 0; }).reduce(function (t, d) { return t + d.balance; }, 0);
    if (mfo > 0.8 * AVG(s) && rng.chance(0.25)) {
      S.adj(s, 'mental', -1.5);
      if (rng.chance(0.08)) S.log(s, rng.pick(['Коллекторы звонят на работу и родственникам.', 'На двери подъезда — листовка с твоей фамилией: «Должник».', S.mother(s) && S.mother(s).alive ? (s.date.year >= 2012 ? 'Коллектор пишет в мессенджер маме: «Ваш ребёнок должен».' : 'Коллектор звонит маме: «Ваш ребёнок должен».') : 'Коллектор пишет твоим коллегам: «Передайте, что пора платить».']), 'bad');
    }
    // ипотека: денег нет — просрочка; три месяца — разговор с банком, девять — торги
    var mg = o.debts.filter(function (d) { return d.kind === 'mortgage' && d.balance > 0; })[0];
    var noIncome = !(p.job && p.job.employed) && !p.biz && !p.pension;
    if (mg && noIncome && (o.savings || 0) < (mg.payment || 0) * 2) {
      h.mlate++;
      if (h.mlate === 3) RL.Events.queue(s, 'mortgage_late', {});
      if (h.mlate >= 9 && !h.foreclosed) foreclose(s, mg, rng);
    } else h.mlate = Math.max(0, h.mlate - 1);
    // долгая безработица: сначала тоска, потом депрессия и бутылка
    if (p.job && !p.job.employed && !p.pension && a < 60 && (p.education.stage === 'work' || p.education.stage === 'gap')) {
      h.unemp++;
      if (h.unemp > 6) S.adj(s, 'mental', -0.8);
      if (h.unemp === 12) {
        S.log(s, tx(s, 'Год без работы. Резюме уходят в пустоту, ты [перестал|перестала] выходить из дома.'), 'bad');
        if (rng.chance(0.3) && RL.DATA.conditions.depression) RL.Health.addCondition(s, 'depression', rng);
        if (p.sex === 'm' && rng.chance(0.25) && RL.Teen) RL.Teen.applyEffects(s, {habitUp: {alcohol: 1}}, rng);
      }
    } else h.unemp = 0;
    // инвалидность: работодатель не стал ждать
    if (p.disability && !h.disChecked) {
      h.disChecked = 1;
      if (p.job && p.job.employed && a < 60 && rng.chance(0.45)) { p.job.employed = false; p.job.monthsUnemployed = 0; S.log(s, 'После инвалидности на прежнее место не взяли: «нам нужен здоровый человек». Пособие — копейки.', 'bad'); }
    }
    // алкоголь 3-й степени после 30: падения, травмы, «чёрные риелторы» в 90-е
    if (((p.habits || {}).alcohol || 0) >= 3 && a >= 30) {
      if (rng.chance(0.01)) { S.adj(s, 'health', -8); S.log(s, rng.pick(['Пьяным упал' + (p.sex === 'f' ? 'а' : '') + ' на лестнице: сотрясение и перелом.', 'Очнул' + (p.sex === 'f' ? 'ась' : 'ся') + ' в вытрезвителе. Телефона и денег нет.']), 'bad'); }
    }
  }

  // торги: квартира уходит банку, остаток долга — на тебе (если торги не покрыли)
  function foreclose(s, mg, rng, sold) {
    var o = own(s), h = s.person.hard;
    h.foreclosed = 1;
    // ипотечная квартира — o.flat (RL.Adult.buyFlat)
    var price = o.flat && o.flat.price ? o.flat.price * rng.range(0.65, 0.8) : mg.balance * 0.8;
    var rest = Math.max(0, mg.balance - price), extra = Math.max(0, price - mg.balance);
    o.debts.splice(o.debts.indexOf(mg), 1);
    if (rest > 0) o.debts.push({kind: 'bank', name: 'остаток ипотеки после торгов', balance: rest, principal: rest, rate: 0.12});
    o.savings = (o.savings || 0) + extra;
    if (o.living === 'own_flat') o.living = 'rent_flat';
    o.flat = null;
    S.log(s, (sold ? 'Квартиру продали сами, чтобы закрыть ипотеку.' : 'Банк выставил ипотечную квартиру на торги и продал ниже рынка.') + (rest > 0 ? ' Долг не закрыт: ' + RL.World.money(s, rest) + '.' : '') + ' Переезжаешь на съёмную.', 'bad');
    S.adj(s, 'mental', -15); S.adj(s, 'happiness', -12);
  }

  function applyEffects(s, eff, rng) {
    var o = s.person.own; if (!o) return;
    // рефинансирование: ставка ниже, срок длиннее — платёж меньше, переплата больше
    if (eff.refinance) {
      var small = o.debts.filter(function (d) { return d.kind === 'bank' || d.kind === 'mfo'; });
      var sum = small.reduce(function (t, d) { return t + d.balance; }, 0);
      if (!sum) return;
      o.debts = o.debts.filter(function (d) { return small.indexOf(d) < 0; });
      var rate = U.interpYear(RL.DATA.economy.creditRate, Math.min(s.date.year, 2024)) * 0.85;
      o.debts.push({kind: 'bank', name: 'рефинансирование', balance: sum, principal: sum, rate: rate, fixedPayment: sum * (rate / 12) / (1 - Math.pow(1 + rate / 12, -84))});
    }
    // банкротство: всё необеспеченное списано, 5 лет без кредитов, 3 года нельзя быть директором
    if (eff.bankrupt) {
      o.debts = o.debts.filter(function (d) { return d.kind === 'mortgage' || d.kind === 'edu'; });
      o.badCredit = true; s.person.flags.bankrupt = s.date.year; o.savings = 0;
      if (s.person.biz && RL.Adult) RL.Adult.applyEffects(s, {closeBiz: true}, rng);
    }
    // ипотечные каникулы: полгода без платежей
    // зарплата ниже (понижение после декрета, удалёнка)
    if (eff.wageMul && s.person.job && s.person.job.employed) s.person.job.raise = (s.person.job.raise || 1) * eff.wageMul;
    if (eff.mortHoliday) { var mg = o.debts.filter(function (d) { return d.kind === 'mortgage'; })[0]; if (mg) { mg.deferred = true; mg.deferUntil = S.ageMonths(s) + 6; } s.person.hard.mlate = 0; }
    if (eff.sellMortFlat) { var m2 = o.debts.filter(function (d) { return d.kind === 'mortgage'; })[0]; if (m2) { s.person.hard.foreclosed = 0; foreclose(s, m2, {range: function () { return 0.95; }}, true); s.person.hard.foreclosed = 0; } }
  }
  function facts(s, f) {
    var o = s.person.own || {}, d = o.debts || [];
    f.badCredit = !!o.badCredit;
    f.mfoDebt = d.some(function (x) { return x.kind === 'mfo' && x.balance > 0; });
    f.parentsCanHelp = S.parentsAlive(s).length > 0;
    f.money = s.person.stats.money;
    f.divorced = !!s.person.flags.divorced;
  }
  // каникулы кончились — платежи снова
  function tick(s) {
    var o = s.person.own; if (!o) return;
    o.debts.forEach(function (d) { if (d.deferUntil && S.ageMonths(s) >= d.deferUntil) { d.deferred = false; delete d.deferUntil; } });
  }

  return {monthly: function (s, rng) { tick(s); monthly(s, rng); }, applyEffects: applyEffects, facts: facts};
})();
