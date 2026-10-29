// Подростки 11–17: привычки и зависимости, подработка, ОГЭ/ЕГЭ, траектория после 9 класса, колледж, колония, учёт в военкомате.
RL.Teen = (function () {
  var U = RL.util, S = RL.S;
  var T = function () { return RL.DATA.teen; };

  function habits(s) {
    var p = s.person;
    if (!p.habits) p.habits = {smoking: 0, alcohol: 0, drugs: 0, gaming: 0};
    return p.habits;
  }
  // калибровка под средние баллы Рособрнадзора (tests/sim-check.js): на выборочные предметы идут сильные — их сдвигаем сильнее
  var SCORE_OFFSET = 1.2, SELECTIVE = ['physics', 'informatics'];
  function eraMul(t, y) { return U.interpYear(t, Math.min(y, 2025)); }
  function eraSmoke(y) { var t = T().smokeNames, b = ''; Object.keys(t).map(Number).sort(function (a, c) { return a - c; }).forEach(function (k) { if (y >= k) b = t[k]; }); return b; }
  function selfK(s) { return Math.exp(-(s.person.traits.selfControl || 0) / 60); }

  function setHabit(s, k, lvl, quiet) {
    var h = habits(s), old = h[k];
    h[k] = U.clamp(lvl, 0, 3);
    var ev = s.person.habitsEver = s.person.habitsEver || {};
    ev[k] = Math.max(ev[k] || 0, h[k]);
    if (!quiet && h[k] !== old && h[k] >= 2) {
      var d = T().habits[k];
      S.log(s, d.name + ': ' + RL.Events.text(s, d.levels[h[k]], {}) + '.', h[k] >= 3 ? 'bad' : 'health');
    }
  }

  function habitDynamics(s, rng, f) {
    var h = habits(s), y = s.date.year, p = s.person;
    // первые пробы вне компании: шампанское на Новый год, «попробуй» от взрослых
    if (h.alcohol === 0 && S.age(s) >= 13 && S.age(s) < 30 && f.religion !== 'muslim' && rng.chance((s.date.month === 11 ? 0.15 : 0.008) * eraMul(T().habits.alcohol.eraMul, y))) {
      setHabit(s, 'alcohol', 1, true); S.log(s, s.date.month === 11 ? 'На Новый год тебе впервые налили бокал шампанского.' : 'Впервые [попробовал|попробовала] алкоголь — «с родителями, чтобы не на улице».'.replace(/\[([^|\]]*)\|([^\]]*)\]/g, function (m0, a0, b0) { return p.sex === 'f' ? b0 : a0; }), 'info');
    }
    // курение и наркотики «прилипают» и без отдельного события: компания, двор, стресс
    var foc = RL.Childhood.focusDef(p.focus) || {}, rk = (foc.risk && foc.risk.habits) || 1;
    var peer = (p.focus === 'friends' || p.focus === 'yard' ? 2 : rk) * (f.stress ? 1.3 : 1) * selfK(s) * (foc.sober ? 0.5 : 1);
    if (h.smoking === 0 && S.age(s) >= 12 && S.age(s) < 30 && rng.chance(0.004 * eraMul(T().habits.smoking.eraMul, y) * peer * (f.parentsSmoke ? 1.5 : 1) * (p.sex === 'm' ? 1.3 : 0.8))) {
      setHabit(s, 'smoking', 1, true); S.log(s, RL.Events.text(s, 'За школой с друзьями ты впервые [затянулся|затянулась]: {smoke}.', {smoke: eraSmoke(y)}), 'info');
    }
    if (h.drugs === 0 && S.age(s) >= 14 && S.age(s) < 30 && rng.chance(0.0005 * eraMul(T().habits.drugs.eraMul, y) * peer * peer * (f.bigCity ? 1.4 : 1) * (p.sex === 'f' ? 0.6 : 1))) {
      setHabit(s, 'drugs', 1, true); S.log(s, RL.Events.text(s, 'На вписке пустили по кругу косяк — ты [попробовал|попробовала].', {}), 'info');
    }
    Object.keys(T().habits).forEach(function (k) {
      var d = T().habits[k], lvl = h[k];
      if (k === 'gaming') {
        if (p.focus === 'screen' && lvl === 0 && y >= 1995 && rng.chance(0.15)) h.gaming = 1;
        if (p.focus !== 'screen' && lvl > 0 && rng.chance(d.quit[lvl] * 3)) h.gaming = lvl - 1;
      }
      if (lvl === 0) return;
      var up = (d.prog[lvl] || 0) * eraMul(d.eraMul, y) * selfK(s);
      if (p.focus === 'friends' || p.focus === 'yard') up *= 1.6; else if (rk > 1) up *= 1 + (rk - 1) * 0.8;
      if (foc.sober) up *= 0.5;
      if (f.stress) up *= 1.4;
      if (k === 'smoking' && f.parentsSmoke) up *= 1.3;
      if (k === 'alcohol' && f.familyAlcohol) up *= 1.5;
      if (k === 'alcohol' && f.religion === 'muslim') up *= 0.3;
      // женщины реже переходят к регулярному употреблению и зависимости [~ Минздрав: среди наркозависимых ~20% женщин, среди алкозависимых ~25%]
      if (p.sex === 'f' && (k === 'drugs' || k === 'alcohol')) up *= k === 'drugs' ? 0.35 : 0.5;
      if (k === 'gaming' && p.focus !== 'screen') up *= 0.2;
      if (p.focus === 'sport' || p.focus === 'health') up *= 0.5;
      if (lvl < 3 && rng.chance(up)) { setHabit(s, k, lvl + 1); return; }
      var down = d.quit[lvl] / selfK(s) * (p.focus === 'sport' || p.focus === 'health' || foc.sober ? 2 : 1);
      if (rng.chance(down)) {
        h[k] = lvl - 1;
        if (lvl >= 2) S.log(s, d.name + ': ' + (h[k] === 0 ? 'бросил' : 'стало меньше').replace('бросил', p.sex === 'f' ? 'бросила' : 'бросил') + '.', 'good');
      }
    });
    // последствия
    if (h.alcohol >= 2) { S.adj(s, 'skills', -0.2); S.adj(s, 'mental', -0.2); }
    if (h.drugs >= 2) { S.adj(s, 'skills', -0.5); S.adj(s, 'mental', -0.5); S.adj(s, 'social', -0.2); }
    if (h.gaming >= 2) { S.adj(s, 'skills', -0.15); S.adj(s, 'social', -0.15); S.adj(s, 'happiness', 0.1); }
  }

  // Оценка 0..100 по предмету: задатки + навыки + школа + подготовка + характер + шум.
  function score(s, subj, rng, shift) {
    var p = s.person, sd = T().exams.subjects[subj], w = sd.w, ed = p.education;
    var feats = {iq: (p.hidden.iq - 100) / 15, skills: (p.stats.skills - 55) / 14, curiosity: (p.traits.curiosity || 0) / 40,
      creativity: (p.hidden.creativity - 50) / 16};
    var num = 0, den = 0;
    Object.keys(w).forEach(function (k) { num += w[k] * feats[k]; den += w[k] * w[k]; });
    var z = num / Math.sqrt(den);
    var q = ed.school ? ed.school.q : 45;
    z += (q - 55) / 15 * 0.3 + Math.min(30, ed.prep || 0) / 30 * 0.55 + (p.traits.diligence || 0) / 50 * 0.25
      + (p.stats.mental - 60) / 20 * 0.12 - (p.stats.health < 45 ? 0.25 : 0) - (habits(s).drugs >= 2 ? 0.6 : 0) - (habits(s).alcohol >= 2 ? 0.2 : 0);
    z += rng.normal(0, 0.5) - SCORE_OFFSET - (SELECTIVE.indexOf(subj) >= 0 ? 0.8 : subj === 'math' ? 0.25 : 0);
    return Math.round(U.clamp(sd.mean + sd.sd * z + (shift || 0), 0, 100));
  }
  function perfNum(g) { return /отлични/.test(g) ? 5 : /хорошист/.test(g) ? 4.3 : /троечни/.test(g) ? 3.4 : 2.8; }

  function doOGE(s, rng, retake) {
    var p = s.person, ed = p.education, y = s.date.year, E = T().exams, G = E.ogeGrades;
    var modern = y >= E.ogeFrom;
    var shift = E.ogeShift + (modern ? 0 : 8) + (retake ? 8 : 0);
    var res = {};
    ['russian', 'mathBase'].forEach(function (k) {
      var sc = score(s, k, rng, shift);
      res[k] = sc >= G[0] ? 5 : sc >= G[1] ? 4 : sc >= G[2] ? 3 : 2;
    });
    var fail = res.russian === 2 || res.mathBase === 2;
    var avg = (res.russian + res.mathBase) / 2;
    ed.oge = {russian: res.russian, math: res.mathBase, year: y, modern: modern, failed: fail, retake: !!retake};
    ed.attestat9 = U.round(0.55 * perfNum(ed.performance || 'хорошист') + 0.45 * avg, 2);
    var kind = modern ? 'ОГЭ' : 'Экзамены за 9 класс';
    S.log(s, kind + (retake ? ' (пересдача)' : '') + ': русский — ' + res.russian + ', математика — ' + res.mathBase + '. ' +
      (fail ? (retake ? 'Снова «два». Вместо аттестата — справка.' : 'Двойка: пересдача в сентябре, без неё — справка вместо аттестата.') :
        'Средний балл аттестата: ' + ed.attestat9.toFixed(1) + '.'), fail ? 'bad' : 'edu');
    if (fail && !retake) { S.adj(s, 'mental', -8); ed.ogeFailed = true; }
    if (fail && retake) { ed.noAttestat9 = true; ed.attestat9 = 0; S.adj(s, 'mental', -6); }
    if (!fail) { ed.ogeFailed = false; S.adj(s, 'mental', avg >= 4.5 ? 4 : 1); }
  }

  function pickElectives(s) {
    var prof = T().exams.profiles[s.person.education.profile || 'universal'];
    var list = prof.subjects.slice();
    // базовый/профильный уровень математики + два предмета по выбору (лучшие по задаткам)
    var math = list.indexOf('math') >= 0 ? 'math' : 'mathBase';
    var rest = list.filter(function (x) { return x !== 'math' && x !== 'mathBase'; });
    return ['russian', math].concat(rest.slice(0, 2));
  }

  function doEGE(s, rng) {
    var p = s.person, ed = p.education, y = s.date.year, E = T().exams, r = S.region(s);
    var share = y >= E.egeNationalFrom ? 1 : y < 2001 ? 0 : U.interpYear(E.egeExperiment, y);
    var ege = rng.chance(share);
    var subs = pickElectives(s);
    var res = {}, failed = [];
    var infl = E.inflationRegions.indexOf(r.id) >= 0 && y >= E.inflationYears[0] && y <= E.inflationYears[1] && rng.chance(0.7) ? E.inflationBonus : 0;
    var leak = s.flags.egeLeak ? 12 : 0;
    subs.forEach(function (k) {
      var sc = score(s, k, rng, infl + leak + (ege ? 0 : 6));
      res[k] = sc;
      if (sc < E.subjects[k].min && (k === 'russian' || k === 'math' || k === 'mathBase')) failed.push(k);
    });
    if (leak && rng.chance(0.15)) {
      S.log(s, 'Работу аннулировали: на экзамене нашли распечатку «слитых» ответов. Пересдача — только через год.', 'bad');
      failed.push('annulled');
    }
    ed.ege = {kind: ege ? 'ЕГЭ' : 'выпускные экзамены', year: y, scores: res, failed: failed.length > 0, annulled: failed.indexOf('annulled') >= 0, profile: ed.profile || 'universal'};
    var parts = subs.map(function (k) { return E.subjects[k].name.replace(' (профиль)', '').replace(' (база)', y < 2015 ? '' : ' (база)') + ' — ' + res[k]; });
    if (ege) S.log(s, 'ЕГЭ: ' + parts.join(', ') + '.' + (failed.length ? ' Не набран минимум — аттестата нет.' : ''), failed.length ? 'bad' : 'edu');
    else {
      var avg = subs.reduce(function (t, k) { return t + res[k]; }, 0) / subs.length;
      ed.ege.attestatAvg = U.round(U.clamp(2.6 + avg / 40, 2, 5), 1);
      S.log(s, 'Выпускные экзамены в школе; средний балл аттестата ' + ed.ege.attestatAvg + '. Дальше — вступительные экзамены в вуз (этап 2).', 'edu');
    }
    // медали
    var hist = (ed.history || []).filter(function (h) { return h.grade >= 10; });
    var allTop = hist.length >= 2 && hist.every(function (h) { return /отлични/.test(h.result); });
    var mean = subs.reduce(function (t, k) { return t + res[k]; }, 0) / subs.length;
    if (!failed.length && allTop && mean >= 78) { ed.medal = 'золотая'; S.log(s, 'Золотая медаль!', 'good'); }
    else if (!failed.length && hist.length >= 2 && hist.filter(function (h) { return /отлични|хорошист/.test(h.result); }).length === hist.length && hist.some(function (h) { return /отлични/.test(h.result); }) && mean >= 72 && rng.chance(0.3)) { ed.medal = 'серебряная'; S.log(s, 'Серебряная медаль.', 'good'); }
    S.adj(s, 'mental', failed.length ? -12 : mean >= 80 ? 6 : 2);
    ed.stage = 'graduate';
    s.flags.schoolDone = 1;
    if (!s.flags.promDone) { s.flags.promDone = 1; RL.Events.queue(s, 'prom_11', {}); }
  }

  // Траектория: school10 | college:<id> | work | colony
  function setTrack(s, t, rng) {
    var p = s.person, ed = p.education, r = S.region(s);
    ed.after9Done = true;
    if (t === 'school10') { S.log(s, 'Остаёшься в школе: 10 класс.', 'edu'); return; }
    if (t === 'repeat9') {
      ed.passed = false; ed.oge = null; ed.ogeFailed = false; ed.noAttestat9 = false; ed.after9Done = false;
      S.log(s, 'Остаёшься на второй год в 9 классе, чтобы сдать ОГЭ.', 'edu');
      return;
    }
    if (t === 'work') {
      ed.stage = 'work'; ed.school = null;
      S.log(s, 'Ты [ушёл|ушла] из школы и [пошёл|пошла] работать.'.replace(/\[([^|\]]*)\|([^\]]*)\]/g, function (m, a, b) { return p.sex === 'f' ? b : a; }), 'edu');
      return;
    }
    if (t.indexOf('college:') === 0) {
      var c = T().colleges.filter(function (x) { return x.id === t.slice(8); })[0];
      ed.stage = 'college'; ed.grade = 1;
      // настоящий колледж или техникум региона (js/data/universities.js), профиль — из выбора
      var real = (RL.DATA.realInstitutions && RL.DATA.realInstitutions[r.id] || []).filter(function (u) { return u.kind === 'college' || u.kind === 'technical_school'; });
      var rn = real.length ? real[Math.floor(rng.next() * real.length)].name : null;
      ed.school = {type: 'college', id: c.id, name: rn ? rn + ' (' + c.name.replace(/ \(.*\)$/, '') + ')' : c.name, prof: c.prof, q: U.clamp(c.q + (r.school - 55) * 0.5 + rng.normal(0, 6), 15, 90)};
      var away = p.settlement === 'village' || p.settlement === 'small';
      if (away) { ed.dorm = true; S.adj(s, 'social', -6); }
      S.log(s, 'Поступление: ' + ed.school.name + (away ? '. Колледж в другом городе — живёшь в общежитии.' : '.'), 'edu');
    }
  }

  // Уголовное дело. severity: 'minor' (кража, драка) | 'drugs' (сбыт)
  function convict(s, severity, rng) {
    var a = S.age(s), p = s.person;
    p.flags.criminalCase = (p.flags.criminalCase || 0) + 1;
    if (a < 14 || (a < 16 && severity === 'minor')) { s.flags.pdnRecord = 1; S.log(s, 'До уголовной ответственности не дорос — поставили на учёт в ПДН.', 'bad'); return; }
    var colony = severity === 'drugs' ? (a >= 16 ? 0.7 : 0.35) : 0.12;
    if (p.flags.criminalCase > 1) colony += 0.3;
    if (rng.chance(colony)) {
      var months = severity === 'drugs' ? rng.int(36, 96) : rng.int(12, 30);
      p.education.stage = 'colony'; p.education.school = {type: 'colony', name: 'воспитательная колония', q: 25};
      p.flags.sentenceMonths = months; p.flags.criminalRecord = 1;
      S.log(s, 'Приговор: ' + Math.round(months / 12 * 10) / 10 + ' г. воспитательной колонии.', 'bad');
      S.adj(s, 'mental', -25); S.adj(s, 'social', -20); S.adj(s, 'happiness', -25);
      s.family.atmosphere = U.clamp(s.family.atmosphere - 15, 0, 100);
    } else {
      p.flags.criminalRecord = 1;
      S.log(s, 'Приговор: условный срок. Судимость теперь в биографии.', 'bad');
      S.adj(s, 'mental', -10);
    }
  }

  function applyEffects(s, eff, rng) {
    if (eff.habit) Object.keys(eff.habit).forEach(function (k) { if (habits(s)[k] < eff.habit[k]) setHabit(s, k, eff.habit[k]); });
    if (eff.habitDown) Object.keys(eff.habitDown).forEach(function (k) { setHabit(s, k, habits(s)[k] - eff.habitDown[k], true); });
    if (eff.track) setTrack(s, eff.track, rng);
    if (eff.profile) {
      s.person.education.profile = eff.profile;
      S.log(s, 'Профиль 10–11 класса: ' + T().exams.profiles[eff.profile].name + '.', 'edu');
    }
    if (eff.prep) s.person.education.prep = (s.person.education.prep || 0) + eff.prep;
    if (eff.crime) convict(s, eff.crime, rng);
  }

  function monthly(s, rng) {
    var p = s.person, a = S.age(s), ed = p.education, y = s.date.year, m = s.date.month;
    if (a < 11) return;
    var f = S.facts(s);
    habitDynamics(s, rng, f);

    // подработка / работа
    p.earnings = 0;
    var foc = RL.Childhood.focusDef(p.focus) || {};
    // подработка подростка; с 15 лет работающий ищет работу через RL.Young (своя зарплата)
    if ((foc.earn && a >= 14 && !(p.job && p.job.employed)) || (ed.stage === 'work' && a < 15)) {
      var base = T().earnBySettlement[p.settlement] * RL.Economy.AVG24() * RL.World.realWageIndex(s, y, m);
      p.earnings = base * (ed.stage === 'work' ? 2.2 : 1) * rng.range(0.6, 1.3);
      if (!p.flags.firstPay) { p.flags.firstPay = 1; S.log(s, 'Первые заработанные деньги: ' + RL.World.money(s, p.earnings) + (s.family.type === 'orphanage' ? '. Прячешь от старших в детдоме.' : RL.Young.apart(s) || !S.home(s).some(function (m) { return m.role !== 'sibling'; }) ? '.' : '. Половину отдаёшь ' + (RL.S.carer(s).plural ? 'в семью' : RL.S.carer(s).d) + '.'), 'money'); }
    }
    // подготовка к экзаменам накапливается
    if (foc.prep && ed.stage === 'school' && ed.grade >= 8) ed.prep = (ed.prep || 0) + foc.prep * (0.5 + p.hidden.iq / 200);
    if (p.focus === 'study' && ed.stage === 'school' && ed.grade >= 9) ed.prep = (ed.prep || 0) + 0.35;

    // депрессия держит психику ниже потолка
    p.conditions.forEach(function (c) {
      if (c.id !== 'depression' || c.cured) return;
      var cap = RL.DATA.conditions.depression.mentalCap + (c.treated ? 15 : 0);
      if (p.stats.mental > cap) p.stats.mental -= Math.min(2, p.stats.mental - cap);
    });

    // паспорт и военкомат
    if (a >= 14 && !p.flags.passport && m === s.birth.month) { p.flags.passport = 1; S.log(s, 'Получил паспорт гражданина РФ.'.replace('Получил', p.sex === 'f' ? 'Получила' : 'Получил'), 'info'); }
    if (p.sex === 'm' && a >= 16.9 && !p.flags.militaryCat && m <= 2) militaryRegistration(s);

    // колония
    if (ed.stage === 'colony') {
      p.flags.sentenceMonths--;
      S.adj(s, 'mental', -0.3); S.adj(s, 'health', -0.2);
      if (p.flags.sentenceMonths <= 0) { ed.stage = 'work'; ed.school = null; if (p.own && p.own.living === 'prison') p.own.living = 'parents'; S.log(s, 'Освобождение из колонии.', 'family'); }
      return;
    }

    // экзамены
    if (ed.stage === 'school') {
      if (m === 5 && ed.grade === 9 && ed.passed && !ed.oge) doOGE(s, rng, false);
      if (m === 5 && ed.grade === 11 && ed.passed && !ed.ege) doEGE(s, rng);
      if (m === 7 && ed.oge && !ed.after9Done && ed.grade === 9) {
        if (ed.ogeFailed) doOGE(s, rng, true);
        RL.Events.queue(s, 'after_9', {});
      }
      if (m === 8 && ed.grade === 10 && !ed.profile) {
        if (ed.school && ed.school.type === 'village_small') { ed.profile = 'universal'; }
        else RL.Events.queue(s, 'profile_choice', {});
      }
    }
    // колледж: сессия в мае, отчисление при провале
    if (ed.stage === 'college' && m === 5) {
      var sc = p.stats.skills * 0.5 + (p.traits.diligence || 0) * 0.25 + (ed.school.q - 50) * 0.1 + p.stats.mental * 0.15
        + (p.focus === 'study' ? 8 : 0) - (habits(s).drugs >= 2 ? 15 : 0) - (habits(s).alcohol >= 2 ? 6 : 0) + rng.normal(0, 7);
      var res = sc >= 58 ? 'на отлично' : sc >= 42 ? 'на хорошо' : sc >= 26 ? 'с тройками' : 'с долгами';
      ed.history = ed.history || [];
      ed.history.push({grade: 'курс ' + ed.grade, result: res, year: y});
      if (res === 'с долгами' && rng.chance(0.35)) { ed.stage = 'work'; S.log(s, 'Отчислили из колледжа за академические долги.', 'bad'); S.adj(s, 'mental', -8); }
      else { S.log(s, ed.grade + ' курс колледжа закрыт ' + res + '.', 'edu'); ed.grade++; }
    }
  }

  // Автовыбор на развилках — по реальным долям выбора, а не «максимум пользы».
  var AFTER9 = ['school10', 'med', 'it', 'ped', 'econ', 'tech', 'service', 'agro', 'repeat9', 'work'];
  var COLLEGE_W = {med: 0.22, it: 0.14, ped: 0.12, econ: 0.16, tech: 0.24, service: 0.12, agro: 0.08};
  function autoChoice(s, rng) {
    var pd = s.pending, p = s.person, ed = p.education;
    if (!pd || pd.kind !== 'event') return null;
    var w = {};
    if (pd.id === 'after_9') {
      var att = ed.attestat9 || 3.5, spo = U.interpYear(T().spoAfter9, Math.min(s.date.year, 2025));
      var high = S.adultsHome(s).some(function (m) { return m.edu === 2; });
      pd.choices.forEach(function (c) {
        var k = AFTER9[c.i];
        if (k === 'school10') w[c.i] = (1 - spo) * Math.exp((att - 3.8) * 1.6) * (high ? 1.6 : 1) * (s.family.poverty ? 0.8 : 1);
        else if (k === 'repeat9') w[c.i] = 0.6;
        else if (k === 'work') w[c.i] = ed.noAttestat9 ? 0.4 : (s.family.poverty ? 0.03 : 0.01);
        else w[c.i] = spo * COLLEGE_W[k] * Math.exp((att - 3.6) * (['med', 'it', 'econ'].indexOf(k) >= 0 ? 1.2 : -0.6));
      });
    } else if (pd.id === 'profile_choice') {
      var h = p.hidden, P = ['physmath', 'natural', 'socecon', 'humanities', 'universal'];
      var base = {physmath: Math.exp((h.iq - 105) / 12), natural: Math.exp(((p.traits.diligence || 0) - 10) / 30) * 0.8, socecon: 1,
        humanities: Math.exp((h.creativity - 55) / 15), universal: 0.6};
      pd.choices.forEach(function (c) { w[c.i] = base[P[c.i]]; });
    } else return null;
    var keys = Object.keys(w);
    if (!keys.length) return null;
    return +rng.weightedKey(w);
  }

  function militaryRegistration(s) {
    var p = s.person, cat = 'А';
    var bad = p.conditions.filter(function (c) { return !c.cured; }).map(function (c) { return c.id; });
    if (bad.some(function (x) { return ['cp', 'down', 'hiv', 'epilepsy', 'diabetes1', 'cancer'].indexOf(x) >= 0; }) || p.disability) cat = 'Д';
    else if (bad.some(function (x) { return ['asthma', 'chd', 'hearing', 'tb'].indexOf(x) >= 0; })) cat = 'В';
    else if (bad.length || p.stats.health < 55 || habits(s).drugs >= 2) cat = 'Б';
    p.flags.militaryCat = cat;
    S.log(s, 'Постановка на воинский учёт. Категория годности: ' + cat + {'А': ' (годен)', 'Б': ' (годен с ограничениями)', 'В': ' (ограниченно годен — в мирное время не призывают)', 'Д': ' (не годен)'}[cat] + '.', 'info');
  }

  return {monthly: monthly, habits: habits, autoChoice: autoChoice, doEGE: doEGE, applyEffects: applyEffects, setTrack: setTrack, convict: convict, score: score, setHabit: setHabit};
})();
