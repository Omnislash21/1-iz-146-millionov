// Сверка этапа 5: полные жизни до смерти. Смертность по возрастным группам: наблюдаемые / ожидаемые по таблице qx
// (ожидание = сумма месячных рисков по таблице за прожитые месяцы). Запуск: node tests/life-check.js [N]
var fs = require('fs'), path = require('path'), vm = require('vm');
var root = path.join(__dirname, '..');
fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/src="(js\/[^"]+)"/g).map(function (m) { return m.slice(5, -1); })
  .filter(function (f) { return f.indexOf('js/ui') < 0; }).forEach(function (f) { vm.runInThisContext(fs.readFileSync(path.join(root, f), 'utf8'), {filename: f}); });
var S = RL.S, U = RL.util, N = +process.argv[2] || 400;
var bands = [[0, 18], [18, 35], [35, 50], [50, 65], [65, 80], [80, 120]];
function bi(a) { for (var i = 0; i < bands.length; i++) if (a >= bands[i][0] && a < bands[i][1]) return i; return bands.length - 1; }
var R = {m: bands.map(function () { return {o: 0, e: 0}; }), f: bands.map(function () { return {o: 0, e: 0}; })};
var MM = bands.map(function () { return {sum: 0, n: 0}; }), EXPL = {cancer: 0, onset: 0};
var LAW = {record: 0, prison: 0, fssp: 0, northPension: 0, n: 0};
var ages = {m: [], f: []}, le0 = {m: [], f: []}, causes = {}, errors = 0, pens = [], grand = [], work = [], t0 = Date.now(), cond = {};
for (var i = 0; i < N; i++) {
  var sex = i % 2 ? 'm' : 'f', by = 1985 + (i % 16);
  try {
    var s = RL.Game.create({sex: sex, firstName: 'Тест', lastName: 'Тестов', birthYear: by}, 9000 + i * 7919), g = 0;
    le0[sex].push(RL.Mortality.lifeExpAt(s, by, sex));
    while (!s.over && g++ < 6000) {
      if (s.pending) { RL.Game.autoResolve(s); continue; }
      var a = S.age(s), q = RL.Mortality.qx(s, s.date.year, sex, a);
      if (a >= 1 && a < 15) q *= 1 - RL.DATA.demography.childExternalByEvents;
      R[sex][bi(a)].e += U.monthly(Math.min(0.95, q));
      RL.Game.step(s);
      if (s.person.alive && s.person.mortMult) { MM[bi(a)].sum += s.person.mortMult; MM[bi(a)].n++; }
    }
    var d = s.person.deathAge;
    R[sex][bi(d)].o++;
    ages[sex].push(d);
    causes[s.person.deathCause] = (causes[s.person.deathCause] || 0) + 1;
    if (s.person.pension) pens.push(s.person.pension.amount / (RL.Economy.AVG24() * RL.World.realWageIndex(s, s.date.year, s.date.month)));
    LAW.n++; if (s.person.flags.criminalRecord) LAW.record++; if (s.person.flags.adultPrison) LAW.prison++; if (s.person.work && (s.person.work.northMonths || 0) >= 180) LAW.northPension++;
    grand.push(s.person.grandkids || 0);
    if (s.person.work) work.push(s.person.work.months / 12);
    s.person.conditions.forEach(function (c) { cond[c.id] = (cond[c.id] || 0) + 1; });
  } catch (e) { errors++; if (errors <= 3) console.error('ERROR', by, e.stack); }
}
function mean(a) { return a.length ? (a.reduce(function (x, y) { return x + y; }, 0) / a.length).toFixed(1) : '—'; }
function med(a) { a = a.slice().sort(function (x, y) { return x - y; }); return a.length ? a[Math.floor(a.length / 2)].toFixed(2) : '—'; }
console.log('Жизней:', N, 'за', ((Date.now() - t0) / 1000).toFixed(0), 'с; ошибок:', errors);
['m', 'f'].forEach(function (sx) {
  console.log((sx === 'm' ? 'Мужчины' : 'Женщины') + ': средний возраст смерти', mean(ages[sx]), '| ОПЖ при рождении (период) ~' + mean(le0[sx]),
    '| набл./ожид. по возрастам:', bands.map(function (b, k) { var r = R[sx][k]; return b[0] + '–' + b[1] + ' ' + r.o + '/' + r.e.toFixed(1) + (r.e > 3 ? ' (' + (r.o / r.e).toFixed(2) + ')' : ''); }).join(' | '));
});
var top = Object.keys(causes).sort(function (a, b) { return causes[b] - causes[a]; }).slice(0, 10).map(function (k) { return k + ' ' + causes[k]; });
console.log('Причины:', top.join('; '));
console.log('Средний множитель смертности (после нормировки) по возрастам:', bands.map(function (b, k) { return b[0] + '–' + b[1] + ' ' + (MM[k].n ? (MM[k].sum / MM[k].n).toFixed(2) : '—'); }).join(' | '));
console.log('Пенсия / средняя ЗП: медиана', med(pens), '| стаж лет: медиана', med(work), '| внуков в среднем', mean(grand));
console.log('Болезни к концу жизни (чел.):', JSON.stringify(cond));
console.log('Судимость:', (100 * LAW.record / LAW.n).toFixed(1) + '%', '| сидели (взрослыми):', (100 * LAW.prison / LAW.n).toFixed(1) + '%', '| северный стаж 15+ лет:', (100 * LAW.northPension / LAW.n).toFixed(1) + '%');
if (errors) process.exit(1);
