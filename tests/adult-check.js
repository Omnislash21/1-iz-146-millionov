// Сверка этапа 3: жизнь до 35. Запуск: node tests/adult-check.js [N] [--birth-year Y]
var fs = require('fs'), path = require('path'), vm = require('vm');
var root = path.join(__dirname, '..');
fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/src="(js\/[^"]+)"/g).map(function (m) { return m.slice(5, -1).replace(/\?.*$/, ''); })
  .filter(function (f) { return f.indexOf('js/ui') < 0; }).forEach(function (f) { vm.runInThisContext(fs.readFileSync(path.join(root, f), 'utf8'), {filename: f}); });
var S = RL.S, N = +process.argv[2] || 600, by = process.argv.indexOf('--birth-year') > 0 ? +process.argv[process.argv.indexOf('--birth-year') + 1] : null;
function pct(a, b) { return b ? (100 * a / b).toFixed(1) + '%' : '—'; }
function q(a, k) { a = a.slice().sort(function (x, y) { return x - y; }); return a.length ? a[Math.floor((a.length - 1) * k)].toFixed(2) : '—'; }
var fam = {married: 0, cohab: 0, dating: 0, single: 0, divorced: 0, kids: [0, 0, 0, 0], kidsF: [], childlessF: 0, nF: 0, firstMarry: [], firstBirthF: []};
var r = {n: 0, d: 0, dm: 0, nm: 0, df: 0, nf: 0, causes: {}, alive: 0, emp: 0, wage: [], levels: {}, biz: 0, bizEver: 0, flat: 0, parents: 0, wealth: [], invested: 0, debt: 0, errors: 0, expM: 0, expF: 0};
var t0 = Date.now();
for (var i = 0; i < N; i++) {
  var y = by || 1985 + (i % 21), sex = i % 2 ? 'm' : 'f', s;
  try {
    s = RL.Game.create({sex: sex, firstName: 'Тест', lastName: 'Тестов', birthYear: y}, 5000 + i * 7919);
    var g = 0;
    while (!s.over && g++ < 3000 && !(S.ageMonths(s) >= 420 && !s.pending)) { if (s.pending) { RL.Game.autoResolve(s); continue; } RL.Game.step(s); }
    if (!s.person.alive && s.person.deathAge < 25) continue;
    r.n++; if (sex === 'm') r.nm++; else r.nf++;
    for (var a = 25; a < 35; a++) { var qx = RL.Mortality.qx(s, y + a, sex, a); if (sex === 'm') r.expM += qx; else r.expF += qx; }
    if (!s.person.alive) { r.d++; if (sex === 'm') r.dm++; else r.df++; r.causes[s.person.deathCause] = (r.causes[s.person.deathCause] || 0) + 1; continue; }
    var p = s.person, avg = RL.Economy.AVG24() * RL.World.realWageIndex(s, s.date.year, s.date.month);
    r.alive++;
    if (p.job && p.job.employed && !p.job.onLeave) { r.emp++; r.wage.push(RL.Young.netWage(s) / 0.87 / avg); var l = p.job.level || 0; r.levels[l] = (r.levels[l] || 0) + 1; }
    if (p.biz) r.biz++; if (p.biz || (p.bizHistory || []).length) r.bizEver++;
    if (p.own && p.own.living === 'own_flat') r.flat++;
    if (!RL.Young.apart(s)) r.parents++;
    r.wealth.push(RL.Adult.wealth(s) / avg);
    var pf = RL.Adult.portfolio(s); if (pf.deposit + pf.stocks + pf.usd > 1) r.invested++;
    if (p.own.debts.some(function (d) { return d.kind !== 'mortgage' && d.balance > avg; })) r.debt++;
    var c = p.spouse; if (!c) fam.single++; else fam[c.status]++;
    if (p.flags.divorced) fam.divorced++;
    var kn = (p.kids || []).filter(function (k) { return k.alive; }).length; fam.kids[Math.min(3, kn)]++;
    if (sex === 'f') { fam.nF++; fam.kidsF.push(kn); if (!kn) fam.childlessF++; var k0 = (p.kids || [])[0]; if (k0) fam.firstBirthF.push(k0.bornM / 12); }
    var wm = s.log.filter(function (l) { return /^Свадьба/.test(l.text); })[0]; if (wm) fam.firstMarry.push(wm.age);
    JSON.parse(JSON.stringify(s));
  } catch (e) { r.errors++; if (r.errors <= 3) console.error('ERROR', y, e.stack); }
}
console.log('Жизней:', N, 'за', ((Date.now() - t0) / 1000).toFixed(0), 'с; ошибок:', r.errors, '| дожили до 25:', r.n);
console.log('Смерть 25–35: мужчины', pct(r.dm, r.nm), '(таблица ~' + pct(r.expM, r.nm * 1) + ')', '| женщины', pct(r.df, r.nf), '(таблица ~' + pct(r.expF, r.nf) + ')', JSON.stringify(r.causes));
console.log('В 35: работают', pct(r.emp, r.alive), '| своё дело', pct(r.biz, r.alive), '(было когда-либо ' + pct(r.bizEver, r.alive) + ')', '| своя квартира (ипотека)', pct(r.flat, r.alive), '| живут с родителями', pct(r.parents, r.alive));
console.log('ЗП в 35 / средняя: p25/p50/p75', q(r.wage, 0.25), q(r.wage, 0.5), q(r.wage, 0.75), '| уровни:', JSON.stringify(r.levels));
console.log('Накопления в средних ЗП: p25/p50/p75/p90', q(r.wealth, 0.25), q(r.wealth, 0.5), q(r.wealth, 0.75), q(r.wealth, 0.9), '| инвестируют', pct(r.invested, r.alive), '| потребдолг > 1 ЗП', pct(r.debt, r.alive));
console.log('Семья в 35: в браке', pct(fam.married, r.alive), '| живут вместе', pct(fam.cohab, r.alive), '| встречаются', pct(fam.dating, r.alive), '| одиноки', pct(fam.single, r.alive), '| был развод', pct(fam.divorced, r.alive));
console.log('Дети (0/1/2/3+):', fam.kids.map(function (x) { return pct(x, r.alive); }).join(' '), '| женщины: бездетны', pct(fam.childlessF, fam.nF), ', детей в среднем', (fam.kidsF.reduce(function (a, b) { return a + b; }, 0) / Math.max(1, fam.nF)).toFixed(2), '| медиана: свадьба', q(fam.firstMarry, 0.5), ', 1-й ребёнок у женщин', q(fam.firstBirthF, 0.5));
if (r.errors) process.exit(1);
