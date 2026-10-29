// Главный цикл: один шаг = один месяц. Порядок систем: новости → экономика → семья → здоровье → детство → события → смертность.
RL.CONFIG = {endAge: 120, version: 1}; // жизнь до смерти (таблица смертности даёт qx = 1 к 110 годам)
RL.Game = (function () {
  var U = RL.util, S = RL.S;
  var MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  var MONTHS_N = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

  function create(input, seed) {
    if (seed === undefined) seed = (Math.random() * 4294967295) >>> 0;
    RL.World.resetCache();
    var s = RL.Birth.generate(input, seed);
    s.date.day = new RL.RNG(s.seed ^ 99).int(1, 28); s.birth.day = s.date.day; s.dayMonth = s.date.year * 12 + s.date.month; s.bdayDone = true;
    birthStory(s);
    snapshot(s);
    return s;
  }

  function birthStory(s) {
    var p = s.person, fam = s.family, r = S.region(s), st = S.st(s), mom = S.mother(s), dad = S.father(s);
    var day = new RL.RNG(s.seed ^ 99).int(1, 28);
    var eth = RL.DATA.ethnic[p.ethnic] || RL.DATA.ethnic.other;
    var lines = [];
    lines.push('Ты [родился|родилась] ' + day + ' ' + MONTHS[s.birth.month] + ' ' + s.birth.year + ' года: ' + p.city + ', ' + r.name + ' (' + st.name + ').');
    lines.push('Ты — ' + p.firstName + ' ' + p.patronymic + ' ' + p.lastName + '. Национальность: ' + eth[p.sex] + (p.migrant ? ' (семья трудовых мигрантов, статус: ' +
      {citizen: 'уже граждане РФ', legal: 'патент / РВП', undocumented: 'без документов'}[p.migrant.status] + ')' : '') + '.');
    var famDesc = {married: 'Родители женаты.', cohab: 'Родители живут вместе без регистрации брака.', single_mother: 'Ты [рос|росла] без отца' + (dad.unknown ? ' — в свидетельстве о рождении прочерк.' : ': он живёт отдельно.'),
      single_father: 'Мама умерла при родах. Тебя растит отец.', grandparents: 'Тебя растят бабушка с дедушкой.', orphanage: 'Мать отказалась от тебя в роддоме.'}[fam.type] || '';
    if (fam.flags.motherDiedAtBirth && fam.type === 'grandparents') famDesc = 'Мама умерла при родах. Тебя забрала бабушка.';
    lines.push(famDesc);
    if (mom.alive && fam.type !== 'orphanage') lines.push('Мама — ' + mom.name + ', ' + mom.age + ' лет, ' + eduName(mom.edu) + ', ' + (mom.job.employed ? S.profName(mom) + (mom.job.onLeave ? ' (в декрете)' : '') : 'не работает') + '.');
    if (dad.inHome) lines.push('Папа — ' + dad.name + ', ' + dad.age + ' лет, ' + eduName(dad.edu) + ', ' + (dad.job.employed ? S.profName(dad) : 'без работы') + '.');
    var sibs = fam.members.filter(function (m) { return m.role === 'sibling'; });
    if (sibs.length) lines.push('Старшие: ' + sibs.map(function (m) { return (m.sex === 'm' ? 'брат ' : 'сестра ') + m.name + ' (' + m.age + ')'; }).join(', ') + '.');
    var gms = fam.members.filter(function (m) { return m.role.indexOf('grand') === 0 && m.inHome; });
    if (gms.length) lines.push('С вами живёт ' + gms.map(function (m) { return S.relName(m) + ' ' + m.name; }).join(' и ') + '.');
    lines.push('Жильё: ' + fam.housing.name + (fam.car ? '; есть машина' : '') + (fam.dacha ? '; есть дача' : '') + '.');
    p.conditions.forEach(function (c) { lines.push(RL.DATA.conditions[c.id].text); });
    lines.forEach(function (l) { S.log(s, RL.Events.text(s, l, {}), 'birth'); });
  }
  function eduName(e) { return ['без высшего и проф. образования', 'со средним профессиональным', 'с высшим образованием'][e]; }

  function snapshot(s) {
    var b = s.family.lastBudget || {};
    s.history.push({age: Math.floor(S.age(s)), year: s.date.year, stats: U.deepCopy(s.person.stats), quintile: s.family.quintile || null,
      income: b.income || 0, familyType: s.family.type, city: RL.Young.loc(s).city, atmosphere: Math.round(s.family.atmosphere),
      stage: s.person.education.stage, prof: s.person.job && s.person.job.employed ? s.person.job.prof : null, level: s.person.job ? s.person.job.level || 0 : 0,
      partner: s.person.spouse ? s.person.spouse.status : null, kids: (s.person.kids || []).filter(function (k) { return k.alive; }).length,
      wealth: S.age(s) >= 18 && RL.Adult ? Math.round(RL.Adult.wealth(s)) : 0, pension: !!s.person.pension});
  }

  function step(s) {
    if (s.over || s.pending) return;
    var rng = new RL.RNG(1); rng.s = s.rng;
    var death = systems(s, rng, {});
    s.rng = rng.s;
    if (death) { die(s, death); return; }
    if (RL.Achievements) RL.Achievements.check(s);
    advance(s, rng);
    s.rng = rng.s;
  }
  // все системы месяца; daily — режим по дням: случайные события и досуг автопилота вызываются отдельно (stepDay)
  function systems(s, rng, o) {
    var y = s.date.year, m = s.date.month;
    RL.World.yearData(s, y).news.forEach(function (n) { if (n.month === m) S.log(s, n.text, 'news'); });
    RL.Economy.monthly(s, rng);
    RL.Family.monthly(s, rng);
    var death = RL.Health.monthly(s, rng);
    RL.Childhood.monthly(s, rng);
    RL.Teen.monthly(s, rng);
    RL.Young.monthly(s, rng);
    RL.Adult.monthly(s, rng);
    if (RL.Assets) RL.Assets.monthly(s, rng);
    if (RL.Careers) RL.Careers.monthly(s, rng);
    if (RL.Politics) RL.Politics.monthly(s, rng);
    if (RL.Leisure && !o.daily) RL.Leisure.monthly(s, rng);
    RL.OwnFamily.monthly(s, rng);
    RL.Old.monthly(s, rng);
    RL.Law.monthly(s, rng);
    RL.Events.monthly(s, rng, o.daily ? {queueOnly: true} : null);
    if (!death && s.deathNow) death = s.deathNow;
    if (!death) {
      var a = S.age(s);
      var q = RL.Mortality.qx(s, y, s.person.sex, a);
      if (a >= 1 && a < 15) q *= 1 - RL.DATA.demography.childExternalByEvents;
      var pm = U.monthly(Math.min(0.95, q * (s.person.mortMult || 1)));
      if (a >= 105) pm = Math.max(pm, U.monthly(Math.min(0.95, 0.5 + (a - 105) * 0.1))); // после 105 выживают единицы: не даём дожить до 120
      if (rng.chance(pm)) {
        // причина — одна из тяжёлых болезней, с весом по её множителю риска
        var heavy = s.person.conditions.filter(function (c) { var d = RL.DATA.conditions[c.id]; return !c.cured && (d.mortCancer || d.mort || d.mortSevere || 1) > 2; });
        var cond = heavy.length ? rng.weighted(heavy, function (c) { var d = RL.DATA.conditions[c.id]; var k = d.mortCancer ? 7 : d.mort || d.mortSevere || 2; return k * k; }) : null;
        var hb = s.person.habits || {};
        if (hb.drugs >= 2 && rng.chance(0.6)) death = 'Передозировка наркотиков';
        else if (hb.alcohol >= 3 && rng.chance(0.4)) death = 'Отравление алкоголем';
        else death = cond && rng.chance(0.7) ? RL.Health.condName(cond) : RL.Mortality.sampleCause(rng, a, s.person.sex);
      }
    }
    return death;
  }

  function advance(s, rng, daily) {
    s.date.day = 1;
    s.date.month++;
    if (s.date.month > 11) { s.date.month = 0; s.date.year++; }
    if (s.date.month === s.birth.month && !daily) birthday(s);
  }
  function birthday(s) {
    {
      var a = Math.round(S.age(s));
      snapshot(s);
      // кто ещё доучивается в школе — доживает до выпускного (не дольше 19,5 лет)
      if (a >= RL.CONFIG.endAge) { finish(s, 'mvp'); return; }
      S.log(s, 'Тебе ' + a + ' ' + years(a) + '.', 'birthday');
      // до 18 фокус выбирают каждый год, взрослые — раз в два года (или когда прежний фокус стал невозможен)
      if (a >= 3 && a < RL.CONFIG.endAge && (a < 18 || a - (s.person.focusAge || 0) >= 2 || !focusStillOk(s))) offerFocus(s);
    }
  }
  function years(a) { var n = a % 100; if (n > 10 && n < 20) return 'лет'; n %= 10; return n === 1 ? 'год' : n >= 2 && n <= 4 ? 'года' : 'лет'; }

  function focusStillOk(s) {
    var cur = s.person.focus;
    return RL.Childhood.availableFocuses(s).some(function (o) { return o.id === cur && o.ok; });
  }
  function offerFocus(s) {
    var opts = RL.Childhood.availableFocuses(s);
    var p = {kind: 'focus', title: 'Фокус на год', text: 'Тебе ' + Math.round(S.age(s)) + '. Чем будет занят этот год?', options: opts};
    if (s.pending) s.queueFocus = p; else s.pending = p;
  }

  function chooseFocus(s, id) {
    var f = RL.Childhood.focusDef(id);
    s.person.focus = id; s.person.focusAge = Math.round(S.age(s));
    s.person.focusHistory = s.person.focusHistory || [];
    s.person.focusHistory.push({age: Math.round(S.age(s)), focus: id});
    S.log(s, 'Фокус года: ' + RL.Childhood.focusName(s, f) + '.', 'choice');
    s.pending = null;
    if (s.queueFocus) { s.pending = s.queueFocus; s.queueFocus = null; }
  }

  function resolveEvent(s, idx) {
    var rng = new RL.RNG(1); rng.s = s.rng;
    if (s.pending && s.pending.kind === 'custom' && s.pending.handler === 'law') RL.Law.resolve(s, idx, rng);
    else if (s.pending && s.pending.kind === 'custom' && s.pending.handler === 'career') RL.Careers.resolve(s, idx, rng);
    else if (s.pending && s.pending.kind === 'custom' && s.pending.handler === 'leisure') RL.Leisure.resolve(s, idx, rng);
    else if (s.pending && s.pending.kind === 'custom' && s.pending.handler === 'politics') RL.Politics.resolve(s, idx, rng);
    else if (s.pending && s.pending.kind === 'custom' && s.pending.handler === 'family') RL.OwnFamily.resolve(s, idx, rng);
    else if (s.pending && s.pending.kind === 'custom') RL.Young.resolve(s, idx, rng);
    else RL.Events.resolve(s, idx, rng);
    s.rng = rng.s;
    if (s.deathNow) { die(s, s.deathNow); return; }
    if (!s.pending && s.queueFocus) { s.pending = s.queueFocus; s.queueFocus = null; }
  }

  function autoFocus(s, rng) {
    var opts = s.pending.options.filter(function (o) { return o.ok; });
    if (!opts.length) return 'none';
    var p = s.person, a = S.age(s), fam = s.family;
    var w = {};
    opts.forEach(function (o) {
      var v = 1;
      if (o.id === 'none') v = 0.2;
      if (o.id === 'screen') v = 0.4;
      if (o.id === 'health') v = p.conditions.some(function (c) { return !c.cured; }) || p.stats.health < 60 ? 3 : 0.2;
      if (o.id === 'study') v = 3 + (p.traits.diligence || 0) / 30;
      if (o.id === 'schoolprep') v = 3;
      if (o.id === 'reading') v = 1 + (p.hidden.iq - 100) / 20 + (p.traits.curiosity || 0) / 40;
      if (o.id === 'sport') v = 1 + (p.hidden.physique - 50) / 25;
      if (o.id === 'arts') v = 0.6 + (p.hidden.creativity - 50) / 25;
      if (o.id === 'yard') v = 1 + (p.hidden.sociality - 50) / 30 + (p.stats.social < 40 ? 1 : 0);
      if (o.id === 'family') v = fam.atmosphere < 45 ? 2.5 : 0.5;
      if (o.id === 'help') v = fam.poverty ? 1.5 : 0.6;
      var gr = p.education.grade || 0, exam = p.education.stage === 'school' && (gr === 9 || gr === 11);
      if (o.id === 'study' && exam) v += 2;
      if (o.id === 'tutors') v = exam ? 3.5 : gr >= 8 ? 1 : 0.3;
      if (o.id === 'selfedu') v = 0.5 + (p.hidden.iq - 100) / 20 + (p.traits.curiosity || 0) / 40;
      if (o.id === 'friends') v = 1.2 + (p.stats.social < 45 ? 0.8 : 0) + (p.traits.sociability || 0) / 50;
      if (o.id === 'parttime') v = fam.poverty ? 2 : 0.5;
      if (o.id === 'love') v = 0.6;
      if (o.id === 'career') v = 2 + (p.traits.diligence || 0) / 50;
      if (o.id === 'business') v = 3;
      if (o.id === 'invest') v = 0.4 + (p.traits.selfControl || 0) / 60;
      if (o.id === 'jobhunt') v = p.education.stage === 'work' || p.education.stage === 'gap' ? 4 : 0.2;
      if (o.id === 'jobhunt' && p.pension) v = p.stats.money < 30 ? 1 : 0.1;
      if (o.id === 'yard' && a >= 11) v *= 0.5;
      var fd = RL.Childhood.focusDef(o.id) || {};
      if (['none', 'screen', 'health', 'study', 'schoolprep', 'reading', 'sport', 'arts', 'yard', 'family', 'help', 'tutors', 'selfedu', 'friends', 'parttime', 'love', 'career', 'business', 'invest', 'jobhunt'].indexOf(o.id) < 0) {
        v = fd.careerFocus ? 0.9 : fd.ext ? 0.3 : 0.6;
        if (o.id === 'olympiad') v = 0.4 + Math.max(0, p.hidden.iq - 105) / 15;
        if (o.id === 'kids') v = 1.2; if (o.id === 'caregiving') v = S.parentsAlive(s).some(function (m) { return m.age >= 75; }) ? 1.5 : 0.2;
        if (o.id === 'dacha') v = a >= 55 ? 1.8 : 0.8; if (o.id === 'travel') v = p.stats.money > 70 ? 0.8 : 0.1;
        if (o.id === 'sidejob') v = p.stats.money < 40 ? 1.2 : 0.2; if (o.id === 'publicwork') v = 0.15 + (p.traits.courage || 0) / 200;
        if (o.id === 'blog') v = 0.3 + Math.max(0, p.stats.social - 55) / 40; if (o.id === 'party') v = 0.5; if (o.id === 'faith') v = p.religionTradition === 'muslim' ? 0.8 : 0.25;
      }
      if (fd.sexW) v *= fd.sexW[p.sex] || 1;
      w[o.id] = Math.max(0.05, v);
      // теневой заработок автопилот берёт редко и почти только от бедности
      if (fd.adultWork) w[o.id] = fd.adultWork === 'escort' ? (p.stats.money < 25 ? 0.03 : 0.004) : 0.02;
    });
    return rng.weightedKey(w);
  }

  // Мелкое ли решение (можно отдать автопилоту при настройке «мелочи — сами»): фокус и свои развилки — всегда важные.
  function isMinor(s) {
    var pd = s.pending;
    if (!pd || pd.kind !== 'event') return false;
    var e = RL.Events.def(pd.id);
    return !!e && !e.major;
  }
  // Автопилот: принимает решение за игрока, если есть ожидающий выбор.
  function autoResolve(s) {
    if (!s.pending) return false;
    var rng = new RL.RNG(1); rng.s = s.rng;
    if (s.pending.kind === 'focus') { var id = autoFocus(s, rng); s.rng = rng.s; chooseFocus(s, id); }
    else {
      // для развилок (после 9 класса, профиль) — своя логика, похожая на реальные решения семей
      var idx = s.pending.kind === 'custom' ? (s.pending.handler === 'family' ? RL.OwnFamily.autoChoose(s, rng) : s.pending.handler === 'law' ? RL.Law.autoChoose(s, rng) : s.pending.handler === 'career' ? RL.Careers.autoChoose(s, rng) : s.pending.handler === 'leisure' ? RL.Leisure.autoChoose(s, rng) : s.pending.handler === 'politics' ? RL.Politics.autoChoose(s, rng) : RL.Young.autoChoose(s, rng)) : RL.Teen.autoChoice(s, rng);
      if (idx === null) idx = RL.Events.autoChoose(s, rng);
      s.rng = rng.s; resolveEvent(s, idx);
    }
    return true;
  }

  function die(s, cause) {
    s.person.alive = false;
    s.person.deathCause = cause;
    s.person.deathAge = S.age(s);
    s.pending = null;
    S.log(s, 'Ты [умер|умерла] в ' + MONTHS_N[s.date.month].replace(/ь$/, 'е').replace(/й$/, 'е').replace(/т$/, 'те') + ' ' + s.date.year + ' года. Причина: ' + cause + '.', 'death');
    s.log[s.log.length - 1].text = RL.Events.text(s, s.log[s.log.length - 1].text, {});
    if (RL.Achievements) RL.Achievements.check(s);
    finish(s, 'death');
  }
  function finish(s, why) {
    s.over = true; s.endReason = why;
    if (why === 'mvp') S.log(s, 'Тебе 35. Дальше — следующие этапы разработки: своя семья, здоровье взрослого, старость.', 'end');
  }

  function dateStr(s) { return MONTHS_N[s.date.month] + ' ' + s.date.year; }
  // Один день (интерфейс идёт по дням): праздники и неделя — каждый день, вся симуляция — в последний день месяца.
  var WD = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
  function daysIn(y, m) { return new Date(y, m + 1, 0).getDate(); }
  // Один день. 1-го числа — расчёты месяца (зарплата, болезни, школа 1 сентября), в случайный день — случайное событие,
  // в свой день — день рождения, в конце месяца — досуг автопилота. Если появилось решение — день не двигается, пока его не примут.
  function stepDay(s) {
    if (s.over || s.pending) return;
    var d = s.date, mk = d.year * 12 + d.month, rng = new RL.RNG(1); rng.s = s.rng;
    if (!d.day) d.day = 1;
    var bd = s.birth.day || 1;
    if (s.dayMonth !== mk) {
      s.dayMonth = mk; s.evDay = rng.int(1, daysIn(d.year, d.month)); s.evDone = false; s.bdayDone = d.month !== s.birth.month;
      if (d.day === 1 && RL.Leisure) RL.Leisure.dayTick(s, rng);
      var death = systems(s, rng, {daily: true});
      s.rng = rng.s;
      if (death) { die(s, death); return; }
      if (RL.Achievements) RL.Achievements.check(s);
      if (s.pending) return;
    }
    if (!s.bdayDone && d.day >= bd) { s.bdayDone = true; birthday(s); s.rng = rng.s; if (s.over || s.pending) return; }
    if (!s.evDone && d.day >= s.evDay) {
      s.evDone = true; RL.Events.monthly(s, rng, {randomOnly: true}); s.rng = rng.s;
      if (s.deathNow) { die(s, s.deathNow); return; }
      if (s.pending) return;
    }
    if (d.day >= daysIn(d.year, d.month)) {
      if (RL.Leisure) RL.Leisure.monthly(s, rng);
      advance(s, rng, true);
    } else {
      d.day++;
      if (RL.Leisure) RL.Leisure.dayTick(s, rng);
    }
    s.rng = rng.s;
  }
  function dayStr(s) {
    var d = s.date.day || 1, wd = new Date(s.date.year, s.date.month, d).getDay();
    return d + ' ' + MONTHS[s.date.month] + ' ' + s.date.year + ', ' + WD[wd];
  }

  return {create: create, step: step, chooseFocus: chooseFocus, resolveEvent: resolveEvent, autoResolve: autoResolve,
    dateStr: dateStr, years: years, MONTHS_N: MONTHS_N, eduName: eduName, isMinor: isMinor,
    stepDay: stepDay, dayStr: dayStr, daysIn: daysIn,
    requestFocus: function (s) { if (s.pending || s.over) return false; offerFocus(s); s.pending.text = 'Можно сменить занятие, не дожидаясь дня рождения. Чем заняться?'; return true; }};
})();
