// Узкие регрессии этапа 2. Запуск: node tests/young-check.js
// Загружаются те же vanilla JS-модули, что в offline index.html.
var fs = require('fs'), path = require('path'), vm = require('vm'), assert = require('assert');
var root = path.join(__dirname, '..');
fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/src="(js\/[^\"]+)"/g).forEach(function (m) {
  var file = m.slice(5, -1).replace(/\?.*$/, '');
  if (file.indexOf('js/ui') !== 0) vm.runInThisContext(fs.readFileSync(path.join(root, file), 'utf8'), {filename: file});
});
var RL = globalThis.RL, passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('OK', name); }
  catch (e) { failed++; console.error('FAIL', name + ':', e.message); }
}
function state(sex, age) {
  var s = RL.Game.create({sex: sex || 'f', firstName: 'Проверка', lastName: 'Тест', birthYear: 2000}, 101);
  s.birth.month = 0; s.date = {year: 2000 + (age || 20), month: 6};
  s.person.focus = 'none'; s.person.conditions = []; s.person.disability = null;
  s.person.education = {stage: 'work', school: null}; s.person.diplomas = [];
  s.person.flags = {militaryCat: 'А'}; s.person.habits = {}; s.person.earnings = 0;
  s.person.job = null; s.person.loc = null;
  s.person.own = {living: 'parents', savings: 0, debts: [], deprivation: 0, lastBudget: null};
  s.family.savings = 10000000;
  s.family.lastBudget = {income: 200000, need: 50000};
  s.pending = null; s.queue = []; s.queueFocus = null; s.deathNow = null;
  return s;
}
function option(s, o) {
  s.pending = {kind: 'custom', id: 'test_choice', title: 'Проверка', opts: [o], choices: [{i: 0, text: o.text || o.kind}]};
  RL.Game.resolveEvent(s, 0);
}
function enroll(s, form, payer, tuition) {
  var v = RL.Young.vuzList().filter(function (x) { return x.fields.indexOf('econ') >= 0; })[0];
  option(s, {kind: 'enroll', v: v, field: 'econ', form: form, payer: payer, tuition: tuition || 100000, text: 'Тестовое зачисление'});
  return s.person.education.vuz;
}
function calmRng() {
  var rng = new RL.RNG(9);
  rng.chance = function () { return false; }; // нет случайной потери работы/отчисления/смерти на службе
  rng.normal = function (mean) { return mean; };
  return rng;
}
function withQuietCalendar(fn) {
  var old = [RL.Economy.monthly, RL.Family.monthly, RL.Health.monthly, RL.Events.monthly, RL.Mortality.qx];
  RL.Economy.monthly = RL.Family.monthly = RL.Events.monthly = function () {};
  RL.Health.monthly = function () { return null; }; RL.Mortality.qx = function () { return 0; };
  try { fn(); }
  finally {
    RL.Economy.monthly = old[0]; RL.Family.monthly = old[1]; RL.Health.monthly = old[2];
    RL.Events.monthly = old[3]; RL.Mortality.qx = old[4];
  }
}
function focus(s, id) { return RL.Childhood.availableFocuses(s).filter(function (x) { return x.id === id; })[0]; }

