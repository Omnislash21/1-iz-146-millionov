// Итоговый отчёт о жизни (или о прожитом этапе).
RL.Report = (function () {
  var S = RL.S, U = RL.util;
  var FAM = {married: 'полная семья (брак)', cohab: 'полная семья (без регистрации)', single_mother: 'мать-одиночка', single_father: 'отец-одиночка',
    grandparents: 'опека бабушки/дедушки', orphanage: 'детский дом', stepfamily: 'мама и отчим', adoptive: 'приёмные родители (усыновление)', foster: 'приёмная семья (опека)',
    sibling_care: 'опека старшего брата/сестры', alone: 'живёшь сам(а)'};
  var STATS = {health: 'Здоровье', money: 'Деньги', skills: 'Развитие/навыки', social: 'Связи и друзья', mental: 'Психика', happiness: 'Удовлетворённость'};

  function build(s) {
    var p = s.person, r = S.region(s);
    var age = p.alive ? S.age(s) : p.deathAge;
    var le0 = RL.Mortality.lifeExpAt(s, s.birth.year, p.sex);
    var out = {
      title: p.firstName + ' ' + p.patronymic + ' ' + p.lastName,
      born: s.birth.year, ended: s.date.year, age: U.round(age, 1), dead: !p.alive, cause: p.deathCause || null,
      place: RL.Young.loc(s).city + ', ' + RL.Young.loc(s).region.name, birthPlace: s.log[0] ? s.log[0].text : '',
      lifeExpBirth: U.round(le0, 1),
      remainingLE: p.alive ? U.round(RL.Mortality.remainingLE(s, s.date.year, p.sex, age), 1) : 0,
      familyPath: [], stats: U.deepCopy(p.stats), history: s.history,
      traits: [], hidden: U.deepCopy(p.hidden), appearance: p.appearance,
      conditions: p.conditions.map(function (c) { return RL.Health.condName(c) + (c.cured ? ' (снят)' : ''); }),
      disability: p.disability ? p.disability.reason : null,
      education: p.education.history || [], school: p.education.school ? p.education.school.name : null,
      focusHistory: (p.focusHistory || []).map(function (f) { var d = RL.Childhood.focusDef(f.focus); return f.age + ' ' + RL.Game.years(f.age) + ': ' + (d ? d.name : f.focus); }),
      keyEvents: s.log.filter(function (l) { return ['death', 'bad', 'good', 'family', 'health', 'edu', 'money', 'end'].indexOf(l.type) >= 0; })
        .map(function (l) { return l.age + ' (' + l.y + '): ' + l.text; }),
      quintileFinal: s.family.quintile
    };
    var lastType = null;
    s.history.forEach(function (h) { if (h.familyType !== lastType) { out.familyPath.push(h.age + ' ' + RL.Game.years(h.age) + ' — ' + (FAM[h.familyType] || h.familyType)); lastType = h.familyType; } });
    if (s.family.type !== lastType) out.familyPath.push(Math.floor(age) + ' ' + RL.Game.years(Math.floor(age)) + ' — ' + (FAM[s.family.type] || s.family.type));
    Object.keys(p.traits).map(function (k) { return [k, p.traits[k]]; }).sort(function (a, b) { return Math.abs(b[1]) - Math.abs(a[1]); })
      .slice(0, 5).forEach(function (t) { if (Math.abs(t[1]) >= 8) out.traits.push(traitLabel(t[0], t[1], p.sex) + ' (' + Math.round(t[1]) + ')'); });
    return out;
  }

  // подпись черты в нужном роде: «смелый» / «смелая»
  function traitLabel(k, v, sex) {
    var w = RL.DATA.traits[k][v > 0 ? 1 : 0];
    if (sex !== 'f') return w;
    return w === 'бунтарь' ? 'бунтарка' : w.replace(/(ый|ий|ой)$/, 'ая');
  }

  var STAGES = {home: 'дома', kindergarten: 'детский сад', school: 'школа', college: 'колледж', work: 'работа', colony: 'воспитательная колония', graduate: 'школа окончена',
    vuz: 'вуз', army: 'армия', gap: 'год подготовки к поступлению'};
  // Строки про экзамены и итоги юности (используются и в панели, и в отчёте)
  function examLines(s) {
    var ed = s.person.education, out = [], SUB = RL.DATA.teen.exams.subjects;
    if (ed.oge) out.push((ed.oge.modern ? 'ОГЭ' : 'Экзамены за 9 класс') + ' (' + ed.oge.year + '): русский ' + ed.oge.russian + ', математика ' + ed.oge.math +
      (ed.noAttestat9 ? ' — справка вместо аттестата' : ed.attestat9 ? ', аттестат ' + ed.attestat9.toFixed(1) : ''));
    if (ed.profile) out.push('Профиль: ' + RL.DATA.teen.exams.profiles[ed.profile].name);
    if (ed.ege) {
      var sc = ed.ege.scores;
      out.push(ed.ege.kind + ' (' + ed.ege.year + '): ' + Object.keys(sc).map(function (k) { return SUB[k].name + ' ' + sc[k]; }).join(', ') +
        (ed.ege.attestatAvg ? '; аттестат ' + ed.ege.attestatAvg : '') + (ed.ege.failed ? ' — без аттестата' : ''));
    }
    if (ed.medal) out.push('Медаль: ' + ed.medal);
    return out;
  }
  function habitLines(s) {
    var h = s.person.habits || {}, out = [];
    Object.keys(h).forEach(function (k) { if (h[k] >= 1) out.push(RL.DATA.teen.habits[k].name + ': ' + RL.Events.text(s, RL.DATA.teen.habits[k].levels[h[k]], {})); });
    return out;
  }
  function lifeLines(s) {
    var p = s.person, out = [], ed = p.education;
    var adultLines = function () {
      var o = p.own || {}, L = [];
      if (p.job && p.job.employed && p.job.level) L.push('Должность: ' + RL.DATA.adult.levels[p.job.level].name);
      if (p.biz) L.push('Своё дело: ' + p.biz.name + ', ' + p.biz.months + ' мес., прибыль ' + RL.World.money(s, p.biz.profit || 0) + '/мес');
      (p.bizHistory || []).forEach(function (b) { L.push('Закрытый бизнес: ' + b.name + ' (' + b.year + ')'); });
      if (o.living === 'own_flat' && o.flat) L.push('Своя квартира (' + o.flat.area + ' м², ' + o.flat.year + (o.flat.inherited ? ', наследство' : ', ипотека') + ')');
      if (p.spouse) L.push((p.spouse.status === 'married' ? 'В браке с ' : p.spouse.status === 'cohab' ? 'Живёшь с ' : 'Встречаешься с ') + p.spouse.name);
      (p.exes || []).forEach(function (e) { L.push((e.widowed ? 'Овдовел(а): ' : e.status === 'married' ? 'Развод: ' : 'Расставание: ') + e.name + ' (' + e.year + ')'); });
      var kk = (p.kids || []); if (kk.length) L.push('Дети: ' + kk.map(function (k) { return k.name + (k.alive ? ' (' + Math.floor(k.age) + ')' : ' (умер' + (k.sex === 'f' ? 'ла' : '') + ')') + (!k.alive || k.withMe ? '' : k.age >= 18 || k.grown ? ' — живёт отдельно' : k.withEx ? ' — живёт с ' + (k.withEx.sex === 'f' ? 'мамой' : 'папой') : ''); }).join(', '));
      if (p.alimony && p.alimony.payer === 'me') L.push('Платишь алименты');
      if (p.grandkids) L.push('Внуков: ' + p.grandkids);
      if (p.work && p.work.months > 12) L.push('Трудовой стаж: ' + Math.round(p.work.months / 12) + ' ' + RL.Game.years(Math.round(p.work.months / 12)));
      if (p.pension) L.push('Пенсия: ' + RL.World.money(s, p.pension.amount) + '/мес (с ' + p.pension.since + ')');
      if (S.age(s) >= 18 && RL.Adult) { var pf = RL.Adult.portfolio(s); L.push('Накопления: ' + RL.World.money(s, RL.Adult.wealth(s)) + (function () { var parts = [['вклады', pf.deposit], ['акции', pf.stocks], ['доллары', pf.usd]].filter(function (x) { return x[1] > 100; }).map(function (x) { return x[0] + ' ' + RL.World.money(s, x[1]); }); return parts.length ? ' (' + parts.join(', ') + ')' : ''; })()); }
      return L;
    };
    out.push('Сейчас: ' + STAGES[ed.stage] + (ed.school && (ed.stage === 'college' || ed.stage === 'colony' || ed.stage === 'vuz') ? ' — ' + ed.school.name : ''));
    (p.diplomas || []).forEach(function (d) { out.push('Диплом: ' + d.level + ' — ' + d.inst + ' (' + d.year + ')' + (d.red ? ', красный' : '')); });
    (ed.vuzHistory || []).filter(function (h) { return h.result === 'отчислен'; }).forEach(function (h) { out.push('Отчислен: ' + h.name + ' (' + h.year + ')'); });
    if (p.flags.served) out.push(p.flags.officerReserve ? 'Офицер запаса' : p.flags.veteran ? 'Ветеран боевых действий' : 'Отслужил в армии');
    else if (p.flags.boughtTicket) out.push('«Белый билет» (куплен)');
    else if (p.flags.evader) out.push('Уклонялся от призыва');
    if (p.army) out.push('Сейчас в армии: ' + {conscript: 'срочная служба', mobilized: 'мобилизован', contract: 'контракт', ags: 'АГС'}[p.army.kind] + ', ' + p.army.months + '/' + p.army.term + ' мес.');
    if (p.job && p.job.employed) out.push('Работа: ' + RL.S.profName({job: p.job, sex: p.sex}) + ', ' + RL.World.money(s, RL.Young.netWage(s)) + '/мес');
    else if (RL.Young && S.age(s) >= 17 && ed.stage === 'work') out.push('Без работы');
    if (p.own && p.own.living !== 'parents') out.push('Живёт: ' + {dorm: 'в общежитии', rent_room: 'снимает комнату', rent_flat: 'снимает квартиру', army: 'в части', own_flat: 'в своей квартире', nursing_home: 'в пансионате', prison: 'в колонии'}[p.own.living] + (p.loc ? ', ' + p.loc.city : ''));
    else if (S.age(s) >= 18) out.push('Живёт с родителями');
    var debt = p.own ? p.own.debts.reduce(function (t, d) { return t + d.balance; }, 0) : 0;
    if (debt > 1000) out.push('Личные долги: ' + RL.World.money(s, debt));
    if (p.flags.militaryCat) out.push('Категория годности: ' + p.flags.militaryCat);
    if (p.flags.criminalRecord) out.push('Судимость');
    else if (s.flags.pdnRecord) out.push('Учёт в ПДН');
    if (s.flags.regionalOlympiad) out.push('Призёр региональной олимпиады');
    if (s.flags.sportKMS) out.push('КМС по спорту');
    adultLines().forEach(function (x) { out.push(x); });
    return out;
  }

  // доля родившихся в том же году того же пола, умерших раньше (таблицы смертности по календарным годам — «когорта»)
  function outlived(s, age) {
    var l = 1, by = s.birth.year, sex = s.person.sex;
    for (var a = 0; a < Math.floor(age); a++) l *= 1 - RL.Mortality.qx(s, by + a, sex, a);
    return 1 - l;
  }
  // жизнь по десятилетиям — из снимков на дни рождения
  function decades(s) {
    var out = [], L = RL.DATA.adult ? RL.DATA.adult.levels : [];
    s.history.forEach(function (h) {
      if (h.age % 10 !== 0 || h.age === 0) return;
      var bits = [h.age + ' лет (' + h.year + '): ' + h.city];
      if (h.stage && STAGES[h.stage]) bits.push(STAGES[h.stage]);
      if (h.prof) { var pr = RL.DATA.economy.professions.filter(function (x) { return x.id === h.prof; })[0]; if (pr) bits.push(pr[s.person.sex] + (h.level ? ' (' + L[h.level].name + ')' : '')); }
      if (h.pension) bits.push('на пенсии');
      if (h.partner) bits.push({dating: 'в отношениях', cohab: 'живёт с партнёром', married: 'в браке'}[h.partner]);
      if (h.kids) bits.push('детей: ' + h.kids);
      if (h.wealth > 1000) bits.push('накопления ' + RL.World.money(s, h.wealth, h.year, 6));
      bits.push('здоровье ' + Math.round(h.stats.health) + ', удовлетворённость ' + Math.round(h.stats.happiness));
      out.push(bits.join(' · '));
    });
    return out;
  }
  function summary(s) {
    var p = s.person, out = [];
    var maxLevel = Math.max.apply(null, s.history.map(function (h) { return h.level || 0; }).concat([p.job ? p.job.level || 0 : 0]));
    var maxW = Math.max.apply(null, s.history.map(function (h) { return h.wealth || 0; }));
    if ((p.diplomas || []).length) out.push('Образование: ' + p.diplomas.map(function (d) { return d.level; }).join(', '));
    if (maxLevel) out.push('Высшая должность: ' + RL.DATA.adult.levels[maxLevel].name);
    if (p.work) out.push('Трудовой стаж: ' + Math.round(p.work.months / 12) + ' ' + RL.Game.years(Math.round(p.work.months / 12)));
    if (maxW > 1000) out.push('Максимум накоплений: ' + RL.World.money(s, maxW, s.date.year, 6) + ' (в деньгах ' + s.date.year + ' г.)');
    var marriages = p.flags.married || 0, div = p.flags.divorced || 0;
    out.push('Браков: ' + marriages + ', разводов: ' + div);
    var kids = (p.kids || []);
    out.push('Детей: ' + kids.length + (kids.some(function (k) { return !k.alive; }) ? ' (пережил' + (p.sex === 'f' ? 'а' : '') + ' смерть ребёнка)' : '') + ', внуков: ' + (p.grandkids || 0));
    if (p.pension) out.push('Пенсия: ' + RL.World.money(s, p.pension.amount) + '/мес с ' + p.pension.since + ' г.');
    return out;
  }

  // достижения — маленькие отметки о прожитой жизни
  function badges(s) {
    if (RL.Achievements) return RL.Achievements.list(s).map(function (a) { return {icon: a.icon, text: a.name, dark: a.dark}; });
    var p = s.person, b = [], age = p.alive ? S.age(s) : p.deathAge, ed = p.education || {};
    var f = p.sex === 'f', hist = s.history || [];
    var maxLevel = Math.max.apply(null, hist.map(function (h) { return h.level || 0; }).concat([p.job ? p.job.level || 0 : 0]));
    var maxW = Math.max.apply(null, hist.map(function (h) { return h.wealth || 0; }).concat([0]));
    var cities = {}; hist.forEach(function (h) { cities[h.city] = 1; });
    var ev = p.habitsEver || {};
    function add(icon, text, dark) { b.push({icon: icon, text: text, dark: !!dark}); }
    if (age >= 90) add('🕯', f ? 'Долгожительница' : 'Долгожитель');
    else if (age >= 80) add('🌳', 'Дожил'.replace('Дожил', f ? 'Дожила' : 'Дожил') + ' до 80');
    if (s.birth.year <= 1991 && (p.alive || p.deathAge > 1992 - s.birth.year)) add('☭', f ? 'Родилась в СССР' : 'Родился в СССР');
    if (ed.medal) add('🥇', (ed.medal === 'золотая' ? 'Золотая' : 'Серебряная') + ' медаль');
    if ((p.diplomas || []).some(function (d) { return d.red; })) add('🎓', 'Красный диплом');
    if (s.flags.regionalOlympiad) add('🧮', f ? 'Олимпиадница' : 'Олимпиадник');
    if (s.flags.sportKMS) add('🏅', 'КМС');
    if (p.flags.served && !p.flags.officerReserve) add('🎖', 'Дембель');
    if (p.flags.officerReserve) add('⭐', 'Офицер запаса');
    if (maxLevel >= 4) add('💼', 'Руководитель направления');
    if (p.biz || (p.bizHistory || []).length) add('🏪', f ? 'Предпринимательница' : 'Предприниматель');
    if (maxW >= 10000000) add('💰', 'Мультимиллионер (в ценах 2024)'); else if (maxW >= 1000000) add('💵', f ? 'Миллионерша (в ценах 2024)' : 'Миллионер (в ценах 2024)');
    if (p.own && p.own.living === 'own_flat') add('🏠', 'Своя квартира');
    if ((p.kids || []).length >= 3) add('👨‍👩‍👧‍👦', 'Многодетная семья');
    if ((p.grandkids || 0) >= 1) add('🧸', (f ? 'Бабушка' : 'Дедушка') + ' (' + p.grandkids + ')');
    if ((p.flags.married || 0) >= 3) add('💍', 'Три брака');
    if (Object.keys(cities).length >= 4) add('🧳', 'Сменил'.replace('Сменил', f ? 'Сменила' : 'Сменил') + ' ' + Object.keys(cities).length + ' городов');
    if (!ev.smoking && !ev.alcohol && !ev.drugs && age >= 30) add('🥗', 'Ни сигарет, ни алкоголя');
    if (p.conditions.some(function (c) { return (c.id === 'cancer_adult' || c.id === 'cancer') && c.cured; })) add('🎗', 'Победил'.replace('Победил', f ? 'Победила' : 'Победил') + ' рак');
    if (s.flags.wasInOrphanage) add('🏚', 'Детдом за плечами', true);
    if (p.flags.criminalRecord) add('⛓', 'Судимость', true);
    if (p.flags.veteran) add('🪖', f ? 'Ветеран боевых действий' : 'Ветеран боевых действий', true);
    return b;
  }
  // эпитафия из двух самых ярких черт характера
  function epitaph(s) {
    var p = s.person, f = p.sex === 'f';
    var top = Object.keys(p.traits).map(function (k) { return [k, p.traits[k]]; }).filter(function (t) { return Math.abs(t[1]) >= 12; })
      .sort(function (a, b) { return Math.abs(b[1]) - Math.abs(a[1]); }).slice(0, 2);
    if (!top.length) return '';
    var words = top.map(function (t) {
      var w = traitLabel(t[0], t[1], p.sex);
      if (w === 'бунтарь') return 'бунтарём'; if (w === 'бунтарка') return 'бунтаркой';
      return f ? w.replace(/ая$/, 'ой') : w.replace(/ый$/, 'ым').replace(/ий$/, 'им').replace(/ой$/, 'ым');
    });
    return (f ? 'Была ' : 'Был ') + words.join(' и ') + (f ? '.' : ' человеком.');
  }

  // Социологический разбор: где ты оказался относительно своей когорты, региона и класса — жёстко и по цифрам
  function quint(r) { return r < 0.55 ? 1 : r < 0.85 ? 2 : r < 1.2 ? 3 : r < 1.8 ? 4 : 5; }
  function sociology(s) {
    var p = s.person, out = [], f = p.sex === 'f', bio = p.bio || {}, age = p.alive ? S.age(s) : p.deathAge;
    var g = function (m, w) { return f ? w : m; };
    var L = s.log.map(function (l) { return l.text; }).join('\n');
    if (bio.incN >= 60) {
      var r = bio.incSum / bio.incN, pc = Math.round(r * 100), q = quint(r);
      out.push('Доход за трудовую жизнь — ' + pc + '% от медианной зарплаты твоих сверстников. ' + (r < 0.8 ? 'Ты ' + g('прожил', 'прожила') + ' жизнь ниже медианы своей когорты.' : r > 1.3 ? 'Ты ' + g('был', 'была') + ' среди обеспеченных своего поколения.' : 'Обычный доход — середина когорты.'));
      var q0 = (s.history.filter(function (h) { return h.quintile && h.age <= 16; })[0] || {}).quintile || null;
      if (q0) out.push('Родил' + g('ся', 'ась') + ' в семье ' + q0 + '-го квинтиля по доходу, взрослую жизнь ' + g('прожил', 'прожила') + ' в ' + q + '-м. ' +
        (q - q0 >= 2 ? 'Социальный лифт сработал — так бывает у меньшинства.' : q0 - q >= 2 ? 'Падение вниз по лестнице: детство было благополучнее твоей взрослой жизни.' : (q === q0 ? 'Тот же этаж' : 'Почти тот же этаж') + ', что у родителей: в России доход детей сильно повторяет доход родителей.'));
    }
    if (!p.alive && p.deathCause && age >= 15) {
      var T = RL.DATA.deathCauseTable, row = T && T[p.sex] && T[p.sex][Math.min(110, Math.floor(age))], dc = p.deathCause.toLowerCase();
      var key = row && (row[p.deathCause] !== undefined ? p.deathCause : Object.keys(row).filter(function (k) { return k.toLowerCase().indexOf(dc) >= 0 || dc.indexOf(k.toLowerCase()) >= 0; })[0]), sh = key && row[key];
      var life = [], hb = p.habitsEver || {};
      if ((hb.smoking || 0) >= 2) life.push('курение');
      if ((hb.alcohol || 0) >= 2) life.push('алкоголь');
      if ((hb.drugs || 0) >= 2) life.push('наркотики');
      if (p.stats.money < 30) life.push('бедность');
      var rgn = RL.Young.loc(s).region;
      if (!rgn.abroad && (rgn.alcohol || 1) >= 1.2 && /алког|цирроз|Падение|Утопление|Убийство|Самоубийство|Переохлаждение|Пожар/i.test(p.deathCause)) life.push('регион с высокой алкогольной и внешней смертностью (' + rgn.name + ')');
      if (bio.ignoredYears >= 6) life.push(bio.ignoredYears + ' ' + RL.Game.years(bio.ignoredYears) + ' хронических болезней без нормального лечения');
      if (s.fired && (s.fired.c2_heart_late || s.fired.ch_late_diagnosis)) life.push('симптомы, которые ты ' + g('проигнорировал', 'проигнорировала'));
      if (bio.isolated) life.push('одиночество');
      if (sh) out.push('Причина смерти — ' + p.deathCause.toLowerCase() + ': ' + (Math.round(sh * 1000) / 10) + '% смертей ' + g('мужчин', 'женщин') + ' твоего возраста. ' +
        (life.length ? 'В твоей биографии было то, что делает её вероятнее: ' + life.join(', ') + '.' : 'Образ жизни здесь почти ни при чём.'));
      else if (/Самоубийство|Передозировка|Отравление алкоголем/.test(p.deathCause)) out.push('Причина смерти — ' + p.deathCause.toLowerCase() + '. Такие смерти в России — в основном у мужчин 25–55 лет, бедных и пьющих.');
    }
    var kids = (p.kids || []).filter(function (k) { return k.alive; });
    if (kids.length) {
      var hi = RL.Chains && RL.Chains.hasHigher(s), w = kids.reduce(function (t, k) { return t + (k.warmth || 0); }, 0) / kids.length;
      out.push((kids.length > 1 ? 'Твои дети' : (kids[0].sex === 'm' ? 'Твой сын' : 'Твоя дочь')) + ' с высокой вероятностью ' +
        (hi || (bio.incN && bio.incSum / bio.incN > 1.3) ? 'получ' + (kids.length > 1 ? 'ат' : 'ит') + ' высшее образование и ' + (kids.length > 1 ? 'будут' : 'будет') + ' жить не хуже тебя (у детей с высшим у родителей шанс на вуз — около 70%).' : 'повтор' + (kids.length > 1 ? 'ят' : 'ит') + ' твою траекторию: без высшего у родителей в вуз поступает около четверти детей.') +
        (bio.incN >= 60 ? ' Шанс, что ' + (kids.length > 1 ? 'они останутся' : 'ребёнок останется') + ' в том же квинтиле дохода, что и ты, — около ' + (quint(bio.incSum / bio.incN) <= 2 || quint(bio.incSum / bio.incN) >= 4 ? 45 : 30) + '% [~].' : '') +
        (w > 30 ? ' Детство было тёплым — это видно по тому, как ' + (kids.length > 1 ? 'они рядом' : kids[0].sex === 'm' ? 'он рядом' : 'она рядом') + '.' : w < -20 ? ' Детство было тяжёлым, и ' + (kids.length > 1 ? 'они это помнят' : kids[0].sex === 'm' ? 'он это помнит' : 'она это помнит') + '.' : ''));
    }
    var reg = RL.Young.loc(s).region;
    if (reg && !reg.abroad) out.push('Регион: ' + reg.name + ' — зарплаты ' + Math.round(reg.wage * 100) + '% от средней по России, смертность ' + (reg.mortality > 1.05 ? 'выше' : reg.mortality < 0.95 ? 'ниже' : 'около') + ' средней' + (reg.corruption > 0.6 ? ', «решать вопросы» здесь принято чаще.' : '.'));
    var fights = (L.match(/Вспыльчивость подвела|Наорал/g) || []).length, schemes = (L.match(/«откат»/g) || []).length, ties = (L.match(/по знакомству|пару звонков|Вопрос решили/g) || []).length;
    if (fights) out.push('Вспыльчивость стоила тебе ' + fights + ' ' + (fights === 1 ? 'серьёзной истории' : 'серьёзных историй') + ': драки, увольнения, протоколы.');
    if (schemes) out.push('Нечестные «схемы»: ' + schemes + ' раз' + (L.indexOf('раскрутила твою «схему»') >= 0 ? ' — пока однажды не поймали.' : ' — и ни разу не поймали.'));
    if (ties) out.push('Связи выручили ' + ties + ' ' + RL.Game.years(ties).replace('лет', 'раз').replace('года', 'раза').replace('год', 'раз') + ' — работа, суд, врач «по знакомству».');
    var gy = RL.Chains ? RL.Chains.grayStazh(s) : 0;
    if (gy >= 3) out.push(gy + ' ' + RL.Game.years(gy) + ' «в конверте» — не стаж: пенсия меньше той, что могла быть.');
    return out;
  }
  // Ты и твоя когорта: доход, образование, семья, возраст смерти — против медианы ровесников [~ Росстат, перепись 2021, ВЦИОМ]
  var VUZ_BY_Q = {1: 0.25, 2: 0.35, 3: 0.45, 4: 0.6, 5: 0.8}; // шанс на высшее по квинтилю семьи [~ НИУ ВШЭ, «Мониторинг экономики образования»]
  function cohort(s) {
    var p = s.person, out = [], f = p.sex === 'f', g = function (m, w) { return f ? w : m; }, bio = p.bio || {}, age = p.alive ? S.age(s) : p.deathAge, by = s.birth.year;
    var hi = RL.Chains && RL.Chains.hasHigher(s), share = by < 1975 ? 25 : by < 1990 ? 35 : 42;
    if (age >= 25) out.push('Образование: ' + (hi ? 'высшее — как у ~' + share + '% твоего поколения.' : 'без высшего — как у ~' + (100 - share) + '% твоего поколения.'));
    if (age >= 45) {
      var mar = (p.flags.married || 0), div = (p.flags.divorced || 0);
      out.push('Семья: ' + (mar ? 'браков — ' + mar + (div ? ', разводов — ' + div : '') : 'в браке не ' + g('был', 'была')) + '. Среди ровесников к 50 годам в браке побывали ~85%, развод пережили ~40% [~].');
      var kn = (p.kids || []).length;
      out.push('Детей — ' + kn + '. В среднем у ' + g('мужчин', 'женщин') + ' твоего поколения — 1,5–1,7 [~].');
    }
    if (!p.alive) {
      var le = RL.Mortality.lifeExpAt(s, by, p.sex), d = Math.round(age - le);
      out.push('Возраст смерти — ' + Math.floor(age) + ': ' + (d >= 3 ? 'на ' + d + ' ' + RL.Game.years(d) + ' дольше' : d <= -3 ? 'на ' + (-d) + ' ' + RL.Game.years(-d) + ' раньше' : 'примерно как') + ' ожидаемой продолжительности жизни при рождении (' + Math.round(le) + ').');
    }
    return out;
  }
  // Что было бы, если: другой квинтиль и другой регион — грубая оценка по тем же таблицам [~]
  function whatIf(s) {
    var p = s.person, out = [], bio = p.bio || {}, q0 = (s.history.filter(function (h) { return h.quintile && h.age <= 16; })[0] || {}).quintile;
    var R = RL.S.region(s), msk = RL.S.regionById('msk');
    if (q0) {
      var alt = q0 <= 3 ? 5 : 1;
      out.push('Родись ты в семье ' + alt + '-го квинтиля вместо ' + q0 + '-го: шанс на высшее — ~' + Math.round(VUZ_BY_Q[alt] * 100) + '% вместо ~' + Math.round(VUZ_BY_Q[q0] * 100) + '%, доход взрослым — ' + (alt > q0 ? 'примерно вдвое выше' : 'примерно вдвое ниже') + ' (доход детей в России повторяет доход родителей примерно наполовину).');
    }
    if (R && msk && R.id !== 'msk' && !R.abroad) {
      var dLE = Math.round(Math.log(R.mortality / msk.mortality) / 0.09);
      out.push('Родись ты в Москве, а не в регионе «' + R.name + '»: зарплаты в ' + (Math.round(msk.wage / R.wage * 10) / 10) + ' раза выше, ' + (dLE > 0 ? 'ожидаемая жизнь — примерно на ' + dLE + ' ' + RL.Game.years(dLE) + ' дольше' : dLE < 0 ? 'но смертность в твоём регионе даже ниже московской' : 'смертность примерно та же') + ', медицина ' + (msk.medicine > R.medicine + 10 ? 'заметно доступнее' : 'похожая') + '.');
    }
    if (out.length) out.push('Это не приговор: выборы внутри жизни сдвигают итог сильнее, чем кажется, — но стартовая клетка задаёт, сколько ходов есть.');
    return out;
  }
  // Что аукнулось: прошлые решения, которые вернулись через годы (до пяти самых далёких)
  function echoes(s) {
    var L = ((s.person.bio || {}).chainList || []).slice().sort(function (a, b) { return (b.y - b.y0) - (a.y - a.y0); }).slice(0, 5);
    return L.map(function (x) { return x.y0 + ': «' + (x.t ? x.t + ' — ' : '') + x.c + '» → ' + x.y + ': ' + (x.to || 'последствие') + ' (через ' + (x.y - x.y0) + ' ' + RL.Game.years(x.y - x.y0) + ').'; });
  }
  // Тихие отметки: то, что не видно в каждом месяце, но решило жизнь
  function markers(s) {
    var p = s.person, b = p.bio || {}, out = [], f = p.sex === 'f', g = function (m, w) { return f ? w : m; }, T = p.ties || [];
    var gy = RL.Chains ? RL.Chains.grayStazh(s) : 0;
    if (gy) out.push('Лет «в конверте»: ' + gy + '.');
    if (b.tiesUsed) out.push('Пользовал' + g('ся', 'ась') + ' связями: ' + b.tiesUsed + ' раз; вернул' + g('', 'а') + ' долг — ' + (b.favorsPaid || 0) + ', отказал' + g('', 'а') + ' — ' + (b.favorsRefused || 0) + '.');
    var en = T.filter(function (t) { return t.enemy; }).length;
    if (en) out.push('Враги, нажитые отказами: ' + en + '.');
    if (b.chainsFired) out.push('Решений, которые аукнулись через годы: ' + b.chainsFired + '.');
    if (b.burnouts) out.push('Срывов от выгорания: ' + b.burnouts + '.');
    if (b.coldMarriage) out.push('Брак остыл без скандалов — просто стало тихо.');
    if (b.isolated) out.push('Были годы, когда не с кем было поговорить.');
    if (b.ignoredYears) out.push('Лет с хроническими болезнями без нормального лечения: ' + b.ignoredYears + '.');
    if (b.poorOld) out.push('Бедная старость — из мелких решений, а не из одной беды.');
    return out;
  }
  function verdict(rep, s) {
    if (rep.dead && rep.age >= 1) {
      var share = Math.round(outlived(s, rep.age) * 100);
      var whenA = 'в ' + Math.floor(rep.age) + ' ' + RL.Game.years(Math.floor(rep.age));
      var who = (s.person.sex === 'm' ? 'мужчин' : 'женщин') + ' ' + rep.born + ' года рождения';
      return 'Жизнь закончилась ' + whenA + '. ' + (share >= 99 ? 'Дольше почти всех ' + who + ' — меньше 1% доживают до такого возраста.' : share >= 50 ? 'Это дольше, чем ' + share + '% ' + who + '.' : (100 - share) + '% ' + who + ' проживут дольше.') + ' Ожидаемая продолжительность жизни при рождении по таблицам ' + rep.born + ' года — ' + Math.round(rep.lifeExpBirth) + ' ' + RL.Game.years(Math.round(rep.lifeExpBirth)) + '.';
    }
    if (rep.dead) {
      var when = rep.age < 1 ? 'в возрасте ' + Math.max(0, Math.round(rep.age * 12)) + ' мес.' : 'в ' + Math.floor(rep.age) + ' ' + RL.Game.years(Math.floor(rep.age));
      return 'Жизнь оборвалась ' + when + '. Ожидаемая продолжительность жизни для ' +
        (s.person.sex === 'm' ? 'мальчика, родившегося' : 'девочки, родившейся') + ' в ' + rep.born + ' году, по таблицам того года — ' + Math.round(rep.lifeExpBirth) + ' ' + RL.Game.years(Math.round(rep.lifeExpBirth)) + '.';
    }
    return 'Прожито ' + Math.floor(rep.age) + ' ' + RL.Game.years(Math.floor(rep.age)) + '. По таблице смертности ' + rep.ended + ' года впереди в среднем ещё ' + Math.round(rep.remainingLE) + ' ' + RL.Game.years(Math.round(rep.remainingLE)) + ' (до ~' + Math.round(rep.age + rep.remainingLE) + ').';
  }

  return {echoes: echoes, cohort: cohort, whatIf: whatIf, markers: markers, sociology: sociology, build: build, verdict: verdict, badges: badges, epitaph: epitaph, decades: decades, summary: summary, outlived: outlived, traitLabel: traitLabel, examLines: examLines, habitLines: habitLines, lifeLines: lifeLines, STAGES: STAGES, FAM: FAM, STATS: STATS};
})();
