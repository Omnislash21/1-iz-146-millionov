// Молодость 17–25: поступление (бюджет/платно/целевое/заочно), учёба в вузе и сессии, дипломы, призыв и отсрочки,
// служба и мобилизация, первая работа, своё жильё и личный бюджет.
RL.Young = (function () {
  var U = RL.util, S = RL.S, D = RL.DATA;
  var AVG = function (s) { return RL.Economy.AVG24() * RL.World.realWageIndex(s, s.date.year, s.date.month); };
  function tx(s, t) { return RL.Events.text(s, t, {}); }

  // ---------- состояние ----------
  function own(s) {
    var p = s.person;
    if (!p.own) p.own = {living: 'parents', savings: 0, debts: [], deprivation: 0, lastBudget: null};
    return p.own;
  }
  function apart(s) { var l = s.person.own && s.person.own.living; return !!l && l !== 'parents'; }
  // где живёт сам человек (если отдельно от семьи)
  function loc(s) {
    var p = s.person;
    if (p.loc) return {region: S.regionById(p.loc.regionId), settlement: p.loc.settlement, city: p.loc.city};
    return {region: S.region(s), settlement: p.settlement, city: p.city};
  }
  function eduLevel(s) {
    var d = s.person.diplomas || [];
    if (d.some(function (x) { return x.level !== 'СПО'; })) return 2;
    if (d.length) return 1;
    return 0;
  }

  // ---------- вузы ----------
  var cache = null;
  function mainCity(r) { var c = r.cities; return (c.megapolis || c.million || c.big || c.medium || c.small || c.village)[0]; }
  function mk(v) {
    var T = D.vuzTypes[v.type], r = D.regions.filter(function (x) { return x.id === v.region; })[0];
    return {name: v.name, region: v.region, city: v.city || mainCity(r), type: v.type, fields: v.fields,
      pass: v.pass || T.pass, q: v.q || (v.type === 'classic' ? U.clamp(r.school + 5, 45, 70) : T.q), tuition: v.tuition || T.tuition,
      dorm: T.dorm, mil: T.mil, budgetMul: v.budgetMul !== undefined ? v.budgetMul : T.budgetMul, minPaid: T.minPaid,
      fromYear: v.fromYear || T.fromYear || r.fromYear || 0, top: v.type === 'top' || v.type === 'toptech'};
  }
  function vuzList() {
    if (cache) return cache;
    var list = D.vuzTop.map(mk), topRegions = ['tat', 'sve', 'nsk'];
    D.regions.forEach(function (r) {
      if (r.legacy) return;
      if (D.vuzRegionAlias[r.id]) return;
      var city = mainCity(r), fed = D.vuzFederalRegions.indexOf(r.id) >= 0;
      if (topRegions.indexOf(r.id) < 0) list.push(mk({name: (fed ? 'Федеральный университет' : 'Государственный университет') + ' (' + city + ')', region: r.id, type: fed ? 'federal' : 'classic', fields: ['econ', 'law', 'hum', 'natsci', 'it', 'ped', 'gmu']}));
      list.push(mk({name: 'Технический университет (' + city + ')', region: r.id, type: 'tech', fields: ['eng', 'it', 'econ']}));
      if (r.id !== 'msk') list.push(mk({name: 'Медицинский университет (' + city + ')', region: r.id, type: 'medical', fields: ['med']}));
      list.push(mk({name: 'Педагогический университет (' + city + ')', region: r.id, type: 'pedagogical', fields: ['ped', 'hum']}));
      if ((r.urban.village || 0) >= 0.2) list.push(mk({name: 'Аграрный университет (' + city + ')', region: r.id, type: 'agrarian', fields: ['agro', 'econ']}));
      list.push(mk({name: 'Филиал частного института (' + city + ')', region: r.id, type: 'private', fields: ['econ', 'law', 'hum', 'gmu']}));
    });
    realNames(list);
    list.push(mk({name: 'Рязанское высшее воздушно-десантное командное училище', region: 'ryaz', city: 'Рязань', type: 'military', fields: ['mil']}));
    list.push(mk({name: 'Военная академия связи', region: 'spb', type: 'military', fields: ['mil']}));
    list.push(mk({name: 'Новосибирское высшее военное командное училище', region: 'nsk', type: 'military', fields: ['mil']}));
    cache = list;
    return list;
  }
  // настоящие названия вузов региона (справочник js/data/universities.js) вместо «Государственный университет (город)»
  function realNames(list) {
    var I = D.realInstitutions; if (!I) return;
    Object.keys(I).forEach(function (rid) {
      I[rid].filter(function (u) { return u.kind === 'university' || u.kind === 'university_branch'; }).forEach(function (u) {
        var pr = (u.profiles || []).join(' '), type = /медицин/.test(pr) ? 'medical' : /педагог/.test(pr) ? 'pedagogical' : /агро|аграр|лесн/.test(pr) ? 'agrarian' :
          /универс|многопроф/.test(pr) ? null : 'tech';
        var v = list.filter(function (x) { return x.region === rid && !x.real && (type ? x.type === type : (x.type === 'classic' || x.type === 'federal')); })[0];
        if (!v) return;
        v.name = u.name; v.city = u.city || v.city; v.real = true;
        if (u.level === 'top') { v.q += 8; v.pass += 6; } else if (u.level === 'weak') { v.q -= 6; v.pass -= 5; }
      });
    });
  }
  function homeRegion(s) { return D.vuzRegionAlias[s.person.regionId] || s.person.regionId; }
  function isHome(s, v) {
    var p = s.person;
    if (v.city === p.city) return true;
    // Подмосковье и Ленобласть ездят учиться в столицу на электричке
    return D.vuzRegionAlias[p.regionId] === v.region;
  }
  function era(t, y) { return U.interpYear(t, Math.min(y, 2025)); }
  function canConscript(s) {
    var p = s.person;
    return p.sex === 'm' && S.age(s) >= 18 && S.age(s) < era(D.army.upperAge, s.date.year)
      && ['А', 'Б'].indexOf(p.flags.militaryCat || 'Б') >= 0 && !p.flags.served && !p.flags.officerReserve && !p.army;
  }

  // Балл абитуриента по направлению. ЕГЭ — из результатов; до ЕГЭ и после колледжа — вступительные экзамены.
  function fieldScore(s, fid, rng) {
    var ed = s.person.education, F = D.fields[fid], ege = ed.ege && ed.ege.kind === 'ЕГЭ' && !s.person.diplomas.length ? ed.ege.scores : null;
    ed.entrance = ed.entrance || {};
    var get = function (subj) {
      if (ege) return ege[subj];
      if (ed.entrance[subj] === undefined) ed.entrance[subj] = RL.Teen.score(s, subj, rng, s.person.diplomas.length ? -3 : 3);
      return ed.entrance[subj];
    };
    var parts = [get('russian')];
    for (var i = 0; i < F.need.length; i++) {
      var best = null;
      F.need[i].forEach(function (k) { var v = get(k); if (v !== undefined && (best === null || v > best)) best = v; });
      if (best === null) return null;
      parts.push(best);
    }
    if (F.need.length === 1) parts.push(parts[1]);
    var sc = parts.reduce(function (a, b) { return a + b; }, 0) / parts.length;
    if (s.flags.regionalOlympiad) sc += 4;
    return Math.round(sc);
  }
  function hasAttestat(s) {
    var ed = s.person.education;
    if ((s.person.diplomas || []).length) return true;
    return ed.ege ? !ed.ege.failed : false;
  }

  // ---------- развилки (свои «события» с динамическими вариантами) ----------
  function offer(s, id, title, text, opts) {
    var p = {kind: 'custom', id: id, title: title, text: text, opts: opts, choices: opts.map(function (o, i) { return {i: i, text: o.text}; })};
    if (s.pending) { s.queue.unshift({custom: p}); } else s.pending = p;
  }

  function offerPlan(s, rng, from) {
    var p = s.person, opts = [], y = s.date.year, male = p.sex === 'm';
    if (hasAttestat(s)) {
      Object.keys(D.fields).forEach(function (fid) {
        var F = D.fields[fid];
        if (F.special) return;
        if (F.maleOnly && (!male || ['А', 'Б'].indexOf(p.flags.militaryCat || 'А') < 0)) return;
        var sc = fieldScore(s, fid, rng);
        if (sc === null) return;
        opts.push({kind: 'field', field: fid, score: sc, text: 'Поступать: ' + F.name + ' (твой балл ≈ ' + sc + ')'});
      });
    }
    if (from === 'school' && hasAttestat(s) && RL.Careers) RL.Careers.planOptions(s).forEach(function (o) { opts.unshift(o); });
    if (from === 'school' && hasAttestat(s)) opts.push({kind: 'college', text: 'Колледж после 11 класса (2–3 года)'});
    opts.push({kind: 'work', text: 'Пойти работать'});
    if (from !== 'army' && canConscript(s)) opts.push({kind: 'army', text: 'Сразу отслужить в армии'});
    if (from === 'school' && y >= 2009) opts.push({kind: 'gap', text: 'Год на подготовку и пересдачу ЕГЭ'});
    var head = from === 'school' ? 'Школа позади.' : from === 'college' ? 'Колледж окончен — есть диплом.' : 'Пора решать, что дальше.';
    var noEge = !hasAttestat(s) && from === 'school' ? ' Без аттестата в вуз не возьмут.' : '';
    offer(s, 'admission_plan', 'Что дальше', head + ' Чем заняться?' + noEge, opts);
  }

  function apply(s, fid, score, rng) {
    var p = s.person, y = s.date.year, home = homeRegion(s), shift = era(D.admissionEra.passShift, y);
    var cands = vuzList().filter(function (v) { return v.fields.indexOf(fid) >= 0 && y >= v.fromYear && (v.type !== 'private' || y < 2030); });
    // заявления: свой регион + национальные вузы + один-два вуза соседних уровней, куда реально пройти
    var mine = cands.filter(function (v) { return v.region === home || v.region === p.regionId; });
    var far = cands.filter(function (v) { return mine.indexOf(v) < 0 && (v.top || v.type === 'federal' || v.type === 'military') && v.pass + shift <= score + 8; });
    for (var i = far.length - 1; i > 0; i--) { var j = Math.floor(rng.next() * (i + 1)); var t = far[i]; far[i] = far[j]; far[j] = t; }
    var applied = mine.concat(far.slice(0, 3));
    var res = [];
    applied.forEach(function (v) {
      var pe = v.pass + shift - 3 * Math.log(Math.max(0.2, v.budgetMul || 0.01));
      var r = {v: v, budget: false, target: false, paid: false};
      if (v.type !== 'private' && v.budgetMul > 0) r.budget = rng.chance(1 / (1 + Math.exp(-(score - pe) / 4.5)));
      if (!r.budget && y >= D.admissionEra.targetFrom && ['med', 'ped', 'eng', 'agro'].indexOf(fid) >= 0 && v.region === home && !v.top)
        r.target = rng.chance(1 / (1 + Math.exp(-(score - pe + 10) / 4.5)));
      r.paid = v.type !== 'military' && score >= Math.max(v.minPaid || 40, (v.type === 'private' ? 0 : pe - 25));
      if (y < 2009 && v.type === 'private') r.paid = true;
      res.push(r);
    });
    return res;
  }

  function tuitionReal(s, v, kind) {
    var t = v.tuition * era(D.admissionEra.tuitionMul, s.date.year) * (v.region === 'msk' || v.region === 'spb' ? 1 : S.region(s).price);
    return kind === 'zaochno' ? t * 0.45 : t;
  }
  function canFamilyPay(s, t) {
    var b = s.family.lastBudget || {income: 0, need: 0};
    return (b.income - b.need) * 12 * 0.9 >= t || s.family.savings >= t * 1.3;
  }

  function offerResults(s, fid, score, rng) {
    var res = apply(s, fid, score, rng), F = D.fields[fid], y = s.date.year, opts = [];
    var byQ = function (a, b) { return b.v.q - a.v.q; };
    var where = function (v) { return v.name + (isHome(s, v) ? '' : ' (' + v.city + ')'); };
    res.filter(function (r) { return r.budget; }).sort(byQ).slice(0, 2).forEach(function (r) {
      opts.push({kind: 'enroll', v: r.v, field: fid, form: 'budget', text: 'Бюджет: ' + where(r.v)});
    });
    res.filter(function (r) { return r.target; }).sort(byQ).slice(0, 1).forEach(function (r) {
      opts.push({kind: 'enroll', v: r.v, field: fid, form: 'target', text: 'Целевое (бесплатно, но 3 года отработки в регионе): ' + where(r.v)});
    });
    var bribe = y >= D.admissionEra.bribeYears[0] && y <= D.admissionEra.bribeYears[1];
    res.filter(function (r) { return r.paid && !r.budget; }).sort(byQ).slice(0, 2).forEach(function (r) {
      var t = tuitionReal(s, r.v, 'paid'), fam = canFamilyPay(s, t);
      var credit = y >= D.admissionEra.eduCreditFrom;
      opts.push({kind: 'enroll', v: r.v, field: fid, form: 'paid', payer: fam ? 'family' : credit ? 'credit' : 'self', tuition: t,
        text: 'Платно: ' + where(r.v) + ' — ' + RL.World.money(s, t) + '/год' + (fam ? ', родители потянут' : credit ? ', в образовательный кредит' : ', платить самому — придётся работать')});
      if (bribe && !r.v.top && r.v.type !== 'private' && rng.chance(0.5)) opts.push({kind: 'bribe', v: r.v, field: fid, cost: t * 0.8,
        text: '«Договориться» в приёмной комиссии: ' + where(r.v) + ' — ' + RL.World.money(s, t * 0.8)});
    });
    var z = vuzList().filter(function (v) { return v.region === homeRegion(s) && (v.type === 'classic' || v.type === 'private' || v.type === 'federal') && v.fields.indexOf(fid) >= 0; })[0];
    if (z && fid !== 'med' && fid !== 'mil') opts.push({kind: 'enroll', v: z, field: fid, form: 'zaochno', payer: 'self', tuition: tuitionReal(s, z, 'zaochno'),
      text: 'Заочно (дешевле, работать параллельно, без отсрочки от армии): ' + z.name + ' — ' + RL.World.money(s, tuitionReal(s, z, 'zaochno')) + '/год'});
    opts.push({kind: 'work', text: 'Не поступать — работать'});
    if (canConscript(s)) opts.push({kind: 'army', text: 'В армию'});
    if (y >= 2009 && s.person.education.stage === 'graduate') opts.push({kind: 'gap', text: 'Год на подготовку и пересдачу'});
    var budgets = res.filter(function (r) { return r.budget; }).length;
    offer(s, 'admission_result', 'Приёмная кампания', 'Направление «' + F.name + '», балл ' + score + '. Подано заявлений: ' + res.length + ', на бюджет ' +
      (budgets ? 'прошёл в ' + budgets + '.' : 'не прошёл никуда.').replace('прошёл', s.person.sex === 'f' ? 'прошла' : 'прошёл'), opts);
  }

  function enroll(s, o, rng) {
    var p = s.person, ed = p.education, v = o.v, F = D.fields[o.field], y = s.date.year;
    var years = F.years || (y >= D.admissionEra.bachelorFrom ? 4 : 5);
    if (o.form === 'magistr') years = 2;
    ed.stage = 'vuz';
    ed.vuz = {name: v.name, city: v.city, region: v.region, q: v.q, type: v.type, mil: v.mil, top: v.top, field: o.field, form: o.form,
      course: 1, years: years, start: y, sessions: [], debts: 0, payer: o.payer || null, tuition: o.tuition || 0, level: o.form === 'magistr' ? 'магистр' : years >= 5 ? 'специалист' : 'бакалавр'};
    ed.school = {type: 'vuz', name: v.name, q: v.q};
    var o2 = own(s);
    if (o.form === 'zaochno') { ed.vuz.zaochno = true; }
    if (isHome(s, v) || o.form === 'zaochno') { p.loc = null; o2.living = 'parents'; }
    else {
      var r = D.regions.filter(function (x) { return x.id === v.region; })[0];
      p.loc = {regionId: v.region, settlement: r.tags.indexOf('megapolis') >= 0 ? 'megapolis' : r.urban.million ? 'million' : 'big', city: v.city};
      o2.living = rng.chance(v.dorm) ? 'dorm' : 'rent_room';
    }
    if (o.form === 'paid' && o.payer === 'credit') o2.debts.push({kind: 'edu', name: 'образовательный кредит', balance: 0, principal: 0, rate: 0.03, deferred: true});
    if (o.form === 'paid' || o.form === 'zaochno') payTuition(s, ed.vuz);
    var formName = {budget: 'бюджет', paid: 'платно', target: 'целевое', zaochno: 'заочно', magistr: 'магистратура'}[o.form] || o.form;
    S.log(s, 'Зачисление: ' + v.name + ', «' + F.name + '» (' + formName + ')' + (o2.living === 'dorm' ? '. Живёшь в общежитии в ' + v.city + '.' : o2.living === 'rent_room' ? '. Общежития не дали — снимаешь комнату в ' + v.city + '.' : '.'), 'edu');
    S.adj(s, 'mental', o.form === 'budget' ? 6 : 2);
    if (o.form === 'target') p.flags.targetObligation = 1;
    if (o.field === 'mil') { p.flags.militarySchool = 1; }
  }

  function resolve(s, idx, rng) {
    var pd = s.pending, o = pd.opts[idx], p = s.person, ed = p.education;
    s.pending = null;
    S.log(s, pd.title + ': ' + o.text, 'choice');
    if (o.kind === 'field') { offerResults(s, o.field, o.score, rng); return; }
    if (o.kind === 'enroll') { enroll(s, o, rng); return; }
    if (o.kind === 'bribe') {
      payCash(s, o.cost);
      if (rng.chance(0.75)) { enroll(s, {v: o.v, field: o.field, form: 'budget'}, rng); S.log(s, 'Конверт передан через «репетитора». Ты в списках бюджетников.', 'money'); }
      else S.log(s, 'Деньги взяли, но в списках тебя нет. Жаловаться некуда.', 'bad');
      if (!ed.vuz || ed.stage !== 'vuz') { ed.stage = 'work'; }
      return;
    }
    if (o.kind === 'college') { RL.Teen.setTrack(s, 'college:' + bestCollege(s), rng); ed.collegeYears = 2; ed.grade = 1; return; }
    if (o.kind === 'work') { ed.stage = 'work'; p.loc = null; own(s).living = 'parents'; S.log(s, 'Ищешь работу.', 'info'); return; }
    if (o.kind === 'gap') { ed.stage = 'gap'; ed.prep = (ed.prep || 0) + 4; S.log(s, 'Год подготовки: работа днём, пробники вечером.', 'edu'); return; }
    if (o.kind === 'army') { startService(s, 'conscript', rng); return; }
    if (o.kind === 'serve') { startService(s, 'conscript', rng); return; }
    if (o.kind === 'evade') { p.flags.evader = 1; p.flags.evaderEver = 1; S.log(s, tx(s, 'Ты не [пошёл|пошла] в военкомат. Повестки лежат в почтовом ящике.'), 'bad'); return; }
    if (o.kind === 'ticket') {
      var cost = D.army.whiteTicketCost * AVG(s);
      payCash(s, cost);
      var r = rng.next();
      if (r < 0.75) { p.flags.militaryCat = 'В'; p.flags.boughtTicket = 1; S.log(s, 'Военный билет с категорией «В» куплен за ' + RL.World.money(s, cost) + '.', 'money'); }
      else if (r < 0.9) { S.log(s, 'Посредник исчез с деньгами. Повестка никуда не делась.', 'bad'); startService(s, 'conscript', rng); }
      else { RL.Teen.convict(s, 'minor', rng); S.log(s, 'Схема вскрылась: уголовное дело о даче взятки.', 'bad'); }
      return;
    }
    if (o.kind === 'ags') { startService(s, 'ags', rng); return; }
    if (o.kind === 'magistr') { enroll(s, {v: o.v, field: o.field, form: 'magistr'}, rng); return; }
    if (o.kind === 'move') { moveOut(s, o.living, rng); return; }
    if (o.kind === 'stay') return;
  }
  function bestCollege(s) {
    var pr = s.person.education.profile;
    return pr === 'physmath' ? 'it' : pr === 'natural' ? 'med' : pr === 'socecon' ? 'econ' : 'tech';
  }
  function payCash(s, amt) {
    var o = own(s);
    var fromOwn = Math.min(Math.max(0, o.savings), amt);
    o.savings -= fromOwn; amt -= fromOwn;
    var fromFamily = Math.min(Math.max(0, s.family.savings), amt);
    s.family.savings -= fromFamily; amt -= fromFamily;
    if (amt > 0) o.debts.push({kind: 'relatives', name: 'занял у родни', balance: amt, principal: amt, rate: 0});
  }

  // ---------- армия ----------
  function term(y) { return y < 2007 ? 24 : y < 2008 ? 18 : 12; }
  function startService(s, kind, rng) {
    var p = s.person, y = s.date.year;
    if (kind === 'conscript' && !canConscript(s)) return;
    var previous = p.army;
    p.army = {kind: kind, months: 0, term: kind === 'ags' ? (y < 2008 ? 42 : 21) : kind === 'mobilized' ? rng.int(10, 30) : kind === 'contract' ? rng.int(12, 24) : term(y),
      war: false, returnStage: previous ? previous.returnStage : p.education.stage === 'vuz' ? 'vuz' : 'work',
      returnLiving: previous ? previous.returnLiving : own(s).living, returnLoc: previous ? previous.returnLoc : p.loc || null};
    p.army.prevStage = p.education.stage;
    p.education.stage = kind === 'ags' ? 'army' : 'army';
    own(s).living = 'army';
    if (p.job) p.job.employed = false;
    var where = kind === 'ags' ? 'альтернативная гражданская служба — санитаром в больнице в другом регионе' :
      kind === 'mobilized' ? 'мобилизация: учебка две недели, потом — зона СВО' : kind === 'contract' ? 'контракт с Минобороны' :
        'призыв: ' + rng.pick(['мотострелки под Читой', 'ракетные войска в Тейкове', 'стройбат в Подмосковье', 'погранвойска на Камчатке', 'связь в Ростове', 'флот в Североморске']);
    S.log(s, 'Армия: ' + where + '. Срок — ' + p.army.term + ' мес.', 'family');
    S.adj(s, 'social', -10);
  }
  function serviceMonthly(s, rng) {
    var p = s.person, a = p.army, y = s.date.year, A = D.army;
    a.months++;
    S.adj(s, 'health', 0.15); S.trait(s, 'conformity', 0.3); S.trait(s, 'selfControl', 0.2);
    if (a.kind === 'conscript') {
      var hz = era(A.hazing, y);
      if (rng.chance(hz)) {
        var hard = rng.chance(0.3);
        S.log(s, hard ? 'Дедовщина: «деды» избили ночью в каптёрке. Неделя в санчасти, официально — «упал с лестницы».' : 'Дедовщина: отбирают деньги и посылки, заставляют стирать чужое.', 'bad');
        S.adj(s, 'mental', hard ? -10 : -4); if (hard) S.adj(s, 'health', -8);
      }
      if (rng.chance(A.deathMonthly)) { s.deathNow = rng.pick(['Несчастный случай на службе', 'Самоубийство в армии (официальная версия)', 'Пневмония в части']); return; }
      if (!a.warChecked && A.warYears.some(function (w) { return y >= w[0] && y <= w[1]; })) {
        a.warChecked = true;
        if (rng.chance(A.warDeployShare)) { a.war = true; S.log(s, 'Часть отправили в Чечню.', 'bad'); }
      }
      if (a.war && rng.chance(A.warDeathMonthly)) { s.deathNow = 'Погиб в Чечне'; return; }
      if (a.war && rng.chance(0.01)) { S.log(s, 'Ранение: осколок, госпиталь в Моздоке.', 'bad'); S.adj(s, 'health', -20); S.adj(s, 'mental', -12); RL.Health.addCondition(s, 'war_injury', rng); }
      // давление подписать контракт (2022+)
      if (y >= 2022 && RL.World.flag(s, y, 'svo', 0) && a.months === 3 && rng.chance(0.4)) RL.Events.queue(s, 'army_contract_pressure', {});
    }
    if (a.kind === 'mobilized' || a.kind === 'contract') {
      var R = D.history.deploymentRisk;
      if (rng.chance(R.death)) { s.deathNow = 'Погиб в зоне боевых действий'; return; }
      if (rng.chance(R.injury)) {
        S.log(s, 'Ранение в зоне СВО. Госпиталь, потом реабилитация.', 'bad'); S.adj(s, 'health', -22); S.adj(s, 'mental', -12);
        RL.Health.addCondition(s, 'war_injury', rng);
        if (rng.chance(0.35) && !p.disability) { p.disability = {since: y, reason: 'ранение'}; S.log(s, 'Комиссовали с инвалидностью.', 'bad'); a.months = a.term; }
      }
      S.adj(s, 'mental', -0.6);
      own(s).savings += 2.4 * RL.Economy.AVG24() * 0.6; // часть денежного довольствия откладывается
    }
    if (a.months >= a.term) {
      p.flags.served = 1;
      p.education.stage = a.returnStage === 'vuz' && p.education.vuz ? 'vuz' : 'work';
      own(s).living = p.education.stage === 'vuz' ? a.returnLiving || 'parents' : 'parents';
      p.loc = p.education.stage === 'vuz' ? a.returnLoc || null : null;
      S.log(s, a.kind === 'conscript' ? 'Дембель! Домой с военным билетом.' : a.kind === 'ags' ? 'Альтернативная служба окончена.' : 'Вернулся домой.', 'good');
      if (a.kind !== 'ags' && rng.chance(a.war || a.kind !== 'conscript' ? 0.35 : 0.1)) { RL.Teen.setHabit(s, 'alcohol', Math.max(2, (p.habits || {}).alcohol || 0)); }
      if (a.war || a.kind === 'mobilized' || a.kind === 'contract') { p.flags.veteran = 1; if (rng.chance(0.25)) RL.Health.addCondition(s, 'ptsd', rng); }
      p.army = null;
    }
  }
  function draftCheck(s, rng) {
    var p = s.person, y = s.date.year, m = s.date.month, A = D.army, a = S.age(s);
    if (p.sex !== 'm' || p.flags.served || p.army || p.flags.officerReserve || (RL.Emigration && RL.Emigration.abroad(s))) return;
    if (['А', 'Б'].indexOf(p.flags.militaryCat || 'Б') < 0) return;
    if (a < 18 || a >= era(A.upperAge, y)) return;
    var st = p.education.stage;
    if ((st === 'vuz' && !p.education.vuz.zaochno) || st === 'college' || st === 'school' || st === 'colony' || st === 'army' || st === 'graduate') return;
    if (p.job && p.job.employed && p.job.prof === 'it' && y >= 2022) return; // IT-отсрочка
    if (p.job && p.job.employed && p.job.prof === 'athlete') return; // спортрота
    var spring = m >= 3 && m <= 6, autumn = m >= 9 && m <= 11;
    if (!spring && !autumn) return;
    var r = S.region(s), mul = era(A.draftEraMul, y);
    if (p.settlement === 'village' || p.settlement === 'small') mul *= A.draftMods.village;
    if (r.tags.indexOf('capital') >= 0 || r.tags.indexOf('megapolis') >= 0) mul *= A.draftMods.capital;
    if (r.tags.indexOf('chechnya') >= 0) mul *= A.draftMods.chechnya; else if (r.tags.indexOf('caucasus') >= 0) mul *= A.draftMods.caucasus;
    var months = spring ? 4 : 3;
    if (p.flags.evader) {
      // уклонист: облавы военкомата и полиции
      if (rng.chance(0.03 * (r.tags.indexOf('capital') >= 0 ? 0.5 : 1))) {
        S.log(s, 'Облава: полиция привезла тебя в военкомат прямо с работы. Отправка в тот же день.', 'bad');
        p.flags.evader = 0; startService(s, 'conscript', rng);
      }
      return;
    }
    if (!rng.chance(A.draftPerCampaign * mul / months)) return;
    var opts = [{kind: 'serve', text: 'Пойти служить'}, {kind: 'evade', text: 'Не открывать дверь и не ходить в военкомат'}];
    if (y >= A.whiteTicketFrom && y <= A.whiteTicketTo) opts.push({kind: 'ticket', text: 'Купить «белый билет» (~' + RL.World.money(s, A.whiteTicketCost * AVG(s)) + ')'});
    if (y >= A.agsFrom) opts.push({kind: 'ags', text: 'Подать на альтернативную гражданскую службу'});
    offer(s, 'draft_notice', 'Повестка', 'В почтовом ящике повестка: явиться в военкомат для отправки к месту службы.', opts);
  }
  function mobilizationCheck(s, rng) {
    var p = s.person, y = s.date.year, m = s.date.month, yd = RL.World.yearData(s, y);
    if (p.sex !== 'm' || p.army || !yd.mobilization) return;
    if (!(p.flags.served || p.flags.officerReserve) || S.age(s) > 35 || p.disability) return;
    if (m < yd.mobilization.month || m >= yd.mobilization.month + yd.mobilization.months) return;
    if (p.job && p.job.employed && p.job.prof === 'it' && rng.chance(0.8)) return;
    var share = D.history.mobilizationBaseShare * 2, M = D.history.mobilizationRegionMul;
    S.region(s).tags.forEach(function (t) { if (M[t]) share *= M[t]; });
    if (rng.chance(share / yd.mobilization.months)) { S.log(s, 'Повестка о мобилизации.', 'bad'); startService(s, 'mobilized', rng); }
  }

  // ---------- вуз ----------
  function vuzMonthly(s, rng) {
    var p = s.person, ed = p.education, v = ed.vuz, y = s.date.year, m = s.date.month, hb = p.habits || {};
    if (m !== 0 && m !== 5) return;
    var load = {parttime: 0.25, career: 0.4, friends: 0.15, love: 0.1, study: -0.5, selfedu: -0.2}[p.focus] || 0;
    if (p.job && p.job.employed && !v.zaochno) load += 0.3;
    var z = (p.stats.skills - 55) / 14 * 0.5 + (p.hidden.iq - 100) / 15 * 0.4 + (p.traits.diligence || 0) / 50 * 0.35 - (v.q - 60) / 40 * 0.3
      - load + (p.stats.mental - 60) / 20 * 0.15 - ((hb.drugs || 0) >= 2 ? 1 : 0) - ((hb.alcohol || 0) >= 2 ? 0.35 : 0) + rng.normal(0, 0.55) + 0.25;
    var r = z >= 1.1 ? 'отлично' : z >= 0 ? 'хорошо' : z >= D.young.sessionDebtThreshold ? 'удовлетворительно' : 'долги';
    v.sessions.push(r);
    if (r === 'долги') {
      if (rng.chance(0.55)) S.log(s, 'Сессия с хвостами — пересдал с третьей попытки.'.replace('пересдал', p.sex === 'f' ? 'пересдала' : 'пересдал'), 'edu');
      else {
        S.log(s, 'Отчисление за академическую неуспеваемость (' + v.course + ' курс).', 'bad');
        S.adj(s, 'mental', -12);
        ed.vuzHistory = (ed.vuzHistory || []).concat([{name: v.name, field: v.field, result: 'отчислен', year: y}]);
        ed.vuz = null; ed.stage = 'work'; ed.school = null; own(s).living = 'parents'; p.loc = null;
        own(s).debts.forEach(function (d) { if (d.kind === 'edu') d.deferred = false; });
        return;
      }
    }
    if (m === 5) {
      if (v.course >= v.years) { graduateVuz(s, rng); return; }
      S.log(s, v.course + ' курс закрыт' + ({'отлично': ' на «отлично»', 'хорошо': ' без троек', 'удовлетворительно': ' с тройками', 'долги': ' через пересдачи'}[r]) + '.', 'edu');
      v.course++;
      // платное обучение: оплата года
      if (v.form === 'paid' || v.form === 'zaochno') payTuition(s, v);
      if (v.course === 2 && v.mil && p.sex === 'm' && ['А', 'Б'].indexOf(p.flags.militaryCat || 'А') >= 0 && !v.zaochno) RL.Events.queue(s, 'mil_dept', {});
    }
  }
  function payTuition(s, v) {
    if (v.payer === 'family') return; // учтено в бюджете семьи помесячно
    var o = own(s);
    if (v.payer === 'credit') { var d = o.debts.filter(function (x) { return x.kind === 'edu'; })[0]; if (d) { d.balance += v.tuition; d.principal += v.tuition; } return; }
    payCash(s, v.tuition);
  }
  function graduateVuz(s, rng) {
    var p = s.person, ed = p.education, v = ed.vuz, y = s.date.year;
    var top = v.sessions.filter(function (x) { return x === 'отлично'; }).length / Math.max(1, v.sessions.length);
    var red = top >= 0.75 && v.sessions.indexOf('удовлетворительно') < 0 && v.sessions.indexOf('долги') < 0;
    p.diplomas = (p.diplomas || []).concat([{level: v.level, field: v.field, inst: v.name, q: v.q, top: v.top, year: y, red: red}]);
    if (s.flags.milDeptJoined) { p.flags.officerReserve = 1; S.log(s, 'Военный учебный центр окончен: лейтенант запаса.', 'info'); }
    if (v.field === 'mil') { p.flags.officerReserve = 1; p.flags.served = 1; }
    S.log(s, 'Диплом: ' + v.level + ', «' + D.fields[v.field].name + '», ' + v.name + (red ? ' — красный!' : '.'), 'good');
    ed.vuzHistory = (ed.vuzHistory || []).concat([{name: v.name, field: v.field, result: v.level + (red ? ' (красный диплом)' : ''), year: y}]);
    var o = own(s), d = o.debts.filter(function (x) { return x.kind === 'edu'; })[0];
    if (d) d.deferred = false;
    ed.vuz = null; ed.school = null; ed.stage = 'work';
    o.living = 'parents'; p.loc = null;
    if (v.field === 'mil') { // выпускник военного училища — офицер по контракту
      p.job = makeJob(s, 'military', rng, 1.15); p.job.employed = true;
      S.log(s, 'Лейтенант. Распределение в часть, контракт на 5 лет.', 'family');
      return;
    }
    // магистратура — для бакалавров
    if (v.level === 'бакалавр' && S.age(s) < 24) {
      var ok = top >= 0.4 || rng.chance(0.3);
      var opts = [];
      if (ok) opts.push({kind: 'magistr', v: {name: v.name, city: v.city, region: v.region, q: v.q, type: v.type, mil: false, top: v.top, dorm: 0.6}, field: v.field, text: 'Магистратура (бюджет): ' + v.name});
      opts.push({kind: 'work', text: 'Работать'});
      if (canConscript(s)) opts.push({kind: 'army', text: 'Отслужить сейчас (1 год)'});
      offer(s, 'after_vuz', 'После бакалавриата', 'Бакалавриат окончен. Дальше?', opts);
    }
  }

  // ---------- работа ----------
  function makeJob(s, profId, rng, mul) {
    var L = loc(s), pr = D.economy.professions.filter(function (x) { return x.id === profId; })[0];
    var st = D.settlementTypes[L.settlement], a = S.age(s), dip = (s.person.diplomas || []).slice(-1)[0];
    var entry = U.interpYear(D.young.entryWage, Math.min(25, a));
    var q = dip ? 1 + (dip.q - 55) / 150 + (dip.red ? 0.05 : 0) + (dip.top ? 0.2 : 0) : 1;
    if (s.flags.internship) q *= 1.08;
    // стартовый капитал семьи: связи родителей, репетиторы, «куда пристроить» — ±12% к зарплате за квинтиль, после 40 — вдвое слабее [~ НИУ ВШЭ, межпоколенческая мобильность]
    var oq = s.person.flags.originQ ? 1 + 0.12 * (s.person.flags.originQ - 3) * (a >= 40 ? 0.5 : 1) : 1;
    var base = pr.wage * D.economy.wageScale * L.region.wage * st.wage * entry * q * (mul || 1) * oq * rng.lognorm(pr.sd) * (RL.Emigration ? RL.Emigration.wageMul(s) : 1);
    var shadowP = U.clamp(pr.shadow * U.interpYear(D.economy.shadowLevel, Math.min(s.date.year, 2024)) / 0.15 * 0.6, 0, 0.9);
    return {prof: profId, base: Math.round(base), shadow: rng.chance(shadowP) ? rng.range(0.3, 1) : 0, employed: true, raise: 1, since: S.ageMonths(s), monthsUnemployed: 0};
  }
  function choosePro(s, rng) {
    return RL.Careers ? RL.Careers.pick(s, rng, function () { return choosePro0(s, rng); }) : choosePro0(s, rng);
  }
  function choosePro0(s, rng) {
    var dip = (s.person.diplomas || []).slice(-1)[0], lvl = eduLevel(s), y = s.date.year, L = loc(s);
    if (dip && dip.level !== 'СПО') { var F = D.fields[dip.field]; if (rng.chance(F.bySpec)) return rng.pick(F.prof); }
    if (dip && dip.level === 'СПО' && rng.chance(0.55)) return D.collegeProfs && D.collegeProfs[dip.field] ? rng.pick(D.collegeProfs[dip.field]) : dip.prof;
    return RL.Birth.pickProfession(rng, lvl, s.person.sex, L.settlement, y).id;
  }
  function jobMonthly(s, rng) {
    var p = s.person, y = s.date.year, ctx = RL.World.ctx(s), L = loc(s), hb = p.habits || {};
    var st = p.education.stage;
    var seeking = (st === 'work' || st === 'gap') || (st === 'vuz' && (p.education.vuz.zaochno || p.focus === 'parttime' || p.focus === 'career' || p.education.vuz.payer === 'self'));
    if (st === 'army' || st === 'colony' || S.age(s) < 15) return;
    if (!p.job || !p.job.employed) {
      // пенсионер ищет работу, только если сам этого хочет (фокус) или не хватает денег
      if (p.pension && p.focus !== 'jobhunt' && !(p.stats.money < 25 && S.age(s) < 70)) seeking = false;
      if (!seeking) return;
      var aa = S.age(s), ageK = aa >= 75 ? 0 : aa >= 70 ? 0.02 : aa >= 65 ? 0.08 : aa >= 60 ? 0.2 : aa >= 55 ? 0.4 : aa >= 45 ? 0.7 : 1; // после 45 ищут дольше, после 55 — находят редко
      var h = ageK * 0.16 * [0.8, 1, 1.2][eduLevel(s)] / Math.sqrt(L.region.unemployment) * (p.focus === 'jobhunt' ? 1.8 : 1) * Math.sqrt(Math.max(10, p.stats.social) / 50)
        / Math.sqrt(ctx.flags.jobLoss || 1) * ((hb.drugs || 0) >= 2 ? 0.3 : 1) * ((hb.alcohol || 0) >= 2 ? 0.6 : 1) * (p.flags.criminalRecord ? 0.5 : 1);
      h *= (RL.Character ? RL.Character.mul(s, 'jobFind') : 1);
      var conn = S.adultsHome(s).some(function (m) { return m.job && ['official', 'police', 'manager', 'business', 'doctor'].indexOf(m.job.prof) >= 0; });
      if (conn) h *= 1.3;
      var tieAny = RL.Social && RL.Social.best(s, ['business', 'official', 'bank', 'police', 'doctor', 'school']);
      if (tieAny) h *= 1.5;
      if (p.job) p.job.monthsUnemployed = (p.job.monthsUnemployed || 0) + 1;
      if (rng.chance(h)) {
        var first = !p.flags.firstJob;
        var viaConn = conn && rng.chance(0.4);
        var viaTie = !viaConn && RL.Social ? RL.Social.jobHelp(s, rng) : null;
        p.job = makeJob(s, choosePro(s, rng), rng, (viaConn ? 1.1 : viaTie ? 1.15 : 1) * (aa >= 45 && !first ? 0.8 : 1));
        p.flags.firstJob = 1;
        var pr = S.prof({job: p.job});
        S.log(s, (first ? 'Первая работа: ' : 'Новая работа: ') + pr[p.sex] + (viaConn ? ' (устроили знакомые родителей)' : viaTie ? ' (по знакомству: ' + RL.Social.label(viaTie) + ')' : '') + ', ' + RL.World.money(s, netWage(s)) + ' в месяц' + (p.job.shadow > 0.5 ? ' в конверте' : '') + '.', 'money');
      }
      return;
    }
    // работает
    var prr = D.economy.professions.filter(function (x) { return x.id === p.job.prof; })[0] || {};
    var u = U.clamp(ctx.unemployment * L.region.unemployment, 0.005, 0.5);
    var loss = u / (1 - u) / 7 * (prr.unempl || 1) * (ctx.flags.jobLoss || 1) * 1.3 * ((hb.alcohol || 0) >= 3 ? 3.5 : (hb.alcohol || 0) >= 2 ? 2 : 1) * ((hb.drugs || 0) >= 2 ? 3 : 1) * (p.focus === 'career' ? 0.6 : 1);
    loss *= (RL.Character ? RL.Character.mul(s, 'jobLoss') : 1);
    if (p.job.prof === 'athlete' || p.job.prof === 'deputy') loss = 0; // у них своя логика (RL.Careers, RL.Politics)
    if (rng.chance(loss)) { p.job.employed = false; p.job.monthsUnemployed = 0; S.log(s, 'Потерял работу.'.replace('Потерял', p.sex === 'f' ? 'Потеряла' : 'Потерял'), 'bad'); S.adj(s, 'mental', -6); return; }
    // рост за опыт: быстрый в начале карьеры, после 25 — медленнее (дальше растут повышениями, RL.Adult)
    if (s.date.month === 0) p.job.raise *= rng.normal(S.age(s) < 25 ? 1.05 : 1.015, 0.04) * (p.focus === 'career' ? 1.03 : 1);
    if (p.focus === 'career' && rng.chance(0.01)) RL.Events.queue(s, 'burnout', {});
  }
  function netWage(s) {
    var j = s.person.job; if (!j || !j.employed || j.onLeave) return 0;
    var w = j.base * RL.World.realWageIndex(s, s.date.year, s.date.month) * (j.raise || 1);
    return w * (1 - j.shadow) * 0.87 + w * j.shadow;
  }

  // ---------- свой бюджет ----------
  function stipend(s) {
    var v = s.person.education.vuz;
    if (s.person.education.stage !== 'vuz' || !v || v.zaochno || (v.form !== 'budget' && v.form !== 'target' && v.form !== 'magistr')) return 0;
    var last = v.sessions.slice(-1)[0], k = era(D.stipend.eraMul, s.date.year), x = 0;
    if (last === 'отлично') x = D.stipend.high; else if (last === 'хорошо' || !last) x = D.stipend.academic;
    if (s.family.poverty) x += D.stipend.social;
    return x * k * AVG(s);
  }
  function moveOut(s, kind, rng) {
    var o = own(s);
    o.living = kind;
    S.log(s, kind === 'rent_flat' ? 'Ты [снял|сняла] однушку и [съехал|съехала] от родителей.' : 'Снимаешь комнату с друзьями — съехал'.replace('съехал', s.person.sex === 'f' ? 'съехала' : 'съехал') + ' от родителей.', 'family');
    s.log[s.log.length - 1].text = tx(s, s.log[s.log.length - 1].text);
  }
  function debtPayments(o, cap) {
    var items = {};
    o.debts.forEach(function (d) {
      d.payment = 0;
      if (d.deferred || d.balance <= 0) return;
      var due = d.fixedPayment ? Math.min(d.balance * (1 + d.rate / 12), d.fixedPayment) : Math.min(d.balance * (1 + d.rate / 12), Math.max(d.balance * d.rate / 12 * 1.05,
        d.balance * (d.kind === 'edu' ? 0.012 : d.kind === 'mfo' ? 0.15 : 0.04)));
      d.payment = Math.min(due, Math.max(0, cap)); cap -= d.payment;
      items['debt_' + d.kind] = (items['debt_' + d.kind] || 0) + d.payment;
    });
    return items;
  }
  function settleDebts(o) {
    o.debts.forEach(function (d) {
      d.balance *= 1 + d.rate / 12;
      if (d.kind === 'mfo') d.balance = Math.min(d.balance, (d.principal || d.balance) * 2.3);
      d.balance = Math.max(0, d.balance - (d.deferred ? 0 : d.payment || 0));
    });
    o.debts = o.debts.filter(function (d) { return d.balance > 50 || d.deferred; });
  }
  function budgetMonthly(s, rng) {
    var p = s.person, o = own(s), L = loc(s), y = s.date.year, a = S.age(s);
    var wage = netWage(s), st = stipend(s);
    var fdef = RL.Childhood.focusDef(p.focus);
    if (fdef && fdef.earnAdult && p.job && p.job.employed) wage += fdef.earnAdult * AVG(s) * L.region.wage;
    // заработок фокуса без работы (18+): у контента доход свой у каждой — от копеек до нескольких зарплат; после 2022 — через посредников
    if (fdef && fdef.earnAny) {
      var ek = fdef.earnAny;
      if (fdef.adultWork === 'content') { if (!p.flags.contentK) p.flags.contentK = Math.round(rng.range(0.15, 3) * 100) / 100; ek *= p.flags.contentK * (y >= 2022 ? 0.5 : 1); }
      wage += ek * AVG(s) * L.region.wage;
    }
    s.family.childSupport = 0; s.family.tuitionMonthly = 0;
    var v = p.education.vuz;
    if (p.education.stage === 'vuz' && v && v.payer === 'family' && (v.form === 'paid' || v.form === 'zaochno')) s.family.tuitionMonthly = v.tuition / 12;
    if (!apart(s) || o.living === 'army' || o.living === 'prison') {
      // В общий бюджет идёт только остаток после личных долгов. На службе зарплаты нет.
      var available = o.living === 'army' ? 0 : (p.earnings || 0) + wage + st + (RL.Adult ? RL.Adult.income(s) : 0) + (RL.Old ? RL.Old.income(s) : 0) + (RL.Assets ? RL.Assets.income(s) : 0);
      var payments = debtPayments(o, available + o.savings);
      var paid = Object.keys(payments).reduce(function (t, k) { return t + payments[k]; }, 0);
      o.savings -= Math.max(0, paid - available);
      // взрослый, живущий с родителями, отдаёт в общий котёл около половины, остальное копит
      var rest = Math.max(0, available - paid), keep = a >= 22 ? rest * (p.focus === 'invest' ? 0.3 : 0.12) : 0;
      o.savings += keep; p.earnings = rest - keep;
      settleDebts(o);
      o.lastBudget = null;
      return;
    }
    var k = L.region.price * D.settlementTypes[L.settlement].price, Y = D.young, C = D.economy.costs;
    var rent = 0;
    if (o.living === 'dorm') rent = Y.dorm * k;
    else if (o.living === 'rent_room') rent = (C.rent[L.settlement] || C.rent.big)[0] * Y.roomShare;
    else if (o.living === 'rent_flat') rent = (C.rent[L.settlement] || C.rent.big)[0];
    var items = {rent: rent, food: Y.foodAdult * k, transport: Y.transport * k, phone: Y.phone, clothes: Y.clothes * k, fun: Y.fun * k};
    if (RL.Adult) { var ai = RL.Adult.items(s); Object.keys(ai).forEach(function (x) { items[x] = ai[x]; }); }
    if (RL.OwnFamily) { var fi = RL.OwnFamily.items(s); Object.keys(fi).forEach(function (x) { items[x] = fi[x]; }); }
    if (RL.Old) { var oi = RL.Old.items(s); Object.keys(oi).forEach(function (x) { items[x] = oi[x]; }); }
    if (RL.Assets) { var ai2 = RL.Assets.items(s); Object.keys(ai2).forEach(function (x) { items[x] = ai2[x]; }); }
    if (o.living === 'nursing_home') items.care = 45000 * k;
    if (fdef && fdef.cost && a >= 18) items.focus = fdef.cost * k;
    if (RL.Law) { var fs_ = RL.Law.fsspItem(s); if (fs_ > 0) items.fssp = fs_; }
    var hb = p.habits || {};
    if (hb.smoking >= 2) items.tobacco = C.smoker * (y < 2016 ? 0.6 : 1);
    if (hb.alcohol >= 2) items.alcohol = C.alcoholPerLevel * (hb.alcohol - 1);
    if (hb.drugs >= 2) items.drugs = 8000 * (hb.drugs - 1);
    var paymentsApart = debtPayments(o, Infinity);
    Object.keys(paymentsApart).forEach(function (k) { items[k] = paymentsApart[k]; });
    // помощь родителей студенту / безработному
    var fb = s.family.lastBudget || {income: 0, need: 0};
    var spare = Math.max(0, (fb.income || 0) - (fb.need || 0));
    var needHelp = (v && !v.zaochno) || (!wage && a < 30);
    var help = needHelp && s.family.type !== 'orphanage' && s.family.type !== 'alone' && S.parentsAlive(s).length ? Math.min(spare * Y.helpShare, Y.helpMax * AVG(s)) : 0;
    s.family.childSupport = help;
    var need = 0; Object.keys(items).forEach(function (x) { need += items[x]; });
    var biz = (RL.Adult ? RL.Adult.income(s) : 0) + (RL.OwnFamily ? RL.OwnFamily.income(s) : 0) + (RL.Old ? RL.Old.income(s) : 0) + (RL.Assets ? RL.Assets.income(s) : 0);
    var inc = wage + st + help + (p.earnings || 0) + biz;
    p.earnings = 0; // личный доход не поступает в бюджет родителей в следующем месяце
    var bal = inc - need, cut = 0;
    o.deprivation = Math.max(0, o.deprivation - 0.25);
    // норма сбережений домохозяйств РФ ~5–10% дохода: большая часть остатка уходит на рост потребления
    if (bal >= 0) { o.savings += bal * (p.focus === 'invest' ? 0.3 : 0.08); }
    else {
      var flex = items.fun + items.clothes * 0.6 + items.food * 0.25;
      cut = Math.min(-bal, flex); bal += cut;
      if (cut > 0) o.deprivation = Math.min(3, o.deprivation + 0.5 * cut / flex);
      if (bal < 0 && o.savings > 0) { var t = Math.min(o.savings, -bal); o.savings -= t; bal += t; }
      if (bal < 0) borrow(s, -bal, wage, y);
    }
    settleDebts(o);
    var debt = o.debts.reduce(function (t2, d) { return t2 + d.balance; }, 0);
    o.lastBudget = {income: inc, wage: wage, stipend: st, help: help, items: items, need: need, cut: cut, debt: debt, rentIn: RL.Assets ? RL.Assets.income(s) : 0, pension: RL.Old ? RL.Old.income(s) : 0};
    var median = D.economy.medianPerCapitaK * AVG(s) * L.region.wage * D.settlementTypes[L.settlement].wage;
    var ratio = (inc - rent * 0.5) / Math.max(1, median) / (RL.OwnFamily ? RL.OwnFamily.scale(s) : 1);
    var target = 50 + 22 * Math.log(Math.max(0.05, ratio)) / Math.LN2 + Math.min(12, o.savings / Math.max(1, need) * 2) - Math.min(25, debt / Math.max(1, inc) * 2) - o.deprivation * 8;
    p.stats.money = U.clamp(U.lerp(p.stats.money, U.clamp(target, 0, 100), 0.25), 0, 100);
  }
  function borrow(s, amt, wage, y) {
    var o = own(s), E = D.economy, kind;
    // больше никто не даёт: долги без залога больше года доходов — платежи не вносятся (просрочка), живёшь впроголодь
    var unsec = o.debts.filter(function (d) { return d.kind !== 'mortgage' && d.kind !== 'edu'; }).reduce(function (t, d) { return t + d.balance; }, 0);
    if (unsec > 12 * Math.max(wage, 0.3 * AVG(s))) {
      o.debts.forEach(function (d) { if (amt <= 0 || !d.payment) return; var c = Math.min(d.payment, amt); d.payment -= c; amt -= c; d.overdue = (d.overdue || 0) + c; });
      o.deprivation = 3; o.defaulted = true;
      return;
    }
    var mfo = o.debts.filter(function (d) { return d.kind === 'mfo'; }).reduce(function (t, d) { return t + d.balance; }, 0);
    if (y >= E.bankCardFrom && wage > 0 && !o.badCredit) kind = 'bank';
    else if (y >= E.mfoFrom && mfo < Math.max(15000, wage * 1.5 + 15000)) kind = 'mfo';
    else kind = 'relatives';
    var d = o.debts.filter(function (x) { return x.kind === kind; })[0];
    if (!d) {
      d = {kind: kind, name: {bank: 'кредитка', mfo: 'микрозаём', relatives: 'долг родителям/друзьям'}[kind], balance: 0, principal: 0,
        rate: kind === 'bank' ? U.interpYear(E.creditRate, Math.min(y, 2024)) : kind === 'mfo' ? E.mfoRateYear : 0};
      o.debts.push(d);
      if (kind === 'mfo') S.log(s, 'Взял микрозаём до зарплаты.'.replace('Взял', s.person.sex === 'f' ? 'Взяла' : 'Взял'), 'bad');
    }
    d.balance += amt; d.principal += amt;
  }

  // ---------- эффекты из событий ----------
  function applyEffects(s, eff, rng) {
    if (eff.army) startService(s, eff.army, rng);
    if (eff.moveOut) moveOut(s, eff.moveOut, rng);
    if (eff.bigMove && s.person.education.stage !== 'vuz') {
      var r = D.regions.filter(function (x) { return x.id === eff.bigMove; })[0];
      s.person.loc = {regionId: r.id, settlement: 'megapolis', city: mainCity(r)};
      own(s).living = 'rent_room';
      if (s.person.job) s.person.job.employed = false;
      S.log(s, 'Переезд в ' + mainCity(r) + ': комната на окраине, поиск работы заново.', 'family');
    }
    if (eff.cityMove && s.person.education.stage !== 'vuz') {
      var hr = loc(s).region, cc = hr.cities, st2 = cc.million ? 'million' : cc.big ? 'big' : cc.megapolis ? 'megapolis' : 'medium';
      s.person.loc = {regionId: hr.id, settlement: st2, city: (cc[st2] || [mainCity(hr)])[0]};
      own(s).living = 'rent_room';
      if (s.person.job) s.person.job.employed = false;
      S.log(s, 'Переезд в ' + s.person.loc.city + ': комната в общежитии гостиничного типа, работа — заново.', 'family');
    }
    if (eff.quitJob && s.person.job) s.person.job.employed = false;
  }

  // ---------- где жить, когда родительского дома больше нет ----------
  // Выпускник детдома: единовременная выплата и право на квартиру (159-ФЗ) — часть получает сразу, остальные ждут в очереди годами.
  function orphanFlat(s) {
    var p = s.person, area = 33;
    p.flags.orphanFlat = 1;
    var where = RL.Assets.addFlat(s, {area: area, price: RL.Adult.flatPrice(s, area), social: true, year: s.date.year}, 'квартира по льготе сироты');
    S.log(s, tx(s, 'По льготе сироты ты [получил|получила] однокомнатную квартиру (' + area + ' м²): договор найма на 5 лет, потом — в собственность.' + (where === 'live' ? ' Переезд!' : '')), 'good');
    S.adj(s, 'happiness', 8); S.adj(s, 'mental', 5);
  }
  function homeCheck(s, rng) {
    var p = s.person, o = own(s), fam = s.family, a = S.age(s), st = p.education.stage;
    if (a < 18) return;
    if (fam.type === 'orphanage' && !p.flags.leftOrphanage && st !== 'school') {
      p.flags.leftOrphanage = 1;
      var lump = AVG(s) * 1.2;
      o.savings += lump;
      fam.type = 'alone';
      S.log(s, 'Выпуск из детского дома. Единовременное пособие — ' + RL.World.money(s, lump) + '. По закону сироте положено жильё от государства.', 'family');
      if (rng.chance(s.date.year >= 2013 ? 0.4 : 0.2)) orphanFlat(s);
      else {
        p.flags.orphanFlatQueue = S.ageMonths(s);
        if (o.living === 'parents') o.living = st === 'vuz' || st === 'college' ? 'dorm' : 'rent_room';
        S.log(s, 'Квартиру обещают «в порядке очереди». Пока — ' + (o.living === 'dorm' ? 'общежитие.' : 'съёмная комната.'), 'bad');
      }
    }
    if (p.flags.orphanFlatQueue && !p.flags.orphanFlat && rng.chance(1 / 40)) orphanFlat(s);
    // родителей и опекунов в доме не осталось — взрослый живёт сам
    if (o.living === 'parents' && fam.type !== 'orphanage' && !S.home(s).some(function (m) { return m.role !== 'sibling'; })) {
      var h = fam.housing || {};
      if (o.flat) { o.living = 'own_flat'; }
      else if ((h.owned || h.withParents) && ['flat', 'private_house', 'new_mortgage', 'parents_flat'].indexOf(h.type) >= 0) {
        var heirs = 1 + fam.members.filter(function (m) { return m.role === 'sibling' && m.alive; }).length;
        p.flags.inherited = 1;
        RL.Assets.addFlat(s, {area: h.area || 46, price: RL.Adult.flatPrice(s, h.area || 46) * (h.type === 'private_house' ? 0.6 : 1), inherited: true, year: s.date.year, house: h.type === 'private_house'});
        S.log(s, 'Родительское жильё теперь твоё' + (heirs > 1 ? ' (доли у братьев и сестёр — договорились, что живёшь ты)' : '') + '.', 'family');
      } else {
        o.living = 'rent_room';
        S.log(s, 'Родительского жилья нет — снимаешь комнату.', 'family');
      }
      if (fam.type !== 'alone') fam.type = 'alone';
    }
  }

  // ---------- главный месячный шаг ----------
  function monthly(s, rng) {
    var p = s.person, a = S.age(s), ed = p.education, m = s.date.month;
    if (a < 15) return;
    own(s);
    if (!p.diplomas) p.diplomas = [];
    p.earnings = p.earnings || 0;
    // выпускник школы: приёмная кампания в июле
    if (ed.stage === 'graduate' && m === 6 && !ed.admissionDone) { ed.admissionDone = true; offerPlan(s, rng, 'school'); }
    // год подготовки: в июне пересдача ЕГЭ, в июле — снова поступление
    if (ed.stage === 'gap' && m === 5 && ed.ege) {
      var old = ed.ege; ed.ege = null; ed.stage = 'school'; ed.grade = 11; ed.passed = true;
      RL.Teen.doEGE(s, rng);
      if (!old.annulled) ['russian', 'math', 'mathBase'].forEach(function (k) { if (old.scores[k] && ed.ege.scores[k] !== undefined) ed.ege.scores[k] = Math.max(ed.ege.scores[k], old.scores[k]); });
      var failedAttempt = ed.ege.failed;
      ed.ege.failed = !!ed.ege.annulled || ['russian', 'math', 'mathBase'].some(function (k) {
        return ed.ege.scores[k] !== undefined && ed.ege.scores[k] < D.teen.exams.subjects[k].min;
      });
      if (failedAttempt && !ed.ege.failed) S.log(s, 'С учётом действующих результатов прошлых лет обязательные экзамены сданы — аттестат получен.', 'edu');
      ed.admissionDone = false;
    }
    // колледж окончен
    if (ed.stage === 'college' && m === 5 && ed.school && ed.grade > (ed.collegeYears || collegeYears(ed.school.id))) {
      var c = D.teen.colleges.filter(function (x) { return x.id === ed.school.id; })[0] || {prof: 'worker'};
      p.diplomas.push({level: 'СПО', field: ed.school.id, inst: ed.school.name, q: ed.school.q, year: s.date.year, prof: c.prof});
      S.log(s, 'Диплом колледжа: ' + ed.school.name + '.', 'good');
      ed.stage = 'work'; ed.school = null; own(s).living = 'parents'; p.loc = null;
      offerPlan(s, rng, 'college');
    }
    if (ed.stage === 'vuz') vuzMonthly(s, rng);
    if (s.deathNow) return;
    if (ed.stage === 'army' && p.army) { serviceMonthly(s, rng); if (s.deathNow) return; }
    draftCheck(s, rng);
    mobilizationCheck(s, rng);
    homeCheck(s, rng);
    jobMonthly(s, rng);
    budgetMonthly(s, rng);
  }
  function collegeYears(id) { var c = D.teen.colleges.filter(function (x) { return x.id === id; })[0]; return c && c.years || 3; }

  // ---------- автовыбор ----------
  function autoChoose(s, rng) {
    var pd = s.pending, p = s.person, y = s.date.year, w = {};
    pd.opts.forEach(function (o, i) {
      var v = 0.1;
      if (pd.id === 'admission_plan') {
        var vuzShare = y < 1995 ? 0.45 : y < 2000 ? 0.55 : y < 2010 ? 0.75 : 0.72;
        if (o.kind === 'field') {
          var n = pd.opts.filter(function (x) { return x.kind === 'field'; }).length;
          var apt = {it: p.hidden.iq - 100, eng: p.hidden.iq - 100, med: (p.traits.empathy || 0) / 3 + (p.traits.diligence || 0) / 3, econ: 5, law: 3,
            hum: (p.hidden.creativity - 50) / 2, natsci: (p.hidden.iq - 100) / 2, ped: (p.traits.empathy || 0) / 3 - 3, agro: p.settlement === 'village' ? 5 : -8, mil: (p.traits.conformity || 0) / 3 - 4}[o.field] || 0;
          v = vuzShare / n * Math.exp(apt / 12 + (o.score - 60) / 25);
        }
        if (o.kind === 'college') v = 0.12;
        if (o.kind === 'work') v = s.family.poverty ? 0.12 : 0.06;
        if (o.kind === 'army') v = 0.04;
        if (o.kind === 'gap') v = (p.education.ege && p.education.ege.failed) ? 0.4 : 0.02;
      } else if (pd.id === 'admission_result') {
        if (o.kind === 'enroll' && o.form === 'budget') v = 1.2 * (o.v.q / 60);
        if (o.kind === 'enroll' && o.form === 'target') v = 1.2;
        if (o.kind === 'enroll' && o.form === 'paid') v = o.payer === 'family' ? 1.2 * (o.v.q / 60) : o.payer === 'credit' ? 0.3 : 0.15;
        if (o.kind === 'bribe') v = canFamilyPay(s, o.cost) ? 0.5 : 0.02;
        if (o.kind === 'enroll' && o.form === 'zaochno') v = 0.35;
        if (o.kind === 'work') v = 0.2;
        if (o.kind === 'army') v = 0.08;
        if (o.kind === 'gap') v = 0.12;
      } else if (pd.id === 'draft_notice') {
        var cap = S.region(s).tags.indexOf('capital') >= 0;
        v = {serve: y < 2000 ? 0.6 : 0.78, evade: cap ? 0.25 : 0.1, ticket: canFamilyPay(s, D.army.whiteTicketCost * AVG(s)) ? 0.12 : 0.01, ags: 0.02}[o.kind] || 0.01;
      } else if (pd.id === 'after_vuz') {
        v = {magistr: 0.3, work: 0.65, army: 0.05}[o.kind] || 0.1;
      }
      w[i] = Math.max(0.001, v);
    });
    return +rng.weightedKey(w);
  }

  return {monthly: monthly, resolve: resolve, autoChoose: autoChoose, applyEffects: applyEffects, own: own, apart: apart, loc: loc, homeCheck: homeCheck,
    housingName: function (s) { return RL.Assets.housingName(s); },
    netWage: netWage, eduLevel: eduLevel, vuzList: vuzList, fieldScore: fieldScore, offerPlan: offerPlan};
})();
