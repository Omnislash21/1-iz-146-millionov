// Общие помощники над состоянием + «факты» — плоский срез состояния для условий событий.
RL.S = (function () {
  var U = RL.util;
  // регион по id — через кэш (поиск вызывается тысячи раз за жизнь)
  var regMap = null, regN = 0;
  function regionById(id) {
    if (!regMap || regN !== RL.DATA.regions.length) { regMap = {}; regN = RL.DATA.regions.length; RL.DATA.regions.forEach(function (r) { regMap[r.id] = r; }); }
    return regMap[id];
  }
  function region(s) { return regionById(s.person.regionId); }
  function st(s) { return RL.DATA.settlementTypes[s.person.settlement]; }
  function ageMonths(s) { return (s.date.year - s.birth.year) * 12 + (s.date.month - s.birth.month); }
  function age(s) { return ageMonths(s) / 12; }
  function members(s) { return s.family.members; }
  function home(s) { return s.family.members.filter(function (m) { return m.alive && m.inHome; }); }
  function byRole(s, role) { return s.family.members.filter(function (m) { return m.role === role; })[0]; }
  function mother(s) { return byRole(s, 'mother'); }
  function father(s) { return byRole(s, 'father'); }
  // мужчина-«глава» в доме: отец, отчим или приёмный отец
  function manInHome(s) {
    return home(s).filter(function (m) { return m.sex === 'm' && ['father', 'stepfather', 'adoptive_father'].indexOf(m.role) >= 0; })[0];
  }
  function adultsHome(s) { return home(s).filter(function (m) { return m.role !== 'sibling' || m.age >= 18; }); }
  function childrenHome(s) { return home(s).filter(function (m) { return m.role === 'sibling' && m.age < 18; }).length + (age(s) < 18 && !(RL.Young && RL.Young.apart(s)) ? 1 : 0); }
  function hasCond(s, id) { return s.person.conditions.some(function (c) { return c.id === id && !c.cured; }); }
  function stage(s) { return s.person.education.stage; }

  // слова не своей эпохи (js/data/era.js): заменить тем, что было раньше; eraBad — осталось ли что-то, чего ещё нет
  var ERA = null;
  function eraRules() {
    if (!ERA) ERA = (RL.DATA.eraTerms || []).map(function (t) {
      return {re: new RegExp('(^|[^А-Яа-яЁёA-Za-z])(' + t.re + ')(?![А-Яа-яЁёa-z])', 'g'), from: t.from, to: t.to, before: t.before};
    });
    return ERA;
  }
  function eraOk(r, y) { return y >= r.from && (!r.to || y <= r.to); }
  function era(t, y) {
    if (typeof t !== 'string' || !y) return t;
    eraRules().forEach(function (r) {
      if (eraOk(r, y) || r.before == null) return;
      t = t.replace(r.re, function (m, pre, all, end) {
        var b = typeof r.before === 'string' ? r.before : r.before[typeof end === 'string' ? end : ''];
        if (b == null) return m;
        if (!pre) b = b.charAt(0).toUpperCase() + b.slice(1);
        return pre + b;
      });
    });
    return t;
  }
  function eraBad(t, y) { return typeof t === 'string' && eraRules().some(function (r) { r.re.lastIndex = 0; return !eraOk(r, y) && r.re.test(t); }); }
  function log(s, text, type) {
    s.log.push({y: s.date.year, m: s.date.month, d: s.date.day || 0, age: Math.floor(age(s)), text: era(text, s.date.year), type: type || 'info'});
    if (s.log.length > 4000) s.log.splice(0, 500);
  }
  // Изменение показателя ребёнка. Негатив для психики смягчается задатком «устойчивость».
  function adj(s, stat, d) {
    if (!d) return;
    var p = s.person;
    if (stat === 'mental' && d < 0) d *= 1.35 - p.hidden.resilience / 100 * 0.7;
    if (stat === 'health') {
      var cap = healthCap(s);
      p.stats.health = U.clamp(p.stats.health + d, 0, Math.max(cap, d < 0 ? 0 : p.stats.health));
      return;
    }
    p.stats[stat] = U.clamp(p.stats[stat] + d, 0, 100);
  }
  function healthCap(s) {
    var cap = 100;
    s.person.conditions.forEach(function (c) {
      if (c.cured) return;
      var d = RL.DATA.conditions[c.id];
      if (d && d.cap) cap = Math.min(cap, c.treated ? Math.min(100, d.cap + 8) : d.cap);
    });
    return cap;
  }
  function trait(s, t, d) {
    if (!d) return;
    var p = s.person;
    // черты твердеют с возрастом: в 3 года меняются легко, к 10 — медленнее
    var k = 1.4 - Math.min(1, age(s) / 15) * 0.6;
    p.traits[t] = U.clamp((p.traits[t] || 0) + d * k, -100, 100);
  }
  function relName(m) {
    var map = {mother: 'мама', father: 'папа', stepfather: 'отчим', stepmother: 'мачеха', grandmother_m: 'бабушка', grandmother_p: 'бабушка',
      grandfather_m: 'дедушка', grandfather_p: 'дедушка', sibling: m && m.sex === 'm' ? 'брат' : 'сестра', adoptive_mother: 'приёмная мама', adoptive_father: 'приёмный папа'};
    return map[m.role] || m.role;
  }
  function profName(m) {
    var p = RL.DATA.economy.professions.filter(function (x) { return x.id === m.job.prof; })[0];
    return p ? p[m.sex] : '';
  }
  function prof(m) { return RL.DATA.economy.professions.filter(function (x) { return x.id === m.job.prof; })[0]; }
  var PARENT_ROLES = ['mother', 'father', 'stepfather', 'stepmother', 'adoptive_mother', 'adoptive_father'];
  // Кто сейчас растит ребёнка (для текстов событий): падежи — им., дат., вин., род.
  function carer(s) {
    var hm = home(s), pick = function (roles) { return hm.filter(function (m) { return roles.indexOf(m.role) >= 0; })[0]; };
    if (s.family.type === 'orphanage') return {n: 'воспитательница', d: 'воспитательнице', a: 'воспитательницу', g: 'воспитательницы', f: true, who: null};
    var m = pick(['mother', 'adoptive_mother']) || pick(['father', 'adoptive_father']) || pick(['grandmother_m', 'grandmother_p']) || pick(['grandfather_m', 'grandfather_p']) || pick(['stepfather', 'stepmother']);
    if (!m) return {n: 'взрослые', d: 'взрослым', a: 'взрослых', g: 'взрослых', f: false, plural: true, who: null};
    var r = m.role;
    if (r === 'mother' || r === 'adoptive_mother') return {n: 'мама', d: 'маме', a: 'маму', g: 'мамы', f: true, who: m};
    if (r === 'father' || r === 'adoptive_father') return {n: 'папа', d: 'папе', a: 'папу', g: 'папы', f: false, who: m};
    if (r.indexOf('grandmother') === 0) return {n: 'бабушка', d: 'бабушке', a: 'бабушку', g: 'бабушки', f: true, who: m};
    if (r.indexOf('grandfather') === 0) return {n: 'дедушка', d: 'дедушке', a: 'дедушку', g: 'дедушки', f: false, who: m};
    return {n: relName(m), d: relName(m), a: relName(m), g: relName(m), f: m.sex === 'f', who: m};
  }
  function parentsAlive(s) { return s.family.members.filter(function (m) { return PARENT_ROLES.indexOf(m.role) >= 0 && m.alive && !m.unknown; }); }

  // Плоские факты для условий событий.
  function facts(s) {
    var p = s.person, r = region(s), a = age(s), y = s.date.year, fam = s.family;
    var man = manInHome(s), mom = mother(s);
    var hm = home(s);
    var f = {
      age: a, ageM: ageMonths(s), sex: p.sex, year: y, month: s.date.month,
      season: [0, 1, 11].indexOf(s.date.month) >= 0 ? 'winter' : s.date.month <= 4 ? 'spring' : s.date.month <= 7 ? 'summer' : 'autumn',
      region: r.id, tags: r.tags, settlement: p.settlement,
      bigCity: ['megapolis', 'million', 'big'].indexOf(p.settlement) >= 0,
      village: p.settlement === 'village', smallTown: p.settlement === 'small' || p.settlement === 'village',
      familyType: fam.type, orphanage: fam.type === 'orphanage',
      quintile: fam.quintile || 3, poor: !!fam.poverty, rich: (fam.quintile || 3) >= 5,
      debt: (fam.debts || []).reduce(function (t, d) { return t + d.balance; }, 0) > 0,
      mfo: (fam.debts || []).some(function (d) { return d.kind === 'mfo' && d.balance > 0; }),
      hasMan: !!man, manRole: man ? man.role : null, manAlcohol: man ? man.alcohol : 0, manViolent: !!(man && man.violent),
      motherHome: !!(mom && mom.alive && mom.inHome), motherAlcohol: mom && mom.inHome ? mom.alcohol : 0,
      momAlive: !!(mom && mom.alive && !mom.unknown), dadAlive: !!(father(s) && father(s).alive && !father(s).unknown),
      dadHome: !!(father(s) && father(s).alive && father(s).inHome),
      parentHome: hm.some(function (m) { return PARENT_ROLES.indexOf(m.role) >= 0; }),
      parentAlive: fam.members.some(function (m) { return PARENT_ROLES.indexOf(m.role) >= 0 && m.alive && !m.unknown; }),
      adultHome: hm.some(function (m) { return m.role !== 'sibling' || m.age >= 18; }),
      grandpaAlive: fam.members.some(function (m) { return m.role.indexOf('grandfather') === 0 && m.alive; }),
      familyAlcohol: hm.some(function (m) { return m.alcohol >= 2; }),
      parentsSmoke: hm.some(function (m) { return m.smokes; }),
      grandmaHome: hm.some(function (m) { return m.role.indexOf('grandmother') === 0; }),
      grandmaAlive: fam.members.some(function (m) { return m.role.indexOf('grandmother') === 0 && m.alive; }),
      siblings: fam.members.filter(function (m) { return m.role === 'sibling' && m.alive; }).length,
      youngerSibling: fam.members.some(function (m) { return m.role === 'sibling' && m.alive && m.age < a; }),
      atmosphere: fam.atmosphere, car: !!fam.car, dacha: !!fam.dacha, housing: fam.housing.type,
      crowded: fam.housing.area > 0 && hm.length * 10 > fam.housing.area,
      migrant: !!p.migrant, minority: ((RL.DATA.ethnic[p.ethnic] || {}).minority || 0), ethnic: p.ethnic, religion: p.religionTradition,
      health: p.stats.health, mental: p.stats.mental, social: p.stats.social, skills: p.stats.skills, happiness: p.stats.happiness,
      appearance: p.appearance, focus: p.focus, stage: p.education.stage, grade: p.education.grade, schoolType: p.education.school ? p.education.school.type : null,
      kindergarten: p.education.stage === 'kindergarten', school: p.education.stage === 'school',
      unvaccinated: !!fam.flags.vaccineRefusal, chronic: p.conditions.some(function (c) { return !c.cured && RL.DATA.conditions[c.id].kind !== 'acute'; }),
      disability: !!p.disability, svo: !!RL.World.flag(s, y, 'svo', 0), crisis: RL.World.flag(s, y, 'jobLoss', 1) >= 1.3,
      deployed: fam.members.some(function (m) { return m.alive && m.job && m.job.deployed; }),
      measlesYear: !!RL.World.flag(s, y, 'measles', 0), epidemic: RL.World.flag(s, y, 'epidemic', 0),
      siberiaFE: r.tags.indexOf('siberia') >= 0 || r.tags.indexOf('fareast') >= 0,
      lowIq: p.hidden.iq < 85, stress: fam.atmosphere < 40 || p.stats.mental < 40,
      infant: a < 1, summer: [5, 6, 7].indexOf(s.date.month) >= 0, winter: [11, 0, 1].indexOf(s.date.month) >= 0,
      poorHousing: fam.housing.condition < 30
    };
    // подростковое
    var h = p.habits || {};
    ['smoking', 'alcohol', 'drugs', 'gaming'].forEach(function (k) { f['habit_' + k] = h[k] || 0; });
    f.habit_drugs2 = (h.drugs || 0) >= 2;
    f.lowResilience = p.hidden.resilience < 35;
    f.college = p.education.stage === 'college'; f.working = p.education.stage === 'work'; f.colony = p.education.stage === 'colony';
    f.attestat9 = p.education.attestat9 || 0; f.noAttestat9 = !!p.education.noAttestat9;
    f.profile = p.education.profile || null; f.prep = p.education.prep || 0;
    f.criminalRecord = !!p.flags.criminalRecord;
    // молодость
    f.employed = !!(p.job && p.job.employed); f.livingApart = !!(RL.Young && RL.Young.apart(s));
    f.served = !!p.flags.served; f.evader = !!p.flags.evader; f.vuz = p.education.stage === 'vuz'; f.inArmy = p.education.stage === 'army';
    f.armyKind = p.army ? p.army.kind : null; f.higherEdu = (p.diplomas || []).some(function (d) { return d.level !== 'СПО'; });
    f.capitalLoc = !!(p.loc ? ['msk', 'spb'].indexOf(p.loc.regionId) >= 0 : r.tags.indexOf('capital') >= 0 || r.id === 'spb');
    f.ownDebt = !!(p.own && p.own.debts && p.own.debts.some(function (d) { return d.balance > 0 && !d.deferred && d.kind !== 'mortgage'; }));
    if (RL.Adult) RL.Adult.facts(s, f);
    if (RL.OwnFamily) RL.OwnFamily.facts(s, f);
    f.male = p.sex === 'm'; f.smoker = ((p.habits || {}).smoking || 0) >= 2; f.drinker = ((p.habits || {}).alcohol || 0) >= 2;
    if (RL.Old) RL.Old.facts(s, f);
    if (RL.Law) RL.Law.facts(s, f);
    if (RL.Assets) RL.Assets.facts(s, f);
    if (RL.Careers) RL.Careers.facts(s, f);
    if (RL.Leisure) RL.Leisure.facts(s, f);
    f.prof = p.job && p.job.employed ? p.job.prof : null;
    f.birthdayMonth = s.date.month === s.birth.month;
    if (RL.Politics) RL.Politics.facts(s, f);
    f['focus_' + p.focus] = true;
    Object.keys(p.hidden).forEach(function (k) { f['hidden_' + k] = p.hidden[k]; });
    Object.keys(p.traits).forEach(function (k) { f['trait_' + k] = p.traits[k]; });
    p.conditions.forEach(function (c) { if (!c.cured) f[c.id] = true; });
    Object.keys(s.flags).forEach(function (k) { f['flag_' + k] = s.flags[k]; });
    return f;
  }

  return {era: era, eraBad: eraBad, region: region, regionById: regionById, st: st, age: age, ageMonths: ageMonths, home: home, byRole: byRole, mother: mother, father: father,
    manInHome: manInHome, adultsHome: adultsHome, childrenHome: childrenHome, hasCond: hasCond, stage: stage,
    log: log, adj: adj, trait: trait, healthCap: healthCap, facts: facts, relName: relName, profName: profName, prof: prof,
    carer: carer, parentsAlive: parentsAlive, PARENT_ROLES: PARENT_ROLES};
})();
