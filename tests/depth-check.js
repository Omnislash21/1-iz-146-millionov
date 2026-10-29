// Глубина взрослой жизни: срабатывают ли характер, связи, цепочки, тяжёлые события, эмиграция — и с реалистичной ли частотой.
// Автопилот, полные жизни. Запуск: node tests/depth-check.js [N]
var fs = require('fs'), path = require('path'), vm = require('vm');
var root = path.join(__dirname, '..');
fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/src="(js\/[^"]+)"/g).map(function (m) { return m.slice(5, -1).replace(/\?.*$/, ''); })
  .filter(function (f) { return f.indexOf('js/ui') < 0; }).forEach(function (f) { vm.runInThisContext(fs.readFileSync(path.join(root, f), 'utf8'), {filename: f}); });
var S = RL.S, N = +process.argv[2] || 200, t0 = Date.now();
var INC = [], R = {lives: 0, emig: 0, back: 0, foreclose: 0, trap: 0, ties: 0, tieUsed: 0, chain: 0, fights: 0, schemes: 0, deaths: {}, nDeath: 0, errors: 0};
var groups = {low: {n: 0, jobLoss: 0, divorce: 0, cases: 0}, high: {n: 0, jobLoss: 0, divorce: 0, cases: 0}};
for (var i = 0; i < N; i++) {
  var sx = i % 2 ? 'f' : 'm';
  try {
    var s = RL.Game.create({sex: sx, firstName: 'Тест', lastName: 'Глубин', birthYear: 1985 + (i * 7) % 40}, 5150 + i * 104729), g = 0, sc40 = null;
    while (!s.over && g++ < 1500) {
      if (s.pending) { RL.Game.autoResolve(s); continue; }
      RL.Game.step(s);
      if (sc40 === null && S.age(s) >= 40) sc40 = RL.Character.z(s, 'selfControl') + RL.Character.z(s, 'diligence');
    }
    R.lives++;
    if (s.person.bio && s.person.bio.incN >= 60) INC.push(s.person.bio.incSum / s.person.bio.incN);
    var L = s.log.map(function (l) { return l.text; }).join('\n');
    if (s.person.abroadHist || s.person.abroad) R.emig++;
    if (s.person.abroadHist) R.back++;
    if (/ипотечную квартиру на торги/.test(L)) R.foreclose++;
    if (/признал тебя банкротом|подал на твоё банкротство/.test(L)) R.bankrupt = (R.bankrupt || 0) + 1;
    if (/Кредитная кабала/.test(L)) R.trap++;
    R.ties += (s.person.ties || []).length;
    if (/по знакомству|Позвонил|сделал пару звонков|сделала пару звонков/.test(L)) R.tieUsed++;
    if (/Долг платежом|Переписка|Следователь:|Поздно:/.test(L)) R.chain++;
    if (/Вспыльчивость подвела/.test(L)) R.fights++;
    if (/«откат»|«схему»/.test(L)) R.schemes++;
    var c = s.person.deathCause;
    if (c) { R.deaths[c] = (R.deaths[c] || 0) + 1; R.nDeath++; }
    if (sc40 !== null) {
      var G = sc40 < -1 ? groups.low : sc40 > 1 ? groups.high : null;
      if (G) {
        G.n++;
        G.jobLoss += (L.match(/Потерял[а]? работу|Уволили|попросили уйти|Наорал/g) || []).length;
        G.divorce += (L.match(/Развод|расстались|разошлись|Не простили/g) || []).length;
        G.cases += (L.match(/Уголовное дело|Приговор/g) || []).length;
      }
    }
  } catch (e) { R.errors++; if (R.errors < 4) console.log('ОШИБКА', e.stack.split('\n').slice(0, 3).join(' | ')); }
}
function per(x) { return (x / Math.max(1, R.lives) * 100).toFixed(1) + '%'; }
console.log('Жизней: ' + R.lives + ', ' + Math.round((Date.now() - t0) / 1000) + ' с, исключений: ' + R.errors);
console.log('Эмигрировали: ' + per(R.emig) + ' (вернулись ' + R.back + ') | торги по ипотеке: ' + per(R.foreclose) + ' | кредитная кабала: ' + per(R.trap) + ' | банкротство: ' + per(R.bankrupt || 0));
console.log('Связей в конце жизни в среднем: ' + (R.ties / R.lives).toFixed(1) + ' | пользовались связями: ' + per(R.tieUsed) + ' | цепочки «через годы»: ' + per(R.chain));
console.log('Драки по характеру: ' + per(R.fights) + ' | «схемы» у нечестных: ' + per(R.schemes));
['low', 'high'].forEach(function (k) { var G = groups[k]; if (G.n) console.log((k === 'low' ? 'Слабый самоконтроль+трудолюбие' : 'Сильный самоконтроль+трудолюбие') + ' (' + G.n + '): увольнений ' + (G.jobLoss / G.n).toFixed(2) + ', разводов ' + (G.divorce / G.n).toFixed(2) + ', уголовных дел ' + (G.cases / G.n).toFixed(2) + ' на жизнь'); });
var top = Object.keys(R.deaths).sort(function (a, b) { return R.deaths[b] - R.deaths[a]; }).slice(0, 12);
console.log('Причины смерти (' + R.nDeath + '): ' + top.map(function (k) { return k.slice(0, 40) + ' ' + (R.deaths[k] / R.nDeath * 100).toFixed(1) + '%'; }).join('; '));
var cancer = Object.keys(R.deaths).filter(function (k) { return /Рак|опухол|Лейкоз|Лимфом|Меланом|рак/i.test(k); }).reduce(function (t, k) { return t + R.deaths[k]; }, 0);
INC.sort(function (a, b) { return a - b; });
console.log('Доход к медиане когорты (должна быть около 100%): p25 ' + Math.round(INC[Math.floor(INC.length * 0.25)] * 100) + '%, медиана ' + Math.round(INC[Math.floor(INC.length / 2)] * 100) + '%, p75 ' + Math.round(INC[Math.floor(INC.length * 0.75)] * 100) + '%');
console.log('Онкология: ' + (cancer / Math.max(1, R.nDeath) * 100).toFixed(1) + '% смертей (Росстат 2019: ~15–16%)');
