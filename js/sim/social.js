// Связи — отдельная валюта. Не «social 0–100», а конкретные люди: однокурсник-следователь, сослуживец в администрации,
// знакомый врач из областной, коллега-бизнесмен. Появляются из вуза, армии, работы, бани и гаража, родни; растут в чинах;
// без общения остывают. Открывают двери: работа «по знакомству», дело «развалилось», врач без очереди, проверку «решили».
// Каждая услуга тратит силу связи. Реалии: ВЦИОМ — около половины россиян находили работу через знакомых [~ 2017–2021];
// «блат» и «телефонное право» — по Ледневой (Ledeneva, 1998, 2013).
// Связь — это обязательство. Помог тебе — ты должен (t.owed); через 6–36 месяцев попросят вернуть (события fav_*,
// js/data/events_favors.js). Вернёшь — связь крепче; откажешь — связь рвётся, а иногда человек становится врагом (t.enemy):
// враг в полиции или администрации годами ждёт случая — донос, проверка, «не помню такого» в нужный день.
// Помог ты — должен тебе (t.theyOwe): просьба к нему сработает почти наверняка и без нового долга. Частоты [~].
RL.Social = (function () {
  var U = RL.util, S = RL.S;
  var SPH = {police: 'полиция', prosecutor: 'прокуратура', official: 'администрация', doctor: 'медицина', business: 'бизнес', bank: 'банк', military: 'военкомат', school: 'образование'};
  // кем становятся однокурсники по направлению диплома
  var BY_FIELD = {law: ['police', 'prosecutor', 'official', 'business'], med: ['doctor', 'doctor', 'doctor', 'business'], econ: ['bank', 'business', 'official', 'business'],
    gmu: ['official', 'official', 'prosecutor', 'business'], ped: ['school', 'school', 'official'], mil: ['military', 'police', 'official'],
    it: ['business', 'bank', 'business'], eng: ['business', 'official', 'business'], hum: ['school', 'official', 'business'], natsci: ['doctor', 'school', 'business'], agro: ['official', 'business'], arts: ['business', 'school']};
  var BY_PROF = {police: 'police', official: 'official', doctor: 'doctor', nurse: 'doctor', manager: 'business', business: 'business', banker: 'bank', teacher: 'school', military: 'military', lawyer: 'prosecutor'};
  var RANK = {1: '', 2: 'начальник', 3: 'большой человек'};
  var ROLE = {vuz: 'однокурсник', army: 'сослуживец', work: 'коллега', leisure: 'приятель', kin: 'родственник', school: 'одноклассник'};

  function ties(s) {
    var T = s.person.ties = s.person.ties || [];
    // старые сохранения: у связей не было id и долгов
    T.forEach(function (t, i) { if (!t.id) t.id = 'tie' + (t.since || 0) + '_' + i + '_' + (t.name || '').length; });
    return T;
  }
  function byId(s, id) { return ties(s).filter(function (t) { return t.id === id; })[0] || null; }
  function add(s, rng, src, sphere, quiet) {
    var T = ties(s); if (T.length >= 12) return null;
    var sex = rng.chance(sphere === 'doctor' || sphere === 'school' ? 0.6 : 0.3) ? 'f' : 'm';
    var name = RL.Birth.nameFor(rng, s.person.ethnic, sex);
    var t = {id: 'tie' + S.ageMonths(s) + '_' + T.length, name: typeof name === 'string' ? name : name.first || name.name || 'Знакомый', sex: sex, src: src, sphere: sphere, rank: 1, str: rng.int(35, 70), since: s.date.year, owed: 0, theyOwe: 0};
    T.push(t);
    if (!quiet) S.log(s, 'Новое знакомство: ' + t.name + ', ' + role(t) + ' — ' + SPH[sphere] + '.', 'info');
    return t;
  }
  function role(t) { var r = ROLE[t.src] || 'знакомый'; return t.sex === 'f' ? r.replace(/ник$/, 'ница').replace(/ец$/, 'ица').replace(/га$/, 'га').replace(/тель$/, 'тельница').replace(/ственник$/, 'ственница').replace(/ый$/, 'ая') : r; }
  function label(t) { return t.name + ', ' + role(t) + ' — ' + SPH[t.sphere] + (t.rank > 1 ? ' (' + RANK[t.rank] + ')' : ''); }
  // для панели: в каких вы отношениях
  function status(t) { return t.enemy ? 'враг' : t.owed > 0 ? 'ты долж' + (t.yourSex === 'f' ? 'на' : 'ен') : t.theyOwe > 0 ? 'долж' + (t.sex === 'f' ? 'на' : 'ен') + ' тебе' : t.str >= 60 ? 'близко' : t.str >= 30 ? 'общаетесь' : 'остывает'; }

  // лучшая живая связь в нужных сферах
  function best(s, spheres, minRank) {
    return ties(s).filter(function (t) { return !t.enemy && spheres.indexOf(t.sphere) >= 0 && t.str >= 20 && t.rank >= (minRank || 1); })
      .sort(function (a, b) { return b.rank * 40 + b.str - (a.rank * 40 + a.str); })[0] || null;
  }
  // попросить об услуге: шанс по чину и силе связи, сила падает в любом случае
  // помог — ты должен: в 70% случаев через 6–36 месяцев попросят ответную услугу [~]
  // клановость региона: родня и «свои» решают больше [~]
  function clan(s) { var L = RL.Young.loc(s).region, t = L.tags || []; return t.indexOf('caucasus') >= 0 ? 1.8 : t.indexOf('republic') >= 0 ? 1.3 : t.indexOf('capital') >= 0 ? 0.9 : 1; }
  function ask(s, t, rng, base) {
    var mine = t.theyOwe > 0;
    base += (clan(s) - 1) * 0.15 * (t.src === 'kin' ? 1.5 : 1);
    var ok = rng.chance(U.clamp(base + t.rank * 0.15 + (t.str - 50) / 200 + (mine ? 0.3 : 0), 0.05, 0.97));
    t.str = Math.max(0, t.str - (ok ? (mine ? 5 : 25) : 10)); t.used = (t.used || 0) + 1;
    var bio = s.person.bio = s.person.bio || {incSum: 0, incN: 0};
    if (ok) {
      bio.tiesUsed = (bio.tiesUsed || 0) + 1;
      if (mine) t.theyOwe--;
      else {
        t.owed = (t.owed || 0) + 1; t.yourSex = s.person.sex;
        if (rng.chance(0.7)) (s.favors = s.favors || []).push({at: S.ageMonths(s) + rng.int(6, 36), tie: t.id});
      }
    }
    return ok;
  }
  // ответная услуга: какую попросят — по сфере знакомого [~]
  var FAV = {police: ['fav_testimony', 'fav_blind_eye', 'fav_decide', 'fav_relative'], prosecutor: ['fav_testimony', 'fav_decide', 'fav_relative'],
    official: ['fav_hire', 'fav_vote', 'fav_relative', 'fav_sign'], business: ['fav_money', 'fav_hire', 'fav_sign', 'fav_guarantor'], bank: ['fav_money', 'fav_guarantor', 'fav_hire'],
    doctor: ['fav_relative', 'fav_money', 'fav_hire'], military: ['fav_relative', 'fav_blind_eye', 'fav_money'], school: ['fav_relative', 'fav_vote', 'fav_hire']};
  function favorsDue(s, rng) {
    if (!s.favors || !s.favors.length || s.pending) return;
    var am = S.ageMonths(s), due = s.favors.filter(function (f) { return am >= f.at; })[0];
    if (!due) return;
    s.favors.splice(s.favors.indexOf(due), 1);
    var t = byId(s, due.tie);
    if (!t || t.enemy || !t.owed) return;
    s.favorCur = t.id;
    RL.Events.queue(s, rng.pick(FAV[t.sphere] || ['fav_money']), {n: t.name, who: label(t), on: t.sex === 'f' ? 'она' : 'он', ego: t.sex === 'f' ? 'её' : 'его', emu: t.sex === 'f' ? 'ей' : 'ему'});
  }
  // враг ждёт случая: донос, проверка, отказ в нужный момент [~ 0,3% в месяц на врага]
  function enemies(s, rng) {
    if (s.pending) return;
    ties(s).forEach(function (t) {
      if (!t.enemy || s.pending || !rng.chance(0.003 * t.rank)) return;
      var v = {n: t.name, who: label(t), on: t.sex === 'f' ? 'она' : 'он'};
      var hasBiz = !!s.person.biz, job = s.person.job && s.person.job.employed;
      var id = (t.sphere === 'police' || t.sphere === 'prosecutor') ? 'enemy_report' : t.sphere === 'official' ? (hasBiz ? 'enemy_inspection' : 'enemy_block') : t.sphere === 'bank' ? 'enemy_credit' : job ? 'enemy_rumor' : 'enemy_block';
      RL.Events.queue(s, id, v);
      t.enemyHits = (t.enemyHits || 0) + 1;
      if (t.enemyHits >= 2 && rng.chance(0.5)) { t.enemy = false; t.str = 0; } // со временем отстают
    });
  }

  function monthly(s, rng) {
    var p = s.person, a = S.age(s), T = ties(s), soc = (p.traits.sociability || 0), m = p.flags;
    if (a < 14) return;
    // откуда берутся: выпуск из вуза — однокурсники, дембель — сослуживец
    var nd = (p.diplomas || []).filter(function (d) { return d.level !== 'СПО'; }).length;
    if (nd > (m.tiesDip || 0)) {
      m.tiesDip = nd;
      var d = p.diplomas.filter(function (x) { return x.level !== 'СПО'; }).slice(-1)[0], pool = BY_FIELD[d.field] || ['business'];
      var n = 1 + (soc > 20 ? 1 : 0) + (d.top ? 1 : 0);
      for (var i = 0; i < n; i++) add(s, rng, 'vuz', rng.pick(pool), i > 0);
    }
    if (p.flags.served && !m.tiesArmy) { m.tiesArmy = 1; if (rng.chance(0.5)) add(s, rng, 'army', rng.pick(['police', 'military', 'business', 'official']), false); }
    // работа и досуг: коллеги той же сферы, «нужные люди» из бани, гаража, рыбалки, партии
    var job = p.job && p.job.employed ? p.job : null;
    if (job && BY_PROF[job.prof] && rng.chance(0.006 * Math.exp(soc / 60))) add(s, rng, 'work', BY_PROF[job.prof], false);
    // родня с должностями — в клановых регионах связь появляется сама
    if (a >= 20 && clan(s) > 1.2 && rng.chance(0.0015 * clan(s))) add(s, rng, 'kin', rng.pick(['official', 'police', 'business', 'doctor']), false);
    var lf = ['fishing', 'party', 'friends', 'publicwork', 'girlfriends'].indexOf(p.focus) >= 0 || s.flags.partyMember;
    if (lf && a >= 18 && rng.chance(0.004 * Math.exp(soc / 60))) add(s, rng, 'leisure', rng.pick(['police', 'official', 'business', 'doctor', 'bank']), false);
    favorsDue(s, rng); enemies(s, rng);
    if (s.date.month !== 0) return;
    // раз в год: однокурсники растут в чинах, без общения связи остывают
    T.forEach(function (t) {
      var yrs = s.date.year - t.since;
      if (t.rank < 3 && yrs >= 5 && rng.chance(t.rank === 1 ? 0.12 : 0.04)) {
        t.rank++;
        if (t.str >= 30 && rng.chance(0.5)) S.log(s, t.name + ' (' + role(t) + ') теперь ' + RANK[t.rank] + ' — ' + SPH[t.sphere] + '.', 'info');
      }
      var keep = ['friends', 'fishing', 'girlfriends', 'party'].indexOf(p.focus) >= 0 ? 2 : 0;
      if (!t.enemy) t.str = U.clamp(t.str - 6 + keep + soc / 25, 0, 100);
    });
    // остывшие уходят из жизни; враги — нет, пока не отстанут
    var lost = T.filter(function (t) { return t.str < 8 && !t.enemy; });
    if (lost.length) { s.person.ties = T.filter(function (t) { return t.str >= 8 || t.enemy; }); }
    // родня с должностями — тоже связи (без отдельного учёта силы)
  }

  // услуги, которые встроены в другие системы
  function jobHelp(s, rng) {
    var t = best(s, ['business', 'official', 'bank', 'police', 'doctor', 'school']);
    if (!t || !rng.chance(0.35)) return null;
    return ask(s, t, rng, 0.45) ? t : null;
  }
  function facts(s, f) {
    f.tieLaw = !!best(s, ['police', 'prosecutor', 'official'], 2);
    f.tieDoctor = !!best(s, ['doctor']);
    f.tieOfficial = !!best(s, ['official', 'police', 'prosecutor']);
    f.tieMilitary = !!best(s, ['military', 'doctor']);
    f.ties = ties(s).filter(function (t) { return t.str >= 20 && !t.enemy; }).length;
    f.enemies = ties(s).filter(function (t) { return t.enemy; }).length;
    f.enemyLaw = ties(s).some(function (t) { return t.enemy && (t.sphere === 'police' || t.sphere === 'prosecutor' || t.sphere === 'official'); });
    f.owesFavor = ties(s).some(function (t) { return !t.enemy && t.owed > 0; });
  }
  // эффект события useTie: 'law' | 'doctor' | 'official' | 'military' — попросить, результат в лог
  var USE = {law: ['police', 'prosecutor', 'official'], doctor: ['doctor'], official: ['official', 'police', 'prosecutor'], military: ['military', 'doctor']};
  function applyEffects(s, eff, rng) {
    if (eff.addTie) { var nt = add(s, rng, eff.addTie.src || 'leisure', eff.addTie.sphere || 'business', true); if (nt) { nt.rank = eff.addTie.rank || 1; nt.str = 80; if (eff.addTie.theyOwe) nt.theyOwe = eff.addTie.theyOwe; } }
    // вернуть услугу / отказать (текущая просьба — s.favorCur)
    var cur = s.favorCur ? byId(s, s.favorCur) : null;
    if (eff.favorPay && cur) { cur.owed = Math.max(0, cur.owed - 1); cur.str = U.clamp(cur.str + 15, 0, 100); s.favorCur = null; bump(s, 'favorsPaid'); }
    if (eff.favorRefuse && cur) {
      cur.owed = 0; cur.str = Math.max(0, cur.str - 45); s.favorCur = null; bump(s, 'favorsRefused');
      if (cur.rank >= 2 || rng.chance(0.4)) { cur.enemy = true; cur.str = 0; S.log(s, cur.name + ' такого не забудет. Теперь у тебя есть враг — ' + SPH[cur.sphere] + '.', 'bad'); }
      else S.log(s, cur.name + ' больше не берёт трубку.', 'info');
    }
    if (eff.enemyDrop) ties(s).forEach(function (t) { if (t.enemy && rng.chance(0.5)) { t.enemy = false; t.str = 0; } });
    if (!eff.useTie) return;
    var t = best(s, USE[eff.useTie] || []);
    if (!t) return;
    var ok = ask(s, t, rng, eff.useTie === 'law' ? 0.4 * (0.6 + S.region(s).corruption) : 0.5);
    S.trait(s, 'honesty', -1);
    s.lastTie = ok;
    S.log(s, ok ? 'Позвонил' + (s.person.sex === 'f' ? 'а' : '') + ' ' + label(t) + '. Вопрос решили.' : label(t) + ': «Тут даже я ничего не сделаю».', ok ? 'good' : 'bad');
    if (ok && eff.onTie) RL.Events.applyEffects(s, eff.onTie, {}, rng);
    if (!ok && eff.noTie) RL.Events.applyEffects(s, eff.noTie, {}, rng);
  }
  // для суда: последняя надежда — звонок «нужному человеку»
  function courtOption(s) { return best(s, ['police', 'prosecutor', 'official'], 2); }

  function bump(s, k) { var b = s.person.bio = s.person.bio || {incSum: 0, incN: 0}; b[k] = (b[k] || 0) + 1; }
  return {clan: clan, status: status, byId: byId, monthly: monthly, ties: ties, best: best, ask: ask, label: label, jobHelp: jobHelp, facts: facts, applyEffects: applyEffects, courtOption: courtOption, add: add};
})();