test('взрослый выбирает фокус раз в два года (18, 20, …); жизнь продолжается после 35', function () {
  withQuietCalendar(function () {
    var s = state('f', 17), ages = [];
    s.date.month = 11;
    var guard = 0;
    while (!s.over && guard++ < 250 && RL.S.age(s) < 35) {
      RL.Game.step(s);
      if (s.pending && s.pending.kind === 'custom') { RL.Game.resolveEvent(s, s.pending.choices.length - 1); continue; }
      if (s.pending && s.pending.kind === 'event') { RL.Game.autoResolve(s); continue; }
      if (s.pending) {
        assert.strictEqual(s.pending.kind, 'focus');
        ages.push(RL.S.age(s)); RL.Game.chooseFocus(s, 'none');
      }
    }
    assert.deepStrictEqual(ages, [18, 20, 22, 24, 26, 28, 30, 32, 34]);
    assert.strictEqual(s.over, false); assert.strictEqual(RL.S.age(s), 35); assert.ok(RL.CONFIG.endAge >= 100);
  });
});
test('студент вуза может выбрать учёбу', function () {
  var s = state(); enroll(s, 'budget');
  assert.strictEqual(focus(s, 'study').ok, true);
});
test('карьера требует работу; поиск работы доступен без работы', function () {
  var s = state();
  assert.strictEqual(focus(s, 'career').ok, false);
  assert.strictEqual(focus(s, 'jobhunt').ok, true);
  s.person.job = {prof: 'worker', employed: true, base: 100000, shadow: 0, raise: 1};
  assert.strictEqual(focus(s, 'career').ok, true);
  assert.strictEqual(focus(s, 'jobhunt').ok, false);
});
test('образовательный кредит оплачивает первый и следующий год', function () {
  var s = state(), v = enroll(s, 'paid', 'credit', 100000);
  var d = s.person.own.debts.filter(function (x) { return x.kind === 'edu'; })[0];
  assert.strictEqual(d.principal, 100000, 'первый учебный год должен быть оплачен при зачислении');
  s.date.year++; s.date.month = 5;
  s.person.stats.skills = 90; s.person.hidden.iq = 140; s.person.traits.diligence = 80;
  RL.Young.monthly(s, calmRng());
  assert.strictEqual(v.course, 2); assert.strictEqual(d.principal, 200000);
});
test('самостоятельная оплата списывается за первый и следующий год', function () {
  var s = state(); s.family.savings = 0; s.person.own.savings = 300000;
  enroll(s, 'paid', 'self', 100000);
  assert.strictEqual(s.person.own.savings, 200000, 'первый год нельзя пропустить');
  s.date.year++; s.date.month = 5;
  s.person.stats.skills = 90; s.person.hidden.iq = 140; s.person.traits.diligence = 80;
  RL.Young.monthly(s, calmRng());
  assert.ok(s.person.own.savings <= 100000, 'второй год тоже должен быть оплачен');
});
test('оплата сначала расходует наличные и создаёт долг только на недостающую сумму', function () {
  var s = state(); s.family.savings = 40; s.person.own.savings = 30;
  enroll(s, 'paid', 'self', 100);
  assert.strictEqual(s.family.savings, 0); assert.strictEqual(s.person.own.savings, 0);
  var debt = s.person.own.debts.reduce(function (total, d) { return total + d.balance; }, 0);
  assert.strictEqual(debt, 30);
});
test('проценты по отсроченному кредиту начисляются при жизни с родителями', function () {
  var s = state();
  s.person.own.debts = [{kind: 'edu', balance: 100000, principal: 100000, rate: 0.03, deferred: true}];
  RL.Young.monthly(s, calmRng());
  assert.strictEqual(s.person.own.debts[0].balance, 100250);
});
test('работающий у родителей погашает обычный личный долг', function () {
  var s = state();
  s.person.job = {prof: 'worker', employed: true, base: 200000, shadow: 0, raise: 1};
  s.person.own.debts = [{kind: 'bank', balance: 100000, principal: 100000, rate: 0.2}];
  RL.Young.monthly(s, calmRng());
  assert.ok(s.person.own.debts[0].balance < 100000, 'долг не должен замереть после возвращения домой');
});
test('обычный долг начисляет проценты во время службы без зарплаты', function () {
  var s = state('m'); option(s, {kind: 'army'});
  s.person.own.debts = [{kind: 'bank', balance: 100000, principal: 100000, rate: 0.2}];
  RL.Young.monthly(s, calmRng());
  assert.ok(s.person.own.debts[0].balance > 100000);
});
test('17-летнего нельзя отправить на срочную службу через вариант решения', function () {
  var s = state('m', 17); option(s, {kind: 'army'});
  assert.ok(!s.person.army); assert.notStrictEqual(s.person.education.stage, 'army');
});
['В', 'Д'].forEach(function (cat) {
  test('категория ' + cat + ' исключает срочную службу через вариант решения', function () {
    var s = state('m'); s.person.flags.militaryCat = cat; option(s, {kind: 'army'});
    assert.ok(!s.person.army); assert.notStrictEqual(s.person.education.stage, 'army');
  });
});
test('заочная учёба приостанавливается на время службы и возобновляется после неё', function () {
  var s = state('m'); var v = enroll(s, 'zaochno', 'self', 100000);
  option(s, {kind: 'army'});
  assert.strictEqual(s.person.education.stage, 'army');
  s.date.month = 0; s.person.army.term = 2;
  RL.Young.monthly(s, calmRng());
  assert.strictEqual(v.sessions.length, 0, 'во время службы сессию не сдают');
  s.date.month = 1; RL.Young.monthly(s, calmRng());
  assert.strictEqual(s.person.education.stage, 'vuz');
  assert.strictEqual(s.person.education.vuz, v); assert.strictEqual(s.person.army, null);
});
test('переход со срочной службы на контракт сохраняет возможность вернуться в вуз', function () {
  var s = state('m'); var v = enroll(s, 'zaochno', 'self', 100000);
  option(s, {kind: 'army'});
  RL.Young.applyEffects(s, {army: 'contract'}, calmRng());
  assert.strictEqual(s.person.army.kind, 'contract');
  s.person.army.term = 1; s.date.month = 1;
  RL.Young.monthly(s, calmRng());
  assert.strictEqual(s.person.education.stage, 'vuz'); assert.strictEqual(s.person.education.vuz, v);
});
test('событие переезда в столицу недоступно во время учёбы в вузе', function () {
  var s = state(); enroll(s, 'budget');
  s.person.loc = {regionId: 'krs', settlement: 'million', city: 'Красноярск'};
  var event = RL.Events.def('big_move');
  assert.strictEqual(RL.Events.check(event.when, RL.S.facts(s)), false);
  s.person.education.stage = 'work';
  assert.strictEqual(RL.Events.check(event.when, RL.S.facts(s)), true, 'для взрослого вне вуза событие должно остаться доступным');
});
test('прямой эффект переезда не переносит студента в другой город', function () {
  var s = state(); enroll(s, 'budget');
  s.person.loc = {regionId: 'krs', settlement: 'million', city: 'Красноярск'};
  var before = JSON.parse(JSON.stringify(s.person.loc)), living = s.person.own.living;
  RL.Young.applyEffects(s, {bigMove: 'spb'}, calmRng());
  assert.deepStrictEqual(s.person.loc, before); assert.strictEqual(s.person.own.living, living);
});
test('сохранённая учёба не приносит стипендию во время службы', function () {
  var s = state('m'); var v = enroll(s, 'budget');
  option(s, {kind: 'army'});
  assert.strictEqual(s.person.education.vuz, v);
  s.date.month = 1; s.person.earnings = 0; s.person.own.savings = 0;
  RL.Young.monthly(s, calmRng());
  assert.strictEqual(s.person.education.stage, 'army');
  assert.strictEqual(s.person.earnings, 0); assert.strictEqual(s.person.own.savings, 0);
  assert.strictEqual(s.person.own.lastBudget, null);
});
test('место в итоговом отчёте отражает текущий город после переезда', function () {
  var s = state(); s.person.regionId = 'krs'; s.person.city = 'Красноярск'; s.person.settlement = 'million';
  RL.Young.applyEffects(s, {bigMove: 'spb'}, calmRng());
  var L = RL.Young.loc(s);
  assert.notStrictEqual(L.city, s.person.city);
  assert.strictEqual(RL.Report.build(s).place, L.city + ', ' + L.region.name);
});
test('снимок в день рождения сохраняет текущий город после переезда', function () {
  withQuietCalendar(function () {
    var s = state(); s.person.regionId = 'krs'; s.person.city = 'Красноярск'; s.person.settlement = 'million';
    RL.Young.applyEffects(s, {bigMove: 'spb'}, calmRng());
    s.date.month = 11; var city = s.person.loc.city;
    RL.Game.step(s);
    assert.strictEqual(RL.S.age(s), 21);
    assert.strictEqual(s.history[s.history.length - 1].city, city);
  });
});
test('пересдача после gap учитывает сохранённые проходные баллы обязательных предметов', function () {
  var s = state(); s.date.month = 5;
  s.person.education = {stage: 'gap', profile: 'physmath', school: null, prep: 0,
    ege: {kind: 'ЕГЭ', scores: {russian: 0, math: 80, physics: 80, informatics: 80}, failed: true}};
  var rng = calmRng(), n = 0;
  rng.chance = function (p) { return p >= 1; };
  rng.normal = function () { return [8, -8, 0, 0][n++] || 0; }; // русский сдан, математика взята из прошлого года
  RL.Young.monthly(s, rng);
  assert.strictEqual(s.person.education.stage, 'graduate');
  assert.strictEqual(s.person.education.ege.scores.russian, 100);
  assert.strictEqual(s.person.education.ege.scores.math, 80);
  assert.strictEqual(s.person.education.ege.failed, false, 'минимумы русского и математики выполнены по итоговым баллам');
  s.date.month = 6; RL.Young.monthly(s, calmRng());
  assert.strictEqual(s.pending.id, 'admission_plan');
  assert.ok(s.pending.opts.some(function (o) { return o.kind === 'field'; }), 'поступление после успешной пересдачи доступно');
});
test('аннулированная пересдача после gap не становится действительной из-за старых баллов', function () {
  var s = state(); s.date.month = 5; s.flags.egeLeak = 1;
  s.person.education = {stage: 'gap', profile: 'physmath', school: null, prep: 0,
    ege: {kind: 'ЕГЭ', scores: {russian: 80, math: 80, physics: 80, informatics: 80}, failed: false}};
  var rng = calmRng();
  rng.chance = function (p) { return p >= 1 || p === 0.15; }; // аннулирование из-за найденной распечатки
  rng.normal = function () { return 8; };
  RL.Young.monthly(s, rng);
  assert.strictEqual(s.person.education.stage, 'graduate');
  assert.strictEqual(s.person.education.ege.annulled, true);
  assert.strictEqual(s.person.education.ege.failed, true);
});
test('результаты аннулированной прошлой попытки не используются при gap-пересдаче', function () {
  var s = state(); s.date.month = 5;
  s.person.education = {stage: 'gap', profile: 'physmath', school: null, prep: 0,
    ege: {kind: 'ЕГЭ', scores: {russian: 80, math: 80, physics: 80, informatics: 80}, failed: true, annulled: true}};
  var rng = calmRng(), n = 0;
  rng.chance = function (p) { return p >= 1; };
  rng.normal = function () { return [8, -8, 0, 0][n++] || 0; };
  RL.Young.monthly(s, rng);
  assert.strictEqual(s.person.education.stage, 'graduate');
  assert.strictEqual(s.person.education.ege.annulled, false, 'текущая попытка действительна');
  assert.strictEqual(s.person.education.ege.scores.math, 0, 'аннулированные 80 баллов нельзя переносить');
  assert.strictEqual(s.person.education.ege.failed, true, 'математика не сдана в действительной попытке');
});
test('дополнительная нормировка смертности действует только от 18 до 36 лет', function () {
  var norm = RL.DATA.young.mortalityNormalization;
  assert.ok(norm > 1, 'популяционная нормировка молодости должна быть включена');
  try {
    [0.5, 10, 17, 17 + 11 / 12, 18, 20, 24, 25, 30, 35 + 11 / 12, 36].forEach(function (age) {
      var s = state(); s.date = {year: 2000 + Math.floor(age), month: Math.round((age % 1) * 12)};
      s.person.stats.health = 65;
      var facts = RL.S.facts(s), acc = RL.Health.access(s);
      RL.DATA.young.mortalityNormalization = 1;
      var before = RL.Health.mortMult(s, facts, acc);
      RL.DATA.young.mortalityNormalization = norm;
      var after = RL.Health.mortMult(s, facts, acc);
      var expected = age >= 18 && age < 36 ? 1 / norm : 1;
      assert.ok(Math.abs(after / before - expected) < 1e-12, 'неверная граница нормировки в возрасте ' + age);
    });
  } finally { RL.DATA.young.mortalityNormalization = norm; }
});
test('нормировка смертности сохраняет повышенный относительный риск зависимости', function () {
  var norm = RL.DATA.young.mortalityNormalization, s = state();
  s.person.stats.health = 65;
  function risk(level) {
    s.person.habits = {drugs: level};
    return RL.Health.mortMult(s, RL.S.facts(s), RL.Health.access(s));
  }
  try {
    RL.DATA.young.mortalityNormalization = 1;
    var baseBefore = risk(0), dependentBefore = risk(3);
    RL.DATA.young.mortalityNormalization = norm;
    var baseAfter = risk(0), dependentAfter = risk(3);
    assert.ok(dependentAfter > baseAfter, 'зависимость должна сохранять повышенный риск');
    assert.ok(Math.abs(dependentAfter / baseAfter - dependentBefore / baseBefore) < 1e-12,
      'калибровка населения не должна менять относительный риск зависимости');
  } finally { RL.DATA.young.mortalityNormalization = norm; }
});
test('сохранение custom-решения сохраняет результаты поступления и ГСЧ', function () {
  var s = state();
  s.person.education = {stage: 'graduate', ege: {kind: 'ЕГЭ', failed: false, scores: {russian: 80, math: 80, social: 80, history: 80, physics: 80, chemistry: 80, biology: 80, literature: 80, english: 80}}};
  var rng = new RL.RNG(s.rng); RL.Young.offerPlan(s, rng, 'school'); s.rng = rng.s;
  assert.strictEqual(s.pending.kind, 'custom');
  var restored = JSON.parse(JSON.stringify(s));
  var idx = s.pending.opts.findIndex(function (o) { return o.kind === 'field' && o.field === 'econ'; });
  assert.ok(idx >= 0);
  RL.Game.resolveEvent(s, idx); RL.World.resetCache(); RL.Game.resolveEvent(restored, idx);
  assert.deepStrictEqual(restored, s, 'JSON-сохранение не должно менять варианты приёмной кампании');
  restored = JSON.parse(JSON.stringify(s));
  idx = s.pending.opts.findIndex(function (o) { return o.kind === 'enroll'; });
  assert.ok(idx >= 0);
  RL.Game.resolveEvent(s, idx); RL.World.resetCache(); RL.Game.resolveEvent(restored, idx);
  assert.deepStrictEqual(restored, s);
  for (var i = 0; i < 30 && !s.over; i++) {
    if (s.pending) RL.Game.autoResolve(s); else RL.Game.step(s);
    RL.World.resetCache();
    if (restored.pending) RL.Game.autoResolve(restored); else RL.Game.step(restored);
    assert.deepStrictEqual(restored, s, 'траектории разошлись после загрузки на шаге ' + i);
  }
});

