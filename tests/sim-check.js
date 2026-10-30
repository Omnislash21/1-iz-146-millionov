// Детерминированный прогон N жизней без браузера. Возрастные группы измеряются отдельно.
// node tests/sim-check.js [N] [--json report.json] [--birth-year 1985..2035]
var fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
var root = path.join(__dirname, '..');
var files = fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/src="(js\/[^\"]+)"/g).map(function (m) { return m.slice(5, -1).replace(/\?.*$/, ''); });
var sourceSha256 = {}, sourceText = {};
files.forEach(function (f) {
  sourceText[f] = fs.readFileSync(path.join(root, f), 'utf8');
  sourceSha256[f] = crypto.createHash('sha256').update(sourceText[f], 'utf8').digest('hex');
});
var sourceManifest = files.map(function (f) { return f + '\0' + sourceSha256[f] + '\n'; }).join('');
var source = {sha256: sourceSha256, aggregateSha256: crypto.createHash('sha256').update(sourceManifest, 'utf8').digest('hex'), indexSha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'index.html'))).digest('hex'), testSha256: crypto.createHash('sha256').update(fs.readFileSync(__filename)).digest('hex'), nodeVersion: process.version};
files.filter(function (f) { return f.indexOf('js/ui') < 0; }).forEach(function (f) {
  vm.runInThisContext(sourceText[f], {filename: f});
});
var RL = globalThis.RL, S = RL.S, args = process.argv.slice(2), N = 2000, jsonPath = null, fixedYear = null;
for (var ai = 0; ai < args.length; ai++) {
  if (args[ai] === '--json') jsonPath = args[++ai];
  else if (args[ai] === '--birth-year') fixedYear = Number(args[++ai]);
  else if (/^\d+$/.test(args[ai])) N = Number(args[ai]);
  else throw new Error('Неизвестный аргумент: ' + args[ai]);
}
if (!Number.isInteger(N) || N < 1) throw new Error('N должно быть положительным целым числом');
// До 1985 в модели отсутствует ряд зарплат: не подменяем его вымышленными данными ради калибровки.
if (fixedYear !== null && (!Number.isInteger(fixedYear) || fixedYear < 1985 || fixedYear > 2035)) throw new Error('--birth-year поддерживает только 1985–2035; для когорты 1975 нужны отсутствующие в модели данные до 1985 года');
if (args.indexOf('--json') >= 0 && !jsonPath) throw new Error('После --json нужен путь');
function pct(x, n) { return n ? (100 * x / n).toFixed(2) + '%' : '— (n=0)'; }
function tally(obj, k) { obj[k] = (obj[k] || 0) + 1; }
function ratio(x, n) { return n ? x / n : null; }
function quantile(a, k) { var b = a.slice().sort(function (x, y) { return x - y; }); return b.length ? b[Math.floor((b.length - 1) * k)] : null; }
function calendarEra(y) { return y < 1990 ? 'до 1990' : y < 2000 ? '1990-99' : y < 2010 ? '2000-09' : y < 2026 ? '2010-25' : '2026+'; }
function sexRow() { return {n: 0, deaths: 0, expectedDeaths: 0}; }
function admissionRow() { return {n: 0, vuz: 0, attestatN: 0, attestatVuz: 0, form: {}}; }
function vuzCohortRow() { return {entered: 0, expelled: 0, graduated: 0, diedBeforeOutcome: 0, censored: 0, studyingAtEnd: 0, serviceAtEnd: 0, otherAtEnd: 0, studentMonths: 0, semesters: 0, debtSemesters: 0, coursesClosed: 0}; }
var Y = {n: 0, deaths: 0, causes: {}, vuz18: 0, n18: 0, form: {}, served: 0, men: 0, evader: 0, ticket: 0, higher: 0, spo: 0, emp: 0, apart: 0, wage: [], expelled: 0, stage: {}, mil: 0, debt: 0,
  attestat: {n: 0, vuz: 0}, sex: {m: sexRow(), f: sexRow()}, mortalityCohorts: {}, exposureCalendar: {}, admissions: {'1990-99': admissionRow(), '2000-09': admissionRow(), '2010-25': admissionRow(), '2026+': admissionRow()},
  firstVuz: {all: vuzCohortRow(), nominallyDueBy25: vuzCohortRow(), byEntryEra: {}, byForm: {}},
  ticketWindow: {eligibleMen: 0, eligibleCampaignMonths: 0, noticeMen: 0, notices: 0, offeredMen: 0, offers: 0, affordableMen: 0, affordableOffers: 0, attemptMen: 0, attempts: 0, successMen: 0, successes: 0, unsuccessfulAttempts: 0}};
