// Поиск ошибок «вслепую»: сотни полных жизней (все годы рождения, оба пола, автопилот) + жизни по дням со случайными действиями игрока,
// сохранение и загрузка посреди жизни. Ищем: исключения, зависания, NaN/Infinity в состоянии, «undefined»/«NaN»/«{переменная}»/«[м|ж]»
// в текстах, мужской род у героини, спам одинаковыми строками, недопустимые значения шкал. Запуск: node tests/fuzz-check.js [N]
var fs = require('fs'), path = require('path'), vm = require('vm');
var root = path.join(__dirname, '..');
fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/src="(js\/[^"]+)"/g).map(function (m) { return m.slice(5, -1).replace(/\?.*$/, ''); })
  .filter(function (f) { return f.indexOf('js/ui') < 0; }).forEach(function (f) { vm.runInThisContext(fs.readFileSync(path.join(root, f), 'utf8'), {filename: f}); });
var S = RL.S, N = +process.argv[2] || 300;
var bugs = {}, nBug = 0, t0 = Date.now();
function bug(kind, msg) { bugs[kind] = bugs[kind] || []; if (bugs[kind].length < 6) bugs[kind].push(msg); nBug++; }
// числа в состоянии: NaN и бесконечности
function scanNum(o, pth, depth) {
  if (depth > 6 || o === null || o === undefined) return;
  if (typeof o === 'number') { if (!isFinite(o)) bug('NaN/Infinity в состоянии', pth); return; }
  if (typeof o !== 'object') return;
  if (Array.isArray(o)) { for (var i = 0; i < o.length && i < 60; i++) scanNum(o[i], pth + '[' + i + ']', depth + 1); return; }
  Object.keys(o).forEach(function (k) { if (k === 'log' || k === 'world' || k === 'history' || k === 'futureReturns') return; scanNum(o[k], pth + '.' + k, depth + 1); });
}
// мужской род у героини: «ты пошёл», «Ты родился», «сам» в типичных шаблонах
var MASC = /(^|[^а-яё])(ты|Ты) (пошёл|ушёл|нашёл|родился|был|стал|сделал|купил|взял|получил|потерял|вернулся|заработал|поступил|окончил|женился|сдал|продал|переехал|согласился|отказался|бросил|начал|выиграл|проиграл)([^а-яё]|$)/;
var MASC2 = /^(Потерял|Нашёл|Купил|Получил|Окончил|Поступил|Вернулся|Женился|Сдал|Уволился|Переехал|Закрыл|Открыл|Заработал|Взял|Продал|Бросил|Пошёл|Ушёл|Стал|Был|Проиграл|Выиграл|Устроился|Подписал)( |$|\.)/;
var FEM2 = /^(Потеряла|Нашла|Купила|Получила|Окончила|Поступила|Вернулась|Вышла замуж|Сдала|Уволилась|Переехала|Закрыла|Открыла|Заработала|Взяла|Продала|Бросила|Пошла|Ушла|Стала|Была|Устроилась|Подписала)( |$|\.)/;
function scanText(s, sex, from) {
  var seen = {}, prev = '', run = 0;
  for (var i = from; i < s.log.length; i++) {
    var t = String(s.log[i].text);
    if (/undefined|NaN|\[object|null(?![а-я])|\{[a-zA-Z]+\}|Infinity/.test(t)) bug('мусор в тексте', t.slice(0, 140));
    if (/\[[^\]]*\|[^\]]*\]/.test(t)) bug('неподставленный род [м|ж]', t.slice(0, 140));
    if (S.eraBad(t, s.log[i].y)) bug('слово не своей эпохи', s.log[i].y + ': ' + t.slice(0, 140));
    if (/\([аяой]{1,2}\)/.test(t)) bug('старый формат рода (а)', t.slice(0, 140));
    if (sex === 'f' && (MASC.test(t) || MASC2.test(t))) bug('мужской род у героини', t.slice(0, 140));
    if (sex === 'm' && FEM2.test(t)) bug('женский род у героя', t.slice(0, 140));
    if (/  |\.\.(?!\.)| ,|^ /.test(t)) bug('пробелы/точки', JSON.stringify(t.slice(0, 120)));
    if (s.log[i].type === 'leisure') continue; // одно и то же занятие несколько вечеров подряд — выбор игрока, не ошибка
    if (t === prev) { run++; if (run === 4) bug('спам одной строкой', t.slice(0, 120)); } else { run = 0; prev = t; }
  }
}
function checkState(s, tag) {
  var p = s.person;
  scanNum(s, tag, 0);
  Object.keys(p.stats).forEach(function (k) { var v = p.stats[k]; if (!(v >= 0 && v <= 100)) bug('шкала вне 0–100', tag + ' ' + k + '=' + v); });
  if (p.own && p.own.savings < -1) bug('отрицательные сбережения', tag + ' ' + Math.round(p.own.savings));
  if (s.family.savings < -1) bug('отрицательные сбережения семьи', tag + ' ' + Math.round(s.family.savings));
  if (p.job && p.job.employed && RL.Careers && p.job.prof && !RL.DATA.economy.professions.some(function (x) { return x.id === p.job.prof; })) bug('неизвестная профессия', p.job.prof);
  if (S.age(s) < 14 && p.job && p.job.employed) bug('работает ребёнок', tag + ' ' + S.age(s).toFixed(1));
  if (p.spouse && S.age(s) < 16) bug('партнёр у ребёнка', tag);
  if ((p.kids || []).some(function (k) { return k.age > S.age(s) - 12; })) bug('ребёнок почти ровесник', tag);
  if (p.alive && S.age(s) > 112) bug('слишком долгая жизнь', tag + ' ' + S.age(s).toFixed(1));
}
var errors = 0, stuck = 0, lives = 0, days = 0;
// 1) полные жизни по месяцам на автопилоте
for (var i = 0; i < N; i++) {
  var sex = i % 2 ? 'm' : 'f', by = 1985 + (i % 51), tag = sex + by + '#' + i;
  try {
    var s = RL.Game.create({sex: sex, firstName: sex === 'f' ? 'Анна' : 'Иван', lastName: 'Тестов', birthYear: by}, 424242 + i * 7919), g = 0, logFrom = 0;
    while (!s.over && g++ < 4000) {
      if (s.pending) { var before = JSON.stringify(s.pending).length; RL.Game.autoResolve(s); if (s.pending && JSON.stringify(s.pending).length === before && g > 3990) stuck++; continue; }
      RL.Game.step(s);
      if (g % 120 === 0) { checkState(s, tag + '@' + Math.floor(S.age(s))); scanText(s, sex, logFrom); logFrom = s.log.length; }
    }
    if (!s.over) { stuck++; bug('жизнь не закончилась', tag + ' возраст ' + S.age(s).toFixed(1)); }
    scanText(s, sex, logFrom); checkState(s, tag + '@end');
    // отчёт
    var rep = RL.Report.build(s); if (!rep.title || rep.title.indexOf('undefined') >= 0) bug('отчёт', tag);
    JSON.stringify(rep).match(/undefined|NaN/) && bug('отчёт: undefined/NaN', tag + ' ' + (JSON.stringify(rep).match(/.{40}(undefined|NaN).{20}/) || [''])[0]);
    RL.Report.summary(s); RL.Report.decades(s); RL.Report.verdict(rep, s); RL.Report.epitaph(s);
    lives++;
  } catch (e) { errors++; bug('исключение (месяцы)', tag + ': ' + e.stack.split('\n').slice(0, 3).join(' | ')); }
}
// 2) жизни по дням со случайными действиями игрока, сохранение/загрузка посреди жизни
for (var j = 0; j < Math.max(6, Math.round(N / 25)); j++) {
  var sx = j % 2 ? 'm' : 'f', tg = 'day-' + sx + j;
  try {
    var st = RL.Game.create({sex: sx, firstName: 'Тест', lastName: 'Дней', birthYear: 1985 + (j * 7) % 50}, 99 + j * 104729), r = new RL.RNG(j + 1), gg = 0;
    st.settings.daily = true;
    while (!st.over && gg++ < 45000) {
      if (st.pending) {
        var pd = st.pending;
        if (pd.kind === 'focus') { var ok = pd.options.filter(function (o) { return o.ok; }); RL.Game.chooseFocus(st, ok.length ? r.pick(ok).id : 'none'); }
        else if (r.chance(0.5)) RL.Game.autoResolve(st);
        else RL.Game.resolveEvent(st, r.pick(pd.choices).i);
        continue;
      }
      RL.Game.stepDay(st); days++;
      if (S.age(st) >= 6 && r.chance(0.08)) { var L = RL.Leisure.list(st).filter(function (o) { return o.ok; }); if (L.length) { var rr = new RL.RNG(gg); rr.s = st.rng; RL.Leisure.act(st, r.pick(L).id, rr); st.rng = rr.s; } }
      if (gg % 5000 === 0) { st = JSON.parse(JSON.stringify(st)); RL.World.resetCache(); checkState(st, tg + '@' + Math.floor(S.age(st))); }
    }
    if (!st.over) bug('жизнь по дням не закончилась', tg + ' ' + S.age(st).toFixed(1));
    scanText(st, sx, 0);
  } catch (e) { errors++; bug('исключение (дни)', tg + ': ' + e.stack.split('\n').slice(0, 3).join(' | ')); }
}
console.log('Жизней: ' + lives + ' по месяцам + ' + Math.max(6, Math.round(N / 25)) + ' по дням (' + days + ' дней), ' + Math.round((Date.now() - t0) / 1000) + ' с; исключений: ' + errors + ', зависаний: ' + stuck);
var kinds = Object.keys(bugs);
console.log(kinds.length ? 'НАЙДЕНО (' + nBug + '):' : 'Ошибок не найдено.');
kinds.forEach(function (k) { console.log('— ' + k + ':'); bugs[k].forEach(function (x) { console.log('    ' + x); }); });
if (errors || stuck || nBug) process.exitCode = 1;
