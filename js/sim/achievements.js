// Достижения: проверяются каждый месяц и в момент смерти. Пока не получено — игрок не видит ни названия, ни условия.
// Полученные за жизнь — s.ach {id: {y, age}}; новые для всплывающего окна — s.achNew. Коллекцию за все жизни хранит интерфейс (localStorage).
// name / desc — текст с родом героя: [мужской|женский]. dark — «тёмные» (тюрьма, зависимость) — честная часть жизни, не награда.
RL.Achievements = (function () {
  var S = RL.S;
  function age(s) { return s.person.alive ? S.age(s) : s.person.deathAge; }
  function dips(s) { return s.person.diplomas || []; }
  function lc(s, id) { return ((s.person.leisCount || {})[id]) || 0; }
  function maxWealth(s) {
    var w = (s.history || []).reduce(function (m, h) { return Math.max(m, h.wealth || 0); }, 0);
    return Math.max(w, S.age(s) >= 18 && s.person.own && RL.Adult ? RL.Adult.wealth(s) : 0);
  }
  var L = [
    ['ussr', '☭', 'Родом из СССР', 'Родиться в Советском Союзе — до 1992 года.', function (s) { return s.birth.year <= 1991; }],
    ['age80', '🌳', 'Восемьдесят', 'Дожить до 80 лет.', function (s) { return age(s) >= 80; }],
    ['age90', '🕯', '[Долгожитель|Долгожительница]', 'Дожить до 90 лет.', function (s) { return age(s) >= 90; }],
    ['age100', '🎂', 'Сто свечей на торте', 'Дожить до 100 лет.', function (s) { return age(s) >= 100; }],
    ['age110', '♾', 'Предел', 'Дожить до 110 лет — дальше не заходил никто.', function (s) { return age(s) >= 110; }],
    ['married', '💍', 'Горько!', 'Выйти замуж или жениться.', function (s) { return (s.person.flags.married || 0) >= 1; }],
    ['golden', '💛', 'Золотая свадьба', 'Прожить в одном браке 50 лет.', function (s) { var f = S.facts(s); return f.married && f.marriedYears >= 50; }],
    ['three', '📜', 'Три штампа', 'Три брака за одну жизнь.', function (s) { return (s.person.flags.married || 0) >= 3; }],
    ['bigfam', '👨‍👩‍👧‍👦', 'Многодетность', 'Трое детей и больше.', function (s) { return (s.person.kids || []).length >= 3; }],
    ['grand', '🧸', '[Дедушка|Бабушка]', 'Дождаться первого внука.', function (s) { return (s.person.grandkids || 0) >= 1; }],
    ['grand5', '🥧', 'Большой стол', 'Пять внуков и больше.', function (s) { return (s.person.grandkids || 0) >= 5; }],
    ['carer', '🤲', 'Опора', 'Три года заботиться о стареющих родителях.', function (s) { return ((s.person.fy || {}).caregiving || 0) >= 3; }],
    ['medal', '🥇', 'Медалист', 'Окончить школу с медалью.', function (s) { return !!(s.person.education || {}).medal; }],
    ['red', '🎓', 'Красный диплом', 'Окончить вуз с отличием.', function (s) { return dips(s).some(function (d) { return d.red; }); }],
    ['olymp', '🧮', 'Призёр олимпиады', 'Стать призёром олимпиады школьников.', function (s) { return !!(s.flags.olympiadWinner || s.flags.regionalOlympiad); }],
    ['topvuz', '🏛', 'Лучший вуз страны', 'Получить диплом одного из ведущих вузов.', function (s) { return dips(s).some(function (d) { return d.top && !d.fake; }); }],
    ['english', '🗣', 'Полиглот', 'Выучить английский до свободного.', function (s) { return !!s.flags.english; }],
    ['boss', '💼', '[Начальник|Начальница]', 'Дорасти до руководителя направления.', function (s) { return (s.history || []).some(function (h) { return h.level >= 4; }) || (s.person.job && s.person.job.level >= 4); }],
    ['biz', '🏪', 'Своё дело', 'Открыть свой бизнес.', function (s) { return !!(s.person.biz || (s.person.bizHistory || []).length); }],
    ['biz10', '🏭', 'Устоять', 'Продержать своё дело 10 лет.', function (s) { var p = s.person; return (p.biz && p.biz.months >= 120) || (p.bizHistory || []).some(function (b) { return b.months >= 120; }); }],
    ['mill', '💵', '[Миллионер|Миллионерша]', 'Накопить миллион (в ценах 2024 года).', function (s) { return maxWealth(s) >= 1e6; }],
    ['mill10', '💰', 'Десять миллионов', 'Накопить десять миллионов (в ценах 2024 года).', function (s) { return maxWealth(s) >= 1e7; }],
    ['rentier', '🔑', 'Рантье', 'Сдавать квартиру и жить на аренду.', function (s) { return (((s.person.own || {}).props) || []).some(function (f) { return f.use === 'rent'; }); }],
    ['roof', '🏠', 'Своя крыша', 'Жить в своей квартире без ипотеки.', function (s) { var o = s.person.own || {}; return o.living === 'own_flat' && !(o.debts || []).some(function (d) { return d.kind === 'mortgage' && d.balance > 0; }); }],
    ['dacha', '🥒', 'Дачный сезон', 'Купить дачу.', function (s) { return !!s.flags.dacha; }],
    ['pro', '⚽', 'Профессионал', 'Подписать профессиональный спортивный контракт.', function (s) { return !!(s.person.sport && s.person.sport.clubs && s.person.sport.clubs.length); }],
    ['topleague', '🏆', 'Высшая лига', 'Играть в высшем дивизионе.', function (s) { return !!(s.person.sport && (s.person.sport.clubs || []).some(function (c) { return c.tier === 1; })); }],
    ['national', '🇷🇺', 'Сборная', 'Получить вызов в сборную России.', function (s) { return !!(s.person.sport && s.person.sport.national); }],
    ['champ', '🏅', 'Чемпион', 'Выиграть чемпионат России или медаль первенства.', function (s) { return !!(s.person.sport && (s.person.sport.titles || s.person.sport.medals)); }],
    ['famous', '✨', 'Звезда', 'Прославиться на всю страну.', function (s) { return !!s.person.flags.famous; }],
    ['blogger', '📱', 'Блогер', 'Сделать блог работой.', function (s) { var p = s.person; return (p.biz && p.biz.id === 'blog') || (p.bizHistory || []).some(function (b) { return /блог/.test(b.name); }); }],
    ['deputy', '🗳', 'Народный избранник', 'Выиграть выборы в депутаты.', function (s) { var pl = s.person.politics; return !!(pl && (pl.level || (pl.was || []).length)); }],
    ['duma', '🦅', 'Охотный Ряд', 'Стать депутатом Государственной думы.', function (s) { var pl = s.person.politics; return !!(pl && (pl.level === 'duma' || (pl.was || []).indexOf('duma') >= 0)); }],
    ['citizen', '📮', 'Гражданин', 'Сходить на десять выборов и ни одних не пропустить.', function (s) { var v = s.person.votes; return !!(v && v.n >= 10 && !v.skipped); }],
    ['observer', '👁', 'Наблюдатель', 'Отработать наблюдателем на участке.', function (s) { return !!s.person.flags.observer; }],
    ['pilot', '✈', 'В небе', 'Стать пилотом гражданской авиации.', function (s) { return !!(s.person.job && s.person.job.prof === 'pilot' && s.person.job.employed); }],
    ['doctor', '🩺', 'Белый халат', 'Работать врачом.', function (s) { return !!(s.person.job && s.person.job.prof === 'doctor' && s.person.job.employed); }],
    ['jackpot', '🎟', 'Счастливый билет', 'Выиграть в лотерею миллион.', function (s) { return !!s.person.flags.lotteryBig; }],
    ['lucky', '📈', '[Фартовый|Фартовая]', 'Остаться в плюсе на ставках больше чем на полмиллиона.', function (s) { var g = s.person.gamble; return !!(g && g.net >= 5e5); }],
    ['cancer', '🎗', 'Сильнее болезни', 'Победить рак.', function (s) { return s.person.conditions.some(function (c) { return (c.id === 'cancer_adult' || c.id === 'cancer') && c.cured; }); }],
    ['clean', '🥗', 'Чистая жизнь', 'Дожить до 40, ни разу не закурив и не выпив.', function (s) { var e = s.person.habitsEver || {}; return age(s) >= 40 && !e.smoking && !e.alcohol && !e.drugs; }],
    ['sport20', '🏃', 'Двадцать лет в форме', 'Двадцать лет заниматься спортом.', function (s) { return ((s.person.fy || {}).sport || 0) >= 20; }],
    ['mushroom', '🍄', 'Тихая охота', 'Сходить за грибами сорок раз.', function (s) { return lc(s, 'mushrooms') >= 40; }],
    ['regular', '🍺', 'Завсегдатай', 'Пятьдесят вечеров в баре.', function (s) { return lc(s, 'bar') >= 50; }],
    ['theatre', '🎭', '[Театрал|Театралка]', 'Тридцать раз сходить в театр или на концерт.', function (s) { return lc(s, 'theatre') >= 30; }],
    ['fisher', '🎣', 'Клюёт!', 'Пятьдесят рыбалок.', function (s) { return lc(s, 'fishing') >= 50; }],
    ['rolling', '🧳', 'Перекати-поле', 'Пожить в четырёх разных городах.', function (s) { var c = {}; (s.history || []).forEach(function (h) { c[h.city] = 1; }); return Object.keys(c).length >= 4; }],
    ['moscow', '🏙', 'Москва слезам не верит', 'Переехать в Москву из другого региона.', function (s) { var p = s.person; return (p.loc && p.loc.regionId === 'msk' || p.regionId === 'msk') && (s.history[0] && s.history[0].city !== 'Москва'); }],
    ['north', '❄', 'Северянин', 'Отработать 15 лет на Крайнем Севере.', function (s) { return !!(s.person.work && s.person.work.northMonths >= 180); }],
    ['against', '🌱', 'Вопреки', 'Выйти из детского дома и получить высшее образование.', function (s) { return !!s.flags.wasInOrphanage && dips(s).some(function (d) { return d.level !== 'СПО' && !d.fake; }); }],
    ['veteran', '🪖', 'Ветеран', 'Вернуться с войны.', function (s) { return !!s.person.flags.veteran; }],
    ['orphan', '🏚', 'Детдом', 'Вырасти в детском доме.', function (s) { return !!s.flags.wasInOrphanage; }, true],
    ['divorce', '💔', 'Развод', 'Пережить развод.', function (s) { return (s.person.flags.divorced || 0) >= 1; }, true],
    ['record', '⛓', 'Судимость', 'Получить судимость.', function (s) { return !!s.person.flags.criminalRecord; }, true],
    ['prison', '🔒', 'Срок', 'Отсидеть в колонии.', function (s) { return !!(s.person.flags.adultPrison || s.person.education.stage === 'colony'); }, true],
    ['gambler', '🎲', 'Азарт', 'Стать зависимым от ставок.', function (s) { return !!(s.person.gamble && s.person.gamble.lvl >= 3); }, true],
    ['addict', '💊', 'Зависимость', 'Стать зависимым от наркотиков.', function (s) { return ((s.person.habits || {}).drugs || 0) >= 3; }, true],
    ['loss', '🕊', 'Пережить ребёнка', 'Похоронить своего ребёнка.', function (s) { return (s.person.kids || []).some(function (k) { return !k.alive; }); }, true]
  ];
  var DEF = L.map(function (x) { return {id: x[0], icon: x[1], name: x[2], desc: x[3], check: x[4], dark: !!x[5]}; });
  var BY = {}; DEF.forEach(function (d) { BY[d.id] = d; });

  function text(s, t) { return RL.Events.text(s, t, {}); }
  function check(s) {
    s.ach = s.ach || {}; s.achNew = s.achNew || [];
    var a = Math.floor(age(s));
    DEF.forEach(function (d) {
      if (s.ach[d.id]) return;
      var ok = false; try { ok = d.check(s); } catch (e) { ok = false; }
      if (!ok) return;
      s.ach[d.id] = {y: s.date.year, age: a};
      s.achNew.push(d.id);
      S.log(s, 'Достижение: ' + d.icon + ' ' + text(s, d.name) + '.', 'ach');
    });
  }
  function list(s) {
    var ach = s.ach || {};
    return DEF.filter(function (d) { return ach[d.id]; }).map(function (d) { return {id: d.id, icon: d.icon, name: text(s, d.name), desc: d.desc, dark: d.dark, y: ach[d.id].y, age: ach[d.id].age}; });
  }
  return {check: check, list: list, all: DEF, byId: BY, total: DEF.length, text: text};
})();