var st = {region: {}, settlement: {}, famType: {}, deaths: 0, infantDeaths: 0, causes: {}, allDeaths: 0, errors: 0, q5: {}, endFam: {}, eras: {},
  logLen: 0, events: 0, teen: {n: 0, deaths: 0, causes: {}, h: {}, ever: {}, oge: [0, 0], ogeFail: 0, ege: {}, egeFail: 0, egeN: 0, track: {}, colony: 0, crim: 0, depr: 0, mil: {}, medal: 0}, cond: {}, divorce: 0, kg: 0, school: 0, sibBorn: 0, mother: {edu: [0, 0, 0]}, alc3: 0, poverty5: 0};
function expectedYoungDeath(s) {
  var survival = 1;
  for (var am = 216; am < 300; am++) {
    var totalMonth = s.birth.month + am, y = s.birth.year + Math.floor(totalMonth / 12);
    survival *= 1 - RL.util.monthly(RL.Mortality.qx(s, y, s.person.sex, am / 12));
  }
  return 1 - survival;
}
function startYoung(s, tr) {
  if (tr.young || !s.person.alive || S.ageMonths(s) < 216) return;
  tr.young = true;
  var sex = s.person.sex, key = calendarEra(s.birth.year + 18), expected = expectedYoungDeath(s);
  Y.mortalityCohorts[key] = Y.mortalityCohorts[key] || {m: sexRow(), f: sexRow()};
  Y.n++; Y.sex[sex].n++; Y.sex[sex].expectedDeaths += expected;
  Y.mortalityCohorts[key][sex].n++; Y.mortalityCohorts[key][sex].expectedDeaths += expected;
}
function admissionResolved(s, tr, previous) {
  if (!tr.admission || tr.admission.done) return;
  // «Поступать» открывает вторую развилку; считаем лишь после её фактического разрешения.
  if (s.pending && s.pending.kind === 'custom' && s.pending.id === 'admission_result') return;
  if (previous.id !== 'admission_plan' && previous.id !== 'admission_result') return;
  tr.admission.done = true;
  var row = Y.admissions[calendarEra(tr.admission.year)];
  if (!row) row = Y.admissions[calendarEra(tr.admission.year)] = admissionRow();
  Y.n18++; row.n++;
  if (tr.admission.attestat) { Y.attestat.n++; row.attestatN++; }
  if (s.person.education.stage === 'vuz') {
    Y.vuz18++; row.vuz++;
    if (tr.admission.attestat) { Y.attestat.vuz++; row.attestatVuz++; }
    tally(Y.form, s.person.education.vuz.form); tally(row.form, s.person.education.vuz.form);
  }
}
// Наблюдатели не меняют состояние игры и не потребляют ГСЧ. Первое ВО включает поступивших после СПО.
function observeFirstVuz(s, tr) {
  var ed = s.person.education, v = ed.vuz;
  if (!tr.firstVuz && v && v.level !== 'магистр' && !(s.person.diplomas || []).some(function (d) { return d.level !== 'СПО'; })) {
    tr.firstVuz = {v: v, entryAgeMonths: S.ageMonths(s), entryYear: s.date.year, form: v.form, studentMonths: 0, outcome: null,
      nominallyDueBy25: (v.start + v.years - s.birth.year) * 12 + 5 - s.birth.month < 300};
  }
  var f = tr.firstVuz;
  if (!f || f.outcome) return;
  var history = (ed.vuzHistory || []).filter(function (h) { return h.name === f.v.name && h.field === f.v.field && h.year >= f.entryYear; });
  if (history.some(function (h) { return h.result === 'отчислен'; })) f.outcome = 'expelled';
  else if ((s.person.diplomas || []).some(function (d) { return d.level !== 'СПО' && d.level !== 'магистр' && d.inst === f.v.name && d.field === f.v.field && d.year >= f.entryYear; })) f.outcome = 'graduated';
  else if (!s.person.alive) f.outcome = 'diedBeforeOutcome';
}
function finishFirstVuz(s, tr) {
  var f = tr.firstVuz;
  if (!f) return;
  var ed = s.person.education, outcome = f.outcome || 'censored', detail = ed.stage === 'army' ? 'serviceAtEnd' : ed.stage === 'vuz' && ed.vuz === f.v ? 'studyingAtEnd' : 'otherAtEnd';
  var eras = Y.firstVuz.byEntryEra, forms = Y.firstVuz.byForm, era = calendarEra(f.entryYear);
  eras[era] = eras[era] || vuzCohortRow(); forms[f.form] = forms[f.form] || vuzCohortRow();
  var rows = [Y.firstVuz.all, eras[era], forms[f.form]];
  if (f.nominallyDueBy25) rows.push(Y.firstVuz.nominallyDueBy25);
  rows.forEach(function (row) {
    row.entered++; row[outcome]++;
    if (outcome === 'censored') row[detail]++;
    row.studentMonths += f.studentMonths;
    row.semesters += f.v.sessions.length;
    row.debtSemesters += f.v.sessions.filter(function (x) { return x === 'долги'; }).length;
    row.coursesClosed += f.v.course - 1 + (outcome === 'graduated' ? 1 : 0);
  });
}
function observeTicketExposure(s, tr) {
  var p = s.person, a = S.age(s), y = s.date.year, m = s.date.month, ed = p.education, A = RL.DATA.army;
  if (y < A.whiteTicketFrom || y > A.whiteTicketTo || p.sex !== 'm' || !p.alive || p.flags.served || p.flags.evader || p.army || p.flags.officerReserve || ['А', 'Б'].indexOf(p.flags.militaryCat || 'Б') < 0) return;
  if (a < 18 || a >= RL.util.interpYear(A.upperAge, Math.min(y, 2025))) return;
  if ((ed.stage === 'vuz' && !ed.vuz.zaochno) || ['college', 'school', 'colony', 'army', 'graduate'].indexOf(ed.stage) >= 0) return;
  if (!(m >= 3 && m <= 6 || m >= 9 && m <= 11)) return;
  Y.ticketWindow.eligibleCampaignMonths++;
  if (!tr.ticketEligible) { tr.ticketEligible = true; Y.ticketWindow.eligibleMen++; }
}
function observeTicketChoice(s, tr, previous, logBefore, boughtBefore) {
  if (previous.kind !== 'custom' || previous.id !== 'draft_notice') return;
  var T = Y.ticketWindow, ticket = previous.opts.filter(function (o) { return o.kind === 'ticket'; })[0];
  // Повестка, созданная в декабре 2019, разрешается уже в январе 2020: опция в сохранённом решении авторитетнее текущей даты.
  if (!ticket && (s.date.year < RL.DATA.army.whiteTicketFrom || s.date.year > RL.DATA.army.whiteTicketTo)) return;
  T.notices++; if (!tr.draftNoticed) { tr.draftNoticed = true; T.noticeMen++; }
  if (!ticket) return;
  T.offers++; if (!tr.ticketOffered) { tr.ticketOffered = true; T.offeredMen++; }
  // Само предложение подтверждает право на эту историческую игровую развилку даже при переходе стадии в месяце.
  if (!tr.ticketEligible) { tr.ticketEligible = true; T.eligibleMen++; }
  var cost = RL.DATA.army.whiteTicketCost * RL.Economy.AVG24() * RL.World.realWageIndex(s, s.date.year, s.date.month);
  var b = logBefore.budget, affordable = (b.income - b.need) * 12 * 0.9 >= cost || logBefore.savings >= cost * 1.3;
  if (affordable) { T.affordableOffers++; if (!tr.ticketAffordable) { tr.ticketAffordable = true; T.affordableMen++; } }
  var chosen = s.log.filter(function (l) { return l.type === 'choice'; }).slice(-1)[0];
  if (!chosen || chosen.text !== previous.title + ': ' + ticket.text) return;
  T.attempts++; if (!tr.ticketAttempt) { tr.ticketAttempt = true; T.attemptMen++; }
  if (!boughtBefore && s.person.flags.boughtTicket) { T.successes++; if (!tr.ticketSuccess) { tr.ticketSuccess = true; T.successMen++; } }
  else T.unsuccessfulAttempts++;
}
function childEnd(s, tr) {
  if (tr.childDone) return;
  tr.childDone = true;
  if (tr.sawKg) st.kg++; if (tr.sawSchool) st.school++;
  if (s.log.some(function (l) { return /развелись/.test(l.text); })) st.divorce++;
  if (s.log.some(function (l) { return /Родил(ся брат|ась сестра)/.test(l.text); })) st.sibBorn++;
  tally(st.endFam, s.family.type);
}
var t0 = Date.now();
for (var i = 0; i < N; i++) {
  var by = fixedYear === null ? 1985 + (i % 51) : fixedYear, s;
  try {
    s = RL.Game.create({sex: i % 2 ? 'm' : 'f', firstName: 'Тест', lastName: 'Тестов', birthYear: by}, 1000 + i * 7919);
    tally(st.region, s.person.regionId); tally(st.settlement, s.person.settlement); tally(st.famType, s.family.type);
    st.mother.edu[S.mother(s).edu]++;
    if (S.father(s).alcohol === 3) st.alc3++;
    s.person.conditions.forEach(function (c) { tally(st.cond, c.id); });
    var era = by < 1992 ? '1985-91' : by < 2000 ? '1992-99' : by < 2010 ? '2000-09' : by < 2020 ? '2010-19' : by < 2026 ? '2020-25' : '2026-35';
    st.eras[era] = st.eras[era] || {n: 0, d: 0, inf: 0}; st.eras[era].n++;
    var guard = 0, tr = {sawKg: false, sawSchool: false, childDone: false, teen: false, teenDone: false, young: false, q5: false, admission: null};
    // этап 3 продлил жизнь до 35; эта сверка — по 25-летию (взрослые 25–35 — tests/adult-check.js)
    while (!s.over && guard++ < 1400 && !(S.ageMonths(s) >= 300 && !s.pending)) {
      if (s.pending) {
        var previous = s.pending;
        // Только первая кампания выпускника 11 класса: СПО и повтор после gap исключены.
        if (!tr.admission && previous.kind === 'custom' && previous.id === 'admission_plan' && s.person.education.stage === 'graduate' && !(s.person.diplomas || []).length) tr.admission = {year: s.date.year, done: false, attestat: !!(s.person.education.ege && !s.person.education.ege.failed)};
        var ticketBefore = {budget: s.family.lastBudget || {income: 0, need: 0}, savings: s.family.savings}, boughtBefore = !!s.person.flags.boughtTicket;
        RL.Game.autoResolve(s); st.events++; admissionResolved(s, tr, previous); observeFirstVuz(s, tr); observeTicketChoice(s, tr, previous, ticketBefore, boughtBefore); continue;
      }
      var exposure = null;
      if (S.ageMonths(s) >= 216 && S.ageMonths(s) < 300) {
        var ekey = calendarEra(s.date.year), sex = s.person.sex;
        Y.exposureCalendar[ekey] = Y.exposureCalendar[ekey] || {m: {months: 0, deaths: 0, expectedDeaths: 0}, f: {months: 0, deaths: 0, expectedDeaths: 0}};
        exposure = Y.exposureCalendar[ekey][sex]; exposure.months++;
        exposure.expectedDeaths += RL.util.monthly(RL.Mortality.qx(s, s.date.year, sex, S.age(s)));
      }
      observeTicketExposure(s, tr);
      if (tr.firstVuz && !tr.firstVuz.outcome && s.person.education.stage === 'vuz' && s.person.education.vuz === tr.firstVuz.v) tr.firstVuz.studentMonths++;
      RL.Game.step(s);
      observeFirstVuz(s, tr);
      if (exposure && !s.person.alive) exposure.deaths++;
      if (!tr.childDone) {
        if (s.person.education.stage === 'kindergarten') tr.sawKg = true;
        if (s.person.education.stage === 'school') tr.sawSchool = true;
        if (S.ageMonths(s) >= 132 || !s.person.alive) childEnd(s, tr);
      }
      if (!tr.q5 && S.ageMonths(s) === 60 && s.person.alive) { tr.q5 = true; tally(st.q5, s.family.quintile); if (s.family.poverty) st.poverty5++; }
      if (!tr.teen && S.ageMonths(s) >= 132 && s.person.alive) { tr.teen = true; st.teen.n++; }
      if (tr.teen && !tr.teenDone && S.ageMonths(s) >= 216 && s.person.alive) { tr.teenDone = true; teenStats(s); }
      startYoung(s, tr);
    }
    if (guard >= 1400) throw new Error('loop guard');
    if (s.person.alive && S.ageMonths(s) !== 300) throw new Error('Жизнь завершена до 25-летия');
    youngStats(s); finishFirstVuz(s, tr);
    st.logLen += s.log.length;
    if (!s.person.alive) {
      st.allDeaths++;
      if (s.person.deathAge < 11) {
        st.deaths++; st.eras[era].d++; tally(st.causes, s.person.deathCause);
        if (s.person.deathAge < 1) { st.infantDeaths++; st.eras[era].inf++; }
      } else if (s.person.deathAge < 18) { st.teen.deaths++; tally(st.teen.causes, s.person.deathCause); }
      else {
        Y.deaths++; tally(Y.causes, s.person.deathCause); Y.sex[s.person.sex].deaths++;
        Y.mortalityCohorts[calendarEra(s.birth.year + 18)][s.person.sex].deaths++;
      }
    }
    JSON.parse(JSON.stringify(s));
  } catch (e) {
    st.errors++;
    if (st.errors <= 5) console.error('ERROR seed', 1000 + i * 7919, 'year', by, e.stack);
  }
}
// Границы групп должны образовывать непересекающееся разбиение всех успешных жизней.
if (!st.errors && (st.deaths + st.teen.n !== N || st.teen.n - st.teen.deaths !== Y.n || Y.n - Y.deaths !== Object.keys(Y.stage).reduce(function (sum, key) { return sum + Y.stage[key]; }, 0))) throw new Error('Несогласованные знаменатели возрастных групп');
Object.keys(Y.firstVuz).forEach(function (key) {
  var rows = key === 'all' || key === 'nominallyDueBy25' ? [Y.firstVuz[key]] : Object.keys(Y.firstVuz[key]).map(function (k) { return Y.firstVuz[key][k]; });
  rows.forEach(function (row) { if (row.entered !== row.expelled + row.graduated + row.diedBeforeOutcome + row.censored || row.censored !== row.studyingAtEnd + row.serviceAtEnd + row.otherAtEnd) throw new Error('Несогласованные исходы первой программы ВО'); });
});
if (Y.ticketWindow.attempts !== Y.ticketWindow.successes + Y.ticketWindow.unsuccessfulAttempts || Y.ticketWindow.offers > Y.ticketWindow.notices) throw new Error('Несогласованные знаменатели белого билета');
function teenStats(s) {
  var T = st.teen, p = s.person, ed = p.education, h = p.habits || {}, ev = p.habitsEver || {};
  ['smoking', 'alcohol', 'drugs', 'gaming'].forEach(function (k) { T.h[k] = T.h[k] || [0, 0, 0, 0]; T.h[k][h[k] || 0]++; T.ever[k] = (T.ever[k] || 0) + ((ev[k] || 0) >= 1 ? 1 : 0); });
  if (ed.oge) { T.oge[0] += ed.oge.russian; T.oge[1] += ed.oge.math; T.ogeN = (T.ogeN || 0) + 1; if (ed.oge.failed) T.ogeFail++; }
  if (ed.ege && ed.ege.kind === 'ЕГЭ') { T.egeN++; if (ed.ege.failed) T.egeFail++; Object.keys(ed.ege.scores).forEach(function (k) { T.ege[k] = T.ege[k] || [0, 0]; T.ege[k][0] += ed.ege.scores[k]; T.ege[k][1]++; }); }
  tally(T.track, ed.stage === 'college' ? 'college:' + (ed.school && ed.school.id) : ed.stage);
  if (p.flags.criminalRecord) T.crim++;
  if (p.conditions.some(function (c) { return c.id === 'depression'; })) T.depr++;
  if (p.flags.militaryCat) tally(T.mil, p.flags.militaryCat);
  if (ed.medal) T.medal++;
}
function youngStats(s) {
  var p = s.person;
  if (!p.alive) return;
  if (p.sex === 'm') { Y.men++; if (p.flags.served) Y.served++; if (p.flags.evader) Y.evader++; if (p.flags.boughtTicket) Y.ticket++; if (p.flags.officerReserve) Y.mil++; }
  if ((p.diplomas || []).some(function (d) { return d.level !== 'СПО'; })) Y.higher++; else if ((p.diplomas || []).length) Y.spo++;
  if (p.job && p.job.employed) { Y.emp++; Y.wage.push(p.job.base * (p.job.raise || 1) / RL.Economy.AVG24()); }
  if (RL.Young.apart(s)) Y.apart++;
  if ((p.education.vuzHistory || []).some(function (h) { return h.result === 'отчислен'; })) Y.expelled++;
  tally(Y.stage, p.education.stage);
  if (p.own && p.own.debts.some(function (d) { return d.balance > 1000; })) Y.debt++;
}
function youngReport() {
  var n = Y.n - Y.deaths;
  console.log('--- Молодость (дожили до 18: ' + Y.n + ') ---');
  console.log('Смертей 18–25:', pct(Y.deaths, Y.n), JSON.stringify(Y.causes));
  ['m', 'f'].forEach(function (sex) { var row = Y.sex[sex]; console.log('  ' + sex + ': n=' + row.n, 'смертей', pct(row.deaths, row.n), '| таблица qx (без индивидуальных множителей и событий):', pct(row.expectedDeaths, row.n)); });
  Object.keys(Y.mortalityCohorts).sort().forEach(function (key) { console.log('  Когорта 18-летия ' + key + ':', JSON.stringify(Y.mortalityCohorts[key])); });
  console.log('В вузе после первой кампании (все после 11 кл., включая несдавших экзамены):', pct(Y.vuz18, Y.n18), '| формы:', JSON.stringify(Y.form));
  console.log('В вузе среди получивших аттестат 11 кл. (n=' + Y.attestat.n + '):', pct(Y.attestat.vuz, Y.attestat.n));
  Object.keys(Y.admissions).forEach(function (key) { var row = Y.admissions[key]; console.log('  Поступление ' + key + ': n=' + row.n, pct(row.vuz, row.n), '| с аттестатом n=' + row.attestatN + ':', pct(row.attestatVuz, row.attestatN), '| формы:', JSON.stringify(row.form)); });
  var free = (Y.form.budget || 0) + (Y.form.target || 0), paid = (Y.form.paid || 0) + (Y.form.zaochno || 0);
  console.log('Финансирование бюджет+целевое / платно+заочно:', pct(free, free + paid), '/', pct(paid, free + paid));
  console.log('К 25: высшее', pct(Y.higher, n), '| только СПО', pct(Y.spo, n), '| отчисляли из вуза (доля всего выжившего населения, включая магистратуру)', pct(Y.expelled, n), '| работают', pct(Y.emp, n), '| живут отдельно', pct(Y.apart, n), '| долги', pct(Y.debt, n));
  ['all', 'nominallyDueBy25'].forEach(function (key) { var row = Y.firstVuz[key]; console.log('Первое ВО ' + (key === 'all' ? 'все зачисленные' : 'номинальный выпуск до 25') + ': n=' + row.entered, '| отчислены', pct(row.expelled, row.entered), '(' + row.expelled + ')', '| диплом', row.graduated, '| умерли до исхода', row.diedBeforeOutcome, '| наблюдение не завершено', row.censored, '(учёба/служба/прочее ' + row.studyingAtEnd + '/' + row.serviceAtEnd + '/' + row.otherAtEnd + ')', '| сессий', row.semesters, '| с хвостами', row.debtSemesters); });
  console.log('Мужчины: отслужили', pct(Y.served, Y.men), '| офицеры запаса', pct(Y.mil, Y.men), '| уклонялись', pct(Y.evader, Y.men), '| купленный билет (среди всех выживших мужчин)', pct(Y.ticket, Y.men));
  console.log('Белый билет, историческое окно: годных без отсрочки мужчин', Y.ticketWindow.eligibleMen, '| повесток', Y.ticketWindow.notices, '| предложений покупки', Y.ticketWindow.offers, '| доступны по средствам', Y.ticketWindow.affordableOffers, '| попыток', Y.ticketWindow.attempts, '| успехов', Y.ticketWindow.successes, '| доля среди получивших предложение', pct(Y.ticketWindow.successMen, Y.ticketWindow.offeredMen));
  console.log('Начисленная ЗП работающих в 25 / средняя по РФ: p25/p50/p75', [0.25, 0.5, 0.75].map(function (k) { var q = quantile(Y.wage, k); return q === null ? '—' : q.toFixed(2); }).join(' / '), '| стадии:', JSON.stringify(Y.stage));
}
function teenReport() {
  var T = st.teen, n = T.n - T.deaths;
  console.log('--- Подростки (дожили до 11: ' + T.n + '; снимок на 18-летии) ---');
  console.log('Смертей 11–17:', pct(T.deaths, T.n), JSON.stringify(T.causes));
  Object.keys(T.h).forEach(function (k) { console.log('  ' + k + ' в 18 [0..3]:', T.h[k].map(function (x) { return pct(x, n); }).join(' '), '| пробовали:', pct(T.ever[k], n)); });
  if (T.ogeN) console.log('ОГЭ средн.: рус', (T.oge[0] / T.ogeN).toFixed(2), 'мат', (T.oge[1] / T.ogeN).toFixed(2), '| двойка (до пересдачи):', pct(T.ogeFail, T.ogeN));
  console.log('ЕГЭ, уже сданный к 18-летию (n=' + T.egeN + '):', Object.keys(T.ege).map(function (k) { return k + ' ' + (T.ege[k][0] / T.ege[k][1]).toFixed(1) + ' (' + T.ege[k][1] + ')'; }).join(', '), '| не сдали рус/мат:', pct(T.egeFail, T.egeN));
  console.log('Стадия в 18:', JSON.stringify(T.track));
  console.log('Судимость:', pct(T.crim, n), '| депрессия:', pct(T.depr, n), '| медали:', pct(T.medal, n), '| категория годности:', JSON.stringify(T.mil));
}
console.log('Жизней:', N, 'за', ((Date.now() - t0) / 1000).toFixed(1), 'с; ошибок:', st.errors);
console.log('Смертей до 11 лет:', pct(st.deaths, N), '| младенческих:', pct(st.infantDeaths, N), '| до 25 всего:', pct(st.allDeaths, N));
Object.keys(st.eras).sort().forEach(function (e) { var x = st.eras[e]; console.log('  ', e, 'n=' + x.n, 'смерть до 11:', pct(x.d, x.n), 'до 1 года:', pct(x.inf, x.n)); });
console.log('Причины до 11:', JSON.stringify(st.causes));
console.log('Тип семьи при рождении:', JSON.stringify(st.famType));
console.log('Тип семьи в конце детства (11 лет или смерть раньше):', JSON.stringify(st.endFam));
console.log('Поселения:', JSON.stringify(st.settlement));
console.log('Регионы:', Object.keys(st.region).sort(function (a, b) { return st.region[b] - st.region[a]; }).map(function (k) { return k + ':' + pct(st.region[k], N); }).join(' '));
console.log('Образование матери [школа, СПО, высшее]:', st.mother.edu.map(function (x) { return pct(x, N); }).join(' '));
console.log('Отец — алкоголизм (ур. 3):', pct(st.alc3, N));
console.log('Квинтиль в 5 лет:', JSON.stringify(st.q5), '| бедность среди доживших до 5:', pct(st.poverty5, Object.keys(st.q5).reduce(function (sum, k) { return sum + st.q5[k]; }, 0)));
console.log('Врождённые:', JSON.stringify(st.cond));
console.log('Развод родителей до 11:', pct(st.divorce, N), '| рождение сиблинга до 11:', pct(st.sibBorn, N), '| детсад до 11:', pct(st.kg, N), '| школа до 11:', pct(st.school, N));
console.log('Событий с выбором в среднем:', (st.events / N).toFixed(1), '| строк лога:', (st.logLen / N).toFixed(0));
teenReport(); youngReport();
if (jsonPath) {
  var survivors = Y.n - Y.deaths, free = (Y.form.budget || 0) + (Y.form.target || 0), paid = (Y.form.paid || 0) + (Y.form.zaochno || 0);
  fs.writeFileSync(path.resolve(jsonPath), JSON.stringify({source: source, method: {lives: N, seeds: '1000 + i * 7919', birthYears: fixedYear === null ? '1985–2035, циклически' : fixedYear, childBoundary: 11, teenSnapshot: 18, endAge: 25, admission: 'первая разрешённая кампания после 11 класса, без СПО и gap', firstVuz: 'первая программа высшего образования, без магистратуры: уникальные поступившие; выпуск/отчисление/смерть/незавершённое наблюдение до 25; nominallyDueBy25 означает номинальную дату выпуска раньше 25-летия, но не гарантирует завершённое наблюдение', ticketWindow: 'только игровые кампании 1992–2019: купленный билет, не все медицинские категории В/Д; попытки и успехи отслеживаются по реальным разрешённым решениям', mortalityCohort: 'календарный год 18-летия; qx — ожидаемый риск за полные 84 месяца', wage: 'начисленная зарплата работающих / средняя РФ в том же месяце'}, elapsedSeconds: (Date.now() - t0) / 1000, childhood: st, young: Y, metrics: {survivors25: survivors, admissionShare: ratio(Y.vuz18, Y.n18), admissionAttestatShare: ratio(Y.attestat.vuz, Y.attestat.n), freeShare: ratio(free, free + paid), higherShare: ratio(Y.higher, survivors), employmentShare: ratio(Y.emp, survivors), apartShare: ratio(Y.apart, survivors), servedMenShare: ratio(Y.served, Y.men), firstVuzDropoutShare: ratio(Y.firstVuz.all.expelled, Y.firstVuz.all.entered), firstVuzMatureDropoutShare: ratio(Y.firstVuz.nominallyDueBy25.expelled, Y.firstVuz.nominallyDueBy25.entered), populationEverExpelledShare: ratio(Y.expelled, survivors), ticketSuccessOfferedMenShare: ratio(Y.ticketWindow.successMen, Y.ticketWindow.offeredMen), ticketSuccessAttemptShare: ratio(Y.ticketWindow.successes, Y.ticketWindow.attempts), wageP25: quantile(Y.wage, 0.25), wageMedian: quantile(Y.wage, 0.5), wageP75: quantile(Y.wage, 0.75)}}, null, 2) + '\n', 'utf8');
  console.log('JSON:', path.resolve(jsonPath));
}
if (st.errors) process.exit(1);




