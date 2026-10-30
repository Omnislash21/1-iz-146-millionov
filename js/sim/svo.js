// СВО: когда закончится (свой год и месяц в каждой жизни — из сценария будущего, js/sim/world.js) и контракт «в любой момент»:
// плакат под паспортом висит, пока идёт СВО; мужчина 18–65 может нажать и подписать. После окончания — демобилизация.
// Выплаты [~]: федеральная единовременная 400 тыс. ₽ (с 2024), региональная — от 400 тыс. до 1,9 млн (Москва, 2024–2025);
// денежное довольствие на передовой ~210 тыс. ₽ в месяц. Верхний возраст первого контракта — 65 лет (с 2023).
RL.Svo = (function () {
  var S = RL.S, U = RL.util;
  // конец СВО: из сценария будущего; в старых сохранениях — первый год без флага svo
  function end(s) {
    if (s.world && s.world.svoEnd) return s.world.svoEnd;
    var e = RL.World.svoEnd ? RL.World.svoEnd(s) : null;
    if (s.world) s.world.svoEnd = e;
    return e;
  }
  function active(s) {
    var y = s.date.year, m = s.date.month;
    if (y < 2022 || (y === 2022 && m < 1)) return false;
    var e = end(s);
    if (!e) return RL.World.svoOn(s, y, m);
    return y < e.year || (y === e.year && m < e.month);
  }
  function canSign(s) {
    var p = s.person, a = S.age(s);
    return active(s) && p.sex === 'm' && a >= 18 && a < 65 && !p.army && !p.disability && !p.abroad && !s.over && !s.pending &&
      !(p.own && (p.own.living === 'prison' || p.own.living === 'army')) && p.education.stage !== 'colony';
  }
  // региональная выплата при подписании [~]: Москва и Петербург — больше, бедные регионы — меньше
  function bonus(s) {
    var r = RL.Young.loc(s).region, t = r.tags || [];
    var reg = t.indexOf('capital') >= 0 ? 1900000 : r.id === 'spb' ? 1600000 : (r.unemployment || 1) >= 1.8 ? 500000 : 800000;
    return (s.date.year >= 2024 ? 400000 : 195000) + (s.date.year >= 2023 ? reg : 0);
  }
  function firstYear(s) { return bonus(s) + 12 * 210000; }
  // для плаката — как на настоящих: «3 320 000 ₽», круглыми десятками тысяч в рублях текущего года
  function posterSum(s) {
    var nom = firstYear(s) * RL.World.price(s, s.date.year, s.date.month) / RL.World.price(s, 2024, 6);
    return String(Math.round(nom / 10000) * 10000).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
  }
  // открыть развилку с плаката
  function offer(s) {
    if (!canSign(s)) return false;
    RL.Events.fireNow(s, 'svo_contract_poster', {sum: posterSum(s)});
    return !!s.pending;
  }
  function applyEffects(s, eff, rng) {
    if (!eff.svoBonus) return;
    var b = bonus(s);
    RL.Young.own(s).savings += b;
    S.log(s, 'Единовременная выплата при подписании контракта: ' + RL.World.money(s, b) + '.', 'money');
  }
  // служба по контракту и мобилизация заканчиваются вместе с СВО
  function monthly(s, rng) {
    var a = s.person.army;
    if (a && (a.kind === 'contract' || a.kind === 'mobilized') && !active(s) && a.months < a.term) {
      a.months = a.term - 1;
      S.log(s, 'СВО закончилась — демобилизация. Домой.', 'good');
    }
  }
  function facts(s, f) { f.svoActive = active(s); }

  return {posterSum: posterSum, active: active, canSign: canSign, offer: offer, firstYear: firstYear, bonus: bonus, applyEffects: applyEffects, monthly: monthly, facts: facts, end: end};
})();
