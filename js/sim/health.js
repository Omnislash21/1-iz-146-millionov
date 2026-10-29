// Здоровье ребёнка: острые болезни, хронические состояния, лечение, доступ к медицине, множитель смертности.
RL.Health = (function () {
  var U = RL.util, S = RL.S;
  var C = function () { return RL.DATA.conditions; };
  var MORT_NORM = 1.9; // калибровка: средний множитель по популяции детей ≈ 1 (tests/sim-check.js)

  // Доступ к медицине 0..1: регион + тип поселения + эпоха + деньги + правовой статус.
  function access(s) {
    var r = S.region(s), st = S.st(s), y = s.date.year, fam = s.family;
    // взрослый, живущий отдельно, лечится там, где живёт
    if (RL.Young && RL.Young.apart(s)) { var L = RL.Young.loc(s); r = L.region; st = RL.DATA.settlementTypes[L.settlement]; }
    var a = (r.medicine + st.medicine) / 100 * U.interpYear(RL.DATA.medicineEra, Math.min(y, 2025));
    if (RL.Young && RL.Young.apart(s)) { var mny = s.person.stats.money; if (mny >= 75) a += 0.15; else if (mny >= 60) a += 0.07; else if (mny < 25) a -= 0.07; }
    else if (fam.quintile >= 5) a += 0.15; else if (fam.quintile >= 4) a += 0.07; else if (fam.quintile <= 1) a -= 0.07;
    if (s.person.job && s.person.job.employed && s.person.job.dms && RL.DATA.old) a += RL.DATA.old.dmsAccess;
    if (fam.deprivation > 1.5) a -= 0.08;
    if (s.person.migrant && s.person.migrant.status === 'undocumented') a -= 0.25;
    if (s.person.migrant && s.person.migrant.status === 'legal') a -= 0.1;
    return U.clamp(a, 0.1, 1);
  }

  function modsMul(mods, f) {
    var m = 1;
    if (mods) Object.keys(mods).forEach(function (k) { if (f[k]) m *= mods[k]; });
    return m;
  }
  function byYear(t, y) { return t ? U.interpYear(t, Math.min(y, 2025)) : 1; }

  function addCondition(s, id, rng, quiet) {
    var d = C()[id];
    if (!d || S.hasCond(s, id)) return null;
    var c = {id: id, since: S.ageMonths(s), severe: d.severeShare ? rng.chance(d.severeShare) : false, treated: false, months: 0};
    // у рака взрослых — конкретная локализация (курение сдвигает к лёгким и гортани)
    if (id === 'cancer_adult' && RL.DATA.cancerSites) {
      var sites = RL.DATA.cancerSites[s.person.sex], sm = ((s.person.habits || {}).smoking || 0) >= 2;
      c.site = rng.weightedKey(Object.keys(sites).reduce(function (o, k) { o[k] = sites[k] * (sm && RL.DATA.cancerSmoker[k] ? RL.DATA.cancerSmoker[k] : 1); return o; }, {}));
    }
    s.person.conditions.push(c);
    if (!quiet) S.log(s, RL.Events.text(s, d.text, {}) + (c.site ? ' Диагноз: ' + c.site.toLowerCase() + '.' : ''), 'health');
    if (d.disability && rng.chance(d.disability) && !s.person.disability) {
      s.person.disability = {since: s.date.year, reason: condName(c)};
      S.log(s, S.age(s) < 18 ? 'Оформили инвалидность («ребёнок-инвалид»): ' + d.name + '. Положена пенсия и льготы — если пройти все комиссии.' :
        'Оформили инвалидность: ' + condName(c).toLowerCase() + '. Пенсия по инвалидности и льготы — после всех комиссий МСЭ.', 'health');
    }
    return c;
  }
  function condName(c) { return c.site || (C()[c.id] || {}).name || c.id; }
  // личная предрасположенность к болезни: постоянна на всю жизнь (из seed), в среднем 1
  function sus(s, id, d) {
    var p = s.person;
    p.sus = p.sus || {};
    if (p.sus[id] === undefined) {
      var h = 0; for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
      var sd = d.sus === undefined ? 0.6 : d.sus;
      p.sus[id] = Math.exp(new RL.RNG((s.seed ^ h) >>> 0).normal(0, sd) - sd * sd / 2);
    }
    return p.sus[id];
  }
  function activity(s, d) {
    if (!d.active) return 1;
    var fy = s.person.fy || {};
    return Math.exp(-Math.min(1, ((fy.sport || 0) + (fy.health || 0) + (fy.dance || 0)) / 20) * 0.45);
  }

  function monthly(s, rng) {
    var p = s.person, f = S.facts(s), y = s.date.year, a = f.age, acc = access(s), fam = s.family;
    var focus = p.focus;
    var treatBonus = focus === 'health' ? 0.25 : 0;
    var death = null;

    // ОРВИ и простуды — не логируем каждую, просто «дёргают» здоровье
    var orvi = f.kindergarten ? 0.55 : f.school ? 0.4 : 0.2;
    if (f.winter) orvi *= 1.4;
    if (f.parentsSmoke) orvi *= 1.15;
    if (rng.chance(orvi)) { S.adj(s, 'health', -rng.range(0.3, 1.2)); p.sickDays = (p.sickDays || 0) + rng.int(4, 10); }

    // острые эпизоды
    var A = RL.DATA.acute;
    Object.keys(A).forEach(function (id) {
      var d = A[id];
      if (a < d.ages[0] || a > d.ages[1]) return;
      if (d.once && p.flags['had_' + id]) return;
      if (d.epidemic && !(f.epidemic === d.epidemic)) return;
      var py = d.perYear * modsMul(d.mods, f);
      if (!rng.chance(U.monthly(Math.min(0.95, py)))) return;
      p.flags['had_' + id] = true;
      S.adj(s, 'health', -d.hit * rng.range(0.6, 1.3));
      if (d.hospital && rng.chance(0.5)) S.log(s, d.name + ': ' + (rng.chance(acc) ? 'лечили в больнице, всё обошлось.' : 'неделю в инфекционке, лекарства пришлось докупать самим.'), 'health');
      else if (d.hit >= 10) S.log(s, 'Переболел' + (p.sex === 'f' ? 'а' : '') + ': ' + d.name.toLowerCase() + '.', 'health');
      if (d.deathP) {
        var dp = byYear(d.deathP, y) * (1.6 - acc) * (a < 1 ? 1.0 : 1) * (p.stats.health < 50 ? 2 : 1);
        if (rng.chance(dp)) death = d.name;
      }
    });

    // хронические — проявление
    Object.keys(C()).forEach(function (id) {
      var d = C()[id];
      if (d.kind !== 'chronic' || !(d.perYear || d.byAge)) return;
      if (a < d.ages[0] || a > d.ages[1] || S.hasCond(s, id) || (d.sex && d.sex !== p.sex)) return;
      if (p.conditions.some(function (c) { return c.id === id; })) return; // уже был и вылечен
      var py = (d.byAge ? U.interpYear(d.byAge, a) : d.perYear) * modsMul(d.mods, f) * byYear(d.byYear, y) * sus(s, id, d) * activity(s, d);
      if (rng.chance(U.monthly(py))) {
        addCondition(s, id, rng);
        // инфаркт / инсульт могут убить сразу (шанс ниже при хорошей медицине)
        if (d.onsetDeathP && rng.chance(d.onsetDeathP * (1.5 - acc))) death = d.name === 'Последствия инсульта' ? 'Инсульт' : 'Инфаркт миокарда';
      }
    });

    // течение состояний
    p.conditions.forEach(function (c) {
      if (c.cured) return;
      var d = C()[c.id];
      c.months++;
      var canPay = (d.freeShare || 0) >= 0.7 || fam.deprivation < 1.5 || fam.quintile >= 3;
      c.treated = rng.chance(U.clamp(acc + treatBonus, 0, 1)) ? canPay : false;
      if (d.drain) S.adj(s, 'health', -d.drain * (c.treated ? 0.5 : 1.5));
      if (d.mentalCap && c.id !== 'depression' && c.id !== 'dementia' && p.stats.mental > d.mentalCap + (c.treated ? 15 : 0)) p.stats.mental -= 0.8;
      if (c.id === 'premature' && a >= d.resolveAge) { c.cured = true; return; }
      if (c.id === 'chd' && c.severe && !c.operated) {
        var pOp = acc * (y < 1995 ? 0.12 : 0.3) * (fam.quintile >= 4 ? 1.3 : 1);
        if (rng.chance(pOp)) {
          c.operated = true;
          if (rng.chance(byYear(d.surgerySuccess, y))) {
            c.severe = false;
            S.log(s, 'Операция на сердце в федеральном центре прошла успешно' + (acc < 0.5 ? ' — квоту выбивали полгода.' : '.'), 'health');
          } else if (rng.chance(0.5)) {
            death = 'Врождённый порок сердца (осложнения операции)';
          } else { c.operated = false; S.log(s, 'Операция на сердце прошла неудачно, нужна повторная.', 'health'); }
        }
      }
      if (d.survival5y) {
        var surv = byYear(d.survival5y, y) * (0.55 + acc * 0.5) + (c.early ? (d.earlyBonus || 0) : 0) + (c.careBonus || 0);
        var hz = -Math.log(U.clamp(surv, 0.05, 0.99)) / d.durationMonths * (c.treated ? 1 : 2.5);
        if (rng.chance(hz)) death = condName(c);
        else if (c.months >= d.durationMonths) { c.cured = true; S.log(s, 'Онкогематологи сказали главное слово: ремиссия.', 'good'); }
        return;
      }
      if (d.durationMonths && c.months >= d.durationMonths && c.treated) { c.cured = true; S.log(s, condName(c) + (c.id === 'cataract' ? ': операция по ОМС, видишь снова.' : ': вылечили.'), 'good'); return; }
      if (d.cureYear && c.treated && rng.chance(U.monthly(d.cureYear))) { c.cured = true; S.log(s, condName(c) + ': врачи сняли диагноз.', 'good'); }
    });

    // дрейф здоровья к «целевому» уровню
    var target = 62 + p.hidden.physique * 0.3 + (acc - 0.6) * 12 - (fam.deprivation || 0) * 4
      - (f.crowded ? 2 : 0) - (f.parentsSmoke ? 3 : 0) - (f.poorHousing ? 3 : 0) - (f.familyAlcohol ? 2 : 0) - (f.orphanage ? 5 : 0);
    // привычки подростка сдвигают «целевое» здоровье (RL.DATA.teen.habits[*].health)
    var hb = p.habits || {};
    if (RL.DATA.teen) Object.keys(hb).forEach(function (k) { var d = RL.DATA.teen.habits[k]; if (d) target += d.health[hb[k]] || 0; });
    // старение: после 40 «целевое» здоровье снижается
    if (a > 40 && RL.DATA.old) target -= (a - 40) * RL.DATA.old.healthDeclinePerYear;
    target = Math.min(target, S.healthCap(s));
    p.stats.health = U.clamp(p.stats.health + (target - p.stats.health) * 0.1, 0, 100);

    p.mortMult = mortMult(s, f, acc);
    return death;
  }

  function mortMult(s, f, acc) {
    // здоровье ~65 — типичный уровень ребёнка в модели; множитель нормирован так, чтобы в среднем по популяции был ≈1
    // взрослым возвращаем возрастное снижение здоровья: старение уже есть в qx
    var ageDecl = (f.age > 40 && RL.DATA.old) ? (f.age - 40) * RL.DATA.old.healthDeclinePerYear : 0;
    var p = s.person, a = f.age, y = s.date.year, m = Math.pow(RL.Mortality.healthMult(p.stats.health + 15 + ageDecl), 0.6);
    p.conditions.forEach(function (c) {
      if (c.cured) return;
      var d = C()[c.id], k = 1;
      if (c.id === 'premature') k = a < 1 ? d.mortInfant : a < 2 ? d.mortToddler : 1;
      else if (c.id === 'chd') k = c.severe ? d.mortSevere : d.mortMild;
      else if (c.id === 'hiv') k = (y >= d.artFrom && acc > 0.3) ? d.mortArt : d.mortNoArt;
      else if (c.id === 'diabetes1') k = (y >= 1992 && y <= 2000) ? d.mort90s : d.mort;
      else if (d.survival5y) k = 1; // своя опасность
      else if (d.mortCancer) k = byYear(d.mortCancer, y) * (c.early ? d.earlyMul : 1) * (1 - 2 * (c.careBonus || 0));
      else k = d.mort || 1;
      if (!c.treated && k > 1) k *= 1.4;
      m *= Math.pow(k, 0.8);
    });
    var hb = p.habits || {};
    if (RL.DATA.teen) Object.keys(hb).forEach(function (k) { var d = RL.DATA.teen.habits[k]; if (d) m *= d.mort[hb[k]] || 1; });
    if (f.familyAlcohol && a < 14) m *= 1.4;
    if (f.orphanage) m *= 1.5;
    if (f.colony && f.age >= 18) m *= 1.5; // колония: туберкулёз, насилие, плохая медицина
    if (f.poor) m *= 1.2;
    if (f.manViolent) m *= 1.25;
    m *= Math.pow(S.region(s).mortality, 0.6);
    // война в Чечне
    m /= MORT_NORM;
    // Детская нормировка не подходит накопленным взрослым привычкам: иначе повторно считаем риск, уже включённый в qx.
    // Дополнительные смерти в событиях/на службе остаются отдельными; проверка — когорта 1985 в tests/sim-check.js.
    // взрослые: популяционная нормировка по возрасту (qx уже включает болезни и привычки) — RL.DATA.old.mortNorm
    if (a >= 18 && RL.DATA.old) m /= U.interpYear(RL.DATA.old.mortNorm, a);
    // у женщин табличный риск ниже, а заболеваемость в данных общая — отдельная поправка после 45 [калибровка tests/life-check.js]
    if (a >= 45 && p.sex === 'f' && RL.DATA.old) m /= U.interpYear(RL.DATA.old.femaleNorm, a);
    else if (a >= 18 && a < 36 && RL.DATA.young) m /= RL.DATA.young.mortalityNormalization || 1;
    if (a < 1) m *= 1.6; // у младенцев здоровье выше среднего «детского», без поправки смертность занижается
    if (S.region(s).id === 'che' && ((y >= 1994 && y <= 1996) || (y >= 1999 && y <= 2002))) m *= (y === 1995 || y === 2000) ? 4 : 2.2;
    return m;
  }

  return {monthly: monthly, access: access, addCondition: addCondition, mortMult: mortMult, condName: condName};
})();
