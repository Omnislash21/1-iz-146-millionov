// Подключение справочников из пакета GPT (docs/DATA_EXPANSION.md) к форматам движка. Сами файлы пакета не меняются:
// здесь — сопоставление регионов переписи с регионами игры, перевод национальностей, болезней, причин смерти,
// фокусов, клубов, учреждений образования, семейных событий и местных выборов. Подключается после всех данных, до fixes.js.
(function (D) {
  var R = D.regions.filter(function (r) { return !r.legacy; });
  // ---------- регионы переписи (census_01…85) → id игры ----------
  function norm(t) { return String(t).toLowerCase().replace(/ё/g, 'е').replace(/г\.\s*/g, '').replace(/[^а-я]/g, ''); }
  var ALIAS = {"архангельскаяобластьбезао": "arh", "тюменскаяобластьбезао": "tyu_obl", "хмао": "hmao", "янао": "yanao", "москва": "msk", "санктпетербург": "spb",
    "респсевернаяосетияалания": "osset", "кемеровскаяобластькузбасс": "kem", "республикасахаякутия": "yakut", "севастополь": "sev", "республикакрым": "crimea_rep",
    "чувашскаяреспублика": "chuv", "удмуртскаяреспублика": "udm", "кабардинобалкарскаяреспублика": "kbr", "карачаевочеркесскаяреспублика": "kchr", "чеченскаяреспублика": "che", "ненецкийавтономныйокруг": "nao", "чукотскийавтономныйокруг": "chuk"};
  var byName = {}; R.forEach(function (r) { byName[norm(r.name)] = r.id; });
  function regionOf(name) {
    var n = norm(name);
    if (ALIAS[n]) return ALIAS[n];
    if (byName[n]) return byName[n];
    var hit = R.filter(function (r) { var m = norm(r.name); return m.indexOf(n) >= 0 || n.indexOf(m) >= 0; })[0];
    return hit ? hit.id : null;
  }
  var CENSUS = {};
  if (D.ethnicCensus) D.ethnicCensus.regions.forEach(function (c) { CENSUS[c.id] = regionOf(c.name); });
  D.censusRegionMap = CENSUS;
  // города → регион игры (для клубов)
  var CITY = {};
  R.forEach(function (r) { Object.keys(r.cities).forEach(function (k) { r.cities[k].forEach(function (c) { if (!CITY[c]) CITY[c] = r.id; }); }); });

  // ---------- национальности: доли по переписи 2020 (ответившие) ----------
  if (D.ethnicCensus) {
    var E = D.ethnicCensus, G = E.groups;
    var OURS = {"Русские": "russian", "Татары": "tatar", "Чеченцы": "chechen", "Башкиры": "bashkir", "Чуваши": "chuvash", "Аварцы": "avar", "Армяне": "armenian",
      "Украинцы": "ukrainian", "Даргинцы": "dargin", "Казахи": "kazakh", "Кумыки": "kumyk", "Кабардинцы": "kabardian", "Ингуши": "ingush", "Лезгины": "lezgin",
      "Осетины": "ossetian", "Мордва": "mordvin", "Якуты": "yakut", "Азербайджанцы": "azerbaijani", "Буряты": "buryat", "Марийцы": "mari", "Удмурты": "udmurt",
      "Таджики": "tajik", "Узбеки": "uzbek", "Тувинцы": "tuvan", "Крымские татары": "crimean_tatar", "Карачаевцы": "karachay", "Белорусы": "belarusian", "Немцы": "german",
      "Калмыки": "kalmyk", "Лакцы": "lak", "Табасараны": "tabasaran", "Коми": "komi", "Киргизы": "kyrgyz", "Балкарцы": "balkar", "Черкесы": "circassian",
      "Адыгейцы": "adyghe", "Ногайцы": "nogai", "Корейцы": "korean", "Евреи": "jewish", "Алтайцы": "altai", "Хакасы": "khakas", "Карелы": "karelian", "Ханты": "khanty"};
    // единственное число: исключения; остальное — по окончанию
    var ONE = {"Мордва": ["мордвин", "мордовка"], "Коми": ["коми", "коми"], "Ханты": ["ханты", "ханты"], "Манси": ["манси", "манси"], "Цыгане": ["цыган", "цыганка"],
      "Турки": ["турок", "турчанка"], "Греки": ["грек", "гречанка"], "Поляки": ["поляк", "полька"], "Болгары": ["болгарин", "болгарка"], "Венгры": ["венгр", "венгерка"],
      "Французы": ["француз", "француженка"], "Китайцы": ["китаец", "китаянка"], "Корейцы": ["кореец", "кореянка"], "Персы": ["перс", "персиянка"], "Курды": ["курд", "курдянка"],
      "Эвенки": ["эвенк", "эвенкийка"], "Чукчи": ["чукча", "чукчанка"], "Нивхи": ["нивх", "нивхка"], "Шапсуги": ["шапсуг", "шапсужка"], "Уйльта": ["уйльта", "уйльта"],
      "Водь": ["водь", "водь"], "Турки-месхетинцы": ["турок-месхетинец", "турчанка-месхетинка"], "Горские евреи": ["горский еврей", "горская еврейка"],
      "Среднеазиатские евреи": ["среднеазиатский еврей", "среднеазиатская еврейка"], "Грузинские евреи": ["грузинский еврей", "грузинская еврейка"],
      "Цыгане среднеазиатские": ["среднеазиатский цыган", "среднеазиатская цыганка"], "Британцы": ["британец", "британка"], "Ульчи": ["ульч", "ульчанка"],
      "Крымские татары": ["крымский татарин", "крымская татарка"], "Сербы": ["серб", "сербиянка"], "Таты": ["тат", "татка"]};
    function singular(n) {
      if (ONE[n]) return ONE[n];
      var w = n.toLowerCase();
      if (/йцы$/.test(w)) return [w.slice(0, -3) + 'ец', w.slice(0, -2) + 'ка'];
      if (/цы$/.test(w)) return [w.slice(0, -2) + 'ец', w.slice(0, -2) + 'ка'];
      if (/[ая]не$/.test(w)) return [w.slice(0, -1) + 'ин', w.slice(0, -1) + 'ка'];
      if (/еи$/.test(w)) return [w.slice(0, -1) + 'й', w.slice(0, -1) + 'йка'];
      if (/ки$/.test(w)) return [w.slice(0, -1), w.slice(0, -2) + 'чка'];
      if (/хи$/.test(w)) return [w.slice(0, -1), w.slice(0, -2) + 'шка'];
      if (/[жшчщ]и$/.test(w)) return [w.slice(0, -1), w.slice(0, -1) + 'ка'];
      if (/ы$/.test(w)) return [w.slice(0, -1), w.slice(0, -1) + 'ка'];
      return [w, w];
    }
    // наборы имён: свои, если есть; иначе — из пакета (иллюстративные, по 4 имени)
    var POOL = {ru: 'slavic', tatar: 'tatar', bashkir: 'tatar', chechen: 'chechen', ingush: 'chechen', dagestan: 'dagestan', adyg: 'circassian', osset: 'ossetian',
      armenian: 'armenian', azer: 'azeri', kazakh: 'central_asia', central: 'central_asia', mongol: 'buryat', kalmyk: 'buryat', sakha: 'yakut',
      ukrainian: 'slavic', belarus: 'slavic', jewish: 'slavic', german: 'slavic', korean: 'slavic'};
    var POOLFIX = {"Турки": "azeri", "Карачаевцы": "circassian", "Балкарцы": "circassian", "Арабы": "central_asia", "Курды": "azeri", "Езиды": "azeri", "Персы": "azeri",
      "Талыши": "azeri", "Афганцы": "tajik", "Памирцы": "tajik", "Уйгуры": "central_asia", "Дунгане": "central_asia", "Ногайцы": "tatar", "Нагайбаки": "slavic"};
    var REL = {ru: 'orthodox', ukrainian: 'orthodox', belarus: 'orthodox', osset: 'orthodox', georgian: 'orthodox', armenian: 'apostolic', mongol: 'buddhist', kalmyk: 'buddhist',
      tyva: 'buddhist', jewish: 'none', german: 'lutheran', korean: 'none', chinese: 'none', japanese: 'none', vietnamese: 'none', sakha: 'orthodox', turk_siberia: 'orthodox'};
    Object.keys(E.namingPools).forEach(function (k) {
      if (POOL[k]) return;
      var np = E.namingPools[k]; D.names['ext_' + k] = {m: np.male.slice(), f: np.female.slice()};
      POOL[k] = 'ext_' + k;
    });
    var gid = {};
    Object.keys(G).forEach(function (id) {
      var g = G[id], own = OURS[g.name];
      if (own && D.ethnic[own]) { gid[id] = own; return; }
      var sg = singular(g.name), key = 'c_' + id, pool = g.namingPoolId;
      D.ethnic[key] = {m: sg[0], f: sg[1], religion: REL[pool] || (/^(ru)$/.test(pool) ? 'orthodox' : 'muslim'), names: POOLFIX[g.name] || POOL[pool] || 'slavic', minority: 0.45, census: true};
      if (/^(Арабы|Курды|Персы|Афганцы|Пакистанцы|Индийцы|Американцы|Британцы|Французы|Испанцы|Итальянцы|Кубинцы|Японцы|Китайцы|Вьетнамцы)$/.test(g.name)) D.ethnic[key].foreign = true;
      if (/^(Цыгане|Греки|Молдаване|Поляки|Литовцы|Латыши|Эстонцы|Финны|Болгары|Сербы|Румыны|Венгры|Чехи|Словаки|Хорваты|Словенцы|Македонцы|Черногорцы|Гагаузы|Русины)$/.test(g.name))
        D.ethnic[key].religion = /Поляки|Литовцы|Хорваты|Словенцы|Чехи|Словаки|Венгры/.test(g.name) ? 'catholic' : /Латыши|Эстонцы|Финны/.test(g.name) ? 'lutheran' : 'orthodox';
      if (/Езиды/.test(g.name)) D.ethnic[key].religion = 'none';
      gid[id] = key;
    });
    E.regions.forEach(function (c) {
      var rid = CENSUS[c.id], r = rid && R.filter(function (x) { return x.id === rid; })[0];
      if (!r) return;
      var tot = 0, sh = {};
      Object.keys(c.counts).forEach(function (g) { var n = c.counts[g]; if (!n || !gid[g]) return; sh[gid[g]] = (sh[gid[g]] || 0) + n; tot += n; });
      if (!tot) return;
      Object.keys(sh).forEach(function (k) { sh[k] = sh[k] / tot; });
      r.ethnic = sh; r.ethnicSource = 'перепись 2020/21';
    });
  }

  // ---------- причины смерти по полу и возрасту ----------
  if (D.deathCausesExt) {
    var NICE = {"Преднамеренное самоповреждение": "Самоубийство", "Нападение": "Убийство", "Повреждение с неопределёнными намерениями": "Травма при невыясненных обстоятельствах",
      "Причина смерти не установлена или обозначена неточно": "Причина не установлена", "Ишемическая болезнь сердца без острого инфаркта": "Хроническая ишемическая болезнь сердца",
      "Острый и повторный инфаркт миокарда": "Инфаркт миокарда", "Инфаркт мозга": "Ишемический инсульт", "Внутричерепное нетравматическое кровоизлияние": "Геморрагический инсульт",
      "Инсульт неуточнённый и последствия цереброваскулярных болезней": "Последствия инсульта", "ДТП и другие наземные транспортные травмы": "ДТП",
      "Воздействие чрезмерно низкой природной температуры": "Переохлаждение", "Воздействие дыма, огня и пламени": "Пожар", "Септицемия вне перинатального периода": "Сепсис",
      "Новообразования иных локализаций и поведения": "Злокачественная опухоль", "Болезни крови, кожи, костей и других редких классов": "Редкое заболевание",
      "Иные внешние воздействия, осложнения помощи и их последствия": "Несчастный случай", "Случайное падение": "Падение", "Случайное утопление": "Утопление"};
    var T = {m: [], f: []};
    ['m', 'f'].forEach(function (sx) {
      for (var a = 0; a <= 110; a++) {
        var o = {};
        D.deathCausesExt.causes.forEach(function (c) { var v = (c.shareBySexAge[sx] || [])[a]; if (v > 0) o[NICE[c.name] || c.name] = (o[NICE[c.name] || c.name] || 0) + v; });
        T[sx].push(o);
      }
    });
    D.deathCauseTable = T;
  }

  // ---------- болезни: новые диагнозы из пакета (те, что уже есть в игре, не дублируем) ----------
  if (D.diseasesExt) {
    var SAME = {ischemic_heart: 'ihd', atrial_fibrillation: 'afib', osteoarthritis: 'arthrosis', chronic_kidney: 'ckd', prostate_hyperplasia: 'prostate', alzheimer: 'dementia',
      peptic_ulcer: 'ulcer', hepatitis_c: 'hepc', tuberculosis: 'tb', atopic: 'allergy', cerebral_palsy: 'cp', alcohol_dependence: '-', cystic_fibrosis: '-', hemophilia: '-'};
    // смертность и потолок здоровья — игровые оценки: в пакете их нет [~]
    var MORT = {heart_failure: 2, cardiomyopathy: 1.8, bronchiectasis: 1.3, rheumatoid: 1.2, lupus: 1.6, multiple_sclerosis: 1.4, schizophrenia: 1.6, bipolar: 1.4,
      hepatitis_b: 1.4, pancreatitis: 1.5, crohn: 1.2, ulcerative_colitis: 1.15, sleep_apnea: 1.15, polyneuropathy: 1.1, sarcoidosis: 1.2, glomerulonephritis: 1.4, polycystic_kidney: 1.4,
      fatty_liver: 1.05, hyperthyroid: 1.05};
    var MENTAL = {schizophrenia: 40, bipolar: 50, migraine: 85};
    var FEM = {endometriosis: 1, pcos: 1}, MALE = {};
    var BANDS = D.diseasesExt.ageBands;
    D.diseasesExt.items.forEach(function (d) {
      if (D.conditions[d.id] || SAME[d.id]) return;
      var inc = d.incidencePer100kYear, by = {};
      var f = FEM[d.id] ? inc.f : inc.m, ff = inc.f || inc.m;
      BANDS.forEach(function (b, i) { var mid = Math.round((b[0] + b[1]) / 2); by[mid] = ((f[i] || 0) + (ff[i] || 0)) / 2 / 1e5 * 0.7; });
      var total = Object.keys(by).reduce(function (t, k) { return t + by[k]; }, 0);
      if (!total) return;
      var rf = d.riskFactors || {}, mods = {};
      if (rf.smoking) mods.smoker = rf.smoking.multiplier; if (rf.alcohol) mods.drinker = rf.alcohol.multiplier;
      if (rf.obesity) mods.obesity = rf.obesity.multiplier; if (rf.poverty) mods.poor = rf.poverty.multiplier;
      if (inc.f && inc.m) { var sm = inc.m.reduce(function (t, x) { return t + x; }, 0), sf = inc.f.reduce(function (t, x) { return t + x; }, 0); if (sm > 0 && sf > 0 && Math.abs(sm / sf - 1) > 0.15) mods.male = sm / sf; }
      var cost = d.costs && d.costs.uncoveredMedicinesMonthlyRub ? (d.costs.uncoveredMedicinesMonthlyRub[0] + d.costs.uncoveredMedicinesMonthlyRub[1]) / 2 : 800;
      var cons = (d.consequences || [])[0];
      D.conditions[d.id] = {name: d.name, kind: 'chronic', byAge: by, ages: [0, 110], mods: mods, cap: MORT[d.id] > 1.3 ? 80 : 92, mort: MORT[d.id] || 1,
        mentalCap: MENTAL[d.id], cost: cost, freeShare: 0.4, sus: 0.8, sex: FEM[d.id] ? 'f' : MALE[d.id] ? 'm' : undefined, ext: true,
        text: 'Врач ставит диагноз: ' + d.name.charAt(0).toLowerCase() + d.name.slice(1) + '.' + (cons ? ' Чем грозит: ' + cons.charAt(0).toLowerCase() + cons.slice(1) + '.' : '')};
    });
  }

  // ---------- фокусы пакета: 128 вариантов по 8 периодам ----------
  if (D.focusesExt) {
    D.focusesExt.items.forEach(function (x) {
      var eff = {};
      Object.keys(x.gainsMonthly || {}).forEach(function (k) { eff[k] = x.gainsMonthly[k]; });
      Object.keys(x.lossesMonthly || {}).forEach(function (k) { eff[k] = (eff[k] || 0) + x.lossesMonthly[k]; });
      D.focuses.push({id: x.id, name: x.name, desc: x.desc || 'Своё занятие на этот период жизни.', ages: [x.ageFrom, x.ageTo], cost: x.costMonthlyRub || 0, eff: eff,
        when: x.when, sexW: x.sexPreference === 'more_m' ? {m: 1.5, f: 0.6} : x.sexPreference === 'more_f' ? {m: 0.6, f: 1.5} : null, ext: true, auto: 0.35});
    });
  }

  // ---------- клубы пакета (составы 2020-х): реальный список лиг по уровням ----------
  if (D.sportExt && D.sport) {
    var TIER = {rpl: 1, fnl: 2, second_a: 3, second_b: 3, khl: 1, vhl: 2, mhl: 3, vtb: 1, superleague: 2, superleague_m: 1, superleague_f: 1};
    var M = {};
    D.sportExt.clubs.forEach(function (c) {
      var t = 0; c.leagueMembership.forEach(function (l) { var x = TIER[l.league]; if (x && (!t || x < t)) t = x; });
      if (!t) return;
      var key = c.sport + (c.sex === 'f' ? '_f' : '');
      (M[key] = M[key] || []).push([c.name, CITY[c.city] || null, c.city, t, c.foundedYear || null, c.endedYear || null]);
    });
    D.sport.clubsModern = M; D.sport.modernFrom = 2020;
    if (M.handball || M.handball_f) D.sport.kinds.handball = {name: 'гандбол', sex: ['m', 'f'], team: true, peak: [24, 30], end: [31, 36],
      leagues: {"1": {name: 'Суперлига', wage: 250000, sd: 0.6}, "2": {name: 'Высшая лига', wage: 80000, sd: 0.4}, "3": {name: 'первенство России', wage: 40000, sd: 0.3}}, wageF: 0.6};
    if (M.handball_f) D.sport.clubs.handball_f = M.handball_f;
    if (M.handball) D.sport.clubs.handball = M.handball;
  }

  // ---------- вузы и колледжи пакета: реальные названия по регионам ----------
  if (D.universities) {
    var I = {};
    D.universities.items.forEach(function (u) { var rid = CENSUS[u.regionId]; if (rid) (I[rid] = I[rid] || []).push(u); });
    D.realInstitutions = I;
  }

  // ---------- семейные события пакета (60): частота ×0,3 (≈18 за жизнь), чтобы окна не сыпались ----------
  if (D.eventsKin) D.eventsKin.events.forEach(function (e) {
    var c = JSON.parse(JSON.stringify(e)); c.p = (c.p || 0.002) * 0.3; c.cooldown = Math.max(c.cooldown || 24, 36); c.kin = true;
    D.events.push(c);
  });

  // ---------- фокусы по профессиям: мои (career_focus.js) + пакета GPT (career_focuses.js, если подключён) ----------
  var CF = (D.careerFocusBase || []).concat(D.careerFocuses && D.careerFocuses.items || []);
  var seenCF = {};
  CF.forEach(function (x) {
    if (seenCF[x.id] || !x.profs || !x.profs.length) return; seenCF[x.id] = 1;
    var w = {prof: x.profs}; Object.keys(x.when || {}).forEach(function (k) { w[k] = x.when[k]; });
    var c = x.career || {};
    D.focuses.push({id: x.id, name: x.name, desc: x.desc || '', ages: x.ages || [18, 80], cost: x.cost || 0, eff: x.eff || {}, when: w,
      traits: x.trait, careerFx: c, earnAdult: c.side || 0, family: x.family || 0, careerFocus: true, auto: 0.9});
  });

  // ---------- события по профессиям (пакет GPT: events_careers.js) ----------
  if (D.eventsCareers) D.eventsCareers.events.forEach(function (e) {
    if (D.events.some(function (x) { return x.id === e.id; })) return;
    var c = JSON.parse(JSON.stringify(e)); c.p = Math.min(c.p || 0.003, 0.006); c.cooldown = Math.max(c.cooldown || 24, 24); c.careerEvent = true;
    D.events.push(c);
  });
  // ---------- новые профессии и реальные требования (пакет GPT: professions_ext.js) ----------
  if (D.professionsExt) {
    var PE = D.professionsExt, have = {};
    // в пакете у всех новых профессий одинаковые веса для обоих полов и как у массовых профессий — ставим реальные доли (Росстат, ОРС 2023 [~])
    var SEX = {taxi_driver: [0.5, 0.03], long_haul_driver: [0.35, 0.01], tractor_driver: [0.3, 0.01], district_police: [0.07, 0.02], investigator: [0.04, 0.03],
      prosecutor: [0.02, 0.02], judge: [0.004, 0.007], notary: [0.002, 0.003], advocate: [0.02, 0.02], ambulance_nurse: [0.04, 0.1], paramedic: [0.05, 0.1],
      provisor: [0.01, 0.05], veterinarian: [0.02, 0.03], barista: [0.05, 0.08], waiter: [0.07, 0.14], marketplace_manager: [0.04, 0.07], smm_specialist: [0.02, 0.06],
      qa_tester: [0.05, 0.03], sysadmin: [0.1, 0.015], crane_operator: [0.05, 0.01], metro_driver: [0.02, 0.002], dispatcher: [0.03, 0.06], call_center_operator: [0.03, 0.1],
      bank_cashier: [0.01, 0.09], realtor: [0.04, 0.06]};
    var FROM = {qa_tester: 2000, sysadmin: 1995, smm_specialist: 2012, marketplace_manager: 2018, barista: 2003, call_center_operator: 1998};
    var CITY = {metro_driver: 1, barista: 1, qa_tester: 1, smm_specialist: 1, judge: 0, notary: 0}, VILLAGE = {tractor_driver: 1};
    D.economy.professions.forEach(function (x) { have[x.id] = 1; });
    (PE.professions || []).forEach(function (x) {
      if (have[x.id] || !x.m || !x.wage) return;
      var c = JSON.parse(JSON.stringify(x));
      if (SEX[c.id]) c.sex = {m: SEX[c.id][0], f: SEX[c.id][1]};
      if (FROM[c.id]) c.fromYear = Math.max(c.fromYear || 0, FROM[c.id]);
      if (CITY[c.id]) c.cityOnly = true; if (VILLAGE[c.id]) c.village = true;
      if (c.id === 'metro_driver') c.metro = true;
      D.economy.professions.push(c); have[x.id] = 1;
    });
    // требования: диплом колледжа в движке — orCollege с id колледжа; экзамен проверяем только там, где он реально отсеивает (суд, нотариат, адвокатура)
    var COL = {eng: 'tech', med: 'med', ped: 'ped', econ: 'econ', it: 'it', agro: 'agro'};
    var KEEP = {teacher: 1, coach: 1, official: 1, pilot: 1, worker: 1, it: 1, designer: 1, journalist: 1}; // мои правила реалистичнее (см. RL.DATA.economy.profReq)
    var HARD = /judicial|notarial|advocate|pilot/;
    Object.keys(PE.requirements || {}).forEach(function (id) {
      var r = PE.requirements[id], q = D.economy.profReq[id] || {};
      if (!KEEP[id]) {
        if (r.level !== undefined && r.level !== null) q.level = r.level;
        if (r.field && r.field.length) {
          if (r.level >= 2) q.field = r.field;
          else q.orCollege = r.field.map(function (f) { return COL[f] || f; });
        }
      }
      if (r.license) { q.license = 1; if (/C|D/.test(r.license)) q.licenseC = 1; }
      if (r.minDrivingYears) q.drivingYears = r.minDrivingYears;
      if (r.noRecord) q.noRecord = 1; if (r.minAge) q.minAge = r.minAge; if (r.maxAge) q.maxAge = r.maxAge;
      if (r.medical) q.health = Math.max(q.health || 0, 45);
      if (r.exam && HARD.test(r.exam)) q.exam = r.exam;
      if (r.experienceYears) q.experienceYears = r.experienceYears;
      D.economy.profReq[id] = q;
    });
  }

  // ---------- местные выборы пакета (мэр Москвы, муниципальные Москвы и Петербурга) ----------
  if (D.elections && D.politics) {
    D.politics.local = D.elections.events.filter(function (e) { return e.regionId && e.dateFrom; }).map(function (e) {
      return {year: e.year, month: +e.dateFrom.slice(5, 7) - 1, region: CENSUS[e.regionId], title: e.title, opts: ['Пойти и проголосовать'], local: true};
    }).filter(function (e) { return e.region; });
  }
})(RL.DATA);
