// Проверка отчётов наблюдателей; не запускает и не изменяет модель.
// node tests/stats-check.js report.json [--compare previous-report.json]
var fs = require('fs'), path = require('path'), assert = require('assert'), vm = require('vm');
var args = process.argv.slice(2), at = args.indexOf('--compare');
var compare = at >= 0 ? args[at + 1] : null;
if (at >= 0) args.splice(at, 2);
if (!args.length) args = ['calibration-1020.json', 'calibration-3060.json', 'calibration-1985.json'].map(function (f) { return path.join(__dirname, f); });
function read(f) { return JSON.parse(fs.readFileSync(f, 'utf8')); }
function checkRow(row) {
  assert.strictEqual(row.entered, row.expelled + row.graduated + row.diedBeforeOutcome + row.censored, 'исходы должны разбивать когорту');
  assert.strictEqual(row.censored, row.studyingAtEnd + row.serviceAtEnd + row.otherAtEnd, 'причины незавершённого наблюдения');
  assert.ok(row.debtSemesters <= row.semesters, 'хвостов не больше сессий');
  assert.ok(row.expelled <= row.debtSemesters, 'академическое отчисление требует сессии с хвостами');
  Object.keys(row).forEach(function (k) { assert.ok(Number.isInteger(row[k]) && row[k] >= 0, 'счётчик ' + k); });
}
function subset(expected, actual, label) {
  if (expected && typeof expected === 'object' && !Array.isArray(expected)) {
    Object.keys(expected).forEach(function (k) { subset(expected[k], actual[k], label + '.' + k); });
  } else assert.deepStrictEqual(actual, expected, label);
}
// Точечный граничный сценарий исполняет сам observer из sim-check.js, без копирования реализации.
var observerSource = fs.readFileSync(path.join(__dirname, 'sim-check.js'), 'utf8');
observerSource = observerSource.slice(observerSource.indexOf('function observeTicketChoice('), observerSource.indexOf('\nfunction childEnd('));
var counters = {eligibleMen: 0, noticeMen: 0, notices: 0, offeredMen: 0, offers: 0, affordableMen: 0, affordableOffers: 0, attemptMen: 0, attempts: 0, successMen: 0, successes: 0, unsuccessfulAttempts: 0};
var fixtureContext = {Y: {ticketWindow: counters}, RL: {DATA: {army: {whiteTicketFrom: 1992, whiteTicketTo: 2019, whiteTicketCost: 2.5}}, Economy: {AVG24: function () { return 100; }}, World: {realWageIndex: function () { return 1; }}}};
vm.runInNewContext(observerSource, fixtureContext);
fixtureContext.observeTicketChoice({date: {year: 2020, month: 0}, person: {flags: {boughtTicket: 1}}, log: [{type: 'choice', text: 'Повестка: Купить'}]}, {}, {kind: 'custom', id: 'draft_notice', title: 'Повестка', opts: [{kind: 'ticket', text: 'Купить'}]}, {budget: {income: 1000, need: 0}, savings: 1000}, false);
assert.strictEqual(counters.offers, 1, 'декабрьское предложение учитывается после смены календарного года');
assert.strictEqual(counters.attempts, 1); assert.strictEqual(counters.successes, 1);
console.log('OK декабрь 2019 → январь 2020: сохранённая опция покупки учтена');
args.forEach(function (f) {
  var j = read(f), V = j.young.firstVuz, T = j.young.ticketWindow;
  assert.ok(V && T, 'в отчёте отсутствуют новые наблюдатели');
  checkRow(V.all); checkRow(V.nominallyDueBy25);
  assert.ok(V.nominallyDueBy25.entered <= V.all.entered, 'зрелая когорта — подмножество поступивших');
  assert.ok(V.all.entered <= j.method.lives, 'уникальные люди не больше числа жизней');
  ['byEntryEra', 'byForm'].forEach(function (group) {
    var keys = Object.keys(V[group]); keys.forEach(function (k) { checkRow(V[group][k]); });
    Object.keys(V.all).forEach(function (counter) { assert.strictEqual(keys.reduce(function (sum, k) { return sum + V[group][k][counter]; }, 0), V.all[counter], group + '.' + counter); });
  });
  assert.strictEqual(T.attempts, T.successes + T.unsuccessfulAttempts, 'исходы покупок');
  assert.ok(T.successes <= T.attempts && T.attempts <= T.offers && T.offers <= T.notices, 'цепочка повестка → предложение → попытка → успех');
  assert.ok(T.successMen <= T.attemptMen && T.attemptMen <= T.offeredMen && T.offeredMen <= T.eligibleMen, 'уникальные мужчины в ветке');
  assert.ok(T.affordableOffers <= T.offers && T.affordableMen <= T.offeredMen, 'доступность по средствам');
  if (V.all.entered) assert.strictEqual(j.metrics.firstVuzDropoutShare, V.all.expelled / V.all.entered);
  if (T.offeredMen) assert.strictEqual(j.metrics.ticketSuccessOfferedMenShare, T.successMen / T.offeredMen);
  if (compare) {
    assert.strictEqual(args.length, 1, '--compare предназначен для одного нового отчёта');
    var before = read(compare);
    assert.strictEqual(j.source.aggregateSha256, before.source.aggregateSha256, 'сравнение требует одной версии модели');
    subset(before.childhood, j.childhood, 'childhood'); subset(before.young, j.young, 'young'); subset(before.metrics, j.metrics, 'metrics');
  }
  console.log('OK', f, '— исходы и знаменатели согласованы' + (compare ? '; исходные счётчики и траектория ГСЧ не изменились' : ''));
});
