// Проверка связности: в событиях не должны участвовать умершие родственники (мама, папа, бабушка, дедушка, супруг),
// и сирота должен пройти путь детдом → выпуск → жильё. Запуск: node tests/kin-check.js [N]
var fs = require('fs'), path = require('path'), vm = require('vm');
var root = path.join(__dirname, '..');
fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/src="(js\/[^"]+)"/g).map(function (m) { return m.slice(5, -1).replace(/\?.*$/, ''); })
  .filter(function (f) { return f.indexOf('js/ui') < 0; }).forEach(function (f) { vm.runInThisContext(fs.readFileSync(path.join(root, f), 'utf8'), {filename: f}); });
var S = RL.S, N = +process.argv[2] || 300;
var bad = [], errors = 0, orphans = {n: 0, left: 0, flat: 0, queue: 0}, kidsLabels = 0, golden = {n: 0, bad: 0};
var RX = {
  mom: /(^|[^а-яё])(мам[аеуы]|мамой|мамин[аоы]?[йе]?|мать)([^а-яё]|$)/i,
  dad: /(^|[^а-яё])(пап[аеуы]|папой|отец|отца|отцу)([^а-яё]|$)/i,
  gma: /(^|[^а-яё])бабушк/i, gpa: /(^|[^а-яё])дедушк/i
};
function alive(s, test) { return s.family.members.some(function (m) { return m.alive && !m.unknown && test(m); }); }
var origLog = S.log;
S.log = function (s, text, type) {
  origLog(s, text, type);
  if (!s.__check || type === 'death' || type === 'birth' || type === 'news') return;
  var t = String(text), a = S.age(s);
  // «ты бабушка», «Родилась дочь …» и т.п. — про самого героя
  if (/ты (дедушка|бабушка)|ты \[дедушка|^Младенец/.test(t)) return;
  var who = null;
  if (RX.mom.test(t) && !alive(s, function (m) { return m.role === 'mother' || m.role === 'adoptive_mother'; }) && !/Дети остаются с мамой|живёт с мамой|Это же моя мама/.test(t)) who = 'мама';
  else if (RX.dad.test(t) && !alive(s, function (m) { return m.role === 'father' || m.role === 'adoptive_father' || m.role === 'stepfather'; }) && !/с папой|отцовской|Тебя забрал к себе отец/.test(t)) who = 'папа';
  else if (RX.gma.test(t) && !alive(s, function (m) { return m.role.indexOf('grandmother') === 0; }) && !/золото бабушки/.test(t) && a < 40) who = 'бабушка';
  else if (RX.gpa.test(t) && !alive(s, function (m) { return m.role.indexOf('grandfather') === 0; }) && a < 40) who = 'дедушка';
  if (who && bad.length < 60) bad.push(who + ' | ' + Math.floor(a) + ' лет | ' + t);
};
for (var i = 0; i < N; i++) {
  var sex = i % 2 ? 'm' : 'f', by = 1985 + (i % 51);
  try {
    var s = RL.Game.create({sex: sex, firstName: 'Тест', lastName: 'Тестов', birthYear: by}, 31000 + i * 7919), g = 0;
    s.__check = true;
    var wasOrphan = false;
    while (!s.over && g++ < 2000) {
      if (s.pending) { RL.Game.autoResolve(s); continue; }
      RL.Game.step(s);
      if (s.family.type === 'orphanage' && S.age(s) > 14) wasOrphan = true;
      if (S.age(s) > 26) break;
    }
    if (wasOrphan) { orphans.n++; if (s.person.flags.leftOrphanage) orphans.left++; if (s.person.flags.orphanFlat) orphans.flat++; else if (s.person.flags.orphanFlatQueue) orphans.queue++; }
  } catch (e) { errors++; if (errors <= 3) console.error('ERROR', by, e.stack); }
}
// полные жизни взрослых: годовщина и дети после развода
for (var j = 0; j < Math.round(N / 3); j++) {
  try {
    var s2 = RL.Game.create({sex: j % 2 ? 'm' : 'f', firstName: 'Тест', lastName: 'Тестов', birthYear: 1985 + (j % 20)}, 777 + j * 104729), g2 = 0;
    s2.__check = true;
    while (!s2.over && g2++ < 1600) {
      if (s2.pending) {
        if (s2.pending.id === 'golden_years') { golden.n++; var f2 = S.facts(s2); if (!f2.married || f2.marriedYears < 29.9) golden.bad++; }
        RL.Game.autoResolve(s2); continue;
      }
      RL.Game.step(s2);
    }
    RL.Report.lifeLines(s2).forEach(function (l) { if (/с бывшим супругом/.test(l)) kidsLabels++; });
  } catch (e) { errors++; if (errors <= 3) console.error('ERROR2', e.stack); }
}
console.log('Жизней: ' + N + ' (до 26 лет) + ' + Math.round(N / 3) + ' полных; ошибок: ' + errors);
console.log('Упоминаний умерших родственников: ' + bad.length);
bad.slice(0, 25).forEach(function (x) { console.log('  ' + x); });
console.log('Сироты из детдома: ' + orphans.n + ' | вышли в 18: ' + orphans.left + ' | получили квартиру: ' + orphans.flat + ' | в очереди: ' + orphans.queue);
console.log('Годовщин: ' + golden.n + ', из них неправильных: ' + golden.bad + ' | «с бывшим супругом» у взрослых детей: ' + kidsLabels);
if (errors || bad.length || golden.bad || kidsLabels) process.exitCode = 1;
