// Семья: старение и смертность родственников, разводы, отчимы, пьянство, насилие, рождение сиблингов,
// изъятие ребёнка, усыновление, переезды, мобилизация и контракт.
RL.Family = (function () {
  var U = RL.util, S = RL.S;

  function adultMort(s, m) {
    var y = s.date.year;
    var q = RL.Mortality.qx(s, y, m.sex, m.age);
    var mult = [1, 1.25, 2.2, 4][m.alcohol || 0] * (m.smokes ? 1.5 : 1) * Math.pow(RL.Mortality.healthMult(m.health), 0.5);
    mult *= Math.pow(S.region(s).mortality, 0.8) / 1.25; // /1.25 — нормировка: средний человек пьёт/курит
    if (m.hiv && y < 2006) mult *= 6; else if (m.hiv) mult *= 2.5;
    if (S.region(s).id === 'che' && m.sex === 'm' && ((y >= 1994 && y <= 1996) || (y >= 1999 && y <= 2002))) mult *= 3;
    return U.monthly(Math.min(0.9, q * mult));
  }
  function adultCause(rng, m) {
    if (m.job && m.job.deployed) return 'Погиб в зоне боевых действий';
    if (m.alcohol >= 3 && rng.chance(0.45)) return rng.pick(['Отравление алкоголем', 'Алкогольная болезнь печени', 'Замёрз в состоянии опьянения', 'Травма в пьяной драке']);
    return RL.Mortality.sampleCause(rng, m.age, m.sex);
  }

  function relLabel(s, m) { return S.relName(m) + (m.name ? ' (' + m.name + ')' : ''); }

  function die(s, m, rng, cause) {
    m.alive = false; m.inHome = false; m.deathCause = cause || adultCause(rng, m);
    m.deathYear = s.date.year;
    var close = ['mother', 'father', 'stepfather', 'adoptive_mother', 'adoptive_father'].indexOf(m.role) >= 0 || m.guardian;
    S.log(s, 'Умер' + (m.sex === 'f' ? 'ла' : '') + ' ' + relLabel(s, m) + ', ' + Math.floor(m.age) + ' ' + years(m.age) + '. Причина: ' + m.deathCause.toLowerCase() + '.', 'death');
    var hit = close ? 25 : m.role.indexOf('grand') === 0 ? (m.inHomeBefore ? 14 : 7) : 10;
    if (S.age(s) < 2) hit *= 0.3;
    S.adj(s, 'mental', -hit * (0.5 + m.relation / 100));
    S.adj(s, 'happiness', -hit * 0.6);
    s.family.atmosphere = U.clamp(s.family.atmosphere - (close ? 15 : 5), 0, 100);
    if (close) RL.Events.queue(s, 'loss_parent', {who: S.relName(m)});
    // опека нужна только несовершеннолетнему, который живёт с семьёй: умер любой взрослый из дома — пересобираем, кто растит
    if ((m.role === 'mother' || m.guardian || m.inHomeBefore) && S.age(s) < 18 && !(RL.Young && RL.Young.apart(s)) && s.family.type !== 'orphanage') reassignCare(s, rng);
  }
  function years(a) { var n = Math.floor(a) % 100; if (n > 10 && n < 20) return 'лет'; n %= 10; return n === 1 ? 'год' : n >= 2 && n <= 4 ? 'года' : 'лет'; }

  // если не осталось взрослых, кто заботится о ребёнке
  function reassignCare(s, rng) {
    var fam = s.family, adults = S.home(s).filter(function (m) { return m.role !== 'sibling'; });
    if (adults.length) {
      var mom = S.mother(s), momIn = mom && mom.alive && mom.inHome, man = S.manInHome(s);
      var adoptive = adults.some(function (m) { return m.role.indexOf('adoptive') === 0; });
      if (adoptive) return;
      if (momIn) { if (!man && ['married', 'cohab', 'stepfamily'].indexOf(fam.type) >= 0) fam.type = 'single_mother'; return; }
      if (man && man.role === 'father') { fam.type = 'single_father'; return; }
      var gr = adults.filter(function (m) { return m.role.indexOf('grand') === 0; })[0];
      if (gr) { gr.guardian = true; fam.type = 'grandparents'; return; }
      // остался только отчим/мачеха — опеку чаще оформляют родные
      adults.forEach(function (m) { m.inHome = false; });
    }
    var gm = fam.members.filter(function (m) { return m.alive && m.role.indexOf('grand') === 0 && m.age < 78; });
    var f = S.father(s);
    var bigSib = fam.members.filter(function (m) { return m.alive && m.role === 'sibling' && m.age >= 21 && (m.alcohol || 0) < 2; })[0];
    if (f && f.alive && !f.unknown && !f.inHome && f.alcohol < 3 && rng.chance(0.55)) {
      f.inHome = true; fam.type = 'single_father';
      S.log(s, 'Тебя забрал к себе отец.', 'family');
    } else if (gm.length) {
      var g = gm.sort(function (a, b) { return b.relation - a.relation; })[0];
      g.inHome = true; g.guardian = true; fam.type = 'grandparents';
      S.log(s, 'Опеку над тобой оформил' + (g.sex === 'f' ? 'а ' : ' ') + relLabel(s, g) + '.', 'family');
    } else if (bigSib && rng.chance(0.5)) {
      bigSib.inHome = true; bigSib.guardian = true; fam.type = 'sibling_care';
      if (!bigSib.job || !bigSib.job.employed) {
        var pr = RL.DATA.economy.professions.filter(function (x) { return x.id === (bigSib.sex === 'f' ? 'seller' : 'laborer'); })[0];
        bigSib.job = {prof: pr.id, employed: true, raise: 1, shadow: 0.3, base: Math.round(pr.wage * RL.DATA.economy.wageScale * S.region(s).wage * S.st(s).wage)};
      }
      S.log(s, 'Опеку над тобой оформил' + (bigSib.sex === 'f' ? 'а ' : ' ') + relLabel(s, bigSib) + '.', 'family');
    } else toOrphanage(s, rng, 'Родственников, готовых взять опеку, не нашлось.');
  }

  function toOrphanage(s, rng, reason) {
    s.family.members.forEach(function (m) { if (m.role !== 'sibling') m.inHome = false; else if (m.age < 18) m.inHome = rng.chance(0.6); });
    s.family.type = 'orphanage';
    s.family.housing = {type: 'orphanage', name: S.age(s) < 4 ? 'Дом ребёнка' : 'детский дом', rooms: 0, area: 0, owned: false, condition: 45};
    s.family.alimony = null;
    S.log(s, reason + ' Тебя определили в ' + s.family.housing.name + '.', 'bad');
    S.adj(s, 'mental', -25); S.adj(s, 'happiness', -25); S.adj(s, 'social', -10);
    s.family.atmosphere = 35;
    s.flags.wasInOrphanage = 1;
  }

  function adopt(s, rng) {
    var r = S.region(s), y = s.date.year;
    var foster = y >= 2008 && rng.chance(0.55);
    s.family.members.forEach(function (m) { m.inHome = false; });
    var mAge = rng.int(29, 44);
    var mom = RL.Birth.makeAdult(rng, {role: 'adoptive_mother', sex: 'f', age: mAge, ethnic: 'russian', region: r, settlement: s.person.settlement, year: y, eduBoost: 1.4, state: s});
    var dad = RL.Birth.makeAdult(rng, {role: 'adoptive_father', sex: 'm', age: mAge + rng.int(0, 6), ethnic: 'russian', region: r, settlement: s.person.settlement, year: y, eduBoost: 1.3, state: s});
    mom.alcohol = 0; dad.alcohol = Math.min(dad.alcohol, 1); dad.violent = rng.chance(0.02);
    mom.relation = dad.relation = rng.int(55, 85);
    s.family.members.push(mom, dad);
    s.family.type = foster ? 'foster' : 'adoptive';
    s.family.housing = RL.Birth.generateHousing(rng, s, s.family, r, s.person.settlement, y, mom, dad, 1.3);
    s.family.savings = rng.range(1, 4) * 60000;
    s.family.atmosphere = rng.int(55, 85);
    s.family.debts = [];
    S.log(s, foster ? 'Тебя взяла приёмная семья: ' + mom.name + ' и ' + dad.name + '. Государство платит им за опеку.' :
      'Тебя усыновили: ' + mom.name + ' и ' + dad.name + '. Новая фамилия, новая жизнь.', 'good');
    S.adj(s, 'mental', 10); S.adj(s, 'happiness', 15);
  }

  function separate(s, rng) {
    var man = S.manInHome(s), mom = S.mother(s);
    if (!man || !mom || !mom.inHome) return;
    man.inHome = false;
    var wasStep = man.role === 'stepfather';
    s.family.type = 'single_mother';
    if (!wasStep) {
      s.family.alimony = {mode: rng.weightedKey({regular: 0.4, irregular: 0.28, none: 0.32 + (man.alcohol >= 2 ? 0.3 : 0)}), share: S.childrenHome(s) >= 3 ? 0.5 : S.childrenHome(s) === 2 ? 0.33 : 0.25};
      man.contact = rng.weightedKey({often: 0.3, rare: 0.4, none: 0.3});
    }
    if (s.family.housing.mortgage && rng.chance(0.5)) {
      s.family.housing.mortgage.payment *= 0.5; // делят ипотеку
    }
    if (s.family.housing.withParents && rng.chance(0.5)) {
      // жили у родителей отца — мама с ребёнком уходит в съём или к своим
      s.family.housing = RL.Birth.generateHousing(rng, s, s.family, S.region(s), s.person.settlement, s.date.year, mom, null, 0.5);
    }
    s.family.atmosphere = U.clamp(s.family.atmosphere + (man.violent || man.alcohol >= 2 ? 10 : -12), 0, 100);
    S.adj(s, 'mental', S.age(s) < 2 ? -3 : -12);
    S.log(s, wasStep ? 'Мама рассталась с отчимом.' : 'Родители развелись. Ты остаёшься с мамой' + (man.contact === 'often' ? ', папа берёт тебя по выходным.' : man.contact === 'rare' ? ', папу видишь редко.' : ', папа пропал из жизни.'), 'family');
    if (!wasStep && S.age(s) >= 3) RL.Events.queue(s, 'parents_divorce', {});
  }

  function newPartner(s, rng) {
    var mom = S.mother(s), r = S.region(s);
    var sp = RL.Birth.makeAdult(rng, {role: 'stepfather', sex: 'm', age: Math.round(mom.age + rng.normal(2, 4)), ethnic: mom.ethnic, region: r,
      settlement: s.person.settlement, year: s.date.year, state: s});
    sp.relation = U.clamp(rng.normal(45, 18), 5, 95);
    sp.violent = sp.violent || rng.chance(0.03);
    s.family.members.push(sp);
    s.family.type = 'stepfamily';
    s.family.flags.partnerSince = S.ageMonths(s);
    S.log(s, 'У мамы появился ' + sp.name + ', ' + sp.age + ' лет, ' + S.profName(sp) + '. Теперь он живёт с вами.', 'family');
    if (S.age(s) >= 3) RL.Events.queue(s, 'stepfather_arrives', {step: sp.name});
  }

  function birthSibling(s, rng) {
    var mom = S.mother(s), man = S.manInHome(s);
    var sex = rng.chance(0.513) ? 'm' : 'f';
    // счётчик — в состоянии, а не в модуле: иначе две жизни в одной вкладке (или сохранение и загрузка) дают разные id
    s.uidSib = (s.uidSib || 0) + 1;
    var sib = {id: 'sb' + s.uidSib + '_' + rng.int(100, 999), role: 'sibling', sex: sex, name: RL.Birth.freshName(rng, s.person.ethnic, sex, [s.person.firstName].concat(s.family.members.filter(function (m) { return m.role === 'sibling'; }).map(function (m) { return m.name; }))),
      age: 0, ethnic: s.person.ethnic, alive: true, inHome: true, health: U.clamp(rng.normal(84, 8), 30, 100), relation: 60,
      edu: 0, job: {employed: false, base: 0}, half: man && man.role !== 'father'};
    s.family.members.push(sib);
    s.family.lastBirthM = S.ageMonths(s);
    if (mom.job.employed) mom.job.onLeave = true;
    var kidsTotal = s.family.members.filter(function (m) { return m.role === 'sibling' && m.alive; }).length + 1;
    S.log(s, 'Родил' + (sex === 'm' ? 'ся брат' : 'ась сестра') + (sib.half ? ' (единоутробн' + (sex === 'm' ? 'ый' : 'ая') + ')' : '') + ' — ' + sib.name + '.', 'family');
    // материнский капитал
    var mc = 0;
    if (s.date.year >= 2007 && !s.family.flags.matcapUsed) {
      mc = RL.Economy.matCapital(s, kidsTotal >= 2);
      if (mc > 0) { s.family.flags.matcapUsed = true; useMatcap(s, mc, rng); }
    }
    RL.Events.queue(s, 'sibling_born', {name2: sib.name, bro: sex === 'm' ? 'брат' : 'сестра'});
  }

  function useMatcap(s, amount, rng) {
    var h = s.family.housing, txt;
    if (h.mortgage && h.mortgage.balance > 0) {
      h.mortgage.balance = Math.max(0, h.mortgage.balance - amount);
      var r = h.mortgage.rate / 12; h.mortgage.payment = h.mortgage.balance > 0 ? h.mortgage.balance * r / (1 - Math.pow(1 + r, -h.mortgage.monthsLeft)) : 0;
      txt = 'Материнский капитал (' + RL.World.money(s, amount) + ') ушёл в погашение ипотеки.';
    } else if (rng.chance(0.15) && s.person.settlement !== 'megapolis') {
      txt = 'Материнский капитал обналичили через серую схему: на руки получили ' + RL.World.money(s, amount * 0.7) + '.';
      s.family.savings += amount * 0.7;
    } else {
      s.family.flags.matcapAmount = amount;
      txt = 'Получили сертификат на материнский капитал: ' + RL.World.money(s, amount) + '. Тратить можно только на жильё, образование или пенсию маме.';
    }
    S.log(s, txt, 'money');
  }

  function alcoholDynamics(s, m, rng, ctx) {
    if (!m.alive || m.age < 16) return;
    var up = (m.sex === 'm' ? 0.0035 : 0.0008) * (ctx.flags.alcohol || 1) * S.region(s).alcohol;
    if (!m.job.employed && !m.job.pension && !m.job.onLeave) up *= 2.5;
    if (s.family.poverty) up *= 1.4;
    if (s.family.atmosphere < 35) up *= 1.4;
    if (m.alcohol === 0) up *= 0.6;
    var eth = RL.DATA.ethnic[m.ethnic];
    if (eth && eth.religion === 'muslim') up *= 0.2;
    if (m.alcohol < 3 && rng.chance(up)) {
      m.alcohol++;
      var fem = m.sex === 'f';
      if (m.alcohol >= 2 && m.inHome) S.log(s, relLabel(s, m) + (m.alcohol === 3 ? (fem ? ' ушла' : ' ушёл') + ' в запои.' : (fem ? ' стала' : ' стал') + ' сильно пить.'), 'bad');
      if (m.alcohol >= 2 && m.sex === 'm' && !m.violent && rng.chance(0.15)) m.violent = true;
    }
    var down = m.alcohol >= 2 ? 0.006 : 0.002;
    if (s.family.flags.newBaby) down *= 1.5;
    if (m.alcohol > 0 && rng.chance(down)) {
      m.alcohol--;
      var f2 = m.sex === 'f';
      if (m.alcohol === 1 && m.inHome) S.log(s, relLabel(s, m) + ' ' + rng.pick([f2 ? 'закодировалась' : 'закодировался', (f2 ? 'бросила' : 'бросил') + ' пить после больницы',
        'держится — не пьёт уже несколько месяцев']) + '.', 'good');
    }
  }

  function monthly(s, rng) {
    var ctx = RL.World.ctx(s), fam = s.family, a = S.age(s), y = s.date.year, r = S.region(s);
    fam.members.forEach(function (m) {
      if (!m.alive) return;
      m.age += 1 / 12;
      if (m.role === 'sibling') {
        // взрослые братья и сёстры съезжают: учёба, работа, своя семья
        if (m.inHome && !m.guardian && m.age >= 18 && rng.chance(m.age >= 23 ? 0.04 : 0.015)) { m.inHome = false; S.log(s, S.relName(m) + ' ' + m.name + (m.sex === 'f' ? ' съехала' : ' съехал') + ' от вас.', 'family'); }
        return;
      }
      m.health = U.clamp(m.health - (m.age > 50 ? 0.05 : 0.015) - (m.alcohol >= 2 ? 0.06 * m.alcohol : 0) + (m.age < 40 ? 0.02 : 0), 5, 100);
      alcoholDynamics(s, m, rng, ctx);
      // развёрнутые на фронте
      if (m.job.deployed) {
        var R = RL.DATA.history.deploymentRisk;
        m.job.deployed.months++;
        if (rng.chance(R.death)) { m.inHomeBefore = m.inHome; die(s, m, rng, 'Погиб в зоне боевых действий'); return; }
        if (rng.chance(R.injury)) {
          m.health = U.clamp(m.health - rng.range(15, 40), 5, 100); m.disabled = rng.chance(0.4);
          S.log(s, relLabel(s, m) + ' ранен' + (m.disabled ? ' — тяжело, комиссован с инвалидностью.' : ', лечится в госпитале.'), 'bad');
          if (m.disabled) { m.job.deployed = null; m.job.employed = false; m.inHome = m.role === 'father' && fam.type !== 'single_mother' ? true : m.inHome; }
        }
        if (m.job.deployed && m.job.deployed.until && m.job.deployed.months >= m.job.deployed.until) {
          m.job.deployed = null; m.job.employed = rng.chance(0.5);
          S.log(s, relLabel(s, m) + ' вернулся домой.', 'family');
          if (rng.chance(0.25)) { m.alcohol = Math.min(3, m.alcohol + 1); }
          if (rng.chance(0.1)) m.violent = true;
        }
      }
      if (rng.chance(adultMort(s, m))) { m.inHomeBefore = m.inHome; die(s, m, rng); }
    });
    if (fam.type === 'orphanage' && S.age(s) < 18) {
      // усыновление / приёмная семья
      var py = a < 1 ? (y < 2000 ? 0.12 : 0.25) : a < 4 ? 0.14 : a < 8 ? 0.06 : 0.025;
      if (S.hasCond(s, 'down') || S.hasCond(s, 'cp') || S.hasCond(s, 'hiv')) py *= 0.25;
      if (rng.chance(U.monthly(py))) adopt(s, rng);
      return;
    }
    var man = S.manInHome(s), mom = S.mother(s);
    var momHome = mom && mom.alive && mom.inHome;

    // развод / расставание
    if (man && momHome) {
      var base = fam.type === 'cohab' ? 0.06 : fam.type === 'stepfamily' ? 0.06 : 0.024;
      var mul = (RL.World.flag(s, y, 'divorce', 1));
      if (man.alcohol >= 2) mul *= 2.0; if (man.violent) mul *= 1.6; if (fam.poverty) mul *= 1.3;
      if (fam.atmosphere < 35) mul *= 1.6; else if (fam.atmosphere > 70) mul *= 0.6;
      if (r.tags.indexOf('caucasus') >= 0) mul *= 0.35;
      if (man.job.deployed) mul *= 0.5;
      if (fam.type === 'cohab' && rng.chance(U.monthly(0.06))) { fam.type = 'married'; S.log(s, 'Родители расписались.', 'family'); }
      if (rng.chance(U.monthly(base * mul))) separate(s, rng);
    }
    // новый партнёр матери
    man = S.manInHome(s);
    if (!man && momHome && mom.age < 45 && fam.type === 'single_mother') {
      var pp = 0.09 * (mom.alcohol >= 2 ? 1.2 : 1) * (r.tags.indexOf('caucasus') >= 0 ? 0.4 : 1) * (S.childrenHome(s) >= 3 ? 0.6 : 1);
      if (rng.chance(U.monthly(pp))) newPartner(s, rng);
    }
    man = S.manInHome(s);
    // насилие
    if (man && man.violent && rng.chance(0.06 * (man.alcohol >= 2 ? 2 : 1))) {
      fam.atmosphere = U.clamp(fam.atmosphere - 5, 0, 100);
      if (a >= 3) RL.Events.queue(s, 'domestic_violence', {who: S.relName(man)});
      else S.adj(s, 'mental', -3);
    }
    // изъятие органами опеки
    var careAlc = S.adultsHome(s).every(function (m) { return m.alcohol >= 3 || m.role === 'sibling'; });
    if (momHome && mom.alcohol >= 3 && (careAlc || !man) && S.age(s) < 18 && rng.chance(0.004)) {
      var gm = fam.members.filter(function (m) { return m.alive && m.role.indexOf('grandmother') === 0 && m.age < 75 && m.alcohol < 2; })[0];
      mom.inHome = false; if (man) man.inHome = false;
      if (gm && rng.chance(0.65)) { gm.inHome = true; gm.guardian = true; fam.type = 'grandparents'; S.log(s, 'Маму лишили родительских прав. Опеку оформила ' + relLabel(s, gm) + '.', 'bad'); S.adj(s, 'mental', -15); }
      else toOrphanage(s, rng, 'Органы опеки изъяли тебя из семьи: мать лишили родительских прав.');
      return;
    }
    // рождение сиблинга
    if (momHome && man && mom.age < 43 && (!fam.lastBirthM || S.ageMonths(s) - fam.lastBirthM > 15) && a >= 1.2) {
      var kids = fam.members.filter(function (m) { return m.role === 'sibling' && m.alive && m.age < 18; }).length + 1;
      var bp = kids === 1 ? 0.12 : kids === 2 ? 0.05 : 0.03;
      if (r.tags.indexOf('caucasus') >= 0 || s.person.migrant) bp *= 2.2;
      if (y >= 2007 && kids === 1) bp *= 1.25;
      if (y >= 1992 && y <= 2000) bp *= 0.7;
      if (fam.poverty && r.tags.indexOf('caucasus') < 0) bp *= 0.8;
      if (mom.age > 37) bp *= 0.4;
      if (fam.type === 'stepfamily' && kids === 1 && fam.flags.partnerSince && S.ageMonths(s) - fam.flags.partnerSince < 36) bp *= 2;
      if (rng.chance(U.monthly(bp))) birthSibling(s, rng);
    }
    // мобилизация 2022 (и случайные волны в сценарии будущего)
    var yd = RL.World.yearData(s, y);
    if (yd.mobilization && ctx.month >= yd.mobilization.month && ctx.month < yd.mobilization.month + yd.mobilization.months) {
      [S.father(s), fam.members.filter(function (m) { return m.role === 'stepfather' && m.alive; })[0]].forEach(function (m) {
        if (!m || !m.alive || m.unknown || m.job.deployed || m.age < 18 || m.age > 50 || m.disabled) return;
        if (m.job.prof === 'it' && rng.chance(0.8)) return; // отсрочка IT
        var share = RL.DATA.history.mobilizationBaseShare, M = RL.DATA.history.mobilizationRegionMul;
        r.tags.forEach(function (t) { if (M[t]) share *= M[t]; });
        if (s.person.settlement === 'village' || s.person.settlement === 'small') share *= 1.3;
        if (m.edu === 2) share *= 0.6;
        if (rng.chance(share / yd.mobilization.months)) {
          m.job.deployed = {kind: 'mobilized', months: 0, until: rng.int(10, 30)};
          S.log(s, relLabel(s, m) + ' получил повестку и мобилизован.', 'bad');
          fam.atmosphere = U.clamp(fam.atmosphere - 10, 0, 100);
          if (m.inHome && a >= 3) RL.Events.queue(s, 'father_mobilized', {who: S.relName(m)});
        }
      });
    }
    // контракт (с 2023, пока идёт СВО): чаще бедные, с долгами, без работы
    if (RL.World.svoOn(s, y) && y >= 2023) {
      [S.father(s), fam.members.filter(function (m) { return m.role === 'stepfather' && m.alive; })[0]].forEach(function (m) {
        if (!m || !m.alive || m.unknown || m.job.deployed || m.age < 20 || m.age > 55 || m.disabled) return;
        var pc = 0.012 * (fam.poverty ? 2.5 : 1) * ((fam.debts || []).length ? 1.8 : 1) * (!m.job.employed ? 2 : 1) * (m.alcohol >= 2 ? 1.5 : 1);
        if (r.tags.indexOf('capital') >= 0 || s.person.settlement === 'megapolis') pc *= 0.4;
        if (r.tags.indexOf('siberia') >= 0 || r.tags.indexOf('fareast') >= 0) pc *= 1.5;
        if (m.edu === 2) pc *= 0.5;
        if (rng.chance(U.monthly(pc))) {
          m.job.deployed = {kind: 'contract', months: 0, until: rng.int(12, 24)};
          var bonus = RL.Economy.AVG24() * rng.range(6, 20);
          if (m.inHome || s.family.alimony) { fam.savings += bonus * 0.6; (fam.debts || []).forEach(function (d) { d.balance *= 0.5; }); }
          S.log(s, relLabel(s, m) + ' подписал контракт с Минобороны. Подъёмные — ' + RL.World.money(s, bonus) + '.', 'family');
          if (m.inHome && a >= 3) RL.Events.queue(s, 'father_mobilized', {who: S.relName(m), contract: true});
        }
      });
    }
    // беженцы из Чечни
    if (r.id === 'che' && ((y >= 1994 && y <= 1996) || (y === 1999 || y === 2000)) && !s.flags.refugee && rng.chance(0.06)) {
      s.flags.refugee = 1;
      s.person.regionId = 'ing'; s.person.settlement = 'village'; s.person.city = 'лагерь беженцев под Назранью';
      fam.housing = {type: 'dorm_room', name: 'палатка / вагончик в лагере беженцев', rooms: 1, area: 14, owned: false, condition: 10};
      fam.savings *= 0.2;
      fam.members.forEach(function (m) { if (m.job && m.job.prof) m.job.employed = rng.chance(0.15); });
      S.log(s, 'Из-за боевых действий семья бежала из Чечни. Живёте в лагере беженцев в Ингушетии.', 'bad');
      S.adj(s, 'mental', -20); S.adj(s, 'health', -8);
    }
    // советская очередь на квартиру
    if (y <= 1991 && fam.housing.queue && rng.chance(U.monthly(0.08))) {
      fam.housing = {type: 'flat', rooms: 2, area: 46, owned: false, condition: 70, name: '2-комнатная квартира от предприятия (по очереди)'};
      S.log(s, 'Подошла очередь: семье дали квартиру от предприятия.', 'good');
    }
    // переезд
    if (a >= 1 && rng.chance(U.monthly(0.025 * (y >= 1992 && y <= 1999 && r.tags.indexOf('north') >= 0 ? 2.5 : 1)))) relocate(s, rng);
    // атмосфера в семье дрейфует
    var atmT = 65;
    S.home(s).forEach(function (m) { if (m.alcohol >= 2) atmT -= 10 * (m.alcohol - 1); if (m.violent) atmT -= 12; if (m.role === 'stepfather' && m.relation < 35) atmT -= 6; });
    if (fam.poverty) atmT -= 8; if (fam.deprivation > 1.5) atmT -= 6;
    if (S.home(s).some(function (m) { return m.job && m.job.deployed; })) atmT -= 6;
    fam.atmosphere = U.clamp(fam.atmosphere + (atmT - fam.atmosphere) * 0.04, 0, 100);
    if (s.flags.recentJobLoss) s.flags.recentJobLoss--;
  }

  function relocate(s, rng) {
    var fam = s.family, p = s.person, regs = RL.DATA.regions.filter(function (r) { return !r.legacy && (!r.fromYear || s.date.year >= r.fromYear); });
    var order = ['village', 'small', 'medium', 'big', 'million', 'megapolis'];
    var oldPlace = p.city;
    if (rng.chance(0.7)) {
      var r = S.region(s);
      var opts = Object.keys(r.urban).filter(function (t) { return order.indexOf(t) >= order.indexOf(p.settlement) && r.cities[t]; });
      var t = rng.pick(opts.length ? opts : Object.keys(r.urban));
      p.settlement = t; p.city = rng.pick(r.cities[t]);
    } else {
      var dest = rng.weighted(regs, function (r) { return r.pop * r.wage * (r.id === 'msk' || r.id === 'mo' || r.id === 'spb' ? 1.8 : r.id === 'krd' ? 1.5 : 1) * (r.id === p.regionId ? 0 : 1); });
      p.regionId = dest.id;
      var tt = rng.weightedKey(dest.urban);
      if (tt === 'village' && rng.chance(0.7)) tt = Object.keys(dest.urban)[0];
      p.settlement = tt; p.city = rng.pick(dest.cities[tt]);
    }
    if (p.city === oldPlace) return;
    var mom = S.mother(s), man = S.manInHome(s);
    fam.housing = RL.Birth.generateHousing(rng, s, fam, S.region(s), p.settlement, s.date.year, mom, man, fam.quintile >= 4 ? 1.5 : 0.8);
    S.adultsHome(s).forEach(function (m) {
      if (!m.job || !m.job.prof) return;
      var st = RL.DATA.settlementTypes[p.settlement], pr = S.prof(m);
      m.job.base = Math.round(pr.wage * RL.DATA.economy.wageScale * S.region(s).wage * st.wage * rng.lognorm(pr.sd));
      m.job.employed = rng.chance(0.75);
    });
    S.log(s, 'Семья переехала: ' + oldPlace + ' → ' + p.city + ' (' + S.region(s).name + ').', 'family');
    S.adj(s, 'social', -15);
    if (S.age(s) >= 3) RL.Events.queue(s, 'moving', {city: p.city});
  }

  return {monthly: monthly, die: die, toOrphanage: toOrphanage, separate: separate, relocate: relocate};
})();
