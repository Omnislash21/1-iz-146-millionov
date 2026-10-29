// Карьеры: кого берут на какую работу (права, диплом, здоровье, судимость, возраст), работа после 60,
// спорт — от секции до контракта с реальным клубом и завершения карьеры, творческие вузы и профессии, блог.
// Развилки — свои pending с handler 'career'.
RL.Careers = (function () {
  var U = RL.util, S = RL.S, D = RL.DATA;
  var AVG = function (s) { return RL.Economy.AVG24() * RL.World.realWageIndex(s, s.date.year, s.date.month); };
  function tx(s, t, v) { return RL.Events.text(s, t, v || {}); }
  function prof(id) { return D.economy.professions.filter(function (x) { return x.id === id; })[0]; }
  function M(s, x) { return RL.World.money(s, x); }

  // ---------- требования ----------
  function hasDip(s, fields, college) {
    return (s.person.diplomas || []).some(function (d) { return (college ? d.level === 'СПО' : d.level !== 'СПО') && fields.indexOf(d.field) >= 0; });
  }
  function eligible(s, id) {
    var p = s.person, pr = prof(id), r = (D.economy.profReq || {})[id] || {}, a = S.age(s), lvl = RL.Young.eduLevel(s);
    if (!pr) return false;
    var skillsOk = r.orSkills && p.stats.skills >= r.orSkills;
    if (pr.heroOnly) {
      if (pr.path === 'arts') return hasDip(s, ['arts'], false) || (id !== 'actor' && p.stats.skills >= 55 && (p.fy || {}).arts >= 6);
      if (pr.path === 'pilot') return hasDip(s, ['eng'], false) && p.stats.health >= 70 && p.stats.skills >= 65 && a < 35;
      return false; // спорт и политика — только своими путями
    }
    if (pr.fromYear && s.date.year < pr.fromYear) return false;
    if (pr.metro && ['msk', 'spb', 'nn', 'nsk', 'sam', 'sve', 'tat'].indexOf(RL.Young.loc(s).region.id) < 0) return false; // метро есть не везде
    if (pr.edu > lvl && !skillsOk) return false;
    if (r.license && !s.flags.license) return false;
    if (DRIVE_PROFS.indexOf(id) >= 0 && driveBan(s)) return false;
    if (r.licenseC && !s.flags.licenseC) return false;
    // стаж: сколько лет проработано всего (RL.Old ведёт трудовой стаж)
    if (r.experienceYears && (!p.work || p.work.months < r.experienceYears * 12)) return false;
    if (r.exam && p.stats.skills < 65) return false;
    // стаж вождения: работодатели берут водителей минимум с годом за рулём
    if (r.drivingYears && (S.ageMonths(s) - (s.flags.licenseM || S.ageMonths(s))) < r.drivingYears * 12) return false;
    if (r.health && p.stats.health < r.health) return false;
    if (r.maxAge && a > r.maxAge) return false;
    if (r.minAge && a < r.minAge) return false;
    if (r.noRecord && p.flags.criminalRecord) return false;
    if (r.level && lvl < r.level && !skillsOk) return false;
    if (r.field && !hasDip(s, r.field, false) && !(r.orCollege && hasDip(s, r.orCollege, true)) && !skillsOk) return false;
    if (!r.field && r.orCollege && !r.level && lvl < 2 && !hasDip(s, r.orCollege, true) && !skillsOk) return false;
    if (r.sportPast && !(p.sport && p.sport.best >= 50)) return false;
    if (p.disability && (pr.injury || 1) >= 1.5) return false;
    if ((pr.sex[p.sex] || 0) < 0.005) return false;
    return true;
  }
  // подбор профессии для героя: сначала обычный выбор, потом — что реально доступно
  function pick(s, rng, first) {
    var p = s.person, a = S.age(s), last = p.job && p.job.prof;
    if (a >= 60) {
      if (last && last !== 'athlete' && last !== 'deputy' && rng.chance(0.4) && eligible(s, last)) return last;
      var el = D.economy.elderProfs.filter(function (id) { return eligible(s, id); });
      return el.length ? rng.pick(el) : 'guard';
    }
    for (var i = 0; i < 10; i++) { var id = first(); if (eligible(s, id)) return id; }
    var L = RL.Young.loc(s), lvl = RL.Young.eduLevel(s);
    var ok = D.economy.professions.filter(function (x) { return x.edu <= lvl && !x.heroOnly && eligible(s, x.id) && !(x.cityOnly && (L.settlement === 'village' || L.settlement === 'small')); });
    return ok.length ? rng.weighted(ok, function (x) { return (x.sex[p.sex] || 0.01) * (x.edu === lvl ? 3 : 1); }).id : 'laborer';
  }
  // медицинские противопоказания к управлению транспортом (Постановление Правительства РФ № 1604 от 29.12.2014) [~ упрощённо]
  var DRIVE_BAN = ['parkinson', 'epilepsy', 'dementia', 'schizophrenia', 'bipolar', 'multiple_sclerosis'];
  var DRIVE_PROFS = ['driver', 'taxi_driver', 'long_haul_driver', 'metro_driver', 'crane_operator', 'tractor_driver', 'pilot', 'courier'];
  function driveBan(s) {
    var p = s.person, c = p.conditions.filter(function (x) { return !x.cured && (DRIVE_BAN.indexOf(x.id) >= 0 || (x.id === 'stroke' && p.disability)); })[0];
    if (c) return RL.Health.condName(c);
    if (((p.habits || {}).alcohol || 0) >= 3) return 'алкогольная зависимость (учёт у нарколога)';
    if (((p.habits || {}).drugs || 0) >= 2) return 'наркотическая зависимость (учёт у нарколога)';
    return null;
  }
  // уже работающий потерял право на профессию
  function revalidate(s) {
    var p = s.person, j = p.job;
    if (!j || !j.employed) return;
    if (j.prof === 'driver' && !s.flags.license) { j.employed = false; S.log(s, 'Без прав водителем не работают — уволили.', 'bad'); }
    if ((j.prof === 'police' || j.prof === 'official') && p.flags.criminalRecord) { j.employed = false; S.log(s, 'С судимостью на госслужбе не держат — уволили.', 'bad'); }
  }

  // ---------- развилки ----------
  function offer(s, id, title, text, opts) {
    var pd = {kind: 'custom', handler: 'career', id: id, title: title, text: text, opts: opts, choices: opts.map(function (o, i) { return {i: i, text: o.text}; })};
    if (s.pending) s.queue.unshift({custom: pd}); else s.pending = pd;
  }

  // ---------- спорт ----------
  function SP() { return D.sport; }
  function coachQ(s) { return {megapolis: 1.06, million: 1.04, big: 1.0, medium: 0.95, small: 0.9, village: 0.85}[RL.Young.loc(s).settlement] || 1; }
  function kindsFor(s) {
    var p = s.person, r = S.region(s), st = p.settlement, cold = ['north', 'siberia', 'ural', 'fareast', 'arctic'].some(function (t) { return r.tags.indexOf(t) >= 0; }) || ['megapolis', 'million'].indexOf(st) >= 0;
    var K = SP().kinds, out = [];
    Object.keys(K).forEach(function (k) {
      var d = K[k];
      if (d.sex.indexOf(p.sex) < 0) return;
      if (d.cold && !cold) return;
      if (k === 'gymnastics' && S.age(s) > 9) return;
      if (k === 'swimming' && (st === 'village' || st === 'small')) return;
      if (k === 'hockey' && st === 'village') return;
      out.push(k);
    });
    return out;
  }
  function offerSportPick(s, rng) {
    var ks = kindsFor(s), p = s.person;
    var w = {};
    ks.forEach(function (k) { w[k] = (k === 'football' ? (p.sex === 'm' ? 4 : 0.8) : k === 'hockey' ? 2 : k === 'wrestling' ? (S.region(s).tags.indexOf('caucasus') >= 0 ? 6 : 1) : k === 'gymnastics' && p.sex === 'f' ? 2 : 1); });
    var shown = [];
    while (shown.length < 4 && Object.keys(w).length) { var k = rng.weightedKey(w); shown.push(k); delete w[k]; }
    var opts = shown.map(function (k) { return {kind: 'sport', sport: k, text: 'Секция: ' + SP().kinds[k].name}; });
    opts.push({kind: 'hobby', text: 'Без спортшколы — просто для себя'});
    offer(s, 'sport_pick', 'Спортшкола', tx(s, 'Тренер [заметил|заметила] тебя на секции и зовёт в спортшколу — серьёзные тренировки, сборы, соревнования. Какой спорт?'), opts);
  }
  function startSport(s, kind, rng) {
    var p = s.person;
    var pot = 30 + (p.hidden.physique - 50) * 1.15 + (p.traits.diligence || 0) / 5 + rng.normal(0, 9);
    if (SP().kinds[kind].tall) pot += (p.hidden.physique - 55) * 0.2;
    p.sport = {kind: kind, pot: U.clamp(pot, 5, 98), rating: 8, best: 8, years: 0, stage: 'school', rank: 0, injuries: 0, startAge: Math.floor(S.age(s))};
    S.log(s, 'Спортшкола: ' + SP().kinds[kind].name + '. Тренировки пять раз в неделю.', 'edu');
  }
  function league(kind, tier, y) { var L = SP().kinds[kind].leagues[tier]; return L.from && y < L.from ? (L.oldName || L.name) : L.name; }
  function clubFor(s, kind, tier, rng) {
    var p = s.person, y = s.date.year, key = kind + (p.sex === 'f' && SP().clubs[kind + '_f'] ? '_f' : '');
    var K = SP().kinds[kind];
    if (!K.team) return {name: league(kind, tier, y), city: null, region: null};
    // составы 2020-х — из справочника клубов (js/data/sport.js), раньше — исторический список
    var src = y >= (SP().modernFrom || 9999) && SP().clubsModern && SP().clubsModern[key] ? SP().clubsModern[key] : SP().clubs[key] || [];
    var list = src.filter(function (c) { return c[3] === tier && (!c[4] || y >= c[4]) && (!c[5] || y <= c[5]); });
    if (p.sex === 'f' && !SP().clubs[key]) list = [];
    if (tier === 3 || !list.length) {
      var L = RL.Young.loc(s), pre = {football: 'ФК', hockey: 'ХК', basketball: 'БК', volleyball: 'ВК'}[kind] || '';
      return {name: pre + ' «' + L.city + '»', city: L.city, region: L.region.id, generic: true};
    }
    var home = RL.Young.loc(s).region.id;
    var c = rng.weighted(list, function (x) { return x[1] === home ? 5 : 1; });
    return {name: c[0], city: c[2], region: c[1]};
  }
  function wageFor(s, kind, tier, rng) {
    var L = SP().kinds[kind].leagues[tier], f = s.person.sex === 'f' ? (SP().kinds[kind].wageF || 0.6) : 1;
    var era = s.date.year < 2000 ? 0.35 : s.date.year < 2008 ? 0.7 : 1;
    return L.wage * f * era * rng.lognorm(L.sd);
  }
  function tierFor(r) { var T = SP().proThreshold; return r >= T[1] ? 1 : r >= T[2] ? 2 : r >= T[3] ? 3 : 0; }
  function offerContract(s, rng) {
    var sp = s.person.sport, t = tierFor(sp.rating);
    var opts = [], seen = {};
    [t, Math.min(3, t + 1)].forEach(function (tt) {
      var c = clubFor(s, sp.kind, tt, rng); if (seen[c.name]) return; seen[c.name] = 1;
      var w = wageFor(s, sp.kind, tt, rng);
      opts.push({kind: 'contract', tier: tt, club: c, wage: w, text: (SP().kinds[sp.kind].team ? 'Контракт: ' + c.name + (c.city && !c.generic ? ' (' + c.city + ')' : '') + ', ' + league(sp.kind, tt, s.date.year) : 'Место: ' + c.name) + ' — ' + M(s, w) + '/мес'});
    });
    opts.push({kind: 'quit', text: 'Отказаться от профессионального спорта — учиться и работать'});
    offer(s, 'sport_contract', 'Профессиональный спорт', 'Тебя зовут в профессионалы: ' + SP().kinds[sp.kind].name + ', рейтинг ' + Math.round(sp.rating) + '/100.', opts);
  }
  function sign(s, o) {
    var p = s.person, sp = p.sport;
    sp.stage = 'pro'; sp.tier = o.tier; sp.club = o.club.name; sp.clubCity = o.club.city; sp.since = S.ageMonths(s);
    sp.clubs = (sp.clubs || []).concat([{name: o.club.name, tier: o.tier, year: s.date.year}]);
    p.job = {prof: 'athlete', base: Math.round(o.wage), shadow: 0.1, employed: true, raise: 1, since: S.ageMonths(s), monthsUnemployed: 0, level: 0};
    if (['graduate', 'gap', 'school'].indexOf(p.education.stage) >= 0 && S.age(s) >= 17) p.education.stage = 'work';
    if (o.club.region && o.club.region !== RL.Young.loc(s).region.id && S.age(s) >= 18) {
      var r = S.regionById(o.club.region);
      p.loc = {regionId: r.id, settlement: r.tags.indexOf('megapolis') >= 0 ? 'megapolis' : 'big', city: o.club.city};
      var ow = RL.Young.own(s); if (ow.living === 'parents') ow.living = 'rent_flat';
    }
    if (p.sex === 'm' && !p.flags.served) { p.flags.served = 1; p.flags.sportCompany = 1; }
    S.log(s, tx(s, 'Ты [подписал|подписала] профессиональный контракт: ' + o.club.name + ' (' + league(sp.kind, o.tier, s.date.year) + '). Зарплата — ' + M(s, RL.Young.netWage(s)) + '.' + (p.flags.sportCompany ? ' Срочную служишь в спортроте.' : '')), 'good');
    S.adj(s, 'happiness', 10); S.adj(s, 'mental', 6);
  }
  function retireSport(s, why, rng) {
    var p = s.person, sp = p.sport;
    sp.stage = 'retired'; sp.endAge = Math.floor(S.age(s));
    if (p.job && p.job.prof === 'athlete') p.job.employed = false;
    S.log(s, 'Конец спортивной карьеры (' + why + '). ' + (sp.clubs && sp.clubs.length ? 'Клубы: ' + sp.clubs.map(function (c) { return c.name; }).filter(function (x, i, a) { return a.indexOf(x) === i; }).join(', ') + '.' : ''), 'info');
    var opts = [];
    if (sp.best >= 50) opts.push({kind: 'coach', text: 'Стать тренером в спортшколе'});
    opts.push({kind: 'other', text: 'Уйти из спорта и искать обычную работу'});
    if (RL.Adult.wealth(s) > 12 * AVG(s)) opts.push({kind: 'gym', text: 'Открыть свой фитнес-клуб или секцию'});
    offer(s, 'sport_after', 'После спорта', 'Что дальше?', opts);
  }
  function sportMonthly(s, rng) {
    var p = s.person, a = S.age(s), sp = p.sport, fy = p.fy || {};
    if (!sp) {
      if (a >= 6 && a < 14 && p.focus === 'sport' && (fy.sport || 0) >= 1 && !p.flags.sportOffered && rng.chance(0.08) &&
          rng.chance(SP().access[p.settlement] || 0.5) && !s.pending) { p.flags.sportOffered = 1; offerSportPick(s, rng); }
      return;
    }
    if (sp.stage === 'retired' || sp.stage === 'hobby') return;
    var K = SP().kinds[sp.kind];
    var pro = sp.stage === 'pro' && p.job && p.job.prof === 'athlete' && p.job.employed;
    var train = p.focus === 'sport' || pro;
    var hb = p.habits || {};
    if (train) sp.years += 1 / 12;
    if (a > K.peak[1]) sp.pot -= 0.17;
    if ((hb.alcohol || 0) >= 2) sp.pot -= 0.06; if ((hb.smoking || 0) >= 2) sp.pot -= 0.03; if ((hb.drugs || 0) >= 2) sp.pot -= 0.3;
    var target = sp.pot * coachQ(s) * (1 - Math.exp(-sp.years / 4)) * (p.stats.health < 50 ? 0.85 : 1);
    sp.rating = U.clamp(train ? sp.rating + (target - sp.rating) * 0.035 + rng.normal(0, 0.3) : sp.rating - 0.25, 0, 100);
    sp.best = Math.max(sp.best, sp.rating);
    // разряды
    SP().ranks.forEach(function (rk, i) { if (sp.rating >= rk[0] && sp.rank <= i) { sp.rank = i + 1; S.log(s, 'Спорт: ' + rk[1] + ' (' + K.name + ').', 'good'); S.adj(s, 'mental', 2); } });
    // травмы
    if (train && rng.chance(SP().injuryMonthly * (pro ? 1.4 : 0.5))) {
      sp.injuries++;
      var bad = rng.chance(0.25);
      S.adj(s, 'health', bad ? -14 : -5); sp.rating -= bad ? 6 : 2;
      S.log(s, tx(s, bad ? rng.pick(['Разрыв крестообразной связки — операция и полгода восстановления.', 'Перелом — сезон окончен.', 'Тяжёлое сотрясение.']) : rng.pick(['Растяжение — [пропустил|пропустила] три недели.', 'Ушиб на тренировке.'])), 'health');
      if (bad && pro && rng.chance(SP().careerEndInjury)) { retireSport(s, 'тяжёлая травма', rng); return; }
    }
    // юниорская сборная / приглашение в академию
    if (sp.stage === 'school' && a >= 12 && a < 17 && sp.rating >= 42 && !sp.academy && rng.chance(0.03)) {
      sp.academy = 1; sp.pot += 4;
      var ac = K.team ? clubFor(s, sp.kind, 1, rng).name : 'училище олимпийского резерва';
      S.log(s, 'Пригласили в ' + (K.team ? 'академию клуба «' + ac + '»' : ac) + '. Тренеры другого уровня.', 'good');
    }
    // контракт: летом, 17–22 года
    if (sp.stage !== 'pro' && a >= 17 && a < 23 && s.date.month === 5 && tierFor(sp.rating) > 0 && !s.pending && !sp.declined) offerContract(s, rng);
    if (sp.stage !== 'pro' && a >= 23 && sp.stage !== 'hobby') { sp.stage = 'hobby'; return; }
    if (!pro) return;
    // профессионал: раз в год — переход по уровню, вызов в сборную, завершение
    if (s.date.month === 5) {
      var t = tierFor(sp.rating);
      if (a >= K.end[1] || (a >= K.end[0] && rng.chance(0.35)) || t === 0) { retireSport(s, t === 0 ? 'контракт не продлили' : 'возраст', rng); return; }
      if (t !== sp.tier && rng.chance(0.6)) {
        var c = clubFor(s, sp.kind, t, rng), w = wageFor(s, sp.kind, t, rng);
        S.log(s, (t < sp.tier ? 'Переход на уровень выше: ' : 'Контракт не продлили — уходишь ниже: ') + c.name + ' (' + league(sp.kind, t, s.date.year) + '), ' + M(s, w * 0.87) + '/мес.', t < sp.tier ? 'good' : 'bad');
        sp.tier = t; sp.club = c.name; sp.clubs.push({name: c.name, tier: t, year: s.date.year}); p.job.base = Math.round(w); p.job.raise = 1;
      } else p.job.raise *= rng.normal(1.03, 0.06);
      if (sp.rating >= 86 && sp.tier === 1 && rng.chance(0.5)) { sp.national = (sp.national || 0) + 1; S.log(s, 'Вызов в сборную России' + (sp.national > 1 ? ' (' + sp.national + '-й сезон)' : '') + '.', 'good'); S.adj(s, 'happiness', 5); }
      if (sp.tier === 1 && K.team && rng.chance(0.12)) { sp.titles = (sp.titles || 0) + 1; S.log(s, sp.club + ' — чемпион России! В составе — и ты.', 'good'); S.adj(s, 'happiness', 8); }
      if (!K.team && sp.tier === 1 && rng.chance(0.2)) { sp.medals = (sp.medals || 0) + 1; S.log(s, rng.pick(['Золото чемпионата России.', 'Медаль чемпионата Европы.', 'Бронза этапа Кубка мира.']), 'good'); S.adj(s, 'happiness', 6); }
    }
  }

  // ---------- творческие вузы ----------
  function artsKind(s) { var p = s.person; return p.hidden.creativity >= 70 && (p.traits.sociability || 0) > 10 ? 'actor' : rng01(s) < 0.5 ? 'musician' : 'artist'; }
  function rng01(s) { return new RL.RNG((s.seed ^ 4242) >>> 0).next(); }
  function artsMonthly(s, rng) {
    var p = s.person, a = S.age(s), fy = p.fy || {};
    if (p.flags.artsOffered || a < 16.5 || a > 18 || s.date.month !== 4 || (fy.arts || 0) < 3.5 || p.hidden.creativity < 55) return;
    if (['school', 'graduate'].indexOf(p.education.stage) < 0) return;
    p.flags.artsOffered = 1;
    var kind = artsKind(s), list = D.artsSchools[kind], opts = [];
    var top = rng.pick(list), r = S.region(s);
    opts.push({kind: 'arts', prof: kind, name: top[0], region: top[1], top: true, text: 'Поступать: ' + top[0]});
    var city = RL.Young.loc(s).city;
    opts.push({kind: 'arts', prof: kind, name: (kind === 'actor' ? 'Театральное училище' : kind === 'musician' ? 'Колледж (училище) искусств' : 'Художественное училище') + ' (' + city + ')', region: r.id, top: false, text: 'Поступать в училище в своём городе'});
    opts.push({kind: 'no', text: 'Нет — творчество останется хобби'});
    var what = {actor: 'актёрский', musician: 'музыкальный', artist: 'художественный'}[kind];
    offer(s, 'arts_choice', 'Творческий вуз', 'Годы занятий не прошли даром: педагоги советуют поступать на ' + what + ' факультет. Творческий конкурс — огромный.', opts);
  }
  function artsApply(s, o, rng) {
    var p = s.person, fy = p.fy || {};
    var z = (p.hidden.creativity - 62) / 8 + ((fy.arts || 0) - 5) / 3 + (p.stats.skills - 55) / 30 - (o.top ? 1.6 : 0) + rng.normal(0, 0.8);
    if (z > 0) {
      p.flags.artsAdmit = {name: o.name, region: o.region, top: o.top, prof: o.prof};
      S.log(s, tx(s, 'Творческий конкурс пройден: ' + o.name + ' ждёт тебя после школы.'), 'good'); S.adj(s, 'happiness', 6);
    } else S.log(s, tx(s, o.name + ': [не прошёл|не прошла] творческий конкурс.'), 'bad');
  }
  // вариант в приёмной кампании (RL.Young.offerPlan)
  function planOptions(s) {
    var A = s.person.flags.artsAdmit; if (!A) return [];
    var r = S.regionById(A.region), c = r.cities, city = (c.megapolis || c.million || c.big || c.medium || c.small)[0];
    var v = {name: A.name, region: A.region, city: A.region === S.region(s).id ? s.person.city : city, type: 'creative', fields: ['arts'], pass: 0, q: A.top ? 85 : 55, tuition: 0, dorm: 0.7, mil: false, budgetMul: 1, top: A.top};
    return [{kind: 'enroll', v: v, field: 'arts', form: 'budget', text: 'Творческий вуз (бюджет): ' + A.name}];
  }

  // ---------- блог ----------
  function blogMonthly(s, rng) {
    var p = s.person, a = S.age(s), fy = p.fy || {};
    if (p.biz || p.flags.blogTried || a < 16 || a > 55 || s.date.year < 2012) return;
    if ((fy.blog || 0) < 1.5 || p.stats.social < 50) return;
    if (!rng.chance(0.01 * (p.stats.social / 60) * (1 + (p.hidden.creativity - 50) / 60))) return;
    p.flags.blogTried = 1;
    RL.Events.queue(s, 'blog_takeoff', {});
  }

  // ---------- общий шаг ----------
  function resolve(s, idx, rng) {
    var pd = s.pending, o = pd.opts[idx], p = s.person;
    s.pending = null;
    S.log(s, pd.title + ': ' + o.text, 'choice');
    if (o.kind === 'sport') startSport(s, o.sport, rng);
    if (o.kind === 'hobby') p.sport = null;
    if (o.kind === 'contract') sign(s, o);
    if (o.kind === 'quit') { p.sport.declined = 1; p.sport.stage = 'hobby'; }
    if (o.kind === 'coach') { p.job = {prof: 'coach', base: Math.round(prof('coach').wage * D.economy.wageScale * RL.Young.loc(s).region.wage * (1 + (p.sport.best - 50) / 60)), shadow: 0.2, employed: true, raise: 1, since: S.ageMonths(s), monthsUnemployed: 0}; S.log(s, 'Теперь ты тренер.', 'good'); }
    if (o.kind === 'gym') RL.Adult.applyEffects(s, {startBiz: 'service'}, rng);
    if (o.kind === 'arts') artsApply(s, o, rng);
  }
  function autoChoose(s, rng) {
    var pd = s.pending, p = s.person, w = {};
    pd.opts.forEach(function (o, i) {
      var v = 0.2;
      if (o.kind === 'sport') v = 1; if (o.kind === 'hobby') v = 0.6;
      if (o.kind === 'contract') v = o.tier === 1 ? 4 : o.tier === 2 ? 2 : 0.8;
      if (o.kind === 'quit') v = 0.5 + (p.stats.skills > 65 ? 0.8 : 0);
      if (o.kind === 'coach') v = 1.5; if (o.kind === 'other') v = 0.8; if (o.kind === 'gym') v = 0.5;
      if (o.kind === 'arts') v = o.top ? 1 : 1.2; if (o.kind === 'no') v = 0.6;
      w[i] = v;
    });
    return +rng.weightedKey(w);
  }
  // теневой заработок 18+ (фокусы escort, content18): облавы, насилие, инфекции, огласка
  function adultWork(s, rng) {
    var p = s.person, f = RL.Childhood.focusDef(p.focus);
    if (!f || !f.adultWork || s.pending) return;
    p.flags.adultWorkM = (p.flags.adultWorkM || 0) + 1;
    var sp = p.spouse && !p.spouse.dead ? p.spouse : null;
    if (f.adultWork === 'escort') {
      if (rng.chance(0.02)) { RL.Events.applyEffects(s, {cash: -3000, mental: -3}, rng); S.log(s, 'Облава: протокол по ст. 6.11 КоАП и штраф. Фамилию записали.', 'bad'); }
      if (rng.chance(0.012)) { S.adj(s, 'health', -12); S.adj(s, 'mental', -8); S.log(s, 'Клиент оказался опасным: побои, синяки — неделями. В полицию идти бессмысленно.', 'bad'); }
      if (rng.chance(0.006)) { RL.Events.applyEffects(s, {cash: -8000, health: -4}, rng); S.log(s, 'Инфекция — анализы и лечение в платной клинике, «чтобы без учёта».', 'health'); }
      if (rng.chance(0.0012) && RL.DATA.conditions && RL.DATA.conditions.hiv) RL.Health.addCondition(s, 'hiv', rng);
      if (rng.chance(0.008)) {
        if (sp) { sp.relation = U.clamp(sp.relation - 40, 0, 100); S.log(s, sp.name + ' узнал, чем ты зарабатываешь. Скандал, вещи у двери.', 'bad'); }
        else { S.adj(s, 'social', -6); S.log(s, 'Знакомые узнали, чем ты зарабатываешь. Половина перестала здороваться.', 'bad'); }
        S.adj(s, 'mental', -6);
      }
    } else if (rng.chance(0.01)) {
      S.adj(s, 'mental', -8);
      var t = 'Твои фото слили в общий чат — ';
      if (p.job && p.job.employed && rng.chance(0.3)) { p.job.employed = false; t += 'на работе попросили уйти «по собственному».'; }
      else if (sp) { sp.relation = U.clamp(sp.relation - 25, 0, 100); t += 'увидел и ' + sp.name + '. Тяжёлый разговор.'; }
      else t += 'увидели родственники. Неделю никто из родни не звонит.';
      S.log(s, t, 'bad');
    }
  }
  // фокус по профессии: зарплата, травмы, выгорание, увольнение, серые схемы, слава
  function careerFocus(s, rng) {
    var p = s.person, f = RL.Childhood.focusDef(p.focus), j = p.job;
    if (!f || !f.careerFx || !j || !j.employed) return;
    var c = f.careerFx;
    if (c.raise) j.raise = (j.raise || 1) * Math.pow(1 + c.raise, 1 / 12);
    if (c.injury > 0 && rng.chance(c.injury)) { S.adj(s, 'health', -8); S.log(s, tx(s, rng.pick(['Производственная травма — больничный на месяц.', '[Сорвал|Сорвала] спину на работе.', 'Авария на работе: ушибы и сотрясение.'])), 'health'); }
    if (c.burnout && rng.chance(c.burnout) && RL.Events.def('burnout')) RL.Events.queue(s, 'burnout', {});
    if (c.fire && rng.chance(c.fire)) { j.employed = false; S.log(s, 'Тебя уволили: «не вписываешься в политику компании».', 'bad'); return; }
    if (c.death && rng.chance(c.death)) { s.deathNow = 'Погиб в зоне боевых действий'; return; }
    if (c.caseRisk) Object.keys(c.caseRisk).forEach(function (art) { if (!s.pending && rng.chance(c.caseRisk[art])) { S.log(s, tx(s, 'Проверка нашла то, что ты [прятал|прятала].'), 'bad'); RL.Events.applyEffects(s, {case: art}, rng); } });
    if (c.fame && rng.chance(c.fame)) {
      j.base = Math.round(j.base * rng.range(2.5, 6));
      S.log(s, rng.pick(['Главная роль в сериале на федеральном канале — тебя узнают на улицах!', 'Песня попала в чарты, концерты расписаны на год вперёд.', 'Персональная выставка в Москве, работы раскупают коллекционеры.']), 'good');
      S.adj(s, 'happiness', 10); S.adj(s, 'social', 8); p.flags.famous = 1;
    }
    if (c.sportPot && p.sport) p.sport.pot += c.sportPot;
    if (f.family && p.spouse) p.spouse.relation = U.clamp(p.spouse.relation + f.family, 0, 100);
  }
  function focusPromo(s) { var f = RL.Childhood.focusDef(s.person.focus); return f && f.careerFx && f.careerFx.promo ? f.careerFx.promo : s.person.focus === 'career' ? 2.5 : 1; }

  function monthly(s, rng) {
    var p = s.person, a = S.age(s);
    if (a < 6) return;
    p.fy = p.fy || {};
    // медкомиссия ГИБДД при замене прав, ДТП или по сигналу врача: с противопоказаниями права аннулируют
    var ban = s.flags.license && driveBan(s);
    if (ban && rng.chance(0.06)) {
      delete s.flags.license; delete s.flags.licenseC;
      S.log(s, 'Медкомиссия не пропустила: ' + ban.charAt(0).toLowerCase() + ban.slice(1) + ' — водительское удостоверение аннулировано.', 'bad');
      S.adj(s, 'mental', -4);
    }
    if (s.flags.license && !s.flags.licenseM) s.flags.licenseM = S.ageMonths(s);
    if (!s.flags.license && s.flags.licenseM) delete s.flags.licenseM;
    careerFocus(s, rng);
    adultWork(s, rng);
    sportMonthly(s, rng);
    if (s.deathNow) return;
    artsMonthly(s, rng);
    blogMonthly(s, rng);
    revalidate(s);
  }
  function facts(s, f) {
    f.driveBan = !!driveBan(s);
    var sp = s.person.sport;
    f.athlete = !!(sp && sp.stage === 'pro'); f.sportRating = sp ? sp.rating : 0; f.sportKind = sp ? sp.kind : null;
    f.fySport = (s.person.fy || {}).sport || 0; f.fyArts = (s.person.fy || {}).arts || 0;
  }
  return {monthly: monthly, resolve: resolve, autoChoose: autoChoose, eligible: eligible, pick: pick, facts: facts, planOptions: planOptions, league: league, focusPromo: focusPromo};
})();
