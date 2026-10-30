// Статическая проверка событий: неизвестные факты в when/if/mods, неизвестные эффекты, битые шаблоны рода, later на несуществующие события.
// Факты собираются с живых состояний (дети, взрослые, пенсионеры), эффекты — из кода (eff.имя в js/sim). Запуск: node tests/events-lint.js
var fs = require('fs'), path = require('path'), vm = require('vm');
var root = path.join(__dirname, '..');
fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/src="(js\/[^"]+)"/g).map(function (m) { return m.slice(5, -1).replace(/\?.*$/, ''); })
  .filter(function (f) { return f.indexOf('js/ui') < 0; }).forEach(function (f) { vm.runInThisContext(fs.readFileSync(path.join(root, f), 'utf8'), {filename: f}); });
var S = RL.S, facts = {}, effs = {};
// факты — с нескольких жизней в разном возрасте
for (var i = 0; i < 6; i++) {
  var s = RL.Game.create({sex: i % 2 ? 'f' : 'm', firstName: 'Т', lastName: 'Т', birthYear: 1985 + i * 5}, 31 + i * 7919), g = 0;
  while (!s.over && g++ < 900) { if (s.pending) { RL.Game.autoResolve(s); continue; } RL.Game.step(s); if (g % 60 === 0) Object.keys(S.facts(s)).forEach(function (k) { facts[k] = 1; }); }
}
fs.readdirSync(path.join(root, 'js/sim')).forEach(function (f) {
  var t = fs.readFileSync(path.join(root, 'js/sim', f), 'utf8'), m, re = /eff\.([a-zA-Z]+)/g;
  while ((m = re.exec(t))) effs[m[1]] = 1;
});
['health', 'mental', 'social', 'skills', 'happiness', 'money'].forEach(function (k) { effs[k] = 1; });
// динамические факты (js/sim/state.js): focus_<id> — текущий фокус, <id болезни> — болезнь есть и не вылечена
RL.DATA.focuses.forEach(function (f) { facts['focus_' + f.id] = 1; });
Object.keys(RL.DATA.conditions).forEach(function (k) { facts[k] = 1; });
var SPECIAL = {any: 1, not: 1, tags: 1, notTags: 1};
var bad = [], ids = {};
RL.DATA.events.forEach(function (e) { ids[e.id] = 1; });
function checkCond(c, where) {
  if (!c || typeof c !== 'object') return;
  Object.keys(c).forEach(function (k) {
    if (k === 'any') { c[k].forEach(function (x) { checkCond(x, where); }); return; }
    if (k === 'not') { checkCond(c[k], where); return; }
    if (SPECIAL[k]) return;
    if (!facts[k] && !/^flag_/.test(k)) bad.push(where + ': неизвестный факт «' + k + '»');
  });
}
function checkEff(e, where) {
  if (!e) return;
  Object.keys(e).forEach(function (k) {
    if (k === 'reason') return;
    if (!effs[k]) bad.push(where + ': неизвестный эффект «' + k + '»');
    if (k === 'later') [].concat(e.later).forEach(function (l) { if (!ids[l.id]) bad.push(where + ': later на несуществующее «' + l.id + '»'); });
    if (k === 'queue' && !ids[e.queue]) bad.push(where + ': queue на несуществующее «' + e.queue + '»');
    if (k === 'onTie' || k === 'noTie') checkEff(e[k], where);
  });
}
function checkText(t, where) {
  if (typeof t !== 'string') return;
  var open = (t.match(/\[/g) || []).length, close = (t.match(/\]/g) || []).length;
  if (open !== close) bad.push(where + ': скобки рода не сходятся');
  (t.match(/\[[^\]]*\]/g) || []).forEach(function (b) { if (b.indexOf('|') < 0) bad.push(where + ': шаблон без «|» ' + b); });
  if (/\([а-я]{1,3}\)/.test(t)) bad.push(where + ': старая запись рода «(а)»');
}
RL.DATA.events.forEach(function (e) {
  var w = e.id;
  checkCond(e.when, w); (e.mods || []).forEach(function (m) { checkCond(m.if, w); });
  checkText(e.title, w); checkText(e.text, w); checkEff(e.effects, w);
  (e.outcomes || []).forEach(function (o) { checkText(o.text, w); checkEff(o.effects, w); (o.mods || []).forEach(function (m) { checkCond(m.if, w); }); });
  (e.choices || []).forEach(function (c, i) {
    var cw = w + '#' + i; checkText(c.text, cw); checkCond(c.if, cw); checkEff(c.effects, cw);
    (c.outcomes || []).forEach(function (o) { checkText(o.text, cw); checkEff(o.effects, cw); (o.mods || []).forEach(function (m) { checkCond(m.if, cw); }); });
  });
});
var only = process.argv[2] ? new RegExp(process.argv[2]) : null;
var shown = bad.filter(function (b) { return !only || only.test(b); });
console.log('Событий: ' + RL.DATA.events.length + ', фактов: ' + Object.keys(facts).length + ', эффектов: ' + Object.keys(effs).length + '. Найдено: ' + shown.length);
shown.slice(0, 60).forEach(function (b) { console.log('  ' + b); });
