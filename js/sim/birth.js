// Рождение: игрок задаёт пол, имя, фамилию, год. Всё остальное — случайно по статистике.
RL.Birth = (function () {
  var U = RL.util;
  var DD = function () { return RL.DATA; };
  var uid = 0;

  function eraTable(t, y) { return U.interpYear(t, Math.min(y, 2025)); }
  function eraRow(t, y) {
    var ys = Object.keys(t).map(Number).sort(function (a, b) { return a - b; }), best = ys[0];
    ys.forEach(function (k) { if (k <= y) best = k; });
    return t[best];
  }

  function pickRegion(rng, y) {
    var regs = DD().regions.filter(function (r) { return !r.legacy && (!r.fromYear || y >= r.fromYear); });
    return rng.weighted(regs, function (r) { return r.pop * r.birthMul; });
  }
  function hasTag(region, t) { return region.tags.indexOf(t) >= 0; }

  function patronymic(fatherName, sex) {
    var ex = DD().patronymicExceptions[fatherName];
    if (ex) return sex === 'm' ? ex[0] : ex[1];
    var n = fatherName;
    // Юрий → Юрьевич, Василий → Васильевич; после двух согласных — Дмитриевич, Георгиевич
    if (/ий$/.test(n)) { var b = n.slice(0, -2); var soft = /[аеёиоуыэюя][^аеёиоуыэюя]$/i.test(b); return b + (soft ? (sex === 'm' ? 'ьевич' : 'ьевна') : (sex === 'm' ? 'иевич' : 'иевна')); }
    if (/[йь]$/.test(n)) { var b2 = n.slice(0, -1); return b2 + (sex === 'm' ? 'евич' : 'евна'); }
    if (/а$/.test(n)) { var b3 = n.slice(0, -1); return b3 + (sex === 'm' ? 'ович' : 'овна'); }
    if (/[жшчщц]$/.test(n)) return n + (sex === 'm' ? 'евич' : 'евна');
    return n + (sex === 'm' ? 'ович' : 'овна');
  }

  // имя, которого ещё нет у братьев и сестёр (taken — список занятых имён); после 8 попыток берём любое
  function freshName(rng, ethnicId, sex, taken) {
    var n = nameFor(rng, ethnicId, sex);
    for (var i = 0; i < 8 && taken.indexOf(n) >= 0; i++) n = nameFor(rng, ethnicId, sex);
    return n;
  }
  function nameFor(rng, ethnicId, sex) {
    var e = DD().ethnic[ethnicId] || DD().ethnic.other;
    var set = DD().names[e.names] || DD().names.slavic;
    return rng.pick(set[sex]);
  }

  function eduLevel(rng, y, sex, settlement, region, boost) {
    var row = eraTable2(DD().demography.parentEducation, y)[sex];
    var mul = DD().demography.educationSettlementMul[settlement] || 1;
    if (region.id === 'msk') mul *= 1.15;
    var pHigh = U.clamp(row[0] * mul * (boost || 1), 0.02, 0.8);
    var pSpo = row[1];
    var r = rng.next();
    if (r < pHigh) return 2;
    if (r < pHigh + pSpo * (1 - pHigh) / (1 - row[0])) return 1;
    return 0;
  }
  function eraTable2(t, y) { return eraRow(t, y); }

  function pickProfession(rng, edu, sex, settlement, y) {
    var profs = DD().economy.professions.filter(function (p) {
      if (p.edu > edu || p.heroOnly) return false;
      if (p.fromYear && y < p.fromYear) return false;
      if (p.cityOnly && (settlement === 'village' || settlement === 'small')) return false;
      if (p.village && settlement !== 'village' && settlement !== 'small') return false;
      return true;
    });
    return rng.weighted(profs, function (p) {
      var w = p.sex[sex] || 0.01;
      if (p.edu === edu) w *= 3;
      if (p.village && settlement === 'village') w *= 4;
      if (p.id === 'it') w *= (y < 2005 ? 0.2 : y < 2015 ? 0.6 : 1);
      if (p.id === 'business' && y >= 1992 && y <= 2000) w *= 1.8;
      if (p.id === 'rotation' && settlement === 'village') w *= 1.3;
      return w;
    });
  }

  function alcoholLevel(rng, sex, region, settlement, edu, ethnicId, y, state) {
    var base = sex === 'm' ? [0.62, 0.24, 0.10, 0.04] : [0.88, 0.09, 0.025, 0.005];
    var mul = region.alcohol * (DD().settlementTypes[settlement].alcohol || 1);
    if (edu === 2) mul *= 0.55; else if (edu === 0) mul *= 1.25;
    var eth = DD().ethnic[ethnicId];
    if (eth && eth.religion === 'muslim') mul *= 0.25;
    mul *= RL.World.flag(state, y, 'alcohol', 1);
    var pProblem = U.clamp((base[2] + base[3]) * mul, 0, 0.6);
    var pRegular = U.clamp(base[1] * Math.sqrt(mul), 0, 0.5);
    var r = rng.next();
    if (r < pProblem * (base[3] / (base[2] + base[3]))) return 3;
    if (r < pProblem) return 2;
    if (r < pProblem + pRegular) return 1;
    return 0;
  }

  function smokerP(sex, y) {
    if (sex === 'm') return y < 2000 ? 0.6 : y < 2010 ? 0.55 : y < 2020 ? 0.45 : 0.38;
    return y < 1992 ? 0.1 : y < 2000 ? 0.17 : y < 2015 ? 0.21 : 0.15;
  }

  function makeAdult(rng, o) {
    // o: role, sex, age, ethnic, region, settlement, year, eduBoost
    var edu = o.edu !== undefined ? o.edu : eduLevel(rng, o.year, o.sex, o.settlement, o.region, o.eduBoost);
    var prof = pickProfession(rng, edu, o.sex, o.settlement, o.year);
    var st = DD().settlementTypes[o.settlement];
    var ageF = U.clamp(0.82 + (Math.min(o.age, 45) - 20) * 0.012, 0.82, 1.1);
    var base = prof.wage * DD().economy.wageScale * o.region.wage * st.wage * ageF * rng.lognorm(prof.sd);
    var shadowP = U.clamp(prof.shadow * eraTable(DD().economy.shadowLevel, o.year) / 0.15 * 0.6, 0, 0.9);
    var alc = alcoholLevel(rng, o.sex, o.region, o.settlement, edu, o.ethnic, o.year, o.state);
    var u = RL.World.unemployment(o.state, o.year) / 100 * o.region.unemployment;
    var uMul = edu === 2 ? 0.6 : edu === 1 ? 1 : 1.5;
    if (alc >= 2) uMul *= 1.8;
    var employed = !rng.chance(U.clamp(u * uMul * (prof.unempl || 1), 0, 0.6));
    var m = {
      id: 'p' + (++uid) + '_' + rng.int(1000, 9999),
      role: o.role, sex: o.sex, name: o.name || nameFor(rng, o.ethnic, o.sex), age: o.age,
      ethnic: o.ethnic, alive: true, inHome: o.inHome !== false, edu: edu,
      job: {prof: prof.id, base: Math.round(base), shadow: rng.chance(shadowP) ? rng.range(0.3, 1) : 0,
        employed: employed, onLeave: false, arrearsOwed: 0, deployed: null, monthsUnemployed: employed ? 0 : rng.int(1, 12)},
      alcohol: alc, smokes: rng.chance(smokerP(o.sex, o.year) * (alc >= 2 ? 1.4 : 1)),
      violent: false, health: U.clamp(rng.normal(78, 9) - alc * 6, 25, 98),
      relation: U.clamp(rng.normal(70, 12), 20, 100), hiv: false
    };
    m.violent = o.sex === 'm' && rng.chance(0.03 + (alc >= 2 ? 0.18 : 0) + (alc === 3 ? 0.12 : 0));
    return m;
  }

  function grandparents(rng, fam, parent, side, ctx) {
    var st = DD().settlementTypes[ctx.settlement];
    // бабушка и дедушка по линии parent. Живы ли — по выживаемости до их возраста.
    ['f', 'm'].forEach(function (sex) {
      var age = Math.round(parent.age + rng.normal(sex === 'f' ? 25.5 : 28, 4));
      var pAlive = survivalTo(ctx.state, ctx.year, sex, age, 20);
      if (!rng.chance(pAlive)) return;
      var g = {
        id: 'g' + (++uid) + '_' + rng.int(1000, 9999), role: (sex === 'f' ? 'grandmother_' : 'grandfather_') + side,
        sex: sex, name: nameFor(rng, parent.ethnic, sex), age: age, ethnic: parent.ethnic, alive: true, inHome: false,
        edu: Math.max(0, parent.edu - (rng.chance(0.5) ? 1 : 0)),
        job: {prof: null, base: 0, shadow: 0, employed: age < (sex === 'f' ? 55 : 60) && rng.chance(0.7), pension: age >= (sex === 'f' ? 55 : 60)},
        alcohol: sex === 'm' ? (rng.chance(0.15) ? 2 : rng.chance(0.25) ? 1 : 0) : 0,
        smokes: sex === 'm' && rng.chance(0.4), violent: false,
        health: U.clamp(rng.normal(80 - (age - 40) * 0.8, 10), 20, 95), relation: U.clamp(rng.normal(70, 15), 10, 100)
      };
      if (g.job.employed) {
        var pr = pickProfession(rng, g.edu, sex, ctx.settlement, ctx.year);
        g.job.prof = pr.id; g.job.base = Math.round(pr.wage * DD().economy.wageScale * ctx.region.wage * st.wage * 0.95 * rng.lognorm(pr.sd));
        g.job.shadow = 0;
      }
      fam.members.push(g);
    });
  }
  // вероятность дожить от возраста a0 до a по таблице года y (грубо)
  function survivalTo(state, y, sex, a, a0) {
    var l = 1;
    for (var k = a0; k < a; k++) l *= 1 - RL.Mortality.qx(state, y, sex, k);
    return l;
  }

  function generateHousing(rng, s, fam, region, settlement, y, mother, father, incomeHint) {
    var w = {};
    var urban = settlement !== 'village';
    var houseP = {megapolis: 0.02, million: 0.06, big: 0.09, medium: 0.17, small: 0.38, village: 0.85}[settlement];
    w.private_house = houseP;
    w.flat = urban ? 0.6 : 0.1;
    w.parents_flat = 0.13 * ((mother && mother.age < 23) ? 2 : 1);
    w.dorm_room = y < 2000 ? 0.12 : y < 2010 ? 0.06 : 0.03;
    if (!urban) w.dorm_room = 0.01;
    w.rent = urban ? (y < 1992 ? 0.02 : y < 2000 ? 0.06 : 0.13) * (settlement === 'megapolis' ? 1.5 : 1) : 0.02;
    w.new_mortgage = (y >= 2006 && urban) ? (y < 2012 ? 0.05 : y < 2020 ? 0.12 : 0.16) * U.clamp(incomeHint, 0.3, 2.5) : 0;
    w.dilapidated = 0.03 * (settlement === 'small' || settlement === 'village' ? 2 : 1) * (hasTag(region, 'north') || hasTag(region, 'fareast') ? 1.8 : 1);
    if (s.person.migrant) { w.rent *= 5; w.dorm_room *= 3; w.flat *= 0.2; w.new_mortgage *= 0.1; w.parents_flat *= 0.2; }
    if (fam.type === 'single_mother') { w.parents_flat *= 2.5; w.new_mortgage *= 0.4; }
    var type = rng.weightedKey(w);
    var h = {type: type, rooms: 2, area: 46, owned: true, rentKey: null, mortgage: null, condition: 60};
    switch (type) {
      case 'private_house': h.area = Math.round(rng.range(40, 110)); h.rooms = h.area > 70 ? 3 : 2; h.condition = rng.int(30, 85);
        h.name = settlement === 'village' ? 'частный дом с печным/газовым отоплением' : 'частный дом'; break;
      case 'flat': h.rooms = rng.weightedKey({1: 0.25, 2: 0.5, 3: 0.22, 4: 0.03}) * 1;
        h.area = [0, 33, 46, 62, 78][h.rooms] + rng.int(-4, 6);
        h.name = rng.weightedKey(y < 2000 ? {'хрущёвка': 0.4, 'панельная девятиэтажка': 0.45, 'сталинка': 0.08, 'кирпичный дом': 0.07} :
          {'хрущёвка': 0.3, 'панельная девятиэтажка': 0.45, 'сталинка': 0.05, 'кирпичный дом': 0.1, 'новостройка (без ипотеки)': 0.1});
        h.name = h.rooms + '-комнатная квартира, ' + h.name; h.condition = rng.int(40, 80); break;
      case 'parents_flat': h.rooms = rng.int(2, 3); h.area = h.rooms === 2 ? 46 : 60; h.owned = false; h.withParents = true; h.condition = rng.int(40, 75);
        h.name = 'квартира родителей ' + (rng.chance(0.65) ? 'мамы' : 'папы') + ' (живёте вместе)'; break;
      case 'dorm_room': h.rooms = 1; h.area = rng.int(12, 20); h.owned = y < 1992 ? false : rng.chance(0.5); h.condition = rng.int(20, 55);
        h.name = rng.chance(0.5) ? 'комната в общежитии' : 'комната в коммуналке'; h.queue = y < 1992; break;
      case 'rent': h.rooms = rng.chance(0.65) ? 1 : 2; h.area = h.rooms === 1 ? 34 : 48; h.owned = false; h.rentKey = h.rooms - 1;
        h.condition = rng.int(40, 75); h.name = 'съёмная ' + h.rooms + '-комнатная квартира'; break;
      case 'new_mortgage': h.rooms = rng.chance(0.55) ? 1 : 2; h.area = h.rooms === 1 ? 38 : 56; h.condition = 85;
        h.name = 'новостройка в ипотеку (' + h.rooms + '-комн.)';
        var price = h.area * 110000 * region.price * DD().settlementTypes[settlement].price * (y < 2015 ? 0.85 : 1);
        h.mortgage = {balance: price * 0.8, rate: y < 2015 ? 0.12 : y < 2021 ? 0.08 : 0.06, monthsLeft: 240}; break;
      case 'dilapidated': h.rooms = rng.int(1, 2); h.area = rng.int(25, 40); h.condition = rng.int(5, 25); h.owned = false;
        h.name = rng.chance(0.5) ? 'барак (аварийное жильё)' : 'ветхий деревянный дом'; break;
    }
    if (h.mortgage) {
      var r = h.mortgage.rate / 12, n = h.mortgage.monthsLeft;
      h.mortgage.payment = h.mortgage.balance * r / (1 - Math.pow(1 + r, -n));
    }
    return h;
  }

  function generate(input, seed) {
    var rng = new RL.RNG(seed);
    var y = input.birthYear;
    var s = {
      version: 1, seed: seed, rng: null,
      settings: {secondsPerYear: 24, speed: 4, auto: false, minorAuto: true, daily: true},
      date: {year: y, month: rng.int(0, 11)},
      world: {future: RL.World.buildFuture(seed)},
      person: {}, family: {members: [], flags: {}}, log: [], history: [], pending: null, queue: [], over: false,
      flags: {}, cooldowns: {}, fired: {}
    };
    s.birth = {year: y, month: s.date.month};
    var region = pickRegion(rng, y);
    var settlement = rng.weightedKey(region.urban);
    var city = rng.pick(region.cities[settlement]);
    var st = DD().settlementTypes[settlement];
    var p = s.person;
    p.sex = input.sex; p.firstName = input.firstName; p.lastName = input.lastName;
    p.regionId = region.id; p.settlement = settlement; p.city = city;
    p.alive = true; p.age = 0;

    // мигранты
    var eraMig = y < 1992 ? 0 : y < 2000 ? 0.3 : y < 2010 ? 0.7 : 1;
    var migP = region.migrantShare * eraMig * (['megapolis', 'million', 'big'].indexOf(settlement) >= 0 ? 1 : 0.3);
    var ethnicM, ethnicF;
    if (rng.chance(migP)) {
      ethnicM = rng.weightedKey(DD().migrantOrigins); ethnicF = ethnicM;
      p.migrant = {origin: ethnicM, status: rng.weightedKey({citizen: 0.3, legal: 0.5, undocumented: 0.2})};
    } else {
      ethnicM = rng.weightedKey(region.ethnic);
      ethnicF = rng.chance(0.12) ? rng.weightedKey(region.ethnic) : ethnicM;
      p.migrant = null;
    }
    p.ethnic = rng.chance(0.6) ? ethnicF : ethnicM;
    p.religionTradition = (DD().ethnic[p.ethnic] || DD().ethnic.other).religion;

    // очерёдность рождения
    var bo = hasTag(region, 'chechnya') ? DD().demography.birthOrderChechnya :
      hasTag(region, 'caucasus') ? DD().demography.birthOrderCaucasus : eraRow(DD().demography.birthOrder, y);
    if (p.migrant) bo = DD().demography.birthOrderCaucasus;
    var order = rng.weighted([0, 1, 2, 3], function (i) { return bo[i]; });
    if (order === 3) order = 3 + (rng.chance(0.3) ? rng.int(1, 3) : 0);

    var mAge = Math.round(U.clamp(rng.normal(eraTable(DD().demography.motherAgeFirst, y) + order * 3.2, 4.2), 16, 46));
    var fAge = Math.round(U.clamp(mAge + rng.normal(3, 3.5), 17, 65));
    var ctx = {state: s, year: y, region: region, settlement: settlement};

    // тип семьи
    var fam = s.family;
    var extra = eraTable(DD().demography.extramaritalShare, y);
    var mulSM = 1;
    var smm = DD().demography.singleMotherRegionMul;
    region.tags.forEach(function (t) { if (smm[t]) mulSM *= smm[t]; });
    if (settlement === 'village') mulSM *= 1.1;
    var pSingle = U.clamp(extra * 0.5 * mulSM, 0.01, 0.5);
    var pCohab = U.clamp(extra * 0.5 * (hasTag(region, 'caucasus') ? 1.6 : 1), 0, 0.5);
    var pRefusal = eraTable(DD().demography.refusalShare, y);
    var pMaternalDeath = eraTable(DD().demography.maternalMortality, y) / 100000;
    var r = rng.next();
    var famType;
    if (r < pRefusal) famType = 'orphanage';
    else if (r < pRefusal + 0.004) famType = 'grandparents';
    else if (r < pRefusal + 0.004 + pSingle) famType = 'single_mother';
    else if (r < pRefusal + 0.004 + pSingle + pCohab) famType = 'cohab';
    else famType = 'married';
    fam.type = famType;

    var eduBoostF = 1;
    var mother = makeAdult(rng, {role: 'mother', sex: 'f', age: mAge, ethnic: ethnicF, region: region, settlement: settlement, year: y, state: s});
    if (mother.edu === 2) eduBoostF = 1.7; else if (mother.edu === 0) eduBoostF = 0.6;
    var father = makeAdult(rng, {role: 'father', sex: 'm', age: fAge, ethnic: ethnicM, region: region, settlement: settlement, year: y, eduBoost: eduBoostF, state: s});
    if (famType === 'orphanage') {
      // отказ: чаще молодые, бедные, пьющие матери
      mother.alcohol = Math.max(mother.alcohol, rng.chance(0.5) ? 3 : 2);
      mother.inHome = false; father.inHome = false; father.unknown = rng.chance(0.7);
    }
    if (famType === 'single_mother') { father.inHome = false; father.unknown = rng.chance(0.55); }
    if (famType === 'grandparents') { mother.inHome = false; father.inHome = false; father.unknown = rng.chance(0.5); }
    mother.job.onLeave = mother.inHome && mother.job.employed;
    if (p.migrant) { mother.job.employed = rng.chance(0.25); mother.job.onLeave = false; }

    // ВИЧ у матери (эпидемия 2000-х) и передача ребёнку
    var hivP = y < 1996 ? 0.00005 : y < 2000 ? 0.0008 : y < 2005 ? 0.003 : y < 2015 ? 0.006 : 0.0055;
    if (hasTag(region, 'hiv_high')) hivP *= 2.5;
    if (mother.alcohol >= 2) hivP *= 2;
    mother.hiv = rng.chance(hivP);

    fam.members.push(mother, father);
    fam.atmosphere = 0;

    var famIncomeHint = (mother.job.base + father.job.base) / (2 * 65000 * region.wage);

    // предупреждение о материнской смерти при родах
    if (rng.chance(pMaternalDeath)) {
      mother.alive = false; mother.inHome = false; mother.deathCause = 'Осложнения родов';
      fam.type = father.inHome ? 'single_father' : 'grandparents';
      fam.flags.motherDiedAtBirth = true;
    }

    grandparents(rng, fam, mother, 'm', ctx);
    grandparents(rng, fam, father, 'p', ctx);

    // кто живёт с бабушкой
    var gmLive = 0.1 * (settlement === 'village' ? 1.5 : 1) * (hasTag(region, 'caucasus') ? 2.5 : 1) * (famType === 'single_mother' ? 2.5 : 1);
    var gms = fam.members.filter(function (m) { return m.role.indexOf('grand') === 0 && m.alive; });
    if (fam.type === 'grandparents') {
      var gm = gms.filter(function (m) { return m.role === 'grandmother_m'; })[0] || gms[0];
      if (gm) { gm.inHome = true; gm.guardian = true; fam.members.forEach(function (m) { if (m.role === 'grandfather_m' && gm.role === 'grandmother_m') m.inHome = true; }); }
      else fam.type = 'orphanage';
    } else if (gms.length && rng.chance(gmLive)) {
      var g2 = rng.pick(gms); g2.inHome = true;
    }
    if (fam.type === 'single_father' && !gms.some(function (g) { return g.inHome; }) && gms.length) {
      rng.pick(gms).inHome = true;
    }

    // старшие сиблинги
    var lastAge = 0;
    for (var i = 0; i < order; i++) {
      lastAge += Math.max(1, Math.round(rng.normal(3.3, 1.6)));
      if (mAge - lastAge < 15) break;
      var sibSex = rng.chance(0.51) ? 'm' : 'f';
      fam.members.push({id: 's' + (++uid) + '_' + rng.int(1000, 9999), role: 'sibling', sex: sibSex,
        name: freshName(rng, p.ethnic, sibSex, [p.firstName].concat(fam.members.filter(function (m) { return m.role === 'sibling'; }).map(function (m) { return m.name; }))), age: lastAge, ethnic: p.ethnic, alive: true,
        inHome: fam.type !== 'orphanage' && !(lastAge >= 18 && rng.chance(0.6)), health: U.clamp(rng.normal(85, 8), 40, 100),
        relation: U.clamp(rng.normal(60, 15), 10, 100), edu: 0, job: {employed: false, base: 0}});
    }

    // жильё
    if (fam.type === 'orphanage') {
      fam.housing = {type: 'orphanage', name: 'Дом ребёнка', rooms: 0, area: 0, owned: false, condition: 45};
    } else {
      fam.housing = generateHousing(rng, s, fam, region, settlement, y, mother, father, famIncomeHint);
    }

    // имущество и деньги
    var carP = (y < 1992 ? 0.17 : y < 2000 ? 0.25 : y < 2010 ? 0.38 : y < 2020 ? 0.5 : 0.55) * U.clamp(famIncomeHint, 0.4, 1.6);
    if (fam.type === 'single_mother' || fam.type === 'grandparents') carP *= 0.4;
    fam.car = fam.type !== 'orphanage' && rng.chance(carP);
    fam.dacha = fam.type !== 'orphanage' && settlement !== 'village' && rng.chance(y < 2000 ? 0.45 : y < 2015 ? 0.33 : 0.28);
    var incomeMonth = (father.inHome && father.job.employed ? father.job.base : 0) + (mother.job.employed ? mother.job.base * 0.5 : 0) + 15000;
    var noSavings = y < 1992 ? 0.25 : 0.42;
    fam.savings = fam.type === 'orphanage' || rng.chance(noSavings) ? 0 : Math.round(incomeMonth * RL.World.realWageIndex(s, y, 6) * rng.range(0.3, y < 1992 ? 8 : 4));
    fam.debts = [];
    if (y >= 2008 && fam.type !== 'orphanage' && rng.chance(0.3)) {
      var bal = Math.round(incomeMonth * RL.World.realWageIndex(s, y, 6) * rng.range(2, 8));
      fam.debts.push({kind: 'bank', name: 'потребительский кредит', balance: bal, rate: U.interpYear(DD().economy.creditRate, Math.min(y, 2024))});
    }
    fam.flags.vaccineRefusal = rng.chance((y < 2005 ? 0.01 : 0.025) * (mother.edu === 2 && settlement !== 'village' ? 1.5 : 1));
    fam.alimony = null;
    if (!father.inHome && !father.unknown && father.alive && fam.type !== 'orphanage') {
      fam.alimony = {mode: rng.weightedKey({regular: 0.4, irregular: 0.25, none: 0.35}), share: 0.25};
    }

    // ребёнок: скрытые задатки
    var parentsEdu = (mother.edu === 2 ? 1 : 0) + (father.edu === 2 ? 1 : 0);
    p.hidden = {
      iq: Math.round(U.clamp(rng.normal(100 + parentsEdu * 3 - (mother.edu === 0 ? 2 : 0), 14), 45, 160)),
      physique: Math.round(U.clamp(rng.normal(50, 16), 5, 99)),
      creativity: Math.round(U.clamp(rng.normal(50, 16), 5, 99)),
      sociality: Math.round(U.clamp(rng.normal(50, 16), 5, 99)),
      resilience: Math.round(U.clamp(rng.normal(50, 16), 5, 99))
    };
    p.appearance = Math.round(U.clamp(rng.normal(50, 15), 5, 99));
    p.traits = {};
    Object.keys(DD().traits).forEach(function (t) { p.traits[t] = 0; });
    p.conditions = [];
    p.stats = {health: 0, money: 50, skills: 50, social: 45, mental: 72, happiness: 70};
    p.education = {stage: 'home', grade: 0, school: null, kg: null, performance: null};
    p.focus = 'none';
    p.flags = {};

    // врождённые состояния
    var facts = {motherSmokes: mother.smokes && rng.chance(0.5), motherAlcohol: mother.alcohol >= 2,
      poor: famIncomeHint < 0.55, motherYoung: mAge < 18, motherOld: mAge > 38, motherAge35: mAge >= 35 && mAge < 40, motherAge40: mAge >= 40};
    var C = DD().conditions;
    Object.keys(C).forEach(function (id) {
      var c = C[id];
      if (c.kind !== 'congenital') return;
      var pr = c.birthP || 0;
      if (c.mods) Object.keys(c.mods).forEach(function (k) { if (facts[k] || hasCond(p, k)) pr *= c.mods[k]; });
      if (c.birthPIf) Object.keys(c.birthPIf).forEach(function (k) { if (facts[k]) pr = Math.max(pr, c.birthPIf[k]); });
      if (id === 'hiv') {
        if (!mother.hiv) return;
        pr = y < 1999 ? 0.3 : y < 2006 ? 0.12 : y < 2015 ? 0.04 : 0.015;
      }
      if (rng.chance(pr)) {
        var cond = {id: id, since: 0, severe: c.severeShare ? rng.chance(c.severeShare) : false, treated: false, months: 0};
        p.conditions.push(cond);
        if (c.iqSet) p.hidden.iq = Math.round(rng.normal(c.iqSet, 8));
        if (c.iqShift) p.hidden.iq += c.iqShift;
      }
    });
    function hasCond(pp, id) { return pp.conditions && pp.conditions.some(function (c) { return c.id === id; }); }

    var h0 = rng.normal(84 + (p.hidden.physique - 50) * 0.12, 5);
    if (hasCond(p, 'premature')) h0 -= 15;
    p.conditions.forEach(function (c) { var d = C[c.id]; if (d.cap) h0 = Math.min(h0, d.cap - rng.range(0, 8)); });
    if (mother.alcohol >= 2) h0 -= 4;
    if (mother.smokes) h0 -= 2;
    p.stats.health = Math.round(U.clamp(h0, 15, 98));

    // отчество
    var fName = father.unknown && fam.type === 'single_mother' && rng.chance(0.3) ? nameFor(rng, ethnicM, 'm') : father.name;
    p.patronymic = patronymic(fName, p.sex);

    // атмосфера в семье
    var atm = rng.normal(68, 10);
    fam.members.forEach(function (m) {
      if (!m.inHome || !m.alive) return;
      if (m.alcohol >= 2) atm -= 10 * (m.alcohol - 1);
      if (m.violent) atm -= 15;
    });
    if (fam.housing.area && fam.members.filter(function (m) { return m.inHome; }).length * 9 > fam.housing.area) atm -= 6;
    if (fam.type === 'orphanage') atm = 35;
    fam.atmosphere = Math.round(U.clamp(atm, 5, 95));

    s.rng = rng.s;
    return s;
  }

  return {generate: generate, patronymic: patronymic, nameFor: nameFor, freshName: freshName, makeAdult: makeAdult, pickProfession: pickProfession,
    generateHousing: generateHousing};
})();
