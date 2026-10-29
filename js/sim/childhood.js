// Детство: фокус года, дрейф показателей, детсад, школа, успеваемость.
RL.Childhood = (function () {
  var U = RL.util, S = RL.S;

  var SKILL_K = 0.3;

  function focusDef(id) { return RL.DATA.focuses.filter(function (f) { return f.id === id; })[0]; }
  function byKey(t, v, base) { var n = base; if (t) Object.keys(t).map(Number).sort(function (a, b) { return a - b; }).forEach(function (k) { if (v >= k) n = t[k]; }); return n; }
  // название фокуса: по эпохе (телевизор → планшет), по возрасту (секция → фитнес), по вере
  function focusName(s, f) {
    var n = byKey(f.nameByEra, s.date.year, f.name);
    n = byKey(f.nameByAge, S.age(s), n);
    if (f.nameByReligion && f.nameByReligion[s.person.religionTradition]) n = f.nameByReligion[s.person.religionTradition];
    return S.era(n, s.date.year);
  }
  function focusDesc(s, f) { return S.era(f.descBySex && f.descBySex[s.person.sex] || byKey(f.descByAge, S.age(s), f.desc), s.date.year); }
  // Вовлечённость взрослых 0..1
  function support(s) {
    var hm = S.adultsHome(s);
    if (!hm.length) return 0.15;
    var bestEdu = Math.max.apply(null, hm.map(function (m) { return m.edu || 0; }));
    var free = hm.some(function (m) { return !m.job || !m.job.employed || m.job.onLeave || m.job.pension; }) ? 1 : 0;
    var sober = hm.filter(function (m) { return m.alcohol < 2; }).length / hm.length;
    var v = bestEdu / 2 * 0.4 + s.family.atmosphere / 100 * 0.3 + free * 0.15 + sober * 0.15;
    if (s.family.type === 'orphanage') v = 0.15;
    return U.clamp(v, 0, 1);
  }

  // Доступные фокусы: возраст, деньги, наличие секций.
  function availableFocuses(s) {
    var a = S.age(s), st = S.st(s), fam = s.family;
    var k = S.region(s).price * st.price;
    var adult = a >= 18 && RL.Young && s.person.own && (RL.Young.apart(s) || !S.home(s).some(function (m) { return m.role !== 'sibling'; }));
    var ob = adult && s.person.own.lastBudget;
    var budget = adult ? {income: ob ? ob.income : 0, need: ob ? ob.need : 0} : fam.lastBudget || {income: 0, need: 0};
    var spare = budget.income - budget.need, savings = adult ? s.person.own.savings : fam.savings;
    var facts = S.facts(s);
    return RL.DATA.focuses.filter(function (f) {
      return a >= f.ages[0] && a < f.ages[1] + 1 && (!f.when || RL.Events.check(f.when, facts)) && !(f.fromYear && s.date.year < f.fromYear);
    }).map(function (f) {
      var o = {id: f.id, name: focusName(s, f), desc: focusDesc(s, f), ok: true, why: ''};
      var stg = s.person.education.stage;
      if (f.id === 'study' && ['school', 'college', 'vuz', 'gap'].indexOf(stg) < 0) { o.ok = false; o.why = 'сейчас ты не учишься'; }
      var employed = !!(s.person.job && s.person.job.employed);
      if (f.needsJob && !employed) { o.ok = false; o.why = 'сначала нужно найти работу'; }
      if (f.needsNoJob && employed) { o.ok = false; o.why = 'у тебя уже есть работа'; }
      if (stg === 'army' && ['none', 'health', 'sport', 'selfedu'].indexOf(f.id) < 0) { o.ok = false; o.why = 'ты на службе'; }
      if (f.needsSchool && stg !== 'school' && stg !== 'college') { o.ok = false; o.why = 'нужно учиться в школе или колледже'; }
      if (f.needsBiz && !s.person.biz) { o.ok = false; o.why = 'нет своего дела'; }
      if (stg === 'colony' && ['none', 'sport', 'selfedu', 'help', 'study'].indexOf(f.id) < 0) { o.ok = false; o.why = 'ты в колонии'; }
      if (f.needsSections && a < 18 && !s.flags['sections_' + s.person.city]) {
        var have = s.flags['sectionsCheck_' + s.person.city];
        if (have === undefined) { have = new RL.RNG(s.seed ^ s.person.city.length * 7919).chance(st.sections) ? 1 : 0; s.flags['sectionsCheck_' + s.person.city] = have; }
        if (!have) { o.ok = false; o.why = 'поблизости нет такой секции'; }
      }
      if (fam.type === 'orphanage' && f.cost > 0 && f.id !== 'sport') { o.ok = false; o.why = 'в детдоме только то, что есть'; }
      if (f.cost > 0 && fam.type !== 'orphanage') {
        var c = f.cost * k;
        o.cost = c;
        // мелкие траты (<3% дохода) семья найдёт всегда; крупные — только при остатке в бюджете или сбережениях
        var small = c < 0.03 * (budget.income || 0);
        if (!small && spare < c * 0.8 && savings < c * 6 && f.id !== 'study') { o.ok = false; o.why = (adult ? 'не потянешь' : 'семья не потянет') + ' (' + RL.World.money(s, c) + '/мес)'; }
      }
      return o;
    });
  }

  function monthly(s, rng) {
    var p = s.person, a = S.age(s), fam = s.family, f = focusDef(p.focus) || focusDef('none');
    var sup = support(s);
    // сколько лет человек чем занимался — от этого зависят пути (спорт, сцена, IT, блог)
    if (a >= 3) { p.fy = p.fy || {}; p.fy[f.id] = (p.fy[f.id] || 0) + 1 / 12; }
    // эффекты фокуса (с 3 лет)
    if (a >= 3 && f.eff) {
      var apt = f.apt ? (0.5 + p.hidden[f.apt] / 100) : 1;
      var supM = f.support ? (0.45 + sup * 0.9) : 1;
      Object.keys(f.eff).forEach(function (k) {
        var v = f.eff[k];
        // навыки — показатель «относительно сверстников»: фокус сдвигает равновесие на 10–20 пунктов, а не до потолка
        if (k === 'skills') v *= SKILL_K;
        S.adj(s, k, v * (v > 0 ? apt * supM : 1));
      });
      if (f.traits) Object.keys(f.traits).forEach(function (t) { S.trait(s, t, f.traits[t] * 0.5); });
      if (f.familyRel) S.home(s).forEach(function (m) { if (m.role !== 'sibling') m.relation = U.clamp(m.relation + f.familyRel * 0.3, 0, 100); });
      if (f.looks) p.appearance = U.clamp((p.appearance || 50) + f.looks, 0, 92);
      if (f.id === 'family' && a >= 18 && p.spouse) p.spouse.relation = U.clamp(p.spouse.relation + 0.25, 0, 100);
      if (f.parentCare) S.parentsAlive(s).forEach(function (m) { m.health = U.clamp(m.health + 0.08, 0, 100); m.relation = U.clamp(m.relation + 0.3, 0, 100); });
      if (f.kidBoost) (p.kids || []).forEach(function (k) { if (k.alive && k.withMe) k.boost = (k.boost || 0) + 1 / 12; });
      milestones(s, f, a);
    }
    // дрейф показателей к уровню среды
    var schoolQ = p.education.school ? p.education.school.q : p.education.kg ? p.education.kg.q : 45;
    var envSkills = 42 + (p.hidden.iq - 100) * 0.45 + sup * 10 + (p.education.stage !== 'home' ? (schoolQ - 50) * 0.15 + 3 : 0)
      - (fam.deprivation || 0) * 2 - (fam.type === 'orphanage' ? 8 : 0) - (S.hasCond(s, 'zpr') ? 10 : 0) - (p.stats.health < 50 ? 4 : 0);
    p.stats.skills = U.clamp(p.stats.skills + (envSkills - p.stats.skills) * 0.02, 0, 100);
    var envSocial = 40 + (p.hidden.sociality - 50) * 0.3 + (p.traits.sociability || 0) * 0.1 + (p.education.stage !== 'home' ? 6 : 0)
      - (S.hasCond(s, 'hearing') ? 8 : 0) - (p.disability ? 6 : 0) + (p.appearance - 50) * 0.08;
    p.stats.social = U.clamp(p.stats.social + (envSocial - p.stats.social) * 0.03, 0, 100);
    var buffer = f.buffer ? f.buffer : 0;
    var envMental = 50 + fam.atmosphere * 0.3 * (1 - buffer * 0.3) + buffer * 8 + (p.hidden.resilience - 50) * 0.12
      - (fam.poverty ? 5 : 0) - (fam.deprivation || 0) * 3 - (S.manInHome(s) && S.manInHome(s).violent ? 8 : 0) - (p.stats.health < 50 ? 6 : 0)
      - (fam.type === 'orphanage' ? 10 : 0);
    p.stats.mental = U.clamp(p.stats.mental + (envMental - p.stats.mental) * 0.05, 0, 100);
    var envHappy = 0.35 * p.stats.mental + 0.2 * p.stats.health + 0.2 * p.stats.social + 0.15 * p.stats.money + 10;
    p.stats.happiness = U.clamp(p.stats.happiness + (envHappy - p.stats.happiness) * 0.08, 0, 100);

    kindergarten(s, rng, a);
    school(s, rng, a);
  }

  // годы в одном фокусе дают конкретный результат (флаг открывает пути: работа, армия, политика)
  function milestones(s, f, a) {
    var p = s.person;
    (f.milestones || []).forEach(function (m) {
      var key = 'ms_' + f.id + '_' + m.years;
      if (p.flags[key] || (p.fy[f.id] || 0) < m.years || (m.minAge && a < m.minAge) || (m.maxAge && a > m.maxAge)) return;
      p.flags[key] = 1; if (m.flag) s.flags[m.flag] = 1;
      S.log(s, RL.Events.text(s, m.text, {}), 'good');
      if (m.effects) RL.Events.applyEffects(s, m.effects, null);
    });
  }

  function kindergarten(s, rng, a) {
    var p = s.person, ed = p.education, fam = s.family, y = s.date.year;
    if (fam.type === 'orphanage') { if (ed.stage === 'home' && a >= 3 && a < 7) { ed.stage = 'kindergarten'; ed.kg = {q: 40, name: 'группа в детдоме'}; } return; }
    if (ed.stage !== 'home' || a < RL.DATA.kindergarten.enterAgeMin || a >= 6.9) return;
    var mom = S.mother(s);
    var needs = !(mom && mom.inHome && mom.alive && (mom.job.onLeave || !mom.job.employed)) || a >= 3;
    var grandmaFree = S.home(s).some(function (m) { return m.role.indexOf('grandmother') === 0 && !m.job.employed; });
    if (!needs) return;
    var st = S.st(s);
    var cov = st.kgCoverage * U.interpYear(RL.DATA.kindergarten.eraMul, Math.min(y, 2025));
    if (a < 3) cov *= U.interpYear(RL.DATA.kindergarten.nurseryMul, Math.min(y, 2025));
    if (p.migrant && p.migrant.status === 'undocumented') cov *= 0.4;
    if (S.region(s).tags.indexOf('caucasus') >= 0) cov *= 0.75;
    var pm = cov / 8 * (s.date.month === 8 ? 4 : 1) * (grandmaFree ? 0.35 : 1);
    if (rng.chance(U.clamp(pm, 0, 0.9))) {
      var q = U.clamp(S.region(s).school + st.school + rng.normal(0, 8), 15, 95);
      ed.stage = 'kindergarten'; ed.kg = {q: q, private: false};
      S.log(s, (a < 3 ? 'Тебя отдали в ясли' : 'Ты пошёл в детский сад').replace('пошёл', p.sex === 'f' ? 'пошла' : 'пошёл') + '.' + (q < 35 ? ' Группа на 30 детей, воспитательница одна.' : q > 70 ? ' Хороший сад, с бассейном и логопедом.' : ''), 'edu');
      if (fam.flags.kgWaitLogged) S.log(s, 'Очередь в садик наконец подошла.', 'edu');
    } else if (a >= 3 && fam.quintile >= 5 && y >= RL.DATA.kindergarten.privateFrom && rng.chance(0.15)) {
      ed.stage = 'kindergarten'; ed.kg = {q: U.clamp(70 + rng.normal(0, 8), 40, 98), private: true};
      S.log(s, 'Мест в государственном саду нет — родители отдали тебя в частный.', 'edu');
    } else if (a >= 2 && !fam.flags.kgWaitLogged && rng.chance(0.08)) {
      fam.flags.kgWaitLogged = 1;
      S.log(s, 'В садик очередь: ' + (cov < 0.5 ? 'сотни детей впереди.' : 'обещают места «к сентябрю».'), 'edu');
    }
  }

  function chooseSchool(s, rng) {
    var p = s.person, st = S.st(s), fam = s.family, r = S.region(s), D = RL.DATA.schools;
    var type = 'regular';
    if (fam.type === 'orphanage') type = 'boarding';
    else if ((S.hasCond(s, 'zpr') && rng.chance(0.55)) || S.hasCond(s, 'down') || (S.hasCond(s, 'cp') && rng.chance(0.4))) type = 'correctional';
    else if (p.settlement === 'village' && rng.chance(0.45)) type = 'village_small';
    else if (p.settlement !== 'village' && p.settlement !== 'small') {
      var parentsHigh = S.adultsHome(s).some(function (m) { return m.edu === 2; });
      var gymP = (p.stats.skills > 60 ? 0.35 : 0.08) * (parentsHigh ? 1.8 : 0.7) * (fam.quintile >= 4 ? 1.5 : 1) * (p.settlement === 'megapolis' ? 1.3 : 1);
      if (rng.chance(U.clamp(gymP, 0, 0.7))) type = 'gymnasium';
      else if (rng.chance(0.18)) type = 'advanced';
    }
    var q = U.clamp(r.school + st.school + D[type].q + rng.normal(0, 7), 5, 98);
    return {type: type, name: D[type].name, q: q};
  }

  function school(s, rng, a) {
    var p = s.person, ed = p.education, y = s.date.year, m = s.date.month;
    if (m === 8 && ed.stage !== 'school') {
      // в 1 класс идут в календарный год, когда исполняется 7 (на 1 сентября 6,6–7,6 года); часть — на год позже
      if (!p.flags.schoolAge) p.flags.schoolAge = rng.weighted([6.5, 6.6, 7.6], function (x) { return x === 6.6 ? 0.78 : x === 6.5 ? 0.1 : 0.12; });
      var ageSept = a;
      if (ageSept + 0.01 >= p.flags.schoolAge && ageSept < 9) {
        // с 2025 — тест по русскому языку для детей иностранцев
        if (p.migrant && p.migrant.status !== 'citizen' && y >= 2025 && !p.flags.migrantTest) {
          p.flags.migrantTest = 1;
          if (!rng.chance(U.clamp(p.stats.skills / 100 + 0.2, 0.2, 0.9))) { S.log(s, 'Ты не сдал тест по русскому языку для детей иностранцев — в школу не взяли, ждёшь следующего года.'.replace('сдал', p.sex === 'f' ? 'сдала' : 'сдал'), 'bad'); return; }
        }
        var sch = chooseSchool(s, rng);
        if (sch.type === 'gymnasium' && S.adultsHome(s).length) RL.Events.queue(s, 'gymnasium_interview', {});
        ed.stage = 'school'; ed.grade = 1; ed.school = sch; ed.kg = null;
        S.log(s, '1 сентября. Ты пошёл в первый класс: '.replace('пошёл', p.sex === 'f' ? 'пошла' : 'пошёл') + sch.name + '.', 'edu');
        RL.Events.queue(s, 'first_september', {school: sch.name});
      }
      return;
    }
    if (ed.stage !== 'school') return;
    if (m === 8 && ed.passed) { ed.grade++; ed.passed = false; S.log(s, 'Ты ' + (p.sex === 'f' ? 'перешла' : 'перешёл') + ' в ' + ed.grade + ' класс.', 'edu'); }
    var dist = RL.World.flag(s, y, 'distanceSchool', 0);
    if (dist && dist.indexOf && dist.indexOf(m) >= 0) {
      S.adj(s, 'skills', -0.6 * (1 - support(s) * 0.6)); S.adj(s, 'social', -0.8);
      if (!p.flags['distLog' + y]) { p.flags['distLog' + y] = 1; S.log(s, 'Школа ушла на «дистант»: уроки по WhatsApp и Zoom' + (S.home(s).length > 3 && s.family.housing.rooms < 3 ? ', один телефон на всех.' : '.'), 'edu'); }
    }
    if (m === 4) {
      // z-оценка успеваемости; пороги дают ≈10% отличников, 40% хорошистов, 45% троечников, 5% двоечников
      var hb = p.habits || {};
      var z = (p.stats.skills - 55) / 14 * 0.6 + (p.hidden.iq - 100) / 15 * 0.4 + (p.traits.diligence || 0) / 50 * 0.3 + (ed.school.q - 55) / 15 * 0.15
        + (p.stats.mental - 60) / 20 * 0.15 + (p.focus === 'study' ? 0.4 : 0) - (p.sickDays || 0) * 0.004
        - ((hb.drugs || 0) >= 2 ? 0.8 : 0) - ((hb.alcohol || 0) >= 2 ? 0.3 : 0) + rng.normal(0, 0.5);
      p.sickDays = 0;
      var g = z >= 1.25 ? 'отличник' : z >= 0.05 ? 'хорошист' : z >= -1.55 ? 'троечник' : 'двоечник';
      if (p.sex === 'f') g = {'отличник': 'отличница', 'хорошист': 'хорошистка', 'троечник': 'троечница', 'двоечник': 'двоечница'}[g];
      ed.performance = g;
      ed.history = ed.history || [];
      ed.history.push({grade: ed.grade, result: g, year: y});
      if (/двоечни/.test(g) && rng.chance(0.15)) {
        ed.passed = false;
        S.log(s, ed.grade + ' класс: ' + g + '. Оставили на второй год.', 'bad');
        S.adj(s, 'mental', -10); S.adj(s, 'social', -6);
      } else {
        ed.passed = true;
        S.log(s, 'Окончен ' + ed.grade + ' класс: ' + g + '.', /отлични/.test(g) ? 'good' : /двоечни|троечни/.test(g) ? 'info' : 'edu');
        if (/отлични/.test(g)) { S.adj(s, 'mental', 3); S.home(s).forEach(function (mm) { mm.relation = U.clamp(mm.relation + 2, 0, 100); }); }
      }
    }
  }

  return {monthly: monthly, availableFocuses: availableFocuses, focusDef: focusDef, focusName: focusName, focusDesc: focusDesc, support: support};
})();
