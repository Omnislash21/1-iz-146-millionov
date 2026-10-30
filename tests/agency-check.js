// Агентность в тяжёлых стартах: есть ли у жизни «окна», где выбор меняет путь, и выбираются ли люди наверх.
// Группы (по биографии автопилотных жизней): бедный регион + бедная семья + слабый самоконтроль; сирота; ранняя зависимость
// (наркотики или тяжёлый алкоголь до 20); женщина с детьми после развода. Окна — развилки, которые реально меняют путь.
// Запуск: node tests/agency-check.js [N]
var fs = require('fs'), path = require('path'), vm = require('vm');
var root = path.join(__dirname, '..');
fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/src="(js\/[^"]+)"/g).map(function (m) { return m.slice(5, -1).replace(/\?.*$/, ''); })
  .filter(function (f) { return f.indexOf('js/ui') < 0; }).forEach(function (f) { vm.runInThisContext(fs.readFileSync(path.join(root, f), 'utf8'), {filename: f}); });
var S = RL.S, N = +process.argv[2] || 400, t0 = Date.now();
// развилки, где выбор меняет траекторию: переезд, учёба, связь, лечение, разрыв, смена работы
var WINDOWS = /^(rg_leave_hometown|rg_village_leave|rg_stayed|rg_monotown|rg_fe_outflow|c2_language|c2_second_degree|c2_student_union|c2_move_career|c2_sport_habit|c2_savings|add_alc_coding|add_alc_aa|add_drug_rehab|add_drug_overdose_friend|add_smoke_quit|add_bet_group|f_domestic|f_domestic_again|f_divorce_housing|f_husband_provide|f_dependent|f_clock|toxic_marriage|toxic_team|ml_ceiling|ml_switch_industry|ml_layoff_status|emig_offer|job_offer|rg_contract_lift|q_burnout_break|q_cold_marriage|q_lonely_call|ch_help_friend|start_business)$/;
var G = {poorStart: [], orphan: [], earlyAddict: [], divorcedMom: [], all: []};
for (var i = 0; i < N; i++) {
  var sx = i % 2 ? 'f' : 'm';
  var s = RL.Game.create({sex: sx, firstName: 'Т', lastName: 'Агентов', birthYear: 1985 + (i * 7) % 40}, 777 + i * 104729), g = 0, early = false, scAt20 = null;
  var R = S.region(s), poorReg = (R.unemployment || 1) >= 1.3 || R.wage < 0.9;
  while (!s.over && g++ < 1500) {
    if (s.pending) { RL.Game.autoResolve(s); continue; }
    RL.Game.step(s);
    var a = S.age(s), h = s.person.habits || {};
    if (a < 20 && ((h.drugs || 0) >= 2 || (h.alcohol || 0) >= 3)) early = true;
    if (scAt20 === null && a >= 20) scAt20 = RL.Character.z(s, 'selfControl');
  }
  var p = s.person, bio = p.bio || {}, inc = bio.incN >= 60 ? bio.incSum / bio.incN : null;
  var q0 = (s.history.filter(function (h) { return h.quintile && h.age <= 16; })[0] || {}).quintile || 3;
  var win = Object.keys(s.fired || {}).filter(function (id) { return WINDOWS.test(id); }).reduce(function (t, id) { return t + s.fired[id]; }, 0);
  var rec = {inc: inc, win: win, age: p.alive ? S.age(s) : p.deathAge};
  G.all.push(rec);
  if (poorReg && q0 <= 2 && scAt20 !== null && scAt20 < 0.3) G.poorStart.push(rec);
  if (s.flags.wasInOrphanage) G.orphan.push(rec);
  if (early) G.earlyAddict.push(rec);
  if (sx === 'f' && p.flags.divorced && (p.kids || []).length) G.divorcedMom.push(rec);
}
console.log('Жизней: ' + N + ', ' + Math.round((Date.now() - t0) / 1000) + ' с');
Object.keys(G).forEach(function (k) {
  var a = G[k]; if (!a.length) { console.log(k + ': нет'); return; }
  var w = a.reduce(function (t, x) { return t + x.win; }, 0) / a.length, inc = a.filter(function (x) { return x.inc !== null; });
  var up = inc.filter(function (x) { return x.inc >= 1; }).length / Math.max(1, inc.length), no = a.filter(function (x) { return x.win < 2; }).length / a.length;
  var age = a.map(function (x) { return x.age; }).sort(function (x, y) { return x - y; })[Math.floor(a.length / 2)];
  console.log({poorStart: 'Бедный регион+семья, слабый самоконтроль', orphan: 'Сироты', earlyAddict: 'Ранняя зависимость', divorcedMom: 'Женщина с детьми после развода', all: 'Все'}[k] +
    ' (' + a.length + '): окон выбора на жизнь ' + w.toFixed(1) + ', меньше двух окон — ' + Math.round(no * 100) + '%, доход выше медианы когорты — ' + Math.round(up * 100) + '%, медиана возраста смерти ' + Math.round(age));
});
