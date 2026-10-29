// Характер, который бьёт по жизни. Черты (−100…100) копятся от выборов, а здесь они меняют мир:
// — исходы развилок: выбрал путь «силы воли» — чем больше у тебя самоконтроля, тем чаще он удаётся (и наоборот);
// — частоту событий: криминальные и «срывные» развилки чаще случаются с теми, кто к ним склонен;
// — работу (увольнения, поиск, повышения), брак (распады), бизнес (провалы), смертность (суицид);
// — поступки по характеру каждый месяц: вспыльчивость, импульсивные траты, «схемы», упорство, замкнутость.
// Считаем не от нуля, а от нормы: черты взрослых к 40 годам смещены (медиана и разброс — tests/depth-check.js и выборка автопилота),
// поэтому сила черты — z-оценка (насколько ты выше или ниже обычного человека).
// Сила влияния — оценки по исследованиям «Большой пятёрки» (добросовестность ↔ занятость и доход, нейротизм ↔ разводы
// и суицид, импульсивность ↔ правонарушения) [~ Roberts et al. 2007; Moffitt et al. 2011], перенесённые на шкалы игры.
RL.Character = (function () {
  var U = RL.util, S = RL.S;
  // медиана и разброс черт взрослых (автопилот, 60 жизней к 40 годам)
  var NORM = {courage: [60, 15], conformity: [13, 12], curiosity: [13, 11], diligence: [48, 14], sociability: [49, 12], empathy: [31, 16], honesty: [-2, 14], selfControl: [24, 12], aggression: [3, 4]};
  function z(s, k) {
    var v = (s.person.traits || {})[k] || 0, n = NORM[k] || [0, 20];
    // у детей черты ещё не сложились: считаем от нуля с широким разбросом
    if (S.age(s) < 16) return U.clamp(v / 25, -3, 3);
    return U.clamp((v - n[0]) / n[1], -3, 3);
  }
  function ex(v) { return U.clamp(Math.exp(v), 0.35, 3); }

  // множители для систем
  function mul(s, kind) {
    switch (kind) {
      case 'jobLoss': return ex(-(z(s, 'diligence') * 0.25 + z(s, 'selfControl') * 0.2 + z(s, 'conformity') * 0.08));
      case 'jobFind': return ex(z(s, 'sociability') * 0.15 + z(s, 'diligence') * 0.12 + z(s, 'courage') * 0.08);
      case 'breakup': return ex(-(z(s, 'empathy') * 0.2 + z(s, 'selfControl') * 0.18 + z(s, 'honesty') * 0.1));
      case 'bizFail': return ex(-(z(s, 'diligence') * 0.2 + z(s, 'selfControl') * 0.15 + z(s, 'courage') * 0.1));
      case 'promo': return ex(z(s, 'sociability') * 0.12 + z(s, 'conformity') * 0.1 + z(s, 'courage') * 0.05);
      case 'suicide': return ex(-(z(s, 'sociability') * 0.2 + z(s, 'selfControl') * 0.2));
    }
    return 1;
  }

  // события: на кого чаще «сваливаются» развилки. Склонность выводится из самих событий (кража, дело, привычки) или задаётся traitW.
  var TW = {};
  function eventW(e) {
    if (TW[e.id] !== undefined) return TW[e.id];
    var w = e.traitW || null, j = JSON.stringify(e.choices || e.outcomes || e.effects || '');
    if (!w && /"case"|"crime"/.test(j)) w = {honesty: -0.8, selfControl: -0.6};
    else if (!w && /"habit"|"habitUp"/.test(j) && !/^add_/.test(e.id)) w = {selfControl: -0.8, conformity: -0.3};
    TW[e.id] = w;
    return w;
  }
  function eventMul(s, e) {
    var w = eventW(e); if (!w) return 1;
    var v = 0; for (var k in w) v += w[k] * z(s, k);
    return U.clamp(Math.exp(v * 0.3), 0.5, 2);
  }

  // исход развилки: «хорошие» исходы (в сумме плюс к шкалам и деньгам) чаще у тех, у кого есть черты выбранного пути
  function goodness(o) {
    var e = o.effects || {}, g = (e.mental || 0) + (e.health || 0) + (e.happiness || 0) + (e.social || 0) + (e.spouseRelation || 0) * 0.5 + (e.cash ? e.cash / 8000 : 0);
    if (e.habitUp || e.case || e.crime || e.jobLoss || e.condition || e.death) g -= 6;
    if (e.habitDown || e.habitTry) g += 4;
    return g;
  }
  function outcomeMul(s, choiceTraits, o) {
    if (!choiceTraits) return 1;
    var g = goodness(o); if (!g) return 1;
    var v = 0;
    for (var k in choiceTraits) if (choiceTraits[k] > 0) v += z(s, k);
    return ex((g > 0 ? 1 : -1) * v * 0.3);
  }

  // поступки по характеру (раз в месяц, взрослые): видно, как черта решает
  function monthly(s, rng) {
    var p = s.person, a = S.age(s);
    if (a < 16 || s.pending || (p.own && (p.own.living === 'prison' || p.own.living === 'army'))) return;
    var sc = z(s, 'selfControl'), dil = z(s, 'diligence'), hon = z(s, 'honesty'), soc = z(s, 'sociability'), emp = z(s, 'empathy'), cur = z(s, 'curiosity'), agg = z(s, 'aggression');
    var hb = p.habits || {}, job = p.job && p.job.employed ? p.job : null, he = p.sex === 'f';
    var g = function (m, f) { return he ? f : m; };
    var calm = !p.flags.charBadM || S.ageMonths(s) - p.flags.charBadM >= 18;
    // вспыльчивость: драка (чаще мужчины и выпившие)
    if (calm && sc + agg * 0.5 < -1.2 && a < 65 && rng.chance(0.0011 * Math.exp(-sc) * (he ? 0.3 : 1) * ((hb.alcohol || 0) >= 2 ? 2.5 : 1))) {
      S.adj(s, 'health', -6); p.flags.charBadM = S.ageMonths(s);
      if (rng.chance(0.06)) { S.log(s, 'Вспыльчивость подвела: драка, у второго — тяжёлые травмы. Возбудили дело.', 'bad'); RL.Events.applyEffects(s, {case: 'harm111'}, {}, rng); }
      else S.log(s, 'Вспыльчивость подвела: драка у магазина. Синяки, сломанный нос, протокол.', 'bad');
      return;
    }
    // сорваться на начальника
    if (calm && job && sc < -1.4 && rng.chance(0.002 * Math.exp(-sc))) {
      p.flags.charBadM = S.ageMonths(s);
      if (rng.chance(0.5)) { job.employed = false; job.monthsUnemployed = 0; S.log(s, 'Наорал' + g('', 'а') + ' на начальника при всех. Уволили «по соглашению сторон».', 'bad'); }
      else S.log(s, 'Сорвал' + g('ся', 'ась') + ' на начальника. Премии не будет, отношения испорчены.', 'bad');
      S.adj(s, 'mental', -3); return;
    }
    // импульсивные траты: кредитка, техника в рассрочку
    if (sc < -1 && a >= 18 && rng.chance(0.003 * Math.exp(-sc))) {
      RL.Events.applyEffects(s, {cash: -rng.int(15, 60) * 1000, happiness: 2}, {}, rng);
      S.log(s, rng.pick(['Купил' + g('', 'а') + ' новый телефон в рассрочку «потому что захотелось».', 'Спустил' + g('', 'а') + ' отпускные за выходные.', 'Взял' + g('', 'а') + ' кредит на то, без чего можно было жить.']), 'money');
      return;
    }
    // упорство замечают: прибавка без повышения
    if (job && dil > 1.2 && rng.chance(0.002 * Math.exp(dil))) {
      job.raise = (job.raise || 1) * 1.06;
      S.log(s, 'Начальство заметило, что на тебе держится отдел: прибавка к зарплате.', 'good'); return;
    }
    // «схемы» у нечестных: откаты, левые заказы — пока не поймают
    if (calm && job && hon < -1.5 && rng.chance(0.0005 * Math.exp(-hon))) {
      p.flags.charBadM = S.ageMonths(s);
      if (rng.chance(0.1)) { S.log(s, 'Служба безопасности раскрутила твою «схему» с поставщиками.', 'bad'); RL.Events.applyEffects(s, {case: 'fraud159'}, {}, rng); }
      else { RL.Events.applyEffects(s, {cash: rng.int(30, 150) * 1000}, {}, rng); S.log(s, 'Ещё один «откат» с подрядчика. Никто не заметил.', 'money'); S.trait(s, 'honesty', -1); }
      return;
    }
    // замкнутость: связи истончаются, к старости — одиночество
    if (soc < -1.3 && rng.chance(0.01)) { S.adj(s, 'social', -3); if (a > 55) S.adj(s, 'mental', -2); if (rng.chance(0.2)) S.log(s, 'Друзья звонят всё реже — ты сам' + g('', 'а') + ' давно никому не звонил' + g('', 'а') + '.', 'info'); return; }
    // чёрствость: близкие отдаляются
    if (emp < -1.3 && p.spouse && rng.chance(0.008)) { p.spouse.relation = U.clamp(p.spouse.relation - 4, 0, 100); if (rng.chance(0.3)) S.log(s, p.spouse.name + ': «Тебе вообще всё равно, как я?»', 'info'); return; }
    // любопытство: учится новому сам
    if (cur > 1.3 && rng.chance(0.006)) { S.adj(s, 'skills', 2); if (rng.chance(0.3)) S.log(s, 'Разобрал' + g('ся', 'ась') + ' в новом деле сам' + g('', 'а') + ' — по видео и книгам.', 'info'); }
  }

  return {mul: mul, eventMul: eventMul, outcomeMul: outcomeMul, monthly: monthly, goodness: goodness, z: z, NORM: NORM};
})();