function semesterStudent(focus) {
  var s = state(); enroll(s, 'paid', 'credit', 100000);
  s.date.year++; s.date.month = 5;
  s.person.education.vuz.q = 60;
  s.person.stats.skills = 55; s.person.stats.mental = 60;
  s.person.hidden.iq = 100; s.person.traits.diligence = 0; s.person.focus = focus;
  return s;
}
function hardExam(retake) {
  var rng = calmRng();
  rng.normal = function () { return -0.95; }; // одинаковая трудная сессия для двух стратегий
  rng.chance = function (p) { return retake && p === 0.55; };
  return rng;
}
test('провал сессии и пересдачи прекращает учёбу и отсрочку образовательного долга', function () {
  var s = semesterStudent('none');
  RL.Young.monthly(s, hardExam(false));
  assert.strictEqual(s.person.education.stage, 'work');
  assert.strictEqual(s.person.education.vuz, null);
  assert.strictEqual(s.person.education.vuzHistory[0].result, 'отчислен');
  assert.strictEqual(s.person.own.debts[0].deferred, false);
});
test('учебный фокус сохраняет место при тех же способностях и трудной сессии', function () {
  var s = semesterStudent('study');
  RL.Young.monthly(s, hardExam(false));
  assert.strictEqual(s.person.education.stage, 'vuz');
  assert.strictEqual(s.person.education.vuz.course, 2);
  assert.strictEqual(s.person.own.debts[0].deferred, true);
});
test('успешная пересдача сохраняет место и закрывает курс при наличии хвостов', function () {
  var s = semesterStudent('none');
  RL.Young.monthly(s, hardExam(true));
  assert.strictEqual(s.person.education.stage, 'vuz');
  assert.strictEqual(s.person.education.vuz.sessions[0], 'долги');
  assert.strictEqual(s.person.education.vuz.course, 2);
  assert.strictEqual(s.person.own.debts[0].deferred, true);
});
console.log('Регрессии молодости: ' + passed + ' пройдено, ' + failed + ' ошибок.');
if (failed) process.exit(1);
