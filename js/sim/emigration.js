// Эмиграция как ветка жизни: дорого, с потерей статуса и риском не прижиться.
// Переезд — эффект emigrate (страна по эпохе и профессии), дальше — адаптация 0…1: язык, работа ниже квалификации,
// тоска; через годы — «прижился» или «вернулся». Пока ты за границей: нет призыва и выборов, российских событий меньше.
// Скорость адаптации — по стране (c.adapt), возрасту, образованию, языку (флаг english), профессии; IT работает на удалёнке.
// Регулируемые профессии (врач, юрист, учитель, полицейский, чиновник) без подтверждённого диплома — только «где возьмут».
// Пара: партнёр может не прижиться (emig_spouse); дети ассимилируются (emig_kids); родители остаются там.
// Возвращение «не прижился» — минус деньги, связи остыли, на прежнее место не берут.
RL.Emigration = (function () {
  var U = RL.util, S = RL.S;
  var REG = ['doctor', 'nurse', 'lawyer', 'teacher', 'police', 'official', 'prosecutor', 'judge', 'military'];
  function C(id) { return RL.DATA.abroad.filter(function (c) { return c.id === id; })[0]; }
  function abroad(s) { var p = s.person; return !!(p.loc && p.loc.regionId && /^x_/.test(p.loc.regionId)); }

  function pickCountry(s, rng) {
    var p = s.person, y = s.date.year, eth = RL.DATA.ethnic[p.ethnic] || {}, w = {}, en = eth.m || '';
    RL.DATA.abroad.forEach(function (c) {
      if (y < c.from) return;
      var k = 1;
      if (c.id === 'x_isr') k = /еврей/.test(en) ? 30 : y < 2000 ? 0.5 : 0.15;
      if (c.id === 'x_deu') k = /немец/.test(en) ? 30 : y < 2005 ? 1 : 0.6;
      if (c.id === 'x_usa') k = y < 2022 ? (p.flags.english ? 2 : 1) : 0.3;
      if (y >= 2022 && /^x_(geo|arm|kaz|srb|tur)$/.test(c.id)) k = 2;
      w[c.id] = k;
    });
    return rng.weightedKey(w);
  }
  function go(s, rng) {
    var p = s.person, o = RL.Young.own(s), c = C(pickCountry(s, rng)), prof = p.job && p.job.employed ? p.job.prof : (p.job || {}).prof;
    var wage0 = RL.Young.netWage(s) || 0, tiesN = (p.ties || []).filter(function (t) { return t.str >= 30 && !t.enemy; }).length;
    p.abroad = {country: c.id, since: s.date.year, adapt: 0.05, home: p.loc ? JSON.parse(JSON.stringify(p.loc)) : null, prof: prof || null,
      regulated: REG.indexOf(prof) >= 0, dipOk: false, it: prof === 'it', wealth0: RL.Adult ? Math.round(RL.Adult.wealth(s)) : 0,
      wage0: wage0, cost: Math.round(c.price * 150000), tiesN: tiesN, spouse0: !!p.spouse};
    p.loc = {regionId: c.id, settlement: 'big', city: c.name};
    o.living = 'rent_flat';
    if (p.job) p.job.employed = false;
    if (p.biz && RL.Adult) RL.Adult.applyEffects(s, {closeBiz: true}, rng);
    RL.Events.applyEffects(s, {cash: -p.abroad.cost}, {}, rng);
    S.log(s, 'Переезд: ' + c.name + '. Чемодан, съёмная квартира, ' + c.lang + ' с нуля. Всё, что было «там», — теперь только в телефоне.', 'family');
    S.adj(s, 'social', -15); S.adj(s, 'mental', -5);
    // связи в России остывают вдвое
    (p.ties || []).forEach(function (t) { t.str = Math.round(t.str * 0.5); });
    // партнёр: не все хотят уезжать — через полгода–полтора года разговор «давай вернёмся»
    if (p.spouse) {
      p.spouse.relation = U.clamp(p.spouse.relation - 10, 0, 100);
      if (rng.chance(0.45)) (s.later = s.later || []).push({at: S.ageMonths(s) + rng.int(6, 18), id: 'emig_spouse'});
    }
  }
  function back(s, why, rng) {
    var p = s.person, a = p.abroad;
    p.loc = a.home || null;
    RL.Young.own(s).living = 'rent_flat';
    if (p.job) p.job.employed = false;
    // цена неудачи: переезд обратно, «дыра» в резюме, связи остыли
    if (!a.settled) {
      var lost = Math.round(120000 + ((C(a.country) || {}).price || 1) * 80000);
      a.cost = (a.cost || 0) + lost;
      RL.Events.applyEffects(s, {cash: -lost, mental: -10, social: -6}, {}, rng || {chance: function () { return false; }});
      (p.ties || []).forEach(function (t) { t.str = Math.round(t.str * 0.6); });
      // «дыра» в резюме и потерянная квалификация: два года работу ищут дольше и берут дешевле (js/sim/young.js)
      p.flags.backFail = S.ageMonths(s);
    }
    S.log(s, 'Возвращение в Россию: ' + why + (a.settled ? '' : ' Деньги потрачены, на прежнее место уже взяли другого.'), 'family');
    p.abroadHist = (p.abroadHist || []).concat([{country: a.country, from: a.since, to: s.date.year, settled: !!a.settled, why: why, adapt: Math.round(a.adapt * 100) / 100, dipOk: a.dipOk,
      regulated: a.regulated, it: a.it, cost: a.cost, wage0: a.wage0, wage1: a.wage1, tiesN: a.tiesN, spouse0: a.spouse0, spouseLost: a.spouse0 && !p.spouse}]);
    p.abroad = null;
  }

  function monthly(s, rng) {
    var p = s.person, a = p.abroad;
    if (!a || !abroad(s)) return;
    var c = C(a.country) || {adapt: 1, dip: 0.4}, yrs = s.date.year - a.since;
    // адаптация: страна, возраст, образование, язык, характер
    var k = (c.adapt || 1) * (1 + (p.traits.curiosity || 0) / 100 + (S.age(s) < 30 ? 0.3 : S.age(s) > 45 ? -0.35 : 0) + (RL.Chains && RL.Chains.hasHigher(s) ? 0.2 : 0) + (p.flags.english ? 0.25 : 0));
    a.adapt = U.clamp(a.adapt + 0.012 * k, 0, 1);
    if (a.adapt < 0.4) { S.adj(s, 'mental', -0.4); S.adj(s, 'social', -0.2); }
    a.months = (a.months || 0) + 1;
    // первая работа — ниже уровня (кроме IT на удалёнке)
    if (p.job && p.job.employed && !a.jobNoted) {
      a.jobNoted = 1; a.wage1 = RL.Young.netWage(s) || 0;
      if (!a.it && a.adapt < 0.5) S.log(s, RL.Events.text(s, a.regulated && !a.dipOk ? 'Первая работа здесь — не по специальности: диплом не признают, взяли помощником, «пока не сдашь экзамены».' : 'Первая работа здесь — склад, доставка, уборка. Твой опыт из России никому не интересен.', {}), 'bad');
      else if (a.it) S.log(s, 'Работаешь на удалёнке — на прежнего работодателя или на западную компанию. Статус почти сохранился.', 'good');
    }
    // раз в год — «прижился» или «назад»
    if (s.date.month === s.birth.month && yrs >= 1 && !s.pending) {
      if (a.adapt >= 0.7 && !a.settled) { a.settled = 1; S.log(s, RL.Events.text(s, 'Ты здесь [прижился|прижилась]: язык, друзья, свои места.' + (yrs >= 5 ? ' Паспорт новой страны — почти твой.' : ''), {}), 'good'); }
      else if (a.adapt < 0.5 && (p.stats.mental < 40 || p.stats.money < 25) && rng.chance(0.35)) back(s, rng.pick(['не прижилось — язык не пошёл, работа только на складе.', 'родителям нужна помощь, а деньги кончились.', 'тоска оказалась сильнее.']), rng);
    }
  }
  // зарплата за границей: первые годы — ниже квалификации; регулируемая профессия без диплома — потолок; IT — почти как было
  function wageMul(s) {
    var a = s.person.abroad;
    if (!a || !abroad(s)) return 1;
    var m = 0.45 + 0.55 * a.adapt;
    if (a.regulated && !a.dipOk) m = Math.min(m, 0.55);
    if (a.it) m = Math.max(m, 0.85);
    return m;
  }
  function applyEffects(s, eff, rng) {
    var a = s.person.abroad;
    if (eff.emigrate) go(s, rng);
    if (eff.emigAdapt && a) {
      a.adapt = U.clamp(a.adapt + eff.emigAdapt, 0, 1);
      // большой шаг адаптации — это подтверждённый диплом (emig_diploma); шанс на успех — в весах исходов события
      if (eff.emigAdapt >= 0.3) a.dipOk = true;
    }
    if (eff.emigBack && a && abroad(s)) back(s, eff.emigBack, rng);
  }
  function facts(s, f) {
    var a = s.person.abroad, c = a ? C(a.country) || {} : {};
    f.abroad = abroad(s); f.inPrison = f.inPrison || false; f.settledAbroad = !!(a && a.settled);
    f.emigDipHigh = !!a && (c.dip || 0) >= 0.5; f.emigDipLow = !!a && (c.dip || 0) < 0.35;
  }

  // для итогового отчёта: жизнь за границей
  function reportLines(s) {
    var p = s.person, out = [], g = function (m, w) { return p.sex === 'f' ? w : m; };
    var hist = (p.abroadHist || []).slice();
    if (p.abroad) { var A = p.abroad; hist.push({country: A.country, from: A.since, to: null, settled: !!A.settled, adapt: A.adapt, dipOk: A.dipOk, regulated: A.regulated, it: A.it,
      cost: A.cost, wage0: A.wage0, wage1: A.wage1, tiesN: A.tiesN, spouse0: A.spouse0, spouseLost: A.spouse0 && !p.spouse}); }
    hist.forEach(function (h) {
      var c = C(h.country) || {name: h.country}, yrs = (h.to || s.date.year) - h.from;
      out.push(c.name + ': ' + h.from + '–' + (h.to || (p.alive ? 'сейчас' : s.date.year)) + ' (' + yrs + ' ' + RL.Game.years(yrs) + '). ' +
        (h.settled ? g('Прижился', 'Прижилась') + ': язык, работа, свои люди.' : 'Так и ' + g('остался чужим', 'осталась чужой') + ' — адаптация ' + Math.round((h.adapt || 0) * 100) + '%.'));
      if (h.to) out.push('Вернул' + g('ся', 'ась') + ': ' + (h.why || 'не сложилось') + (h.settled ? '' : ' Потеряны деньги, связи и годы стажа.'));
      if (h.regulated) out.push(h.dipOk ? 'Диплом подтвердил' + g('', 'а') + ' — снова по специальности.' : 'Диплом так и не признали: работа ниже уровня.');
      // цена решения
      var price = [];
      if (h.cost) price.push('деньги — ' + RL.World.money(s, h.cost, h.from));
      if (h.tiesN) price.push('связи в России — ' + h.tiesN + ' ' + (h.tiesN === 1 ? 'нужный человек остыл' : 'нужных людей остыли'));
      if (h.spouseLost) price.push('брак не пережил переезд');
      if (h.wage0 && h.wage1) { var k = h.wage1 / h.wage0 * ((C(h.country) || {}).wage || 1) / ((C(h.country) || {}).price || 1); price.push(k < 0.8 ? 'первая работа там — заметно ниже статусом и по деньгам с поправкой на цены' : 'по деньгам с поправкой на цены — не хуже, чем было'); }
      if (price.length) out.push('Цена решения: ' + price.join('; ') + '.');
    });
    if (hist.length) {
      if (p.flags.kidsAbroad || s.flags.kidsAbroad) out.push('Дети выросли местными: Россия для них — страна бабушек.');
      if (s.flags.renounced) out.push('Отказ' + g('ался', 'алась') + ' от российского гражданства.');
      out.push('Из России уезжают единицы процентов когорты; около трети уехавших в итоге возвращаются [~].');
    }
    return out;
  }

  return {monthly: monthly, applyEffects: applyEffects, facts: facts, wageMul: wageMul, abroad: abroad, reportLines: reportLines};
})();
