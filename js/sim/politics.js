// Выборы и политическая карьера. Голос одного человека итог не меняет (как и в жизни), но меняет его самого:
// характер, связи, отношения на работе; активиста зовут в кандидаты; депутат получает зарплату, связи и риски.
// В сценарии будущего редкая победа оппозиции меняет мир: СВО заканчивается раньше, коррупция снижается.
RL.Politics = (function () {
  var U = RL.util, S = RL.S, D = RL.DATA;
  var P = function () { return D.politics; };
  var AVG = function (s) { return RL.Economy.AVG24() * RL.World.realWageIndex(s, s.date.year, s.date.month); };
  function tx(s, t) { return RL.Events.text(s, t, {}); }

  // кампании этого месяца (реальные — из таблицы, будущие — по графику)
  function campaign(s) {
    var y = s.date.year, m = s.date.month, F = P().future, out = null;
    ['president', 'duma', 'votes'].forEach(function (k) { P()[k].forEach(function (c) { if (c.year === y && c.month === m) out = {kind: c.kind || k, c: c}; }); });
    if (out) return out;
    var rid = RL.Young.loc(s).region.id;
    (P().local || []).forEach(function (c) { if (c.year === y && c.month === m && c.region === rid) out = {kind: 'local', c: c}; });
    if (out) return out;
    if (y >= F.presidentFrom && (y - F.presidentFrom) % F.presidentEvery === 0 && m === 2) return {kind: 'president', c: {year: y, opts: F.presidentOpts, future: true}};
    if (y >= F.dumaFrom && (y - F.dumaFrom) % F.dumaEvery === 0 && m === 8) return {kind: 'duma', c: {year: y, opts: F.dumaOpts, future: true}};
    return null;
  }
  function isPower(name) { return P().power.indexOf(name) >= 0; }
  function offer(s, id, title, text, opts) {
    var pd = {kind: 'custom', handler: 'politics', id: id, title: title, text: text, opts: opts, choices: opts.map(function (o, i) { return {i: i, text: o.text}; })};
    if (s.pending) s.queue.unshift({custom: pd}); else s.pending = pd;
    return pd;
  }

  function offerVote(s, cp) {
    var p = s.person, c = cp.c, y = s.date.year, opts = [];
    if (cp.kind === 'local') { offer(s, 'election', c.title, c.title + ' ' + y + ' года.', [{kind: 'vote', who: 'local', text: 'Пойти и проголосовать'}, {kind: 'skip', text: 'Не ходить'}]).camp = {kind: 'local', year: y, title: c.title, c: c}; return; }
    var title = c.title || (cp.kind === 'president' ? 'Выборы президента' : cp.kind === 'duma' ? 'Выборы в Госдуму' : 'Голосование');
    c.opts.forEach(function (o) { opts.push({kind: 'vote', who: o, text: (cp.kind === 'referendum' ? 'Голосовать «' + o + '»' : 'Голосовать: ' + o)}); });
    opts.push({kind: 'spoil', text: 'Прийти и испортить бюллетень'});
    opts.push({kind: 'skip', text: 'Не ходить на выборы'});
    var pr = p.job && p.job.employed && P().pressureProfs.indexOf(p.job.prof) >= 0 && y >= P().pressureFrom;
    if (y >= P().observersFrom && S.age(s) >= 18) opts.push({kind: 'observer', text: 'Пойти наблюдателем на участок'});
    var txt = (cp.kind === 'referendum' ? title + '.' : title + ' ' + y + ' года.') + (pr ? ' На работе намекнули: прийти обязательно и прислать фото бюллетеня начальству.' : '');
    offer(s, 'election', title, txt, opts).camp = {kind: cp.kind, year: y, title: title, pressure: pr, c: c};
  }
  function result(s, camp, rng) {
    var c = camp.c;
    if (!c.future) return {winner: c.winner, share: c.share, turnout: c.turnout, note: c.note};
    var W = s.world.elections = s.world.elections || {};
    var key = camp.kind + c.year;
    if (!W[key]) {
      var r = new RL.RNG((s.seed ^ (c.year * 2654435761)) >>> 0), power = r.chance(P().future.powerShare);
      var winner = power ? c.opts[0] : c.opts[1 + Math.floor(r.next() * (c.opts.length - 1))];
      W[key] = {winner: winner, share: Math.round(power ? r.range(52, 80) : r.range(38, 55)), turnout: Math.round(r.range(45, 72))};
      // смена власти в сценарии будущего: президент не от партии власти — мир меняется
      if (!power && camp.kind === 'president') { s.world.change = c.year; worldChange(s, c.year); }
    }
    return W[key];
  }
  function worldChange(s, y) {
    var f = s.world.future;
    for (var k = y + 1; k <= y + 40; k++) if (f[k]) { if (k >= y + 2) delete f[k].flags.svo; f[k].mobilization = null; }
    S.log(s, 'Новая власть объявила реформы: судебная, антикоррупционная, переговоры о мире.', 'news');
  }
  function voteResolve(s, pd, o, rng) {
    var p = s.person, camp = pd.camp;
    if (camp.kind === 'local') { p.votes = p.votes || {n: 0, skipped: 0, power: 0, other: 0}; if (o.kind === 'vote') { p.votes.n++; S.trait(s, 'conformity', 1); S.adj(s, 'social', 1); } else p.votes.skipped++; return; }
    var res = result(s, camp, rng);
    p.votes = p.votes || {n: 0, skipped: 0, power: 0, other: 0};
    if (o.kind === 'vote') { p.votes.n++; if (isPower(o.who)) { p.votes.power++; S.trait(s, 'conformity', 2); } else { p.votes.other++; S.trait(s, 'courage', 1); } }
    if (o.kind === 'spoil') { p.votes.n++; S.trait(s, 'conformity', -2); }
    if (o.kind === 'skip') p.votes.skipped++;
    if (o.kind === 'observer') {
      p.votes.n++; p.flags.observer = (p.flags.observer || 0) + 1; S.adj(s, 'social', 4); S.trait(s, 'courage', 3);
      if (rng.chance(s.date.year < 2018 ? 0.35 : 0.25)) { S.log(s, tx(s, 'На участке ты [видел|видела] «карусель» и вброс. Акт составили, жалобу не приняли.'), 'bad'); S.adj(s, 'mental', -4); }
      else S.log(s, 'Ночь подсчёта прошла спокойно. Протокол подписан.', 'info');
    }
    // давление на работе
    if (camp.pressure && (o.kind === 'skip' || o.kind === 'spoil' || (o.kind === 'vote' && !isPower(o.who)) || o.kind === 'observer')) {
      if (rng.chance(0.25)) { S.log(s, tx(s, 'Начальство заметило, что ты «[не поддержал|не поддержала] коллектив»: лишили премии.'), 'bad'); RL.Adult.cashFlow(s, -0.6 * AVG(s)); }
      else if (rng.chance(0.05) && p.job) { p.job.employed = false; S.log(s, 'После выборов «по соглашению сторон» пришлось уволиться.', 'bad'); }
    }
    var mine = o.kind === 'vote' ? o.who : null;
    var line = camp.title + ': победил' + (/«|КПРФ|ЛДПР|За|Против/.test(res.winner) ? 'а' : '') + ' ' + res.winner + ' (' + res.share + '%' + (res.note ? ', ' + res.note : '') + ', явка ' + res.turnout + '%).';
    if (/^(За|Против)$/.test(res.winner)) line = camp.title + ': итог — «' + res.winner + '» (' + res.share + '%, явка ' + res.turnout + '%).';
    S.log(s, line, 'news');
    if (mine) { var won = mine === res.winner; S.adj(s, 'mental', won ? 1 : -1); }
  }

  // ---------- карьера ----------
  function pol(s) { var p = s.person; if (!p.politics) p.politics = {level: null, terms: 0}; return p.politics; }
  function nextLevel(s) {
    var pl = pol(s), a = S.age(s), p = s.person;
    if (p.flags.criminalRecord) return null;
    if (!pl.level) return (s.flags.activist || s.flags.volunteer || p.focus === 'publicwork') ? 'municipal' : null;
    // в заксобрание — только с высшим образованием, в Думу — с профильным (право, экономика, госуправление, гуманитарное) или после двух сроков в регионе
    var dips = p.diplomas || [], higher = dips.some(function (d) { return d.level !== 'СПО' && !d.fake; });
    var prof = dips.some(function (d) { return d.level !== 'СПО' && !d.fake && ['law', 'econ', 'gmu', 'hum'].indexOf(d.field) >= 0; });
    if (pl.level === 'municipal' && pl.terms >= 1 && p.stats.social >= 55 && a >= 21 && higher) return 'regional';
    if (pl.level === 'regional' && pl.terms >= 1 && p.stats.social >= 60 && a >= 21 && (prof || pl.terms >= 2)) return 'duma';
    return pl.level;
  }
  function offerRun(s, lvl, rng) {
    var L = P().levels[lvl], cost = L.cost * AVG(s);
    var opts = [
      {kind: 'run', lvl: lvl, party: 'power', text: 'Идти от партии власти (больше шансов, меньше свободы)'},
      {kind: 'run', lvl: lvl, party: 'opposition', text: 'Идти от оппозиционной партии'},
      {kind: 'run', lvl: lvl, party: 'self', text: 'Самовыдвижение: собрать подписи'},
      {kind: 'norun', text: 'Не баллотироваться'}];
    offer(s, 'run_' + lvl, 'Выборы', 'Предлагают баллотироваться: ' + L.name + '. Кампания обойдётся примерно в ' + RL.World.money(s, cost) + '.', opts);
  }
  function runResolve(s, o, rng) {
    var p = s.person, pl = pol(s), L = P().levels[o.lvl], cost = L.cost * AVG(s);
    RL.Adult.cashFlow(s, -cost);
    var fd = RL.Childhood.focusDef(p.focus), rel = fd && fd.careerFx && fd.careerFx.reelect && pl.level === o.lvl ? fd.careerFx.reelect : 1;
    var ch = rel * L.win[o.party] * (0.6 + p.stats.social / 100) * (s.flags.noSupport && o.party === 'power' ? 0.4 : 1) * (pl.level === o.lvl ? 1.4 : 1);
    if (o.party === 'opposition' && s.date.year >= 2020 && rng.chance(0.3)) { S.log(s, 'Тебя сняли с выборов: «ошибки в подписях».', 'bad'); S.adj(s, 'mental', -6); return; }
    if (!rng.chance(U.clamp(ch, 0.01, 0.9))) { S.log(s, 'Выборы проиграны: ' + L.name + ' — не в этот раз.', 'bad'); S.adj(s, 'mental', -5); if (pl.level === o.lvl) leave(s, '[не переизбран|не переизбрана]'); return; }
    var re = pl.level === o.lvl;
    pl.level = o.lvl; pl.party = o.party; pl.termEnd = s.date.year + 5; if (!re) pl.terms = 0;
    S.log(s, tx(s, (re ? 'Переизбрание: ' : 'Ты [избран|избрана]: ') + L.name + (o.party === 'power' ? ' (от партии власти).' : o.party === 'opposition' ? ' (от оппозиции).' : ' (самовыдвиженец).')), 'good');
    S.adj(s, 'happiness', 8); S.adj(s, 'social', 6);
    if (L.wage) {
      p.job = {prof: 'deputy', base: Math.round(L.wage * (o.lvl === 'regional' ? Math.sqrt(S.region(s).wage) : 1)), shadow: 0, employed: true, raise: 1, since: S.ageMonths(s), monthsUnemployed: 0, level: 0, title: L.name};
      if (o.lvl === 'duma') { p.loc = {regionId: 'msk', settlement: 'megapolis', city: 'Москва'}; var ow = RL.Young.own(s); if (ow.living === 'parents') ow.living = 'rent_flat'; S.log(s, 'Переезд в Москву: служебная квартира, кабинет на Охотном Ряду.', 'family'); }
    }
  }
  function leave(s, why) {
    var p = s.person, pl = pol(s);
    S.log(s, tx(s, 'Депутатские полномочия закончились (' + why + ').'), 'info');
    pl.was = (pl.was || []).concat([pl.level]); pl.level = null;
    if (p.job && p.job.prof === 'deputy') p.job.employed = false;
  }

  function monthly(s, rng) {
    var p = s.person, a = S.age(s);
    if (a < 18 || !p.alive) return;
    var cp = campaign(s);
    if (cp && !s.pending) offerVote(s, cp);
    var pl = pol(s);
    // срок кончился — переизбираться или уходить
    if (pl.level && s.date.year >= pl.termEnd && s.date.month === 8) { pl.terms++; var nl = nextLevel(s); if (nl && !s.pending) offerRun(s, nl, rng); else leave(s, 'срок истёк'); return; }
    // активиста зовут в кандидаты (единый день голосования — сентябрь)
    if (!pl.level && s.date.month === 8 && a >= 18 && a < 70 && !s.pending) {
      var lvl = nextLevel(s);
      if (lvl && rng.chance((s.flags.activist ? 0.25 : 0.04) * ((s.date.year + p.regionId.length) % 5 === 0 ? 1 : 0.3))) offerRun(s, lvl, rng);
    }
    if (pl.level === 'municipal' && rng.chance(0.003)) S.log(s, tx(s, rng.pick(['На заседании совета ты [добился|добилась] ремонта двора.', 'Жители пришли на приём: течёт крыша, нет лифта.', 'Совет утвердил бюджет района.'])), 'info');
  }
  function resolve(s, idx, rng) {
    var pd = s.pending, o = pd.opts[idx];
    s.pending = null;
    S.log(s, pd.title + ': ' + o.text, 'choice');
    if (pd.id === 'election') { voteResolve(s, pd, o, rng); return; }
    if (o.kind === 'run') runResolve(s, o, rng);
    if (o.kind === 'norun' && pol(s).level) leave(s, '[не стал|не стала] баллотироваться');
  }
  function autoChoose(s, rng) {
    var pd = s.pending, p = s.person, w = {};
    var y = s.date.year, camp = pd.camp, turnout = camp && camp.c ? (camp.c.turnout || 60) / 100 : 0.6;
    pd.opts.forEach(function (o, i) {
      var v = 0.1;
      if (pd.id === 'election') {
        if (o.kind === 'skip') v = (1 - turnout) * (camp.pressure ? 0.4 : 1) * 3;
        if (o.kind === 'vote') v = turnout * 3 * (camp.c.winner && o.who === camp.c.winner ? (camp.c.share || 50) / 100 : isPower(o.who) ? 0.6 : 0.4 / Math.max(1, camp.c.opts.length - 1)) * (camp.pressure && isPower(o.who) ? 1.5 : 1);
        if (o.kind === 'spoil') v = 0.03; if (o.kind === 'observer') v = 0.01 + (p.focus === 'publicwork' ? 0.2 : 0);
      } else {
        if (o.kind === 'run') v = o.party === 'power' ? 1.2 : o.party === 'opposition' ? 0.3 + (p.traits.courage || 0) / 100 : 0.3;
        if (o.kind === 'norun') v = 0.8;
      }
      w[i] = Math.max(0.001, v);
    });
    return +rng.weightedKey(w);
  }
  function applyEffects(s, eff) { if (eff.deputyLost && pol(s).level) leave(s, 'уголовное дело'); }
  function facts(s, f) {
    var pl = s.person.politics;
    f.isDeputy = !!(pl && pl.level); f.deputyLevel = pl ? pl.level : null;
  }
  return {monthly: monthly, resolve: resolve, autoChoose: autoChoose, facts: facts, applyEffects: applyEffects, campaign: campaign};
})();
